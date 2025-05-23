import {
  getWallets,
  WalletWithRequiredFeatures,
} from "@mysten/wallet-standard";
import { Defaults } from "../types/client";
import Logger from "./Logger";
import { getWalletUniqueIdentifier } from "../utils/wallet";
import { z } from "zod";
import { BeaverProvidedWallet } from "../types/wallet";
import { registerEnokiWallets } from "@mysten/enoki";
import { BeaverStore } from "../store";
import { normalizeSuiAddress } from "@mysten/sui/utils";
import stringify from "fast-json-stable-stringify";
import { safeParseResponse } from "../utils/apiClient";
import { tryCatch } from "../utils/tryCatch";

const zStoredConnection = () =>
  z.object({
    walletName: z.string(),
    address: z.string(),
  });
type StoredConnection = z.infer<ReturnType<typeof zStoredConnection>>;

const STORAGE_KEY = "beaver-wallet-connection";

export default class Connector {
  private defaults: Defaults;
  private logger: Logger;
  private store: BeaverStore;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;
    this.store = defaults.store;

    this.logger.info("Connector interface instantiated");
  }

  async enableZkLoginWallets(
    options?: Pick<
      Parameters<typeof registerEnokiWallets>[0],
      "windowFeatures"
    >,
  ) {
    const serverStats = await this.defaults.apiClient.rpc.stats.$get();
    const stats = await serverStats.json();

    return registerEnokiWallets({
      client: this.defaults.suiClient,
      network: "testnet",
      ...stats.enokiConfig,
      ...options,
    });
  }

  getWallets() {
    const availableWallets = getWallets().get();
    return availableWallets as WalletWithRequiredFeatures[];
  }

  get isConnected() {
    return this.store.isConnected();
  }

  get address() {
    const { address } = this.store;
    if (!address) {
      return null;
    }
    return normalizeSuiAddress(address);
  }

  async connect(walletIndex: number) {
    if (this.isConnected) {
      this.logger.warn("Already connected to a wallet. Disconnect first.");
      return;
    }

    const selectedWallet = getWallets().get()[walletIndex];

    const wallet = selectedWallet as BeaverProvidedWallet;

    const response = await wallet.features["standard:connect"].connect();

    if (!response || !response.accounts || response.accounts.length === 0) {
      throw new Error("Failed to connect to wallet.");
    }

    const account = response.accounts[0];

    this.store.wallet = wallet;

    this.saveConnection({
      walletName: getWalletUniqueIdentifier(wallet),
      address: account.address,
    });

    await this.tryRestoreConnection();

    return response;
  }

  async disconnect() {
    if (this.store.isConnected()) {
      const { wallet } = this.store.connection;

      wallet.features["standard:disconnect"].disconnect();
      this.store.wallet = null;

      this.store.persistent.delete(STORAGE_KEY);
      this.logger.info("Disconnected and cleared stored connection.");

      this.store.setJwt(null);
      this.defaults.events.emit("connection:disconnect", {});
    } else {
      this.logger.warn("No active connection to disconnect from.");
    }
  }

  private saveConnection(data: StoredConnection) {
    this.store.persistent.set(STORAGE_KEY, stringify(data));
  }

  async tryRestoreConnection() {
    const raw = this.store.persistent.get(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = zStoredConnection().parse(JSON.parse(raw));
      const wallet = this.getWallets().find(
        (w) => getWalletUniqueIdentifier(w) === parsed.walletName,
      ) as BeaverProvidedWallet;

      if (!wallet) {
        this.logger.warn("Stored wallet not found in available wallets.");
        this.disconnect();
        return;
      }

      await wallet.features["standard:connect"].connect();

      const account = wallet.accounts.find(
        (acc) => acc.address === parsed.address,
      );

      if (!account) {
        this.logger.warn("Stored account not found in available accounts.");

        this.disconnect();
        return;
      }

      this.store.wallet = wallet;

      this.logger.info(`Restored connection with ${parsed.walletName}`);

      if (this.store.isConnected()) {
        const userInfo = await tryCatch(
          safeParseResponse(
            this.defaults.apiClient.rpc.users.find.$get({
              query: {
                type: "address",
                value: this.store.connection.account.address,
              },
            }),
          ),
        );
        this.defaults.events.emit("connection:change", {
          connection: this.store.connection,
          hasIdentity: !!userInfo.data?.id,
        });
      } else {
        this.disconnect();
        this.logger.warn("Failed to restore connection.");
      }
    } catch (err) {
      this.logger.error("Failed to restore wallet connection:", err);
      this.disconnect();
    }
  }
}
