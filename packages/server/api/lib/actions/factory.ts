import db, { DB } from "../../schema";
import * as helpers from "./factory.helpers";

type Transaction = Parameters<Parameters<typeof db.transaction>["0"]>["0"];
type ActionOptions<T> = T & { userId: number };

export function createAction<T>() {
  return function <R>(
    fn: (tx: Transaction, args: ActionOptions<T>) => Promise<R>,
    callback?: (
      tx: Transaction,
      result: R,
      action: DB["action"]
    ) => void | Promise<void>
  ) {
    return async function (
      options: ActionOptions<T>,
      signature: {
        type: "wallet" | "zk";
        signature: string;
      }
    ) {
      // Prepare action request
      const actionType = helpers.deriveActionNameFromFn(fn);
      const prevHash = await helpers.getPreviousActionHash(options.userId);
      const actionRequest = {
        ...options,
        type: actionType,
        previous: prevHash,
      };

      // Prepare payload and message
      const payload = JSON.stringify(actionRequest);
      const [compressedPayload, keys] =
        helpers.compressActionRequest(actionRequest);
      const message = new TextEncoder().encode(payload);

      // Verify user signature
      const user = await helpers.getUser(options.userId);
      await helpers.verifyUserSignature(message, signature, user.address);

      // Execute transaction
      await db.transaction(async (tx) => {
        // Run the action function
        const result = await helpers.executeActionFunction(
          tx,
          fn,
          options,
          actionType
        );

        // Store action metadata
        const hash = helpers.generateHash(payload);
        const fnHash = helpers.generateHash(fn.toString());

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
      });
    };
  };
}
