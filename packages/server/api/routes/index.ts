import { Hono } from "hono";
import users from "./users";
import posts from "./posts";
import ping from "./ping";
import docs from "./docs";
import dev from "./dev";
import media from "./media";
import social from "./social";

const app = new Hono()
  .route("users", users)
  .route("posts", posts)
  // .route("ping", ping)
  // .route("docs", docs)
  .route("dev", dev)
  // .route("media", media)
  .route("social", social);

export default app;
