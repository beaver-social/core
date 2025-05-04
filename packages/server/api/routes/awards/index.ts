import { Hono } from "hono";
import { contracts } from "../../lib/sui/contracts";
import { respond } from "../../lib/utils/respond";
import { tryCatch } from "../../lib/tryCatch";

const app = new Hono().get("/types", async (ctx) => {
  const awards = await tryCatch(contracts.awards.read.getAwardsData());
  if (awards.error) {
    ctx.log(awards.error);
    return respond.err(ctx, "Failed to get award types", 500);
  }
  return respond.ok(ctx, awards.data, "Award Types", 200);
});

export default app;
