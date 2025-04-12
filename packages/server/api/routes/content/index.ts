import { Hono } from "hono";
import posts from "./posts";
import post from "./post";
import shorts from "./shorts";
import short from "./short";
import topics from "./topics";
import topic from "./topic";

export default new Hono()
  // feed posts
  .route("/posts", posts)
  .route("/post/:id", post)

  // shorts (separated to improve performance by using a different database table for shorts)
  .route("/shorts", shorts)
  .route("/short/:id", short)

  // topics (public or private communities / topics that curate content which users can follow)
  .route("/topics", topics)
  .route("/topic/:id", topic);
