import { Hono } from "hono";
import db from "../../schema/db";
import { tryCatch } from "../../lib/tryCatch";
import { eq } from "drizzle-orm";
import { authenticated } from "../../middlewares/auth";
import { users } from "../../schema/user/users";

export default new Hono()
  // Get interactions count for a swipe
  .use(authenticated)
  .get("/profile", async (ctx) => {
    const user = ctx.get("user");

    const result = await tryCatch(
      db.select().from(users).where(eq(users.id, user.id))
    );

    if (result.error) {
    }
  });
