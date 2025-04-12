import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import tryCatch from "../../lib/tryCatch";
import * as actions from "./post.action";

export default new Hono()
  // public posts
  // get posts feed
  .get("/", (ctx) => {
    return ctx.json({
      message:
        "get posts feed (for you) - curated topics for you based on your following and interests. use query params to filter by type like trending, following etc",
    });
  })

  // your posts
  // create a new post
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        authorId: z.number(),
        content: z.string(),
        media: z.array(z.string()).optional(),
        topicId: z.number().optional(),
        parentId: z.number().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        walletSignature: z.string(),
        zkSignature: z.string().optional(),
      })
    ),
    async (ctx) => {
      const { content, media, topicId, parentId, authorId } =
        ctx.req.valid("json");
      const { walletSignature, zkSignature } = ctx.req.valid("query");

      return ctx.json({
        message: "create a new post",
      });
    }
  )

  // get your posts
  .get("/your-posts", (ctx) => {
    return ctx.json({
      message: "get your posts",
    });
  });
