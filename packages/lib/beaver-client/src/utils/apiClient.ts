import { ClientResponse } from "hono/client";
import { tryCatch } from "./tryCatch";
type ErrorResponse = { error: string };

export async function safeParseResponse<
  T extends Record<string, unknown>,
  U extends number,
  F extends string
>(raw: Promise<ClientResponse<T | ErrorResponse, U, F>>): Promise<T> {
  const rawData = await tryCatch(raw);
  if (rawData.error) {
    const errorMessage = "Failed to contact beaver server";
    throw new Error(errorMessage);
  }
  const res = await tryCatch(rawData.data.json());

  if (res.error) {
    const errorMessage = res.error.message || "Invalid response from server";
    throw new Error(errorMessage);
  }

  return res.data as T;
}
