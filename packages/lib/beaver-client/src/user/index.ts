import { Transaction } from "@mysten/sui/transactions"
import { Defaults } from "../default";
import Logger from "../logger";

export class User {
    defaults: Defaults
    logger: Logger

    constructor(defaults: Defaults, logger: Logger) {
        this.defaults = defaults;
        this.logger = logger;

        this.logger.info("User interface instantiated");
    }

    public async buildNewIdentityPTB(options: { username: string }) {
        const { contracts } = this.defaults;

        if (!contracts) {
            return this.logger.error("Contracts not initialized. Please call BeaverClient.initialize() first.");
        }

        const tx = new Transaction()
        tx.moveCall(
            {
                package: contracts.testnet.beaverSocial.package,
                module: "registry",
                function: "mint"

            }
        )
    }
}
