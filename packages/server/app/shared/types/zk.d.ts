import { JwtPayload } from "jwt-decode";

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
  keypair: Ed25519Keypair;
  publicKey: string;
  maxEpoch: number;
  randomness: string;
  nonce: string;
}

// zkLoginService -zkLoginData
interface ZkLoginData {
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

// Stored zkLogin data in local storage
interface StoredZkLoginData {
  ephemeralKeyPairString: string;
  userAddress: string;
  jwt: string;
  decodedJwt: JwtPayload;
  partialZkLoginSignature: partialZkLoginSignature;
  userSalt: string;
}
