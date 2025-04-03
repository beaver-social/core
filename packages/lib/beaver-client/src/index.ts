
import Logger from "./logger";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { BeaverClientConfig } from "./types";
import type { API } from "server"
import { hc } from "hono/client"
import { Defaults } from "./default";
import { S3Client } from "@aws-sdk/client-s3";
import { tryCatch } from "./utils/tryCatch";
import { User } from "./user";

// import { User } from "./user";

/**
 * Main client for interacting with the Beaver Social Layer.
*/
export class BeaverClient {
    config: BeaverClientConfig;
    defaults: Defaults;
    logger: Logger;

    constructor(config: BeaverClientConfig) {
        const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
        const rpcUrl = getFullnodeUrl(config.network || 'mainnet');
        const suiClient = new SuiClient({ url: rpcUrl });
        const apiClient = hc<typeof API>(config.apiBaseUrl || "https://api.beaversocial.com/api");
        const s3Client = new S3Client();

        this.defaults = {
            apiClient,
            suiClient,
            s3Client,
            contracts: null,
        }

        this.config = config;
        this.logger = logger;

        this.logger.info("Client Initialising", config);
    }

    public async initialize() {
        const contractsResponse = await tryCatch(this.defaults.apiClient.contracts.$get())
        if (contractsResponse.error)
            return this.logger.error("Unable to fetch contract details from server");

        const contracts = await tryCatch(contractsResponse.data.json())
        if (contracts.error)
            return this.logger.error("Invalid contracts retreived from server")

        this.defaults.contracts = contracts.data;
    }

    get user() {
        return new User(this.defaults, this.logger);
    }
}


