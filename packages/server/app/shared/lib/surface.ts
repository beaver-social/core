import { useSignPersonalMessage, useSignTransaction } from "@mysten/dapp-kit";
import { IntentScope, SignatureWithBytes } from "@mysten/sui/cryptography";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

export async function sign(
  data: Uint8Array
): Promise<Uint8Array<ArrayBufferLike>> {
  const { mutate: walletSign } = useSignTransaction();
  const [signature, setSignature] = useState<string | null>(null);

  const tx = new Transaction();

  walletSign(
    {
      transaction: tx,
    },
    {
      onSuccess: (result) => setSignature(result.signature),
    }
  );

  if (!signature) {
    throw new Error("Signature not found");
  }

  return signature;
}

export async function signPersonalMessage(messageBytes: Uint8Array): Promise<{
  bytes: string;
  signature: string;
}> {
  const { mutate: walletSignPersonalMessage } = useSignPersonalMessage();
  const [signature, setSignature] = useState<string | null>(null);

  walletSignPersonalMessage(
    {
      message: messageBytes,
    },
    {
      onSuccess: (result) => setSignature(result.signature),
    }
  );

  if (!signature) {
    throw new Error("Signature not found");
  }

  const decodedMessage = new TextDecoder().decode(messageBytes);

  return {
    bytes: decodedMessage,
    signature: signature,
  };
}

export async function signTransaction(
  messageBytes: Uint8Array
): Promise<SignatureWithBytes> {}

export async function signWithIntent(
  messageBytes: Uint8Array,
  intent: IntentScope
): Promise<SignatureWithBytes> {}
