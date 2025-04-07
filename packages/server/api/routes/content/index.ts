import { Hono } from "hono";
import posts from "./posts/posts";
import post from "./posts/post";
import shorts from "./posts/shorts";
import trends from "./trends";

export default new Hono()
  // feed posts
  .route("/posts", posts)
  .route("/posts/:id", post)

  // shorts (separated to improve performance by using a different database table for shorts)
  .route("/shorts", shorts)
  .route("/shorts/:id", post)

  .route("/trends", trends);
