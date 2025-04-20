import * as _mysten_sui_client from '@mysten/sui/client';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Contracts } from 'contracts';
import { hc } from 'hono/client';
import { S3Client } from '@aws-sdk/client-s3';

declare class Logger {
    private prefix;
    private isLoggingEnabled;
    constructor(prefix?: string, isLoggingEnabled?: boolean);
    private formatMessage;
    private logMessage;
    log(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
}

type BeaverClientConfig = {
    debug?: boolean;
    network?: Parameters<typeof getFullnodeUrl>[0];
    apiBaseUrl?: string;
};
type ApiClient = ReturnType<typeof hc<typeof API>>;
type Defaults = {
    apiClient: ApiClient;
    suiClient: SuiClient;
    s3Client: S3Client;
    surface: Surface;
    contracts: Contracts;
};
type Surface = {
    sign: Ed25519Keypair["sign"];
    signPersonalMessage: Ed25519Keypair["signPersonalMessage"];
    signTransaction: Ed25519Keypair["signTransaction"];
    signWithIntent: Ed25519Keypair["signWithIntent"];
};

declare class Identity {
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
    mint(options: {
        username: string;
        about: string;
    }): Promise<_mysten_sui_client.SuiTransactionBlockResponse>;
    setAbout(options: {
        identity: string;
        about: string;
    }): Promise<_mysten_sui_client.SuiTransactionBlockResponse>;
}

declare class Post {
    /** @hidden */
    static CREATE_ERROR: string;
    /** @hidden */
    static UPDATE_ERROR: string;
    /** @hidden */
    static DELETE_ERROR: string;
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
}

declare class Swipe {
    /** @hidden */
    static CREATE_ERROR: string;
    /** @hidden */
    static UPDATE_ERROR: string;
    /** @hidden */
    static DELETE_ERROR: string;
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
}

declare class User {
    /** @hidden */
    static UPDATE_ERROR: string;
    /** @hidden */
    static FETCH_ERROR: string;
    /** @hidden */
    static INTERACTIONS_ERROR: string;
    /** @hidden */
    static SUINS_SYNC_ERROR: string;
    /** @hidden */
    static AWARDS_ERROR: string;
    /** @hidden */
    static ANALYTICS_ERROR: string;
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
}

/**
 * Main client for interacting with the Beaver Social Layer.
 */
declare class BeaverClient {
    config: BeaverClientConfig;
    defaults: Defaults;
    ready: boolean;
    logger: Logger;
    constructor(surface: Surface, config: BeaverClientConfig);
    initialize(): Promise<void>;
    destroy(): void;
    get identity(): Identity;
    get post(): Post;
    get swipe(): Swipe;
    get user(): User;
}

export { BeaverClient };
