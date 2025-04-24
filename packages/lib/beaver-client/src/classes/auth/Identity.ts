import { Transaction } from "@mysten/sui/transactions";
import { Defaults } from "../../types";
import { Logger } from "../misc";

export default class Identity {
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

    const signature = await surface.signTransaction(tx);
    const transactionBytes = await tx.build();

    return suiClient.executeTransactionBlock({
      transactionBlock: transactionBytes,
      signature: signature.signature,
    });
  }

  public async setAbout(options: { identity: string; about: string }) {
    const { identity, about } = options;
    const { contracts, surface, suiClient } = this.defaults;

    const tx = new Transaction();

    contracts.identityRegistration.setAbout(tx, {
      identityRegistration: { id: identity },
      about,
    });

    const signature = await surface.signTransaction(tx);
    const transactionBytes = await tx.build();

    return suiClient.executeTransactionBlock({
      transactionBlock: transactionBytes,
      signature: signature.signature,
    });
  }
}
