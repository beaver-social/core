import { Hono } from "hono";
import users from "./users";
import posts from "./posts";
import ping from "./ping";
import docs from "./docs";
import dev from "./dev";

const app = new Hono()
  .route("users", users)
  .route("posts", posts)
  .route("ping", ping)
  .route("docs", docs)
  .route("dev", dev);

export default app;
