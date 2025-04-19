import { useContext } from "react";
import { BeaverContext } from "./BeaverProvider";

/**
 * Hook to access the Beaver client and its state
 */
export const useBeaverClient = () => {
  const context = useContext(BeaverContext);
  if (context === undefined) {
    throw new Error("useBeaverClient must be used within a BeaverProvider");
  }
  return context;
};

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

/**
 * Hook to access the post module of the Beaver client
 */
export const usePost = () => {
  const { client, isInitialized, error } = useBeaverClient();

  if (!isInitialized) {
    return {
      post: null,
      isInitialized,
      error: error || new Error("BeaverClient is not initialized"),
    };
  }

  return {
    post: client?.post || null,
    isInitialized,
    error,
  };
};

/**
 * Hook to access the swipe module of the Beaver client
 */
export const useSwipe = () => {
  const { client, isInitialized, error } = useBeaverClient();

  if (!isInitialized) {
    return {
      swipe: null,
      isInitialized,
      error: error || new Error("BeaverClient is not initialized"),
    };
  }

  return {
    swipe: client?.swipe || null,
    isInitialized,
    error,
  };
};

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
