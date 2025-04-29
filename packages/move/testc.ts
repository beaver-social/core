import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { verifyPersonalMessageSignature } from "@mysten/sui/verify";

const passphrase = Bun.env["PVT_KEY"]!;

const keypair = Ed25519Keypair.deriveKeypair(passphrase);

const message = new TextEncoder().encode("hello world");

const signature = await keypair.signPersonalMessage(message);

const g = await verifyPersonalMessageSignature(message, signature.signature, {
  address: keypair.getPublicKey().toSuiAddress(),
});

console.log(g.verifyAddress(keypair.getPublicKey().toSuiAddress()));
