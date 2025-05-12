import { Defaults } from "../types/client";
import Logger from "./Logger";

export default class Awards {
  private defaults: Defaults;
  private logger: Logger;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.logger = defaults.logger;

    this.logger.info("Awards interface instantiated");
  }

  async getAwardTypes() {
    const { awardNames, awardCosts } =
      await this.defaults.contracts.awards.read.getAwardsData();

    const awardTypes = awardNames.map((name, index) => {
      return {
        name,
        cost: awardCosts[index],
      };
    });

    return awardTypes;
  }

  async giveAwardToPost(options: { postId: number }) {}
}
