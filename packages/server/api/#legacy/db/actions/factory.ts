import { actionFunctions, actionRequests, actions } from "../schema/action";
import { verifyPersonalMessageSignature } from "@mysten/sui/verify";
import { users } from "../schema/user";
import { tryCatch } from "../../tryCatch";
import { deriveActionNameFromFn } from "./utils";
import db from "..";
import { desc, eq } from "drizzle-orm";
import { compressActionRequest } from "./compression";
import { DB } from "../schema";

type Transaction = Parameters<Parameters<typeof db.transaction>["0"]>["0"];

export function createAction<T>() {
  return function <R>(
    fn: (tx: Transaction, args: T & { userId: number }) => Promise<R>,
    callback?: (
      tx: Transaction,
      result: R,
      action: DB["action"]
    ) => void | Promise<void>
  ) {
    return async (options: Parameters<typeof fn>[1], signature: string) => {
      const [previous] = await db
        .select()
        .from(actions)
        .where(eq(actions.userId, options.userId))
        .orderBy(desc(actions.createdAt))
        .limit(1);

      const prevHash = previous?.hash ?? "GENESIS";

      const req = {
        ...options,
        type: deriveActionNameFromFn(fn),
        previous: prevHash,
      };
      const payload = JSON.stringify(req);
      const [compressedPayload, keys] = compressActionRequest(req);
      const message = new TextEncoder().encode(payload);

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, options.userId))
        .limit(1);

      const { toSuiAddress: getVerifiedAddress } =
        await verifyPersonalMessageSignature(message, signature, {
          address: user.address,
        });

      if (user.address !== getVerifiedAddress()) {
        throw new Error("Invalid signature");
      }

      await db.transaction(async (tx) => {
        const result = await tryCatch(fn(tx, options));

        if (result.error) {
          throw new Error(
            `Error performing action "${deriveActionNameFromFn(fn)}" ` +
              result.error.message
          );
        }

        const hash = new Bun.CryptoHasher("sha3-256")
          .update(payload)
          .digest("hex");

        const fnHash = new Bun.CryptoHasher("sha3-256")
          .update(fn.toString())
          .digest("hex");

        let fnId = 0;

        const [fnExists] = await tx
          .select()
          .from(actionFunctions)
          .where(eq(actionFunctions.hash, fnHash))
          .limit(1);

        if (!fnExists) {
          const [{ id }] = await tx
            .insert(actionFunctions)
            .values({
              hash: fnHash,
              params: JSON.stringify(keys),
            })
            .returning();
          fnId = id;
        } else {
          fnId = fnExists.id;
        }

        await tx.insert(actionRequests).values({
          hash: hash,
          function: fnId,
          payload: compressedPayload,
        });

        const [action] = await tx
          .insert(actions)
          .values({
            userId: options.userId,
            hash: hash,
            previous: prevHash,
            type: deriveActionNameFromFn(fn),
            signature: signature,
          })
          .returning();

        if (callback) {
          await callback(tx, result.data, action);
        }
      });
    };
  };
}
