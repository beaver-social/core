export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export type Screen =
  | "home"
  | "profile"
  | "alerts"
  | "messages"
  | "settings"
  | "swipes"
  | "onboarding"
  | "create";

export type User = {
  id: number;
  address: string;
  identity: string;
  collectionNft: string;
  username: string;
  about: string | null;
  fullName: string;
  suinsDomainName: string | null;
  createdAt: number;
  deletedAt: number | null;
  imageUrl: string | null;
  imageBlurhash: string | null;
  bannerUrl: string | null;
  website: string | null;
  timezone: number | null;
};
