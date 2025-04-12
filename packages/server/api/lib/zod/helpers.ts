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

export const zJwt = z.object({
  iss: z.string().optional(),
  sub: z.string(),
  aud: z.union([z.array(z.string()), z.string()]).optional(),
  exp: z.number().optional(),
  nbf: z.number().optional(),
  iat: z.number().optional(),
  jti: z.string().optional(),
});

export const zMedia = z.object({
  url: z.string(),
  type: z.string(),
  order: z.number(),
  thumbnailUrl: z.string(),
  duration: z.number(),
  width: z.number(),
  height: z.number(),
  altText: z.string(),
});
