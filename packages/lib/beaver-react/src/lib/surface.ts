import { Surface } from "@beaver/client";
import { useSignPersonalMessage, useSignTransaction } from "@mysten/dapp-kit";

export const surface: Surface = {
  async signPersonalMessage(message) {
    const { mutateAsync } = useSignPersonalMessage();
    const bytes = new TextEncoder().encode(message);

    const result = await mutateAsync({
      message: bytes,
    });

    return result;
  },

  async signTransaction(tx) {
    const { mutateAsync } = useSignTransaction();

    const result = await mutateAsync({
      transaction: tx,
    });

    return result;
  },
};
