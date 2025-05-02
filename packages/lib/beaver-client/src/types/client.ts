import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { Contracts } from "contracts";
import { hc } from "hono/client";
import Logger from "../bindings/Logger";
import { BeaverStore } from "../store";
import { Transaction } from "@mysten/sui/transactions";
import { SignatureWithBytes } from "@mysten/sui/cryptography";
import ApiClient from "../bindings/ApiClient";
import EventNotifier from "../bindings/EventHandler";

export type BeaverClientConfig = {
  debug?: boolean;
  network?: Parameters<typeof getFullnodeUrl>[0];
  apiBaseUrl?: string;
  zkLoginWallets?: {
    enabled?: boolean;
    windowFeatures?: string | (() => string);
  };
};

export type Api = ReturnType<typeof hc<typeof API>>;

export type Defaults = {
  logger: Logger;
  apiClient: ApiClient;
  suiClient: SuiClient;
  contracts: Contracts;
  store: BeaverStore;
  events: EventNotifier;
};

export type Surface = {
  signPersonalMessage: (message: string) => Promise<SignatureWithBytes>;

  signTransaction: (tx: Transaction) => Promise<SignatureWithBytes>;
};
