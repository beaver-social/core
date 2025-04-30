import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { Contracts } from "contracts";
import { hc } from "hono/client";
import { SignatureWithBytes } from "@mysten/sui/cryptography";
import { Transaction } from "@mysten/sui/transactions";

export type BeaverClientConfig = {
  debug?: boolean;
  network?: Parameters<typeof getFullnodeUrl>[0];
  apiBaseUrl?: string;
};

type ApiClient = ReturnType<typeof hc<typeof API>>;
// type Contracts = Awaited<
//   ReturnType<Awaited<ReturnType<ApiClient["contracts"]["$get"]>>["json"]>
// >;

export type Defaults = {
  apiClient: ApiClient;
  suiClient: SuiClient;
  contracts: Contracts;
  surface: Surface;
};

export type Surface = {
  signPersonalMessage: (message: string) => Promise<SignatureWithBytes>;
  signTransaction: (tx: Transaction) => Promise<SignatureWithBytes>;
};

export type BeaverConnectionMethods = "wallet" | "x" | "google";
