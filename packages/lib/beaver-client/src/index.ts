import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { hc } from "hono/client";
import { Contracts } from "contracts";
import { BeaverClientConfig, Defaults } from "./types/client";

import Logger from "./bindings/Logger";
import Connector from "./bindings/Connector";
import User from "./bindings/User";
import Posts from "./bindings/Posts";
import Docs from "./bindings/Docs";
import Ping from "./bindings/Ping";
import { BeaverStore } from "./store";
import ApiClient from "./bindings/ApiClient";
import EventNotifier from "./bindings/EventHandler";

export class BeaverClient {
  private config: BeaverClientConfig;
  private defaults: Defaults;
  ready: boolean = false;
  private logger: Logger;

  connector: Connector;
  user: User;
  posts: Posts;
  docs: Docs;
  ping: Ping;

  constructor(config: BeaverClientConfig) {
    const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
    const rpcUrl = getFullnodeUrl(config.network || "mainnet");
    const suiClient = new SuiClient({ url: rpcUrl });
    const apiClient = new ApiClient(logger);
    apiClient.baseUrl = config.apiBaseUrl || "https://beaversocial.xyz/api/v1";
    apiClient.appId = config.appId;

    const events = new EventNotifier();

    const contracts = {} as any;
    const store = new BeaverStore({ apiClient });

    this.defaults = {
      logger,
      apiClient,
      suiClient,
      contracts,
      store,
      events,
    };

    this.config = config;
    this.logger = this.defaults.logger;

    this.connector = new Connector(this.defaults);
    this.user = new User(this.defaults);
    this.posts = new Posts(this.defaults);
    this.docs = new Docs(this.defaults);
    this.ping = new Ping(this.defaults);
    this.initialize();
  }

  get contracts() {
    return this.defaults.contracts;
  }

  get on() {
    return this.defaults.events.on.bind(this.defaults.events);
  }

  get auth() {
    return {
      user: this.defaults.store.user,
      isAuthenticated: this.defaults.store.isAuthenticated,
    };
  }

  public async initialize() {
    try {
      const contractsResponse =
        await this.defaults.apiClient.rpc.contracts.$get();

      const contracts = await contractsResponse.json();

      this.defaults.contracts = new Contracts(contracts.data);
    } catch {
      throw new Error(`Unable to connect to server. Please check your network connection or the API URL.
        Provided URL : ${this.defaults.apiClient.rpc["*"].$url()}`);
    }

    if (this.config.zkLoginWallets?.enabled) {
      await this.connector.enableZkLoginWallets({
        windowFeatures: this.config.zkLoginWallets.windowFeatures,
      });
    }

    await this.connector.tryRestoreConnection();

    const localJwt = this.defaults.store.persistent.get("beaver-jwt");
    if (localJwt) {
      await this.defaults.store.setJwt(localJwt);
      if (this.defaults.store.isAuthenticated()) {
        this.defaults.events.emit("user:login", {
          user: this.defaults.store.user,
        });
      }
    }

    this.ready = true;
    this.defaults.events.emit("beaver:ready", {});

    return this;
  }
}
