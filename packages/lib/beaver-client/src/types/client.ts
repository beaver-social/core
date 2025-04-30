import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { Contracts } from "contracts";
import { hc } from "hono/client";
import { BeaverConnectionMethods } from "./wallet";
import {
  WalletWithRequiredFeatures,
  WalletAccount,
} from "@mysten/wallet-standard";
import Logger from "../bindings/Logger";
import { SignatureWithBytes } from "@mysten/sui/cryptography";
import { Transaction } from "@mysten/sui/transactions";

export type BeaverClientConfig = {
  debug?: boolean;
  network?: Parameters<typeof getFullnodeUrl>[0];
  apiBaseUrl?: string;
};

export type ApiClient = ReturnType<typeof hc<typeof API>>;
// type Contracts = Awaited<
//   ReturnType<Awaited<ReturnType<ApiClient["contracts"]["$get"]>>["json"]>
// >;

export type Defaults = {
  logger: Logger;
  apiClient: ApiClient;
  suiClient: SuiClient;
  contracts: Contracts;
  connection: Connection | null;
  surface: Surface | null;
};

export type Connection = {
  method: BeaverConnectionMethods;
  wallet: WalletWithRequiredFeatures;
  account: WalletAccount;
  disconnect: () => Promise<void>;
};

export type Surface = {
  type: "wallet" | "zk";
  signPersonalMessage: (message: string) => Promise<SignatureWithBytes>;
  signTransaction: (tx: Transaction) => Promise<SignatureWithBytes>;
};
