import { Hono } from "hono";
import posts from "./posts";
import post from "./post";
import shorts from "./shorts";
import short from "./short";
import spaces from "./spaces";
import space from "./space";

export default new Hono()
  // feed posts
  .route("/posts", posts)
  .route("/posts/:id", post)

  // shorts (separated to improve performance by using a different database table for shorts)
  .route("/shorts", shorts)
  .route("/shorts/:id", short)

  // spaces (public or private communities / topics that curate content which users can follow)
  .route("/spaces", spaces)
  .route("/spaces/:id", space);
