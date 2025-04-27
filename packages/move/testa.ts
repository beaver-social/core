import { bcs } from "@mysten/sui/bcs";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";

const passphrase =
  "timber antenna hidden adapt enrich turtle tail public debris rice twice resemble";

const keypair = Ed25519Keypair.deriveKeypair(passphrase);

const client = new SuiClient({
  url: getFullnodeUrl("testnet"),
});

const tx = new Transaction();

const registry = tx.object(
  "0x8307457995996a3d3ff1796d94302734ad3794016eb1f428fa0c9e4e147ab774"
);
const clock = tx.object(
  "0x0000000000000000000000000000000000000000000000000000000000000006"
);
const collection = tx.object(
  "0x8a25c63a9ae03584fe104baf7a72edb41cab5f61a1ccae1eac37b29ecf79f4a3"
);
const identity = tx.object(
  "0xa249ead1c4f2d5ca40284ea3777616a1f65a0f0e59504475974c79e406dc0425"
);

tx.moveCall({
  package: "0xee6aad9d004e139085adf85a504c613f00706de46ad5d2167600a986fefce9db",
  module: "posts",
  function: "push",
  arguments: [
    registry,
    identity,
    bcs.U64.serialize(1),
    bcs.String.serialize("test"),
    bcs.String.serialize("00"),
    collection,
    clock,
  ],
});
tx.setGasBudget(30000000);

const { digest } = await client.signAndExecuteTransaction({
  signer: keypair,
  transaction: tx,
});

await client.waitForTransaction({
  digest: digest,
});

const result = await client.getTransactionBlock({ digest });

console.log(result);
