import { Hono } from "hono";
import post from "./post";
import topics from "./topics";
import swipe from "./swipe";

export default new Hono()
  // feed posts
  .route("/posts", post)
  .route("/swipes", swipe)
  .route("/topics", topics);
