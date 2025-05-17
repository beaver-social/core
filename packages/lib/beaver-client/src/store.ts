import { UserInfo } from "./types/api";
import { BeaverProvidedWallet, Connection } from "./types/wallet";
import { Transaction } from "@mysten/sui/transactions";
import { safeParseResponse } from "./utils/apiClient";
import ApiClient from "./bindings/ApiClient";

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
  private _actionPointer: string = "GENESIS";
  private _connection: Connection | null = null;

  apiClient: ApiClient;

  constructor(options: { apiClient: ApiClient }) {
    this.apiClient = options.apiClient;
  }

  get actionPointer() {
    const pointer = this._actionPointer;
    if (!pointer) {
      this.syncUserAndActionPointer();
      return "GENESIS";
    }
    return pointer;
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

  async setJwt(jwt: string | null) {
    this.apiClient.setJwt(jwt);

    if (jwt) {
      this.persistent.set("beaver-jwt", jwt);
    } else {
      this.persistent.delete("beaver-jwt");
    }

    const valid = await this.syncUserAndActionPointer();
    if (!valid) {
      this.user = null;
      this.persistent.delete("beaver-jwt");
    }
    return valid;
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

  async syncUserAndActionPointer() {
    if (!this.apiClient.jwtExists) return false;

    const user = await safeParseResponse(this.apiClient.rpc.users.$get());

    if (!user) {
      this.setJwt(null);
      return false;
    }
    this.user = user;

    if (!this.isAuthenticated()) return false;
    const { nonce } = await safeParseResponse(
      this.apiClient.rpc.users.nonce.$get()
    );

    this._actionPointer = nonce;
    return true;
  }
}

type PersistentStorageKeys = "beaver-jwt" | "beaver-wallet-connection";
