import { getFullnodeUrl } from "@mysten/sui/client";

export type BeaverClientConfig = {
    debug?: boolean;
    network?: Parameters<typeof getFullnodeUrl>[0];
    apiBaseUrl?: string;
};
