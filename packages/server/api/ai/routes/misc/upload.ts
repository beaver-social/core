import { Hono } from "hono";
import {
  processAndUploadImage,
  processAndUploadVideo,
} from "../content/helpers";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { respond } from "../../../utils/respond";
import { tryCatch } from "../../lib/tryCatch";

export default new Hono()
  .post(
    "/image",
    zValidator(
      "form",
      z.object({
        file: z.instanceof(File),
      }),
    ),
    async (ctx) => {
      const { file } = ctx.req.valid("form");
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await tryCatch(processAndUploadImage(buffer));

      if (result.error) {
        return respond.err(
          ctx,
          result.error.message || "Failed to upload image",
          500,
        );
      }

      return respond.ok(
        ctx,
        { url: result.data },
        "Image uploaded successfully",
        200,
      );
    },
  )
  .post(
    "/video",
    zValidator(
      "form",
      z.object({
        file: z.instanceof(File),
      }),
    ),
    async (ctx) => {
      const { file } = ctx.req.valid("form");
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await tryCatch(processAndUploadVideo(buffer));

      if (result.error) {
        return respond.err(
          ctx,
          result.error.message || "Failed to upload video",
          500,
        );
      }

      return respond.ok(
        ctx,
        { url: result.data.videoUrl, thumbnailUrl: result.data.thumbnailUrl },
        "Video uploaded successfully",
        200,
      );
    },
  );
