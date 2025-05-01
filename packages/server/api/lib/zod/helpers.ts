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

export const zSwipeMedia = z.object({
  buffer: z.instanceof(Buffer),
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

export const zReactionType = z.enum(["like", "haha", "wow", "sad", "angry"]);

export const zUserUpdate = z
  .object({
    username: z.string().optional(),
    fullName: z.string().optional(),
    about: z.string().optional(),
    imageUrl: z.string().optional(),
    bannerUrl: z.string().optional(),
    timezone: z.number().optional(),
    isVerified: z.boolean().optional(),
    pinnedPost: z.number().optional(),
    pinnedShort: z.number().optional(),
    email: z.string().optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).length > 0;
    },
    {
      message: "At least one field is required",
    }
  )
  .transform((data) => {
    const processedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    return processedData;
  });
