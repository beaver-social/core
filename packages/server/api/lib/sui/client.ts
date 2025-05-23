import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import env from "../../../env";
import { Transaction } from "@mysten/sui/transactions";
import { tryCatch } from "../tryCatch";

const suiClient = new SuiClient({
  network: env.SUI_NETWORK,
  url: getFullnodeUrl(env.SUI_NETWORK as any),
});

export const serverKeypair = Ed25519Keypair.deriveKeypair(
  env.SERVER_PASSPHRASE,
);

export async function executeTransaction(tx: Transaction) {
  const response = await tryCatch(
    suiClient.signAndExecuteTransaction({
      signer: serverKeypair,
      transaction: tx,
    }),
  );

  if (response.error) {
    throw new Error(`Failed to execute sui transaction: ${response.error}`);
  }

  return response.data;
}

export default suiClient;
