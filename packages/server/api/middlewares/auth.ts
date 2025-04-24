import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { DB } from "../schema";
import { JWTalgorithm } from "../constants";
import env from "../../env";
import { tryCatch } from "../lib/tryCatch";
import { LRUCache } from "lru-cache";
import db from "../schema/db";
import { eq } from "drizzle-orm";
import { zJwtPayload } from "../lib/zod/helpers";
import { users } from "../schema/user/users";
import { generateHash } from "../lib/utils";
import { respond } from "../../utils/respond";
const cache = new LRUCache<string, DB["user"]>({
  max: 1000,
  ttlAutopurge: true,
});

export const authenticated = createMiddleware<{
  Variables: {
    user: DB["user"];
  };
}>(async (ctx, next) => {
  const token = ctx.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return respond.err(ctx, "Missing Auth Token", 401);

  const cacheKey = generateHash(token);

  const cachedUser = cache.get(cacheKey);
  if (cachedUser) {
    ctx.set("user", cachedUser);
    return await next();
  }

  const decodedJwt = await tryCatch(
    verify(token, env.JWT_SECRET, JWTalgorithm)
  );

  if (decodedJwt.error) return ctx.text("Unable to verify Auth Token", 401);

  const { sub } = zJwtPayload.parse(decodedJwt.data);

  let [user] = await db.select().from(users).where(eq(users.id, sub)).limit(1);
  ctx.set("user", user);

  await next();
});
