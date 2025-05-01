import * as helpers from "./helpers";
import * as utils from "../utils/utils";
import type { DB } from "../db/schema";
import db from "../db";
import { verifySignature } from "../utils/signature";
import { stringify } from "../../../utils";

type Transaction = Parameters<Parameters<typeof db.transaction>["0"]>["0"];
type ActionOptions<T> = T & { userId: number };

export function createAction<T>() {
  return function <R>(
    fn: (tx: Transaction, args: T & { user: DB["user"] }) => Promise<R>,
    callback?: (
      tx: Transaction,
      result: R,
      action: DB["action"]
    ) => void | Promise<void>
  ) {
    return async function (options: ActionOptions<T>, signature: string) {
      // Prepare action request
      const actionType = helpers.deriveActionNameFromFn(fn);
      const prevHash = await helpers.getPreviousActionHash(options.userId);
      const actionRequest = {
        ...options,
        type: actionType,
        previous: prevHash,
      };

      // Prepare payload and message
      const payload = stringify(actionRequest);
      console.log(payload);
      const [compressedPayload, keys] =
        helpers.compressActionRequest(actionRequest);
      const message = new TextEncoder().encode(payload);
      const user = await helpers.getUser(options.userId);
      await verifySignature(message, signature, {
        address: user.address,
        intent: "PersonalMessage",
      });

      const result = await db.transaction(async (tx) => {
        // Run the action function
        const result = await helpers.executeActionFunction(
          tx,
          fn,
          {
            ...options,
            user: user,
          },
          actionType
        );

        // Store action metadata
        const hash = utils.generateHash(payload);
        const fnHash = utils.generateHash(fn.toString());

        // Store function definition if needed
        const fnId = await helpers.storeFunctionDefinition(tx, fnHash, keys);

        // Store action request and action record
        await helpers.storeActionRequest(tx, hash, fnId, compressedPayload);
        const action = await helpers.storeActionRecord(
          tx,
          options.userId,
          hash,
          prevHash,
          actionType,
          signature
        );

        // Execute optional callback
        if (callback) {
          await callback(tx, result, action);
        }

        return result;
      });

      return result;
    };
  };
}
