import {
  WalletWithRequiredFeatures,
  SuiSignTransactionFeature,
  SuiSignPersonalMessageFeature,
  StandardDisconnectFeature,
  WalletWithFeatures,
} from "@mysten/wallet-standard";
import { z } from "zod";
import { zBeaverConnectionMethods } from "../utils/wallet";

export type BeaverConnectionMethods = z.infer<
  ReturnType<typeof zBeaverConnectionMethods>
>;

export type BeaverProvidedWallet = WalletWithRequiredFeatures &
  WalletWithFeatures<
    StandardDisconnectFeature &
      SuiSignTransactionFeature &
      SuiSignPersonalMessageFeature
  >;
