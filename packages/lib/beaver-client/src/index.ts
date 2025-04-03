
import Logger from "./logger";
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { BeaverClientConfig } from "./types";
import type { API } from "server"
import { hc } from "hono/client"
import { DefaultC } from "./default";
import { S3Client } from "@aws-sdk/client-s3";
// import { User } from "./user";

/**
 * Main client for interacting with the Beaver Social Layer.
*/
export class BeaverClient extends DefaultC {
    config: BeaverClientConfig;

    constructor(config: BeaverClientConfig) {
        const logger = new Logger("Beaver Social SDK", Boolean(config.debug));
        const rpcUrl = getFullnodeUrl(config.network || 'mainnet');
        const suiClient = new SuiClient({ url: rpcUrl });
        const apiClient = hc<typeof API>(config.apiBaseUrl || "https://api.beaversocial.com/api");
        const s3Client = new S3Client();

        super(apiClient, suiClient, s3Client, logger);
        this.config = config;

        this.logger.info("Client Initialising", config);
    }

    // get user() {
    //     return new User(this.apiClient, this.suiClient, this.logger);
    // }
}
