import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { hc } from "hono/client";
import { Contracts } from "contracts";
import { BeaverClientConfig, Defaults } from "./types/client";

import Logger from "./bindings/Logger";
import Connector from "./bindings/Connector";
import User from "./bindings/User";
import Posts from "./bindings/Posts";

export class BeaverClient {
  config: BeaverClientConfig;
  defaults: Defaults;
  ready: boolean = false;
  logger: Logger;

  connector: Connector;
  user: User;
  posts: Posts;

  constructor(config: BeaverClientConfig) {
    const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
    const rpcUrl = getFullnodeUrl(config.network || "mainnet");
    const suiClient = new SuiClient({ url: rpcUrl });
    const apiClient = hc<typeof API>(
      config.apiBaseUrl || "https://api.beaversocial.com/api/v1"
    );

    const contracts = {} as any;

    this.defaults = {
      logger,
      apiClient,
      suiClient,
      contracts,
      connection: null,
      surface: null,
    };

    this.config = config;
    this.logger = this.defaults.logger;

    this.connector = new Connector(this.defaults);
    this.user = new User(this.defaults);
    this.posts = new Posts(this.defaults);
  }

  public async initialize(callback?: () => void) {
    const contractsResponse = await this.defaults.apiClient.contracts.$get();

    const contracts = await contractsResponse.json();

    this.defaults.contracts = new Contracts(contracts.data);

    this.ready = true;

    !!callback && callback();
    return this;
  }
}
