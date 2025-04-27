import useBeaverClient from "./useClient";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { tryCatch } from "../lib/tryCatch";
import { useZkAuthStore } from "../store/zk";
import { StoredZkLoginData } from "@beaver/client";
import { useState } from "react";
import type { User } from "@beaver/client";

interface IAuthHook {
  user: User | null;
  zkLoginData: StoredZkLoginData | null;
  getUser: () => Promise<any>;
  zkLogin: () => Promise<any>;
  zkLoginCallback: (options: { redirectPath: string }) => Promise<any>;
  walletLogin: (variables: any, options?: any) => Promise<any>;
  logout: (
    type: "wallet" | "social",
    variables?: any,
    options?: any
  ) => Promise<any>;
  getChallenge: (address: string) => Promise<any>;
  verifyChallenge: (
    address: string,
    message: string,
    signature: string
  ) => Promise<any>;
}

export default function useAuth(): IAuthHook {
  const client = useBeaverClient();
  const zkAuthStore = useZkAuthStore();
  const { mutate: connectWallet } = useConnectWallet();
  const { mutateAsync: disconnectWallet } = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  async function getUser() {
    const result = await tryCatch(client.user.getCurrentUser());

    if (result.error) {
      throw result.error;
    }

    setUser(result.data as any);
  }

  async function zkLogin() {
    // Generate ephemeral keypair
    const result = await tryCatch(client.zk.generateEphemeralKeyPair());

    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    const ephemeralKeyPair = result.data;

    // Store only the necessary data in session storage
    sessionStorage.setItem(
      "zkLoginEphemeralKeyPair",
      JSON.stringify(ephemeralKeyPair)
    );

    // Generate OAuth URL and redirect
    const oauthUrl = client.zk.generateGoogleOAuthUrl(ephemeralKeyPair);
    window.location.href = oauthUrl;

    return {
      success: true,
      error: null,
    };
  }

  async function zkLoginCallback(options: { redirectPath: string }) {
    try {
      const storedKeyPair = sessionStorage.getItem("zkLoginEphemeralKeyPair");

      if (!storedKeyPair) {
        throw new Error(
          "No ephemeral keypair found in session. Please try again."
        );
      }

      const ephemeralKeyPair = JSON.parse(storedKeyPair);

      // Complete the zkLogin flow
      const result = await client.zk.completeZkLoginFlow(
        ephemeralKeyPair,
        window.location.href
      );

      if (result.error || !result.data) {
        throw result.error;
      }

      const zkLoginData = result.data;

      zkAuthStore.setZkLoginData({
        userId: zkLoginData.userId,
        jwt: zkLoginData.jwt,
        userAddress: zkLoginData.userAddress,
        userSalt: zkLoginData.userSalt.toString(),
        ephemeralKeyPair: ephemeralKeyPair,
        partialZkLoginSignature: zkLoginData.partialZkLoginSignature,
      });

      sessionStorage.removeItem("zkLoginEphemeralKeyPair");
      window.location.href = options.redirectPath;
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  async function walletLogin(
    variables: Parameters<typeof connectWallet>[0],
    options?: Parameters<typeof connectWallet>[1]
  ) {
    connectWallet(variables, options);
  }

  async function getChallenge(address: string) {
    const result = await tryCatch(client.auth.getChallenge(address));

    if (result.error) {
      throw result.error;
    }

    return result.data;
  }

  async function verifyChallenge(
    address: string,
    message: string,
    signature: string
  ) {
    const result = await tryCatch(
      client.auth.verifyChallenge(address, message, signature)
    );

    if (result.error) {
      throw result.error;
    }

    return result.data;
  }

  async function logout(
    type: "wallet" | "social",
    variables?: Parameters<typeof disconnectWallet>[0],
    options?: Parameters<typeof disconnectWallet>[1]
  ) {
    // Disconnect wallet
    if (type === "wallet" && currentAccount?.address) {
      disconnectWallet(variables, options);
      window.location.reload();
    } else if (type === "social") {
      if (localStorage.getItem("zk-auth-store")) {
        localStorage.removeItem("zk-auth-store");
      }
      window.location.reload();
    } else {
      throw new Error("Invalid logout type");
    }
  }

  return {
    user,
    zkLoginData: zkAuthStore.zkLoginData,
    getUser,
    zkLogin,
    zkLoginCallback,
    walletLogin,
    logout,
    getChallenge,
    verifyChallenge,
  };
}
