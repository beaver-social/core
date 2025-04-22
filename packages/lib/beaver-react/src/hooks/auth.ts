import { useBeaverClient } from "./client";

/**
 * Hook to access the identity module of the Beaver client
 * @returns The identity module and client state
 */
export const useIdentity = () => {
  const { identity, isInitialized, error } = useBeaverClient();

  return {
    identity,
    isInitialized,
    error:
      !isInitialized && !error
        ? new Error("BeaverClient is not initialized")
        : error,
  };
};
