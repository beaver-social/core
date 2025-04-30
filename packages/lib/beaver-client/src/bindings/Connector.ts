import {
  getWallets,
  WalletWithRequiredFeatures,
  WalletAccount,
} from "@mysten/wallet-standard";
import { Connection, Defaults } from "../types/client";
import Logger from "./Logger";
import {
  getWalletUniqueIdentifier,
  zBeaverConnectionMethods,
} from "../utils/wallet"; // You may need to adapt this
import { z } from "zod";
import { BeaverConnectionMethods, BeaverProvidedWallet } from "../types/wallet";

const zStoredConnection = () =>
  z.object({
    method: zBeaverConnectionMethods(),
    walletName: z.string(),
    address: z.string(),
  });
type StoredConnection = z.infer<ReturnType<typeof zStoredConnection>>;

const STORAGE_KEY = "beaver-wallet-connection";

export default class Connector {
  private defaults: Defaults;
  private logger: Logger;

  onConnected: (connection: Connection) => void = () => {};
  onDisconnected: () => void = () => {};

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;
    this.connection = defaults.connection;

    this.logger.info("Connector interface instantiated");

    this.tryRestoreConnection();
  }

  get connection() {
    return this.defaults.connection;
  }
  set connection(conn: Connection | null) {
    this.defaults.connection = conn;
  }

  getWallets() {
    const availableWallets = getWallets().get();
    return availableWallets as WalletWithRequiredFeatures[];
  }

  get isConnected() {
    return this.connection != null;
  }

  get address() {
    if (this.connection) {
      return this.connection.account.address;
    } else {
      this.logger.warn("No active connection to retrieve address from.");
      return null;
    }
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

      const wallet = selectedWallet as BeaverProvidedWallet;

      const response = await wallet.features["standard:connect"].connect();

      if (!response || !response.accounts || response.accounts.length === 0) {
        throw new Error("Failed to connect to wallet.");
      }

      const account = response.accounts[0];

      this.connection = {
        method: "wallet",
        wallet,
        account,
        disconnect: wallet.features["standard:disconnect"].disconnect,
      };

      this.saveConnection({
        method: "wallet",
        walletName: getWalletUniqueIdentifier(wallet),
        address: account.address,
      });

      await this.tryRestoreConnection();

      return response;
    }
  }

  async disconnect() {
    if (this.connection) {
      const { disconnect } = this.connection;
      await disconnect();

      this.connection = null;

      localStorage.removeItem(STORAGE_KEY);
      this.logger.info("Disconnected and cleared stored connection.");

      this.onDisconnected();
    } else {
      this.logger.warn("No active connection to disconnect from.");
    }
  }

  private saveConnection(data: StoredConnection) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private async tryRestoreConnection() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = zStoredConnection().parse(JSON.parse(raw));
      const wallet = this.getWallets().find(
        (w) => getWalletUniqueIdentifier(w) === parsed.walletName
      ) as BeaverProvidedWallet;

      if (!wallet) {
        this.logger.warn("Stored wallet not found in available wallets.");
        this.disconnect();
        return;
      }

      await wallet.features["standard:connect"].connect();

      const account = wallet.accounts.find(
        (acc) => acc.address === parsed.address
      );

      if (!account) {
        this.logger.warn("Stored account not found in available accounts.");

        this.disconnect();
        return;
      }

      this.connection = {
        method: parsed.method,
        wallet,
        account,
        disconnect: wallet.features["standard:disconnect"].disconnect,
      };

      this.logger.info(`Restored connection with ${parsed.walletName}`);
      this.onConnected(this.connection);

      this.defaults.surface = {
        type: parsed.method === "wallet" ? "wallet" : "zk",

        signPersonalMessage: async (message) => {
          const messageBytes = new TextEncoder().encode(message);
          const response = await wallet.features[
            "sui:signPersonalMessage"
          ].signPersonalMessage({
            account,
            message: messageBytes,
          });

          return response;
        },

        signTransaction: (tx) => {
          const response = wallet.features[
            "sui:signTransaction"
          ].signTransaction({
            account,
            transaction: tx,
            chain: "sui:testnet",
          });

          return response;
        },
      };
    } catch (err) {
      this.logger.error("Failed to restore wallet connection:", err);
      this.disconnect();
    }
  }
}
