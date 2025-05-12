import { Hono } from "hono";
import users from "./users";
import posts from "./posts";
import ping from "./ping";

const app = new Hono()
  .route("users", users)
  .route("posts", posts)
  .route("ping", ping);

export default app;
