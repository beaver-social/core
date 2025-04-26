import useBeaverClient from "./useClient";
import { useZkAuthStore } from "../store/zk";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";

interface IAuthHook {
  zkLogin: () => Promise<void>;
  zkLoginCallback: (options: { redirectPath: string }) => Promise<void>;
  walletLogin: (variables: any, options: any) => Promise<void>;
  logout: (
    type: "wallet" | "social",
    variables?: any,
    options?: any
  ) => Promise<void>;
}

export default function useAuth(): IAuthHook {
  const client = useBeaverClient();
  const zkAuthStore = useZkAuthStore();
  const { mutate: connectWallet } = useConnectWallet();
  const { mutateAsync: disconnectWallet } = useDisconnectWallet();
  const currentAccount = useCurrentAccount();

  async function zkLogin() {
    // Generate ephemeral keypair
    const ephemeralKeyPair = await client.zk.generateEphemeralKeyPair();

    // Store only the necessary data in session storage
    sessionStorage.setItem(
      "zkLoginEphemeralKeyPair",
      JSON.stringify(ephemeralKeyPair)
    );

    // Generate OAuth URL and redirect
    const oauthUrl = client.zk.generateGoogleOAuthUrl(ephemeralKeyPair);
    window.location.href = oauthUrl;
  }

  async function zkLoginCallback(options: { redirectPath: string }) {
    const storedKeyPair = sessionStorage.getItem("zkLoginEphemeralKeyPair");

    if (!storedKeyPair) {
      throw new Error(
        "No ephemeral keypair found in session. Please try again."
      );
    }

    const ephemeralKeyPair = JSON.parse(storedKeyPair);

    // Complete the zkLogin flow
    const zkLoginData = await client.zk.completeZkLoginFlow(
      ephemeralKeyPair,
      window.location.href
    );

    zkAuthStore.setZkLoginData({
      jwt: zkLoginData.jwt,
      decodedJwt: zkLoginData.decodedJwt,
      userAddress: zkLoginData.userAddress,
      userSalt: zkLoginData.userSalt.toString(),
      ephemeralKeyPair: ephemeralKeyPair,
      partialZkLoginSignature: zkLoginData.partialZkLoginSignature,
    });

    sessionStorage.removeItem("zkLoginEphemeralKeyPair");
    window.location.href = options.redirectPath;
  }

  async function walletLogin(
    variables: Parameters<typeof connectWallet>[0],
    options: Parameters<typeof connectWallet>[1]
  ) {
    connectWallet(variables, options);
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
    zkLogin,
    zkLoginCallback,
    walletLogin,
    logout,
  };
}
