import { Hono } from "hono";
import post from "./post";
import topics from "./topics";
import swipe from "./swipe";

export default new Hono()
  // feed posts
  .route("/posts", post)

  // shorts (separated to improve performance by using a different database table for shorts)
  .route("/swipes", swipe)

  // topics (public or private communities / topics that curate content which users can follow)
  .route("/topics", topics);
