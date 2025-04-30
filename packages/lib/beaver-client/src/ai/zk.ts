import { User } from "../types/schema";

// zkLoginService - JwtPayload
interface JwtPayload {
  iss?: string;
  sub: string; // Subject ID
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

// zkLoginService - EphemeralKeyPair
interface EphemeralKeyPair {
  secretKey: string;
  maxEpoch: number;
  randomness: string;
  nonce: string;
}

// zkLoginService -zkLoginData
interface ZkLoginData {
  userId: number | null;
  ephemeralKeyPair: EphemeralKeyPair;
  jwt: string;
  decodedJwt: JwtPayload;
  userSalt: bigint;
  userAddress: string;
  partialZkLoginSignature: partialZkLoginSignature;
  zkLoginSignature?: string;
}

// partialZkLoginSignature
interface partialZkLoginSignature {
  proofPoints: {
    a: string[];
    b: string[][];
    c: string[];
  };
  issBase64Details: {
    value: string;
    indexMod4: number;
  };
  headerBase64: string;
  addressSeed: string;
}

interface StoredZkLoginData {
  userId: number | null;
  ephemeralKeyPair: EphemeralKeyPair;
  userAddress: string;
  jwt: string;
  partialZkLoginSignature: partialZkLoginSignature;
  userSalt: string;
}

export type {
  EphemeralKeyPair,
  JwtPayload,
  partialZkLoginSignature,
  ZkLoginData,
  StoredZkLoginData,
};
