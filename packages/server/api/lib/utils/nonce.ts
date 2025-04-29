import { verifySignature } from "@mysten/sui/verify";
import { Singleton } from "./singleton";

class NonceManager extends Singleton {
  private nonceStore: Record<string, string> = {};

  constructor() {
    super();
  }

  public generateNonce(index: string): string {
    const nonce = crypto.randomUUID();
    this.nonceStore[index] = nonce;

    return nonce;
  }

  public comsumeNonce(index: string) {
    const nonce = this.nonceStore[index];
    delete this.nonceStore[index];

    return nonce || null;
  }

  public comsumeNonceBytes(index: string) {
    const nonce = this.nonceStore[index];
    delete this.nonceStore[index];

    if (!nonce) return null;
    const nonceBytes = new TextEncoder().encode(nonce);
    return nonceBytes;
  }

  public validateSignedNonce(address: string, signature: string) {
    const nonce = this.comsumeNonce(address);
    if (!nonce) {
      return false;
    }

    const message = new TextEncoder().encode(nonce);

    verifySignature(message, signature, { address });
  }
}

const nonceManager = NonceManager.getInstance<NonceManager>();

export default nonceManager;
