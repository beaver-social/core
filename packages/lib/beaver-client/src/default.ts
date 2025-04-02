import Logger from "./logger";
import { SuiClient } from '@mysten/sui/client';
import type { API } from "server"
import { hc } from "hono/client"
import type { S3Client } from "@aws-sdk/client-s3"

export abstract class DefaultC {
    apiClient: ReturnType<typeof hc<typeof API>>;
    suiClient: SuiClient;
    s3Client: S3Client;
    logger: Logger;

    constructor(
        apiClient: ReturnType<typeof hc<typeof API>>,
        suiClient: SuiClient,
        s3Client: S3Client,
        logger: Logger
    ) {
        this.apiClient = apiClient;
        this.suiClient = suiClient;
        this.s3Client = s3Client;
        this.logger = logger;
    }
}
