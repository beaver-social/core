import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import stringify from "fast-json-stable-stringify";

const passphrase =
  "village night pluck social squirrel poverty clap fluid gloom luxury unfair hint";

const keypair = Ed25519Keypair.deriveKeypair(passphrase);

const c = stringify({
  userId: 1,
  type: "v1.user.unfollow.user",
  followingId: 2,
  previous: "44e6adb37200bda22e0ec20e51941f37054640e3f3acefe7e6c0bbe73d205683",
});

console.log(c);

const message = new TextEncoder().encode(c);

const signature = await keypair.signPersonalMessage(message);

console.log(signature);
