import { Transaction } from "@mysten/sui/transactions"
import { Defaults } from "../types";
import Logger from "../logger";
import { bcs } from '@mysten/bcs';

export class User {
    defaults: Defaults
    logger: Logger

    constructor(defaults: Defaults, logger: Logger) {
        this.defaults = defaults;
        this.logger = logger;

        this.logger.info("User interface instantiated");
    }

    public async newIdentity(options: { username: string, about: string }) {
        const { contracts, surface, suiClient } = this.defaults;
        const { username, about } = options;

        if (!contracts) {
            return this.logger.error("Contracts not initialized. Please call BeaverClient.initialize() first.");
        }

        const tx = new Transaction()

        const registry = tx.object("0x");
        const clock = tx.object("0x6")

        tx.moveCall(
            {
                package: contracts.testnet.beaverSocial.package,
                module: "registry",
                function: "mint",
                arguments: [
                    registry,
                    bcs.string().serialize(username),
                    bcs.string().serialize(about),
                    clock,
                ]
            }
        )

        const transactionBytes = await tx.build();

        const signature = await surface.signTransaction(transactionBytes);

        suiClient.executeTransactionBlock({ transactionBlock: transactionBytes, signature: signature.signature })
    }
}
