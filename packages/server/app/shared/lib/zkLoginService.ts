import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import {
  generateNonce,
  generateRandomness,
  genAddressSeed,
  getZkLoginSignature,
  jwtToAddress,
  getExtendedEphemeralPublicKey,
} from "@mysten/sui/zklogin";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import * as jwtDecode from "jwt-decode";
import apiClient from "@/shared/lib/apiClient";
import {
  JwtPayload,
  StoredZkLoginData,
  EphemeralKeyPair,
  ZkLoginData,
} from "../types/zk";
import {
  verifyPersonalMessageSignature,
  verifyTransactionSignature,
} from "@mysten/sui/verify";
import { SuiGraphQLClient } from "@mysten/sui/graphql";

type PartialZkLoginSignature = Omit<
  Parameters<typeof getZkLoginSignature>["0"]["inputs"],
  "addressSeed"
>;

class zkLoginService {
  private client: SuiClient;
  private GOOGLE_CLIENT_ID: string;
  private REDIRECT_URL: string;
  private ZK_PROVING_SERVICE_URL: string;

  constructor() {
    this.GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
    this.REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL || "";
    this.ZK_PROVING_SERVICE_URL =
      import.meta.env.VITE_ZK_PROVING_SERVICE_URL || "";
    this.client = new SuiClient({
      url: getFullnodeUrl(
        import.meta.env.VITE_SUI_NETWORK as
          | "localnet"
          | "testnet"
          | "mainnet"
          | "devnet"
      ),
    });
  }

  /**
   * Step 1: Generate ephemeral key pair
   * Creates a new ephemeral key pair for the zkLogin flow
   */
  async generateEphemeralKeyPair(): Promise<EphemeralKeyPair> {
    const { epoch } = await this.client.getLatestSuiSystemState();

    const maxEpoch = Number(epoch) + 2; // Active for 2 epochs
    const ephemeralKeyPair = new Ed25519Keypair();
    const secretKey = ephemeralKeyPair.getSecretKey();
    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    return {
      secretKey,
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
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.GOOGLE_CLIENT_ID}&response_type=id_token&redirect_uri=${this.REDIRECT_URL}&scope=openid&nonce=${ephemeralData.nonce}`;

    console.log("oauth url", url);

    return url;
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

  async getUserSalt(jwt: JwtPayload): Promise<bigint> {
    try {
      const response = await apiClient.auth.zk["salt"].$post({
        json: { jwt },
      });
      const data = await response.json();
      return BigInt(data.salt.integer);
    } catch (error) {
      console.error("Error getting user salt:", error);
      throw new Error("Failed to get user salt");
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
      const keyPair = Ed25519Keypair.fromSecretKey(ephemeralKeyPair.secretKey);

      const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
        keyPair.getPublicKey()
      );

      // Prepare data for the ZK proving request
      const zkpRequestPayload = {
        jwt,
        extendedEphemeralPublicKey,
        maxEpoch: ephemeralKeyPair.maxEpoch,
        jwtRandomness: ephemeralKeyPair.randomness,
        salt: userSalt.toString(),
        keyClaimName: "sub",
      };

      // Using fetch instead of axios
      const response = await fetch(this.ZK_PROVING_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ENOKI_API_KEY}`,
        },
        body: JSON.stringify(zkpRequestPayload),
      });

      const proofResponse = await response.json();
      const partialZkLoginSignature = proofResponse as PartialZkLoginSignature;

      return partialZkLoginSignature;
    } catch (error) {
      console.error("Error getting ZK proof:", error);
      throw new Error("Failed to obtain ZK proof");
    }
  }

  /**
   * Complete zkLogin flow
   * Executes all steps of the zkLogin flow
   */
  async completeZkLoginFlow(
    ephemeralKeyPair: EphemeralKeyPair,
    redirectUrl: string
  ): Promise<ZkLoginData> {
    // Deserialize the ephemeral key pair
    const { jwt, decodedJwt } = this.extractAndDecodeJwt(redirectUrl);

    const userSalt = await this.getUserSalt(decodedJwt);

    // Generate user's Sui address
    const userAddress = this.computeZkLoginAddress(userSalt, jwt);

    // Step 6: Get zero-knowledge proof
    const partialZkLoginSignature = await this.getZkProof(
      jwt,
      ephemeralKeyPair,
      userSalt
    );

    // Return all the zkLogin data
    return {
      ephemeralKeyPair,
      jwt,
      decodedJwt,
      userSalt,
      userAddress,
      partialZkLoginSignature,
    };
  }

  // Create a zkLogin signature that can be used to submit personal messages
  async zkSignPersonalMessage(
    zkLoginData: StoredZkLoginData,
    message: string
  ): Promise<{ zkLoginSignature: string }> {
    const ephemeralKeyPair = zkLoginData.ephemeralKeyPair;
    const aud = zkLoginData.decodedJwt.aud;
    const audienceString = Array.isArray(aud) ? aud[0] : (aud as string);
    const subString = zkLoginData.decodedJwt.sub as string;

    const addressSeed = genAddressSeed(
      BigInt(zkLoginData.userSalt),
      "sub",
      subString,
      audienceString
    ).toString();

    // convert string to Uint8Array
    const messageBytes = new TextEncoder().encode(message);

    // get keypair from secret key
    const keypair = Ed25519Keypair.fromSecretKey(ephemeralKeyPair.secretKey);

    // Sign the transaction with the ephemeral key
    const { signature: userSignature } = await keypair.signPersonalMessage(
      messageBytes
    );

    // Create the zkLogin signature
    const zkLoginSignature = getZkLoginSignature({
      inputs: {
        ...zkLoginData.partialZkLoginSignature,
        addressSeed,
      },
      maxEpoch: ephemeralKeyPair.maxEpoch,
      userSignature,
    });

    // const publicKey = await verifyPersonalMessageSignature(
    //   messageBytes,
    //   zkLoginSignature,
    //   {
    //     client: new SuiGraphQLClient({
    //       url: "https://sui-devnet.mystenlabs.com/graphql",
    //     }),
    //   }
    // );

    // const verified = publicKey.toSuiAddress() === zkLoginData.userAddress;

    return { zkLoginSignature };
  }

  // Create a zkLogin signature that can be used to submit transactions
  async zkSignTransaction(
    zkLoginData: StoredZkLoginData,
    tx: Transaction
  ): Promise<{ zkLoginSignature: string; txBytes: Uint8Array }> {
    const ephemeralKeyPair = zkLoginData.ephemeralKeyPair;

    // get keypair from secret key
    const keypair = Ed25519Keypair.fromSecretKey(ephemeralKeyPair.secretKey);

    // Build & Sign the transaction
    tx.setSender(zkLoginData.userAddress);
    const txBytes = await tx.build({ client: this.client });
    const userSignature = (await keypair.signTransaction(txBytes)).signature;

    // Generate ZKLogin signature
    const aud = zkLoginData.decodedJwt.aud;
    const subString = zkLoginData.decodedJwt.sub as string;
    const audienceString = Array.isArray(aud) ? aud[0] : (aud as string);

    const addressSeed = genAddressSeed(
      BigInt(zkLoginData.userSalt),
      "sub",
      subString,
      audienceString
    ).toString();

    const zkLoginSignature = getZkLoginSignature({
      inputs: {
        ...zkLoginData.partialZkLoginSignature,
        addressSeed,
      },
      maxEpoch: ephemeralKeyPair.maxEpoch,
      userSignature,
    });

    // const publicKey = await verifyTransactionSignature(
    //   txBytes,
    //   zkLoginSignature,
    //   {
    //     client: new SuiGraphQLClient({
    //       url: "https://sui-devnet.mystenlabs.com/graphql",
    //     }),
    //   }
    // );

    // const verified = publicKey.toSuiAddress() === zkLoginData.userAddress;

    return {
      zkLoginSignature,
      txBytes,
    };
  }

  // Execute a transaction with zkLogin
  async executeTransactionWithZkLogin(
    zkLoginData: StoredZkLoginData,
    tx: Transaction
  ): Promise<{ success: boolean; digest?: string; error?: string }> {
    try {
      const { txBytes, zkLoginSignature } = await this.zkSignTransaction(
        zkLoginData,
        tx
      );

      // Execute the transaction
      const result = await this.client.executeTransactionBlock({
        transactionBlock: txBytes,
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
        digest: undefined,
        error: error.message,
      };
    }
  }
}

export default new zkLoginService();
