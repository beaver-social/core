import { eq } from "drizzle-orm";
import { tryCatch } from "../../lib/tryCatch";
import db from "../../schema/db";
import { users } from "../../schema/user";
import crypto from "crypto";
import { challenges } from "../../schema/misc";
import { verifyUserSignature } from "../../lib/actions/helpers";

export async function checkUsernameAvailability(username: string) {
  // check if username is available
  const result = await tryCatch(
    db.select().from(users).where(eq(users.username, username)),
  );

  if (result.error) {
    throw new Error("Failed to check username availability");
  }

  return result.data.length === 0;
}

export async function isAddressRegistered(address: string) {
  const result = await tryCatch(
    db.select().from(users).where(eq(users.address, address)),
  );

  if (result.error) {
    throw new Error("Failed to check if address is registered");
  }

  return result.data.length > 0;
}

export function generateNonce() {
  return crypto.randomBytes(32).toString("hex");
}

export async function getUser(userId: number) {
  const result = await tryCatch(
    db.select().from(users).where(eq(users.id, userId)).limit(1),
  );

  if (result.error) {
    throw new Error("Failed to fetch user");
  }

  if (result.data.length === 0) {
    throw new Error("User not found");
  }

  return result.data[0];
}

export async function verifyChallenge(
  message: string,
  userId: number,
  signature: string,
): Promise<void> {
  // fetch user from db
  const user = await getUser(userId);

  //fetch challenge from db
  const challenge = await db
    .select()
    .from(challenges)
    .where(eq(challenges.userId, userId))
    .limit(1);

  if (challenge.length === 0) {
    throw new Error("Challenge not found.");
  }

  //verify signature
  const { nonce } = challenge[0];
  const challengeMessageBytes = new TextEncoder().encode(`${message}${nonce}`);
  await verifyUserSignature(
    challengeMessageBytes,
    signature,
    user.loginType,
    user.address,
  );

  // delete challenge from db
  await db.delete(challenges).where(eq(challenges.id, challenge[0].id));
}
