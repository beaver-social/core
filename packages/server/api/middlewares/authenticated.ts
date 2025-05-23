import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { JWTalgorithm, JWTPrivateKey } from "../constants";
import env from "../../env";
import { tryCatch } from "../lib/tryCatch";
import { LRUCache } from "lru-cache";
import { eq } from "drizzle-orm";
import { zJwtPayload } from "../lib/zod/helpers";
import { generateHash } from "../lib/utils/utils";
import { DB } from "../lib/db/schema";
import db from "../lib/db";
import { respond } from "../lib/utils/respond";
import { Context } from "hono";

const cache = new LRUCache<string, DB["user"]>({
  max: 1000,
  ttlAutopurge: true,
});

export async function getUserFromCtx(ctx: Context) {
  const token = ctx.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new Error("Missing Auth Token");

  const cacheKey = generateHash(token);

  const cachedUser = cache.get(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }

  const decodedJwt = await tryCatch(verify(token, JWTPrivateKey, JWTalgorithm));

  if (decodedJwt.error) {
    throw new Error("Unable to verify Auth Token " + decodedJwt.error);
  }
  const { sub } = zJwtPayload().parse(decodedJwt.data);

  // no this will not you stupid ai => this will fetch user for every request, replace with redis cache later.
  let [user] = await db
    .select()
    .from(db.schema.users)
    .where(eq(db.schema.users.id, sub))
    .limit(1);

  if (!user) throw new Error("User not found");

  return user;
}

const authenticated = createMiddleware<{
  Variables: {
    user: DB["user"];
  };
}>(async (ctx, next) => {
  const user = await tryCatch(getUserFromCtx(ctx));

  if (user.error) {
    // ctx.log(user.error);
    return respond.err(ctx, user.error.message, 401);
  }

  ctx.set("user", user.data);

  await next();
});

export default authenticated;
