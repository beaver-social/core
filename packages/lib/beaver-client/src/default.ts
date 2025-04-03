import Logger from "./logger";
import { SuiClient } from '@mysten/sui/client';
import type { API } from "server"
import { hc } from "hono/client"
import type { S3Client } from "@aws-sdk/client-s3"

type ApiClient = ReturnType<typeof hc<typeof API>>;
type Contracts = Awaited<ReturnType<Awaited<ReturnType<ApiClient["contracts"]["$get"]>>["json"]>>

export type Defaults = {
    apiClient: ApiClient;
    suiClient: SuiClient;
    s3Client: S3Client;
    contracts: Contracts | null,
}