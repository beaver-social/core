import { Hono } from "hono";
import post from "./posts";
import swipe from "./swipes";

export default new Hono().route("/posts", post).route("/swipes", swipe);
