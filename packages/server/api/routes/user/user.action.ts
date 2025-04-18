import { createAction } from "../../lib/actions/factory";
import { zUserUpdate } from "../../lib/zod/helpers";
import * as userSchema from "../../schema/user";
import { eq } from "drizzle-orm";
import { z } from "zod";
import db from "../../schema/db";
import suiClient from "../../lib/sui/client";

export const updateUser = createAction<{
  userId: number;
  body: z.infer<typeof zUserUpdate>;
}>()(async (tx, { userId, body }) => {
  const user = await tx
    .select()
    .from(userSchema.users)
    .where(eq(userSchema.users.id, userId));

  if (!user) return { error: "User not found" };

  const updatedUser = await tx
    .update(userSchema.users)
    .set(body)
    .where(eq(userSchema.users.id, userId));

  return updatedUser;
});

// NOT IMPLEMENTED YET
export async function syncSuins({ userId }: { userId: number }) {
  const user = await db
    .select()
    .from(userSchema.users)
    .where(eq(userSchema.users.id, userId))
    .limit(1);

  if (user.length === 0) throw new Error("User not found");
  const userAddress = user[0].address;

  const { data } = await suiClient.getOwnedObjects({
    owner: userAddress,
  });

  return { success: true, data };
}
