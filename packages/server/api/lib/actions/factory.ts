import db, { DB } from "../../schema";
import * as helpers from "./factory.helpers";
import * as utils from "../utils";

type Transaction = Parameters<Parameters<typeof db.transaction>["0"]>["0"];
type ActionOptions<T> = T & { userId: number };

export function createAction<T>() {
  return function <R>(
    fn: (
      tx: Transaction,
      args: ActionOptions<T> & { _user: DB["user"] }
    ) => Promise<R>,
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
      const payload = JSON.stringify(actionRequest);
      const [compressedPayload, keys] =
        helpers.compressActionRequest(actionRequest);
      const message = new TextEncoder().encode(payload);
      const user = await helpers.getUser(options.userId);
      const loginType = user.loginType;
      await helpers.verifyUserSignature(
        message,
        signature,
        loginType,
        user.address
      );

      // Execute transaction
      await db.transaction(async (tx) => {
        // Run the action function
        const result = await helpers.executeActionFunction(
          tx,
          fn,
          {
            ...options,
            _user: user,
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
          signature,
          loginType
        );

        // Execute optional callback
        if (callback) {
          await callback(tx, result, action);
        }
      });
    };
  };
}
