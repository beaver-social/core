import { isValidSuiAddress, normalizeSuiAddress } from "@mysten/sui/utils";
import { z } from "zod";

export const zJsonStringSchema = z
  .string()
  .refine((value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (_) {
      return false;
    }
  })
  .transform((value) => JSON.parse(value));

export const zNumberString = z
  .string()
  .refine((value) => {
    try {
      Number(value);
      return true;
    } catch (_) {
      return false;
    }
  })
  .transform((value) => Number(value));

export const zSuiAddress = z
  .string()
  .refine((value) => {
    return isValidSuiAddress(value);
  })
  .transform((value) => normalizeSuiAddress(value));

export const zMedia = z.object({
  url: z.string(),
  type: z.enum(["image", "video", "audio"]),
  order: z.number(),
  thumbnailUrl: z.string().optional(),
  duration: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  altText: z.string().optional(),
});

export const zJwt = z.object({
  iss: z.string().optional(),
  sub: z.string(),
  aud: z.union([z.array(z.string()), z.string()]).optional(),
  exp: z.number().optional(),
  nbf: z.number().optional(),
  iat: z.number().optional(),
  jti: z.string().optional(),
});

export const zJwtPayload = z.object({
  app: z.number(),
  sub: z.number(),
  exp: z.number(),
  nbf: z.number(),
  iat: z.number(),
});

export const zSignType = z.enum(["wallet", "zk"]);
export const zReactionType = z.enum(["like", "haha", "wow", "sad", "angry"]);
