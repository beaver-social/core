import {
  getWallets,
  WalletWithRequiredFeatures,
  SuiSignTransactionFeature,
  SuiSignPersonalMessageFeature,
  StandardDisconnectFeature,
  WalletWithFeatures,
} from "@mysten/wallet-standard";
import { BeaverConnectionMethods, Defaults } from "../types/client";
import Logger from "./Logger";

export default class Connector {
  private defaults: Defaults;
  private logger: Logger;

  private connection: {
    method: BeaverConnectionMethods;
    wallet: WalletWithRequiredFeatures;
    address: string;
    disconnect: () => Promise<void>;
  } | null = null;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("Connector interface instantiated");
  }

  getWallets() {
    const availableWallets = getWallets().get();
    return availableWallets as WalletWithRequiredFeatures[];
  }

  async connect<T extends BeaverConnectionMethods>(
    method: T,
    ...args: T extends "wallet" ? [number] : []
  ) {
    if (this.connection != null) {
      this.logger.warn("Already connected to a wallet. Disconnect first.");
      return;
    }

    if (method === "wallet") {
      const [walletIndex] = args;
      const selectedWallet = getWallets().get()[walletIndex || 0];

      const wallet = selectedWallet as WalletWithRequiredFeatures &
        WalletWithFeatures<
          StandardDisconnectFeature &
            SuiSignTransactionFeature &
            SuiSignPersonalMessageFeature
        >;

      const response = await wallet.features["standard:connect"].connect();

      if (!response || !response.accounts || response.accounts.length === 0) {
        throw new Error("Failed to connect to wallet.");
      }

      this.connection = {
        method: "wallet",
        wallet: wallet,
        address: response.accounts[0].address,
        disconnect: wallet.features["standard:disconnect"].disconnect,
      };

      return response;
    } else {
    }
  }

  async disconnect() {
    if (this.connection) {
      const { disconnect } = this.connection;
      await disconnect();
      this.connection = null;
    } else {
      this.logger.warn("No active connection to disconnect from.");
    }
  }
}
