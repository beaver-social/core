import {
  actionFunctions,
  actionRequests,
  actions,
} from "../../schema/interactions";
import { verifyPersonalMessageSignature } from "@mysten/sui/verify";
import { users } from "../../schema/user/users";
import type { DB } from "../../schema";
import db from "../../schema/db";
import { tryCatch } from "../tryCatch";
import { desc, eq } from "drizzle-orm";
import { camelToDotCase } from "../utils";
import { createAction } from "./factory";
import { encode as msgpackEncode, decode as msgpackDecode } from "msgpackr";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { getFullnodeUrl } from "@mysten/sui/client";
import { Network } from "../types";

export function deriveActionNameFromFn(fn: Function) {
  return "v1.user." + camelToDotCase(fn.name);
}

type Transaction = Parameters<Parameters<typeof db.transaction>["0"]>["0"];
type ActionOptions<T> = T & { userId: number };

// Helper functions
export async function getPreviousActionHash(userId: number): Promise<string> {
  const [previous] = await db
    .select()
    .from(actions)
    .where(eq(actions.userId, userId))
    .orderBy(desc(actions.createdAt))
    .limit(1);

  return previous?.hash ?? "GENESIS";
}

export async function getUser(userId: number) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}

export async function verifyUserSignature(
  message: Uint8Array,
  signature: string,
  loginType: "wallet" | "zk",
  address: string
) {
  if (loginType === "wallet") {
    const { toSuiAddress: getVerifiedAddress } =
      await verifyPersonalMessageSignature(message, signature, {
        address,
      });

    if (address !== getVerifiedAddress()) {
      throw new Error("Invalid signature");
    }
  } else if (loginType === "zk") {
    const fullnodeUrl = getFullnodeUrl(import.meta.env.SUI_NETWORK as Network);

    const { toSuiAddress: getVerifiedAddress } =
      await verifyPersonalMessageSignature(message, signature, {
        address,
        client: new SuiGraphQLClient({
          url: fullnodeUrl,
        }),
      });

    if (address !== getVerifiedAddress()) {
      throw new Error("Invalid signature");
    }
  } else {
    throw new Error("Invalid signature type");
  }
}

export async function executeActionFunction<T, R>(
  tx: Transaction,
  fn: (tx: Transaction, args: ActionOptions<T>) => Promise<R>,
  options: ActionOptions<T> & { _user: DB["user"] },
  actionType: string
): Promise<R> {
  const result = await tryCatch(fn(tx, options));

  if (result.error) {
    throw new Error(
      `Error performing action "${actionType}" ` + result.error.message
    );
  }

  return result.data;
}

export async function storeFunctionDefinition(
  tx: Transaction,
  fnHash: string,
  keys: any
) {
  const [fnExists] = await tx
    .select()
    .from(actionFunctions)
    .where(eq(actionFunctions.hash, fnHash))
    .limit(1);

  if (fnExists) {
    return fnExists.id;
  }

  const [{ id }] = await tx
    .insert(actionFunctions)
    .values({
      hash: fnHash,
      params: JSON.stringify(keys),
    })
    .returning();

  return id;
}

export async function storeActionRequest(
  tx: Transaction,
  hash: string,
  functionId: number,
  compressedPayload: string
) {
  await tx.insert(actionRequests).values({
    hash,
    function: functionId,
    payload: compressedPayload,
  });
}

export async function storeActionRecord(
  tx: Transaction,
  userId: number,
  hash: string,
  previous: string,
  type: string,
  signature: string,
  loginType: "wallet" | "zk"
) {
  const [action] = await tx
    .insert(actions)
    .values({
      userId,
      hash,
      previous,
      type,
      loginType: loginType,
      signature: signature,
    })
    .returning();

  return action;
}

export function compressActionRequest(
  req: Parameters<ReturnType<ReturnType<typeof createAction>>>["0"] & {
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
