import stableStringify from "fast-json-stable-stringify";

export const stringify = stableStringify;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
