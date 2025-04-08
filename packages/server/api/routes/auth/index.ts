import { Hono } from "hono";
import zk from "./zk";
import auth from "./auth";

export default new Hono().route("/", auth).route("/zk", zk);
