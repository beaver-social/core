import { getFullnodeUrl } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { Contracts } from "contracts";
import { hc } from "hono/client";
import type { S3Client } from "@aws-sdk/client-s3";

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
  s3Client: S3Client;
  surface: Surface;
  contracts: Contracts | null;
};

export type Surface = {
  sign: Ed25519Keypair["sign"];
  signPersonalMessage: Ed25519Keypair["signPersonalMessage"];
  signTransaction: Ed25519Keypair["signTransaction"];
  signWithIntent: Ed25519Keypair["signWithIntent"];
};
