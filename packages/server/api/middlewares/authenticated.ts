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

const cache = new LRUCache<string, DB["user"]>({
  max: 1000,
  ttlAutopurge: true,
});

const authenticated = createMiddleware<{
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

  const decodedJwt = await tryCatch(verify(token, JWTPrivateKey, JWTalgorithm));

  if (decodedJwt.error) {
    ctx.log(decodedJwt.error);
    return respond.err(ctx, "Unable to verify Auth Token", 401);
  }
  const { sub } = zJwtPayload().parse(decodedJwt.data);

  // no this will not you stupid ai => this will fetch user for every request, replace with redis cache later.
  let [user] = await db
    .select()
    .from(db.schema.users)
    .where(eq(db.schema.users.id, sub))
    .limit(1);
  ctx.set("user", user);

  await next();
});

export default authenticated;
