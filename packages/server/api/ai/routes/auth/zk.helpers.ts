import crypto from "crypto";
import { z } from "zod";
import { zJwt } from "../../lib/zod/helpers";

export function deriveUserSalt(jwt: z.infer<typeof zJwt>): Uint8Array {
  const { sub, iss, aud } = jwt;

  // Use JWT fields as inputs for the key derivation
  const info = Buffer.from(sub);

  // Combine issuer and audience as salt if available
  const salt = Buffer.concat([
    Buffer.from((iss as string) || ""),
    Buffer.from((aud as string) || ""),
  ]);

  if (!process.env.OAUTH_SALT_MASTER_SEED) {
    throw new Error("OAUTH_SALT_MASTER_SEED not found");
  }

  const OAUTH_SALT_MASTER_SEED = Buffer.from(
    process.env.OAUTH_SALT_MASTER_SEED,
    "hex",
  );

  // Implement HKDF-like derivation
  const hmac = crypto.createHmac("sha256", OAUTH_SALT_MASTER_SEED);
  hmac.update(salt);
  const prk = hmac.digest();

  const derivedHmac = crypto.createHmac("sha256", prk);
  derivedHmac.update(info);

  // Ensure the output is 16 bytes (128 bits) as required for zkLogin
  return derivedHmac.digest().subarray(0, 16);
}
