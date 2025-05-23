import { Hono } from "hono";
import { respond } from "../../lib/utils/respond";
import { tryCatch } from "../../lib/tryCatch";
import { GoogleGenAI } from "@google/genai";
import type { CreateChatParameters } from "@google/genai";
import env from "../../../env";
import { generateSystemInstruction } from "./helpers";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { zNumberString, zPingIntents } from "../../lib/zod/helpers";
import db from "../../lib/db";
import { and, eq } from "drizzle-orm";
import authenticated, { getUserFromCtx } from "../../middlewares/authenticated";
import { stringify } from "../../../utils";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
const { pingChats, pingMessages } = db.schema;

const baseModelName = "gemini-2.0-flash-lite";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        chatId: zNumberString().optional(),
        intent: zPingIntents(),
        message: z.string(),
      })
    ),
    async (ctx) => {
      const { data: user } = await tryCatch(getUserFromCtx(ctx));
      const { chatId, intent, message } = ctx.req.valid("json");

      let history: CreateChatParameters["history"] = [];
      let dbChatId = -1;

      const systemInstruction = generateSystemInstruction(intent);

      if (!user) {
        const res = await tryCatch(
          ai.models.generateContent({
            contents: message,
            model: baseModelName,
            config: { systemInstruction },
          })
        );

        if (res.error) {
          ctx.log(res.error);
          return respond.err(ctx, "Failed to send message", 500);
        }
        let response = res.data.candidates?.[0].content?.parts;

        return respond.ok(
          ctx,
          { response },
          response?.[0].text || "AI Response",
          200
        );
      }

      if (chatId) {
        const [{ intent }] = await db
          .select({ intent: pingChats.intent })
          .from(pingChats)
          .where(and(eq(pingChats.id, chatId), eq(pingChats.userId, user.id)));

        if (!intent) {
          return respond.err(ctx, "Chat not found or inaccessible", 404);
        }

        const dbHistory = await db
          .select({ parts: pingMessages.parts, role: pingMessages.role })
          .from(pingMessages)
          .where(eq(pingMessages.chatId, chatId));

        history = dbHistory.map((content) => ({
          role: content.role,
          parts: JSON.parse(content.parts),
        }));

        dbChatId = chatId;
      } else {
        const { data: chat, error: chatDbError } = await tryCatch(
          db
            .insert(pingChats)
            .values({
              userId: user.id,
              intent,
              label: message.slice(0, Math.min(8, message.length)),
            })
            .returning({ id: pingChats.id })
        );

        if (chatDbError || !chat || !chat[0]) {
          ctx.log(chatDbError);
          return respond.err(ctx, "Failed to create new chat", 500);
        }

        dbChatId = chat[0].id;
      }

      const chat = ai.chats.create({
        model: baseModelName,
        history: history,
        config: { systemInstruction },
      });

      const res = await tryCatch(chat.sendMessage({ message: message }));

      if (res.error) {
        ctx.log(res.error);
        return respond.err(ctx, "Failed to send message", 500);
      }
      let response = res.data.candidates?.[0].content?.parts;

      if (!response) {
        return respond.err(ctx, "AI Failed to respond", 500);
      }

      await db.insert(pingMessages).values({
        chatId: dbChatId,
        role: "user",
        parts: stringify([{ text: message }]),
      });
      await db.insert(pingMessages).values({
        chatId: dbChatId,
        role: "model",
        parts: stringify(response),
      });

      return respond.ok(
        ctx,
        { response },
        response?.[0].text || "AI Response",
        200
      );
    }
  )
  .get("/chats", authenticated, async (ctx) => {
    const user = ctx.get("user");

    const chats = await db
      .select({
        id: pingChats.id,
        intent: pingChats.intent,
        createdAt: pingChats.createdAt,
      })
      .from(pingChats)
      .where(eq(pingChats.userId, user.id));

    return respond.ok(ctx, { chats }, "Ping AI chats", 200);
  })
  .get("/:id", authenticated, async (ctx) => {
    const user = ctx.get("user");

    const chat = await db
      .select()
      .from(pingChats)
      .where(eq(pingChats.id, user.id));
    const messages = await db
      .select()
      .from(pingMessages)
      .where(eq(pingMessages.id, user.id));

    return respond.ok(
      ctx,
      { ...chat, history: messages },
      "Ping Chat Details",
      200
    );
  });

export default app;
