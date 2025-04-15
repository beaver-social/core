import { getUser, verifyUserSignature } from "../../lib/actions/helpers";

export async function verifySignature(
  userId: number,
  message: Uint8Array,
  signature: string,
  address: string
) {
  const user = await getUser(userId);
  await verifyUserSignature(message, signature, user.loginType, address);
}
