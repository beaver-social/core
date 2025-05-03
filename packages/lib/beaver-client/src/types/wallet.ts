import {
  WalletWithRequiredFeatures,
  SuiSignTransactionFeature,
  SuiSignPersonalMessageFeature,
  StandardDisconnectFeature,
  WalletWithFeatures,
  WalletAccount,
} from "@mysten/wallet-standard";

export type BeaverProvidedWallet = WalletWithRequiredFeatures &
  WalletWithFeatures<
    StandardDisconnectFeature &
      SuiSignTransactionFeature &
      SuiSignPersonalMessageFeature
  >;

export type Connection = {
  wallet: BeaverProvidedWallet;
  account: WalletAccount;
};
