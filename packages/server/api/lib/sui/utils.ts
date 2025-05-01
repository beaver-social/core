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
