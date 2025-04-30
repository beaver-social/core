import { Defaults } from "../types/client";

export function ensureConnection(defaults: Defaults) {
  const { connection, surface } = defaults;

  if (!connection || !surface) {
    throw new Error("Please connect a wallet first.");
  }

  return { connection, surface };
}
