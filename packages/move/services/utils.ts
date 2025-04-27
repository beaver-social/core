import { z } from "zod";
import type { ZodRawShape } from "zod";

export function zSuiRPCObjectResult<T extends ZodRawShape>(shape: T) {
  return z
    .object({
      data: z.object({
        content: z.object({
          fields: z.object(shape),
        }),
      }),
    })
    .transform((parsed) => {
      const fields = parsed.data?.content?.fields;

      if (!fields) {
        throw new Error("Invalid response format: fields not found", {
          cause: parsed,
        });
      }

      return fields;
    });
}

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
