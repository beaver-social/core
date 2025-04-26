import { useContext } from "react";
import { BeaverContext } from "../context/beaver";

/**
 * Hook to access the Beaver client and its state
 * @returns The BeaverClient instance and its state
 */
export default function useBeaverClient() {
  const { client } = useContext(BeaverContext);

  if (!client) {
    throw new Error("Not yet initialized / Provider not found.");
  }

  return client;
}
