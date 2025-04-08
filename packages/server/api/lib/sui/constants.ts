import { Contracts } from "contracts"

export const onchainDefinitions: Record<"testnet" | "mainnet", ConstructorParameters<typeof Contracts>[0]> = {
    testnet: {
        packageId: "",
        objects: {
            adminsRecord: {
                id: ""
            },
            clock: { id: "" },
            registry: {
                id: ""
            }
        }
    },
    mainnet: {
        packageId: "",
        objects: {
            adminsRecord: {
                id: ""
            },
            clock: { id: "" },
            registry: {
                id: ""
            }
        }
    }
}

export const defaultAdminCapId = ""
