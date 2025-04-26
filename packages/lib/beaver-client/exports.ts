import { BeaverClient } from "./src";
import type { BeaverClientConfig, Surface } from "./src";
import {
  EphemeralKeyPair,
  JwtPayload,
  partialZkLoginSignature,
  ZkLoginData,
  StoredZkLoginData,
} from "./src/types/zk";

export { BeaverClient, BeaverClientConfig, Surface };

export type {
  EphemeralKeyPair,
  JwtPayload,
  partialZkLoginSignature,
  ZkLoginData,
  StoredZkLoginData,
};
