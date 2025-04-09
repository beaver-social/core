import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import env from "../../../env"

const suiClient = new SuiClient({
    network: env.SUI_NETWORK,
    url: getFullnodeUrl(env.SUI_NETWORK as any),
})

export const serverKeypair = Ed25519Keypair.generate()

export default suiClient;
