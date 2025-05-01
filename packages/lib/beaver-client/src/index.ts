import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { hc } from "hono/client";
import { Contracts } from "contracts";
import { BeaverClientConfig, Defaults } from "./types/client";

import Logger from "./bindings/Logger";
import Connector from "./bindings/Connector";
import User from "./bindings/User";
import Posts from "./bindings/Posts";
import { BeaverStore } from "./store";

export class BeaverClient {
  config: BeaverClientConfig;
  defaults: Defaults;
  ready: boolean = false;
  onReady = () => {};
  logger: Logger;

  connector: Connector;
  user: User;
  posts: Posts;

  constructor(config: BeaverClientConfig) {
    const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
    const rpcUrl = getFullnodeUrl(config.network || "mainnet");
    const suiClient = new SuiClient({ url: rpcUrl });
    const apiUrl = config.apiBaseUrl || "https://api.beaversocial.com/api/v1";
    const apiClient = hc<typeof API>(apiUrl);

    const contracts = {} as any;
    const store = new BeaverStore({ apiClient });
    store.onLogin = (authToken) => {
      this.defaults.apiClient = hc<typeof API>(apiUrl, {
        headers: () => ({
          Authorization: authToken ? `Bearer ${authToken}` : "null",
        }),
      });
    };

    this.defaults = {
      logger,
      apiClient,
      suiClient,
      contracts,
      store,
    };

    this.config = config;
    this.logger = this.defaults.logger;

    this.connector = new Connector(this.defaults);
    this.user = new User(this.defaults);
    this.posts = new Posts(this.defaults);

    this.initialize();
  }

  public async initialize() {
    try {
      const contractsResponse = await this.defaults.apiClient.contracts.$get();

      const contracts = await contractsResponse.json();

      this.defaults.contracts = new Contracts(contracts.data);
    } catch {
      this.logger
        .error(`Unable to connect to server. Please check your network connection or the API URL.
        Provided URL : ${this.defaults.apiClient["*"].$url()}`);
      return this;
    }

    if (this.config.zkLoginWallets?.enabled) {
      await this.connector.enableZkLoginWallets({
        windowFeatures: this.config.zkLoginWallets.windowFeatures,
      });
    }

    await this.connector.tryRestoreConnection();

    const localJwt = this.defaults.store.persistent.get("beaver-jwt");
    if (localJwt) {
      this.defaults.store.authToken = localJwt;
    }

    this.ready = true;
    this.onReady();

    return this;
  }
}
