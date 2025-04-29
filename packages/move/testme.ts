import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Contracts } from "./services";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { defaultAdminCapId, onchainDefinitions } from "./definitions";
import { findObjectIdByName } from "./utils";

const passphrase = Bun.env["PVT_KEY"]!;

const keypair = Ed25519Keypair.deriveKeypair(passphrase);

const contracts = new Contracts(onchainDefinitions);

const client = new SuiClient({ url: getFullnodeUrl("testnet") });
const tx = new Transaction();
contracts.admin.write.mint_for(tx, {
  receiver:
    "0xd9490c944e6f3f0d99cddc80dca0d4206b201f97367f621ae8ca3a21d8679d61",
  adminCap: {
    id: defaultAdminCapId,
  },
  username: "riya",
  about: "Mai hu giyan, mai hu bada takatwar, mai hu bada gyanwan",
});

tx.setGasBudget(100000000);

const { digest } = await client.signAndExecuteTransaction({
  signer: keypair,
  transaction: tx,
});

const { objectChanges } = await client.waitForTransaction({
  digest,
  options: { showObjectChanges: true },
});

const i = findObjectIdByName(objectChanges, "IdentityRegistration");
const c = findObjectIdByName(objectChanges, "MY_BEAVER_POSTS");

console.log(i, c);
