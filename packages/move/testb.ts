import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { findObjectIdByName } from "./utils";

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

const { objectChanges } = await client.waitForTransaction({
  digest: "7yacAwSq58yN34VoF93WmeyUzKLfNSGVnTEmMkcefga5",
  options: {
    showObjectChanges: true,
  },
});

const registration = findObjectIdByName(objectChanges, "IdentityRegistration");

console.log(registration);
