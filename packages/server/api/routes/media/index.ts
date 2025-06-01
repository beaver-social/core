import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono } from "hono";
import { respond } from "../../lib/utils/respond";
import { uploadImageToImageKit } from "./helpers";

export default new Hono().post(
  "/upload",
  zValidator(
    "form",
    z.object({
      media: z.array(z.instanceof(File)).min(1).max(10).or(z.instanceof(File)),
    })
  ),
  async (ctx) => {
    console.log("uploading file");
    const { media } = ctx.req.valid("form");

    console.log({
      media,
    });

    // const result = await uploadImageToImageKit(body.media);

    // console.log({
    //   result,
    // });
    return respond.ok(ctx, {}, "File uploaded successfully", 200);
  }
);
