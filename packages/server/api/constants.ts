import { serverKeypair } from "./lib/sui/client";
import { bech32Decode, convertBits } from "./lib/utils/bech32";

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const KB = 1024;
export const MB = 1024 * KB;

export const JWTalgorithm = "HS512";
export const JWTexpiration = (7 * DAY) / 1000; // 7 days
const secret = serverKeypair.getSecretKey();
const { data } = bech32Decode(secret);
const privateKeyBytes = convertBits(data, 5, 8, false);
export const JWTPrivateKey = privateKeyBytes.toBase64();

export const MAX_POST_CONTENT_LENGTH = 512; // 10MB
