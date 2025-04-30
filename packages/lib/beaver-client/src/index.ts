import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { hc } from "hono/client";
import { Contracts } from "contracts";
import { BeaverClientConfig, Defaults } from "./types/client";
import { safeParseResponse } from "./utils/apiClient";

import Logger from "./bindings/Logger";
import Connector from "./bindings/Connector";

export class BeaverClient {
  config: BeaverClientConfig;
  defaults: Defaults;
  ready: boolean = false;
  logger: Logger;

  connector: Connector;

  constructor(config: BeaverClientConfig) {
    const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
    const rpcUrl = getFullnodeUrl(config.network || "mainnet");
    const suiClient = new SuiClient({ url: rpcUrl });
    const apiClient = hc<typeof API>(
      config.apiBaseUrl || "https://api.beaversocial.com/api/v1"
    );

    const contracts = {} as any;

    this.defaults = {
      apiClient,
      suiClient,
      surface: {} as any,
      contracts,
    };

    this.config = config;
    this.logger = logger;

    this.connector = new Connector(this.defaults, this.logger);
  }

  public async initialize(callback?: () => void) {
    const contractsResponse = await safeParseResponse(
      this.defaults.apiClient.contracts.$get()
    );

    this.defaults.contracts = new Contracts(contractsResponse.data);

    this.ready = true;

    !!callback && callback();
    return this;
  }
}
