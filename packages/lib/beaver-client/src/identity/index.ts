import { Transaction } from "@mysten/sui/transactions";
import { Defaults } from "../types";
import Logger from "../logger";
import { bcs } from "@mysten/bcs";

export class Identity {
  defaults: Defaults;
  logger: Logger;

  constructor(defaults: Defaults, logger: Logger) {
    this.defaults = defaults;
    this.logger = logger;

    this.logger.info("User interface instantiated");
  }

  public async mint(options: { username: string; about: string }) {
    const { contracts, surface, suiClient } = this.defaults;
    const { username, about } = options;

    const tx = new Transaction();

    contracts.registry.mint(tx, {
      username,
      about,
    });

    const transactionBytes = await tx.build();

    const signature = await surface.signTransaction(transactionBytes);

    return suiClient.executeTransactionBlock({
      transactionBlock: transactionBytes,
      signature: signature.signature,
    });
  }
}
