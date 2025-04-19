import { BeaverClient } from "@beaver/client";
import { ReactNode } from "react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl } from "@mysten/sui/client";

// Match the Surface type from beaver-client/src/types.ts
export type Surface = {
  sign: Ed25519Keypair["sign"];
  signPersonalMessage: Ed25519Keypair["signPersonalMessage"];
  signTransaction: Ed25519Keypair["signTransaction"];
  signWithIntent: Ed25519Keypair["signWithIntent"];
};

// Match the BeaverClientConfig type from beaver-client/src/types.ts
export type BeaverClientConfig = {
  debug?: boolean;
  network?: Parameters<typeof getFullnodeUrl>[0];
  apiBaseUrl?: string;
};

export interface BeaverProviderProps {
  children: ReactNode;
  surface: Surface;
  config: BeaverClientConfig;
}

export interface BeaverContextValue {
  client: BeaverClient | null;
  isInitialized: boolean;
  isInitializing: boolean;
  error: Error | null;
}
