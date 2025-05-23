import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";
import env from "../../../env";
import db from "../../lib/db";
import authenticated from "../../middlewares/authenticated";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
const { pingChats, pingMessages } = db.schema;

const baseModelName = "gemini-2.0-flash-lite"

const pingCaches: Record<string, string> = {}

const app = new Hono()
    .post(
        "/",
        authenticated,
    )

export default app;
