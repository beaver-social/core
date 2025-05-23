import { ClientResponse } from "hono/client";
import { tryCatch } from "./tryCatch";
import { z } from "zod";
import { stringify } from "./utils";

type ErrorResponse = { success: false; error: string };
type SuccessResponse<T> = { success: true; data: T; message: string };

export async function safeParseResponse<T>(
  raw: Promise<ClientResponse<SuccessResponse<T> | ErrorResponse>>,
) {
  const { error: awaitedError, data: response } = await tryCatch(raw);

  if (awaitedError) {
    throw new Error("Failed to fetch response: " + stringify(awaitedError));
  }

  let body;

  const parsed = await tryCatch(response.json());

  console.log("Parsed response:", parsed);

  if (parsed.error) {
    throw new Error("Failed to parse response: " + stringify(parsed.error));
  } else {
    body = parsed.data;
  }

  const resp = z
    .object({
      success: z.boolean(),
      error: z.any().optional(),
      data: z.any().optional(),
      message: z.string().optional(),
    })
    .parse(body);

  if (resp.success) {
    return (resp as SuccessResponse<T>).data;
  } else {
    const error = (resp as ErrorResponse).error || "Unknown error";
    throw new Error(error);
  }
}
