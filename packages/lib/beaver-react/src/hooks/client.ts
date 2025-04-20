import { useContext } from "react";
import { BeaverContext } from "../context/beaver";

/**
 * Hook to access the Beaver client and its state
 */
export const useBeaverClient = () => {
  const context = useContext(BeaverContext);
  if (!context) {
    throw new Error("useBeaverClient must be used within a BeaverProvider");
  }
  return context;
};
