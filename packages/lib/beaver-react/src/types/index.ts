// Import and re-export all types from beaver-client
import { BeaverClient, Surface, BeaverClientConfig } from "@beaver/client";
import { ReactNode } from "react";

// Re-export all types from the client
// export * from "@beaver/client";

// React-specific types
export interface BeaverProviderProps {
  children: ReactNode;
  surface: Surface;
  config: BeaverClientConfig;
}

export interface BeaverContextValue {
  client: BeaverClient | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
}
