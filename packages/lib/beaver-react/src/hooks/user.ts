import { useBeaverClient } from "./client";

/**
 * Hook to access the user module of the Beaver client
 */
export const useUser = () => {
  const { client, isInitialized, error } = useBeaverClient();

  if (!isInitialized) {
    return {
      user: null,
      isInitialized,
      error: error || new Error("BeaverClient is not initialized"),
    };
  }

  return {
    user: client?.user || null,
    isInitialized,
    error,
  };
};
