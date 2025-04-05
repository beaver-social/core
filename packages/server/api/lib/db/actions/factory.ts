import { actions } from "../schema/action";
import { verifyPersonalMessageSignature } from "@mysten/sui/verify";
import { users } from "../schema/user";
import { tryCatch } from "../../tryCatch";
import { deriveActionNameFromFn } from "./utils";
import db from "..";
import { eq } from "drizzle-orm";

export function createAction<T>(
  fn: (args: T & { userId: number }) => Promise<void>
) {
  return async (options: Parameters<typeof fn>[0], signature: string) => {
    const message = new TextEncoder().encode(
      JSON.stringify({ ...options, type: deriveActionNameFromFn(fn) })
    );

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

    const result = await tryCatch(fn(options));

    if (result.error) {
      throw new Error(
        `Error performing action "${deriveActionNameFromFn(fn)}" ` +
          result.error.message
      );
    }

    await db.insert(actions).values({
      userId: options.userId,
      type: deriveActionNameFromFn(fn),
      request: JSON.stringify(options),
      signature: signature,
    });
  };
}
