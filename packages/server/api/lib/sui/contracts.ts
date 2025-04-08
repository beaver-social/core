import { Contracts } from "contracts"
import { onchainDefinitions } from "./constants"

export const contracts = new Contracts({ packageId: onchainDefinitions.testnet.packageId, objects: onchainDefinitions.testnet.objects })