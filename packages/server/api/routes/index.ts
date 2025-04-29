import { Hono } from "hono";
import users from "./users";
import posts from "./posts";

const app = new Hono().route("users", users).route("posts", posts);

export default app;
