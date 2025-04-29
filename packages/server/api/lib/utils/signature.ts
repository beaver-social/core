import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { normalizeSuiAddress } from "@mysten/sui/utils";
import {
  verifyPersonalMessageSignature,
  verifyTransactionSignature,
} from "@mysten/sui/verify";

type Intent = "PersonalMessage" | "TransactionData";

export async function verifySignature(
  bytes: Uint8Array,
  signature: string,
  options: {
    address: string;
    intent: Intent;
    type: "zk" | "wallet";
  }
): Promise<boolean> {
  const address = normalizeSuiAddress(options.address);
  const intent = options.intent;

  const validator = {
    PersonalMessage: verifyPersonalMessageSignature,
    TransactionData: verifyTransactionSignature,
  }[intent];

  const publicKey = await validator(bytes, signature, {
    address: normalizeSuiAddress(address),
    client:
      options.type == "zk"
        ? new SuiGraphQLClient({
            url: "https://sui-testnet.mystenlabs.com/graphql",
          })
        : undefined,
  });

  return publicKey.verifyAddress(address);
}
