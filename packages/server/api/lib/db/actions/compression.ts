import { eq } from "drizzle-orm";
import db from "..";
import { actionFunctions, actionRequests, actions } from "../schema/action";
import { createAction } from "./factory";
import { encode as msgpackEncode, decode as msgpackDecode } from "msgpackr";

export function compressActionRequest(
  req: Parameters<ReturnType<typeof createAction>>["0"] & {
    type: string;
    previous: string;
  }
) {
  const { type, previous, userId, ...rest } = req;
  const toStore = rest as Record<string, unknown>;

  const keys = Object.keys(toStore);
  const vals = keys.map((key) => toStore[key]);

  const payload = Buffer.from(msgpackEncode(vals)).toString("base64");

  return [payload, keys] as const;
}

export async function retrieveActionRequest(actionId: number) {
  const [action] = await db
    .select()
    .from(actions)
    .where(eq(actions.id, actionId))
    .limit(1);

  const [request] = await db
    .select()
    .from(actionRequests)
    .where(eq(actionRequests.hash, action.hash))
    .limit(1);

  const [{ params }] = await db
    .select()
    .from(actionFunctions)
    .where(eq(actionFunctions.id, request.function))
    .limit(1);

  const keys = JSON.parse(params) as string[];
  const vals = msgpackDecode(
    Buffer.from(request.payload, "base64")
  ) as unknown[];

  const req = keys.reduce((acc, key, index) => {
    acc[key] = vals[index];
    return acc;
  }, {} as Record<string, unknown>);

  return { userId: action.userId, previous: action.previous, ...req };
}
