import { Hono } from "hono";
import users from "./users";
import posts from "./posts";
import ping from "./ping";
import docs from "./docs";

const app = new Hono()
  .route("users", users)
  .route("posts", posts)
  .route("ping", ping)
  .route("docs", docs);

export default app;
