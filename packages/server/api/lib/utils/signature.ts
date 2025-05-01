import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { normalizeSuiAddress } from "@mysten/sui/utils";
import {
  verifyPersonalMessageSignature,
  verifyTransactionSignature,
} from "@mysten/sui/verify";

type Intent = "PersonalMessage" | "TransactionData";

export function inferSignatureScheme(signature: string) {
  const signatureBytes = Buffer.from(signature, "base64");
  const flag = signatureBytes[0];

  switch (flag) {
    case 0x00:
      return "Ed25519";
    case 0x01:
      return "Secp256k1";
    case 0x02:
      return "Secp256r1";
    case 0x03:
      return "multisig";
    case 0x05:
      return "zkLogin";
    case 0x06:
      return "passkey";
    default:
      throw new Error("Unknown signature type");
  }
}

export async function verifySignature(
  bytes: Uint8Array,
  signature: string,
  options: {
    address: string;
    intent: Intent;
  }
): Promise<boolean> {
  const address = normalizeSuiAddress(options.address);
  const intent = options.intent;
  const scheme = inferSignatureScheme(signature);

  if (scheme == "multisig") {
    throw new Error("Multisig signatures are not supported yet.");
  }
  if (scheme == "passkey") {
    throw new Error("passkey signatures are not supported yet.");
  }

  let type;
  if (
    scheme === "Ed25519" ||
    scheme === "Secp256k1" ||
    scheme === "Secp256r1"
  ) {
    type = "wallet" as const;
  }
  if (scheme === "zkLogin") {
    type = "zk" as const;
  }

  const validator = {
    PersonalMessage: verifyPersonalMessageSignature,
    TransactionData: verifyTransactionSignature,
  }[intent];

  const publicKey = await validator(bytes, signature, {
    address: normalizeSuiAddress(address),
    client:
      type == "zk"
        ? new SuiGraphQLClient({
            url: "https://sui-testnet.mystenlabs.com/graphql",
          })
        : undefined,
  });

  return publicKey.verifyAddress(address);
}
