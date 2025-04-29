import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

const passphrase = Bun.env["PVT_KEY"]!;

const keypair = Ed25519Keypair.deriveKeypair(passphrase);

console.log(keypair.getPublicKey().toSuiAddress());

const c = JSON.stringify({
  content: "This is a post I want to try posting lol",
  userId: 2,
  type: "v1.user.create.post",
  previous: "GENESIS",
});

console.log(c);

const message = new TextEncoder().encode(c);

const signature = await keypair.signPersonalMessage(message);

console.log(signature);
