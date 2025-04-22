import { useContext } from "react";
import { BeaverContext } from "../context/beaver";

/**
 * Hook to access the Beaver client and its state
 * @returns The BeaverClient instance and its state
 */
export const useBeaverClient = () => {
  const context = useContext(BeaverContext);

  if (!context) {
    throw new Error("useBeaverClient must be used within a BeaverProvider");
  }

  return {
    ...context,
    // Provide direct references to all client modules for easier access
    identity: context.client?.identity,
    post: context.client?.post,
    swipe: context.client?.swipe,
    user: context.client?.user,
  };
};
