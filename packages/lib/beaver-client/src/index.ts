import User from "./user";
import Post from "./post";
import Comment from "./comment";
import Logger from "./logger";

/**
 * Main client for interacting with the Beaver Social Layer.
 */
export class BeaverClient {
    /** @hidden */
    // apiClient: apiClient;
    /** @hidden */
    // suiClient: suiClient;
    // customConfig?: CustomConfig;
    logger: Logger;
    config: BeaverClientConfig;

    /** @hidden */
    constructor(config: BeaverClientConfig) {
        this.logger = new Logger("Beaver Social SDK", Boolean(config.debug));
        this.logger.info("Client Initialising", config);
    }
}
