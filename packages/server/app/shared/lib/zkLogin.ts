import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import {
  generateNonce,
  generateRandomness,
  genAddressSeed,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/sui/zklogin";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import * as jwtDecode from "jwt-decode";

// Define an interface for JWT payload
export interface JwtPayload {
  iss?: string;
  sub?: string; // Subject ID
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

// Store ephemeral key data
export interface EphemeralKeyPair {
  keypair: Ed25519Keypair;
  publicKey: string;
  maxEpoch: number;
  randomness: string;
  nonce: string;
}

// Store zkLogin data
export interface ZkLoginData {
  ephemeralKeyPair: EphemeralKeyPair;
  jwt: string;
  decodedJwt: JwtPayload;
  userSalt: bigint;
  userAddress: string;
  zkProof: any;
  zkLoginSignature?: string;
}

export class zkLoginService {
  private client: SuiClient;
  private network: "localnet" | "testnet" | "mainnet";
  private GOOGLE_CLIENT_ID: string;
  private REDIRECT_URL: string;
  private SALT_SERVICE_URL: string;
  private ZK_PROVING_SERVICE_URL: string;

  constructor() {
    this.network =
      (process.env.REACT_APP_SUI_NETWORK as
        | "localnet"
        | "testnet"
        | "mainnet") || "testnet";
    this.GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    this.REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL || "";
    this.SALT_SERVICE_URL = process.env.REACT_APP_SALT_SERVICE_URL || "";
    this.ZK_PROVING_SERVICE_URL =
      process.env.REACT_APP_ZK_PROVING_SERVICE_URL ||
      "https://zklogin-dev-api.sui.io/v1";

    this.client = new SuiClient({ url: getFullnodeUrl(this.network) });
  }

  /**
   * Step 1: Generate ephemeral key pair
   * Creates a new ephemeral key pair for the zkLogin flow
   */
  async generateEphemeralKeyPair(): Promise<EphemeralKeyPair> {
    const { epoch } = await this.client.getLatestSuiSystemState();

    const maxEpoch = Number(epoch) + 2; // Active for 2 epochs
    const ephemeralKeyPair = new Ed25519Keypair();
    const publicKey = ephemeralKeyPair.getPublicKey().toBase64();
    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    return {
      keypair: ephemeralKeyPair,
      publicKey,
      maxEpoch,
      randomness,
      nonce,
    };
  }

  /**
   * Step 2: Generate OAuth URL for Google login
   * Creates the URL to redirect the user to Google OAuth
   */
  generateGoogleOAuthUrl(ephemeralData: EphemeralKeyPair): string {
    // For Google, we use id_token response type
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.GOOGLE_CLIENT_ID}&response_type=id_token&redirect_uri=${this.REDIRECT_URL}&scope=openid&nonce=${ephemeralData.nonce}`;
  }

  /**
   * Step 3: Extract and decode JWT
   * Extracts JWT from the redirect URL and decodes it
   */
  extractAndDecodeJwt(redirectUrl: string): {
    jwt: string;
    decodedJwt: JwtPayload;
  } {
    // For Google OAuth, the JWT is in the id_token parameter
    const url = new URL(redirectUrl);
    const params = new URLSearchParams(url.hash.substring(1));

    const jwt = params.get("id_token");
    if (!jwt) {
      throw new Error("No JWT found in redirect URL");
    }

    const decodedJwt = jwtDecode.jwtDecode(jwt) as JwtPayload;
    return { jwt, decodedJwt };
  }

  /**
   * Step 4: Get user salt
   * Fetches a unique salt for the user from salt service
   */
  async getUserSalt(sub: string): Promise<bigint> {
    try {
      // This is an example implementation - you should implement your own salt service
      const response = await fetch(this.SALT_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwt_token_sub: sub,
        }),
      });

      const data = await response.json();

      // Convert the returned salt to a BigInt
      return BigInt(data.salt);
    } catch (error) {
      // For testing or if no salt service available, generate a random one
      // In production, salt should be consistent for the same user
      console.warn(
        "Salt service unavailable, using random salt (NOT FOR PRODUCTION)"
      );
      return BigInt(Math.floor(Math.random() * 1000000000));
    }
  }

  /**
   * Step 5: Generate user's Sui address
   * Computes the zkLogin Sui address for the user
   */
  computeZkLoginAddress(salt: bigint, jwt: string): string {
    const decodedJwt = jwtDecode.jwtDecode(jwt) as JwtPayload;
    if (!decodedJwt.sub || !decodedJwt.aud) {
      throw new Error("JWT missing required fields");
    }

    const aud = decodedJwt.aud;
    const audienceString = Array.isArray(aud) ? aud[0] : (aud as string);

    // Generate the Sui address from JWT claims and salt
    // This follows the pattern in Sui documentation
    return jwtToAddress(jwt, salt, false);
  }

  /**
   * Step 6: Get zero-knowledge proof
   * Requests a ZK proof from the proving service
   */
  async getZkProof(
    jwt: string,
    ephemeralKeyPair: EphemeralKeyPair,
    userSalt: bigint
  ): Promise<any> {
    try {
      // Prepare data for the ZK proving request
      const zkpRequestPayload = {
        jwt,
        extendedEphemeralPublicKey: ephemeralKeyPair.keypair
          .getPublicKey()
          .toBase64(),
        maxEpoch: ephemeralKeyPair.maxEpoch,
        randomness: ephemeralKeyPair.randomness,
        salt: userSalt.toString(),
      };

      // Using fetch instead of axios
      const response = await fetch(this.ZK_PROVING_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zkpRequestPayload),
      });

      return await response.json();
    } catch (error) {
      console.error("Error getting ZK proof:", error);
      throw new Error("Failed to obtain ZK proof");
    }
  }

  /**
   * Step 7: Assemble zkLogin signature for transaction
   * Creates a zkLogin signature that can be used to submit transactions
   */
  async createZkLoginSignature(
    zkLoginData: ZkLoginData,
    transactionBlock: Uint8Array
  ): Promise<string> {
    // Generate address seed from salt, sub, and aud
    const aud = zkLoginData.decodedJwt.aud;
    // Handle the case where aud is an array by using the first element
    const audienceString = Array.isArray(aud) ? aud[0] : (aud as string);

    const addressSeed = genAddressSeed(
      zkLoginData.userSalt,
      "sub",
      zkLoginData.decodedJwt.sub as string,
      audienceString
    ).toString();

    // Sign the transaction with the ephemeral key
    const userSignature =
      await zkLoginData.ephemeralKeyPair.keypair.signPersonalMessage(
        transactionBlock
      );

    // Create the zkLogin signature
    const zkLoginSignature = getZkLoginSignature({
      inputs: {
        ...zkLoginData.zkProof,
        addressSeed,
      },
      maxEpoch: zkLoginData.ephemeralKeyPair.maxEpoch,
      userSignature: userSignature.signature,
    });

    return zkLoginSignature;
  }

  /**
   * Complete zkLogin flow
   * Executes all steps of the zkLogin flow
   */
  async completeZkLoginFlow(redirectUrl: string): Promise<ZkLoginData> {
    // Step 1: Generate ephemeral key pair
    const ephemeralKeyPair = await this.generateEphemeralKeyPair();

    // Step 3: Extract and decode JWT (assuming step 2, user login, was done externally)
    const { jwt, decodedJwt } = this.extractAndDecodeJwt(redirectUrl);

    // Step 4: Get user salt
    const userSalt = await this.getUserSalt(decodedJwt.sub as string);

    // Step 5: Generate user's Sui address
    const userAddress = this.computeZkLoginAddress(userSalt, jwt);

    // Step 6: Get zero-knowledge proof
    const zkProof = await this.getZkProof(jwt, ephemeralKeyPair, userSalt);

    // Return all the zkLogin data
    return {
      ephemeralKeyPair,
      jwt,
      decodedJwt,
      userSalt,
      userAddress,
      zkProof,
    };
  }

  /**
   * Create and execute a transaction with zkLogin
   */
  async executeTransactionWithZkLogin(
    zkLoginData: ZkLoginData,
    buildTransaction: (txb: Transaction) => Transaction
  ): Promise<{ success: boolean; digest?: string; error?: string }> {
    try {
      // Create a new transaction
      const txb = new Transaction();
      txb.setSender(zkLoginData.userAddress);

      // Let the caller build the transaction
      buildTransaction(txb);

      // Sign transaction with ephemeral key
      const { bytes, signature: userSignature } = await txb.sign({
        client: this.client,
        signer: zkLoginData.ephemeralKeyPair.keypair,
      });

      // Generate address seed
      const aud = zkLoginData.decodedJwt.aud;
      // Handle the case where aud is an array by using the first element
      const audienceString = Array.isArray(aud) ? aud[0] : (aud as string);

      const addressSeed = genAddressSeed(
        zkLoginData.userSalt,
        "sub",
        zkLoginData.decodedJwt.sub as string,
        audienceString
      ).toString();

      // Assemble zkLogin signature
      const zkLoginSignature = getZkLoginSignature({
        inputs: {
          ...zkLoginData.zkProof,
          addressSeed,
        },
        maxEpoch: zkLoginData.ephemeralKeyPair.maxEpoch,
        userSignature,
      });

      // Execute the transaction
      const result = await this.client.executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkLoginSignature,
      });

      return {
        success: true,
        digest: result.digest,
      };
    } catch (error: any) {
      console.error("Error executing transaction:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
