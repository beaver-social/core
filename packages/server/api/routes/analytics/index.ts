import { Hono } from "hono";
import post from "./posts";
import swipe from "./swipes";
import user from "./users";

export default new Hono()
  .route("/posts", post)
  .route("/swipes", swipe)
  .route("/users", user);
