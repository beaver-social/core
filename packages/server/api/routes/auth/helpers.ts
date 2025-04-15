import { eq } from "drizzle-orm";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../schema/db";
import { users } from "../../schema/user";
import crypto from "crypto";
import { verifyPersonalMessageSignature } from "@mysten/sui/verify";

export async function checkUsernameAvailability(username: string) {
  // check if username is available
  const result = await tryCatch(
    db.select().from(users).where(eq(users.username, username))
  );

  if (result.error) {
    throw new Error("Failed to check username availability");
  }

  return result.data.length === 0;
}

export async function isAddressRegistered(address: string) {
  const result = await tryCatch(
    db.select().from(users).where(eq(users.address, address))
  );

  if (result.error) {
    throw new Error("Failed to check if address is registered");
  }

  return result.data.length > 0;
}

export function generateNonce() {
  return crypto.randomBytes(32).toString("hex");
}

export async function verifyChallenge(
  message: string,
  userId: number,
  signature: string
) {
  const user = await tryCatch(
    db
      .select({ address: users.address })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
  );

  if (user.error) {
    throw new Error("Failed to fetch user");
  }

  if (user.data.length === 0) {
    throw new Error("User not found");
  }

  const messageBytes = new TextEncoder().encode(message);
  const recoveredAddress = await verifyPersonalMessageSignature(
    messageBytes,
    signature
  );
  return recoveredAddress.toSuiAddress() === user.data[0].address;
}
