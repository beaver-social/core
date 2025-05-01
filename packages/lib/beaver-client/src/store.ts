import { UserInfo } from "./types/api";
import { ApiClient, Defaults, Surface } from "./types/client";
import { BeaverProvidedWallet, Connection } from "./types/wallet";
import { Transaction } from "@mysten/sui/transactions";
import { safeParseResponse } from "./utils/apiClient";

export class BeaverStore {
  persistent: {
    get: (key: PersistentStorageKeys) => string | null;
    set: (key: PersistentStorageKeys, value: string) => void;
    delete: (key: PersistentStorageKeys) => void;
  } = {
    get: window.localStorage.getItem.bind(window.localStorage),
    set: window.localStorage.setItem.bind(window.localStorage),
    delete: window.localStorage.removeItem.bind(window.localStorage),
  };

  user: UserInfo | null = null;
  actionPointer: string;
  private _connection: Connection | null = null;

  apiClient: ApiClient;
  onLogin = (authToken: string | null) => {};
  onLogout = () => {};

  constructor(options: { apiClient: ApiClient }) {
    this.apiClient = options.apiClient;
    this.actionPointer = "GENESIS";
  }

  get connection() {
    return this._connection;
  }

  get address() {
    if (!this._connection) {
      return null;
    }
    const { account } = this._connection;
    return account.address;
  }

  isConnected(): this is this & { connection: Connection } {
    return this.connection !== null;
  }

  isAuthenticated(): this is this & { user: UserInfo; connection: Connection } {
    return this.isConnected() && this.user !== null;
  }

  set wallet(wallet: BeaverProvidedWallet | null) {
    if (!wallet) {
      this._connection = null;
      return;
    }
    const account = wallet?.accounts[0];
    this._connection = {
      wallet: wallet,
      account: account,
    };
  }

  set authToken(token: string | null) {
    if (!token) {
      this.persistent.delete("beaver-jwt");
      this.user = null;
      this.onLogout();
    } else {
      if (!this.isConnected()) this.authToken = null;

      this.persistent.set("beaver-jwt", token);

      this.apiClient.users.$get().then((raw) => {
        (async () => {
          const response = await raw.json();
          if (!response.success) {
            this.authToken = null;
            return;
          }

          this.user = response.data;
          await this.syncActionPointer();
          this.onLogin(this.authToken);
        })();
      });
    }
  }

  get features() {
    if (!this.connection) {
      return null;
    }

    const { wallet, account } = this.connection;

    return {
      signPersonalMessage: async (message: string) => {
        const messageBytes = new TextEncoder().encode(message);
        const response = await wallet.features[
          "sui:signPersonalMessage"
        ].signPersonalMessage({
          account,
          message: messageBytes,
          chain: "sui:testnet",
        });

        return response;
      },

      signTransaction: (tx: Transaction) => {
        const response = wallet.features["sui:signTransaction"].signTransaction(
          {
            account,
            transaction: tx,
            chain: "sui:testnet",
          }
        );

        return response;
      },
    };
  }

  async syncActionPointer() {
    if (!this.isAuthenticated()) return;
    const { nonce } = await safeParseResponse(
      this.apiClient.users.nonce.$get()
    );

    this.actionPointer = nonce;
  }
}

type PersistentStorageKeys = "beaver-jwt" | "beaver-wallet-connection";
