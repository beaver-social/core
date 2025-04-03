import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import type { Keypair } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
// packages/server/lib/utils.ts
import { mnemonicToSeedSync } from "bip39";

export function seedPhraseToHex(mnemonic: string): string {
  const seedBuffer = mnemonicToSeedSync(mnemonic);
  return seedBuffer.toString("hex");
}
const PACKAGE_PATH = "./path/to/move/package";
const BUILD_PATH = path.join(PACKAGE_PATH, "build");
const DEPLOYMENT_FILE = "deployments.json";

async function buildPackage() {
  console.log("Building Move package...");
  //   execSync("bun run sui move build", { cwd: PACKAGE_PATH, stdio: "inherit" });
  console.log("Build complete.");
}

async function deployPackage(client: SuiClient, sender: Keypair) {
  await buildPackage();

  const bytecodePath = path.join(BUILD_PATH, "package.publish.json");
  if (!fs.existsSync(bytecodePath)) {
    throw new Error("Build failed: package.publish.json not found");
  }

  const bytecode = JSON.parse(fs.readFileSync(bytecodePath, "utf-8"));
  const tx = new Transaction();
  tx.publish({
    modules: bytecode.modules,
    dependencies: bytecode.dependencies,
  });

  const result = await client.signAndExecuteTransaction({
    transaction: tx,
    signer: sender,
  });

  //   const packageId = result.effects?.created?.find(
  //     (o) => o.reference.objectId === "package"
  //   )?.objectId;
  //   if (!packageId) throw new Error("Deployment failed");
  //   return packageId;

  console.log(result);

  return "0xlong_package_id";
}

function saveDeployment(packageId: string) {
  let deployments: Record<string, string> = {};
  if (fs.existsSync(DEPLOYMENT_FILE)) {
    deployments = JSON.parse(fs.readFileSync(DEPLOYMENT_FILE, "utf-8"));
  }
  deployments["latest"] = packageId;
  fs.writeFileSync(DEPLOYMENT_FILE, JSON.stringify(deployments, null, 2));
}

async function main() {
  const testnet = getFullnodeUrl("testnet");
  const client = new SuiClient({ url: testnet });

  const sender = Ed25519Keypair.deriveKeypairFromSeed(
    seedPhraseToHex(
      "title rookie script spot device drift panel nice maple verb bundle pull"
    )
  );

  console.log(sender.getPublicKey().toSuiAddress());

  const packageId = await deployPackage(client, sender);

  saveDeployment(packageId);
}

main().catch(console.error);
