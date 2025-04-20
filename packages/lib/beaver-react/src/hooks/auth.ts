import { useBeaverClient } from "./client";

/**
 * Hook to access the identity module of the Beaver client
 */
export const useIdentity = () => {
  const { client, isInitialized, error } = useBeaverClient();

  if (!isInitialized) {
    return {
      identity: null,
      isInitialized,
      error: error || new Error("BeaverClient is not initialized"),
    };
  }

  return {
    identity: client?.identity || null,
    isInitialized,
    error,
  };
};
