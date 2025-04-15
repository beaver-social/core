import { createAction } from "../../lib/actions/factory";
import { zUserUpdate } from "../../lib/zod/helpers";
import * as userSchema from "../../schema/user";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

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
