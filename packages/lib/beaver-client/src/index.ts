import Logger from "./logger";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { BeaverClientConfig, Surface } from "./types";
import type { API } from "server";
import { hc } from "hono/client";
import { Defaults } from "./types";
import { S3Client } from "@aws-sdk/client-s3";
import { tryCatch } from "./utils/tryCatch";
import { Identity } from "./identity";
import { Contracts } from "contracts";
import Post from "./content/posts";
import Swipe from "./content/swipes";
import User from "./user";

// import { User } from "./user";

/**
 * Main client for interacting with the Beaver Social Layer.
 */
export class BeaverClient {
  config: BeaverClientConfig;
  defaults: Defaults;
  ready: boolean = false;
  logger: Logger;

  constructor(surface: Surface, config: BeaverClientConfig) {
    const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
    const rpcUrl = getFullnodeUrl(config.network || "mainnet");
    const suiClient = new SuiClient({ url: rpcUrl });
    const apiClient = hc<typeof API>(
      config.apiBaseUrl || "https://api.beaversocial.com/api"
    );
    const s3Client = new S3Client();

    this.defaults = {
      apiClient,
      suiClient,
      s3Client,
      surface,
      contracts: null,
    };

    this.config = config;
    this.logger = logger;
  }

  public async initialize() {
    const contractsResponse = await tryCatch(
      this.defaults.apiClient.contracts.$get()
    );
    if (contractsResponse.error)
      return this.logger.error("Unable to fetch contract details from server");

    const contracts = await tryCatch(contractsResponse.data.json());
    if (contracts.error)
      return this.logger.error("Invalid contracts retreived from server");

    this.defaults.contracts = new Contracts({
      packageId: contracts.data.testnet.packages.beaverSocial.id,
      objects: {
        adminsRecord: { id: contracts.data.testnet.objects.adminsRecord },
        clock: { id: contracts.data.testnet.objects.clock },
        registry: { id: contracts.data.testnet.objects.registry },
      },
    });

    this.ready = true;
    this.logger.info("Client Initialised", this.defaults.contracts);
  }

  get identity() {
    return new Identity(this.defaults, this.logger);
  }

  get post() {
    return new Post(this.defaults, this.logger);
  }

  get swipe() {
    return new Swipe(this.defaults, this.logger);
  }

  get user() {
    return new User(this.defaults, this.logger);
  }
}
