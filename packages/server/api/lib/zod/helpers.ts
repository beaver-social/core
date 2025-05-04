import { isValidSuiAddress, normalizeSuiAddress } from "@mysten/sui/utils";
import { z } from "zod";

export const zJsonStringSchema = () =>
  z
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

export const zNumberString = () =>
  z
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

export const zBooleanString = () =>
  z.enum(["true", "false"]).transform((value) => value === "true");

export const zSuiAddress = () =>
  z
    .string()
    .refine((value) => {
      return isValidSuiAddress(value);
    })
    .transform((value) => normalizeSuiAddress(value));

export const zSuiSignature = () =>
  z
    .string()
    .regex(/^[A-Za-z0-9+/=]+$/, "Invalid signature: must be a Base64 string");

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

export const zJwtPayload = () =>
  z.object({
    app: z.number(),
    iss: z.string(),
    sub: z.number(),
    exp: z.number(),
    nbf: z.number(),
    iat: z.number(),
  });

export const zPaginatedRequest = (options?: {
  maxPerPage?: number;
  defaultPerPage?: number;
}) => {
  const maxPerPage = options?.maxPerPage ?? 32;
  const defaultPerPage = options?.defaultPerPage ?? 16;

  return z.object({
    page: zNumberString()
      .default("1")
      .transform((v) => v - 1),
    perPage: zNumberString()
      .default(defaultPerPage.toString())
      .transform((v) => Math.min(v, maxPerPage)),
  });
};
