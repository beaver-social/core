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

const awards = await contracts.awards.read.getAwardsData();

console.log(awards);
