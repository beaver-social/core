import { useContext } from "react";
import { BeaverContext } from "../context/beaver";

/**
 * Hook to access the Beaver client and its state
 * @returns The BeaverClient instance and its state
 */
export function useBeaverClient() {
  const { client } = useContext(BeaverContext);

  if (!client) {
    throw new Error(
      "Not yet  initialized or Provider not present please try again"
    );
  }

  return client;
}
