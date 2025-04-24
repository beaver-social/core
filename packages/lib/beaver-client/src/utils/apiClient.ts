import { ClientResponse } from "hono/client";
type ErrorResponse = { error: string };

export async function safeParseResponse<
  T extends Record<string, unknown>,
  U extends number,
  F extends string
>(raw: Promise<ClientResponse<T | ErrorResponse, U, F>>): Promise<T> {
  const rawData = await raw;
  const res = await rawData.json();

  if ((res as ErrorResponse).error) {
    const errorMessage =
      typeof (res as ErrorResponse).error === "string"
        ? (res as ErrorResponse).error
        : "Unknown error";
    throw new Error(errorMessage);
  }

  return res as T;
}
