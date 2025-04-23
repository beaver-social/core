import { useBeaverClient } from "./client";

/**
 * Hook to access the post module of the Beaver client
 */
export const usePost = () => {
  const { client } = useBeaverClient();

  return {
    post: client?.post || null,
  };
};

/**
 * Hook to access the swipe module of the Beaver client
 */
export const useSwipe = () => {
  const { client } = useBeaverClient();

  return {
    swipe: client?.swipe || null,
  };
};
