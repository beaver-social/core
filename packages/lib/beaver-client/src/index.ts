import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import type { API } from "server";
import { hc } from "hono/client";
import { S3Client } from "@aws-sdk/client-s3";
import { Contracts } from "contracts";
import { Identity, ZkService } from "./classes/auth";
import { Logger } from "./classes/misc";
import { Post, Swipe } from "./classes/content";
import { BeaverClientConfig, Defaults, Surface } from "./types/client";
import { User } from "./classes/user";
import { safeParseResponse } from "./utils/apiClient";

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
      config.apiBaseUrl || "https://api.beaversocial.com/api/v1"
    );
    const s3Client = new S3Client();

    // @marsian is this okay?
    const contracts = new Contracts({
      packageId: "0x2::beaver_social",
      objects: {
        adminsRecord: { id: "0x2::beaver_social::AdminsRecord" },
        clock: { id: "0x2::beaver_social::Clock" },
        registry: { id: "0x2::beaver_social::Registry" },
      },
    });

    this.defaults = {
      apiClient,
      suiClient,
      s3Client,
      surface,
      contracts,
    };

    this.config = config;
    this.logger = logger;
  }

  public async initialize(callback?: () => void) {
    const contractsResponse = await safeParseResponse(
      this.defaults.apiClient.contracts.$get()
    );

    this.defaults.contracts = new Contracts({
      packageId: contractsResponse.data.testnet.packages.beaverSocial.id,
      objects: {
        adminsRecord: {
          id: contractsResponse.data.testnet.objects.adminsRecord,
        },
        clock: { id: contractsResponse.data.testnet.objects.clock },
        registry: { id: contractsResponse.data.testnet.objects.registry },
      },
    });

    this.ready = true;

    !!callback && callback();
    return this;
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

  get zk() {
    return new ZkService(this.defaults, this.logger);
  }
}

// Export types
export * from "./types/client";
export * from "./types/zk";
