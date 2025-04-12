import { contracts } from "../../lib/sui/contracts";
import { Transaction } from "@mysten/sui/transactions";
import { defaultAdminCapId } from "../../lib/sui/constants";
import suiClient, { serverKeypair } from "../../lib/sui/client";
import { tryCatch } from "../../lib/tryCatch";
import { createAction } from "../../lib/actions/factory";
import * as userSchema from "../../schema/user";

export const createIdentity = createAction<{
  username: string;
  about: string;
  receiver: string;
  fullName: string;
  imageUrl: string;
}>()(async (tx, { username, about, receiver, fullName, imageUrl }) => {
  const suiTx = new Transaction();
  contracts.admin.mint_for(suiTx, {
    username: username,
    about: about,
    receiver: receiver,
    adminCap: { id: defaultAdminCapId },
  });

  const suiTxResp = await tryCatch(
    suiClient.signAndExecuteTransaction({
      signer: serverKeypair,
      transaction: suiTx,
    })
  );

  if (suiTxResp.error) {
    throw new Error("Failed to create identity on-chain", {
      cause: suiTxResp.error.message,
    });
  }

  const { objectChanges } = suiTxResp.data;

  if (!objectChanges) {
    return tx.rollback();
  }

  let identityAddress = "";
  for (const change of objectChanges) {
    if (
      change.type === "created" &&
      change.objectType === "0x2::identity::Identity"
    ) {
      identityAddress = change.objectId;
      break;
    }
  }

  const addUser = await tryCatch(
    tx.insert(userSchema.users).values({
      identity: identityAddress,
      username: username,
      fullName: fullName,
      imageUrl: imageUrl,
      about: about,
      address: receiver,
    })
  );

  if (addUser.error) {
    throw new Error("Failed to insert user into database", {
      cause: addUser.error.message,
    });
  }
});
