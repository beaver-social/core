import { Hono } from "hono";
import users from "./users";
import posts from "./posts";
import ping from "./ping";
import docs from "./docs";
import dev from "./dev";
import media from "./media";

const app = new Hono()
  .route("users", users)
  .route("posts", posts)
  .route("ping", ping)
  .route("docs", docs)
  .route("dev", dev)
  .route("media", media);

export default app;
