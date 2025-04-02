import { Hono } from "hono";
import crypto from "crypto";

// Define an interface for JWT payload
export interface JwtPayload {
  iss?: string;
  sub?: string; // Subject ID
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

function deriveUserSalt(jwt: JwtPayload): Uint8Array {
  const { sub, iss, aud } = jwt;

  if (!sub) {
    throw new Error("Missing required field: sub");
  }

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
    "hex"
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

export default new Hono()
  .get("/", (ctx) => {
    return ctx.json({
      message: "oauth routes",
    });
  })
  .post("/get-salt", async (ctx) => {
    try {
      const body = await ctx.req.json();
      const { jwt } = body as { jwt: JwtPayload };

      if (!jwt) {
        return ctx.json(
          {
            error: "Missing required field: jwt",
          },
          400
        );
      }

      // Derive the salt using the provided JWT information
      const salt = deriveUserSalt(jwt);

      // Return the salt in both hex and base64 formats
      return ctx.json({
        salt: {
          hex: Buffer.from(salt).toString("hex"),
          base64: Buffer.from(salt).toString("base64"),
          // Convert to an integer smaller than 2^128 (big-endian)
          integer: BigInt(`0x${Buffer.from(salt).toString("hex")}`).toString(),
        },
      });
    } catch (error) {
      console.error("Error generating salt:", error);
      return ctx.json(
        {
          error: "Failed to generate salt",
        },
        500
      );
    }
  });
