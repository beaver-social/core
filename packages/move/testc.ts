import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Contracts } from "./services";
import { onchainDefinitions } from "./definitions";
import { Transaction } from "@mysten/sui/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

const passphrase = Bun.env["PVT_KEY"]!;

const keypair = Ed25519Keypair.deriveKeypair(passphrase);

const contracts = new Contracts(onchainDefinitions);

const tx = new Transaction();

contracts.posts.write.push(tx, {
  content: "hello world",
  identityRegistration: {
    id: "0x6a17d467f495cb4b2fedee0a17571af7f177f5aaa7a61a84656c6a57ad049c7f",
  },
  collection: {
    id: "0xbd8e27182e9e616c3559fae02cb0d8ea4a72d102afd2c2678cc1aec9f3ff613f",
  },
  postId: 1,
  attested: new Uint8Array([0]),
});
tx.setGasBudget(1_000_000);

const out = await client.signAndExecuteTransaction({
  transaction: tx,
  signer: keypair,
  options: {
    showEffects: true,
  },
});

console.log("out", out);
