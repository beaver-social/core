import output from "./output.json" with { type: "json" };
import type { Contracts } from "./services";
import { findObjectIdByName } from "./utils";

export const packageId = output.events.find(e => !!e.packageId)?.packageId!;

export const onchainDefinitions: 
  ConstructorParameters<typeof Contracts>[0]
 = {
    network: "testnet",
    packageId: packageId,
    objects: {
      adminsRecord: {
        id: findObjectIdByName(output.objectChanges, "AdminsRecord"),
      },
      clock: {
         id: "0x0000000000000000000000000000000000000000000000000000000000000006" 
        },
      registry: {
        id:findObjectIdByName(output.objectChanges, "Registry"),
      },
      awardsData: {
        id: findObjectIdByName(output.objectChanges, "AwardsData"),
      },
      postsRegistry: {
        id: findObjectIdByName(output.objectChanges, "PostsRegistry"),
      },
    },
};

export const deployer = output.objectChanges.find(o => !!o.sender)?.sender!

export const defaultAdminCapId = findObjectIdByName(output.objectChanges, "AdminCap");
