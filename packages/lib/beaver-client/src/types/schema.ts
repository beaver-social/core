interface User {
  id: number;
  identity: string;
  address: string;
  suinsDomainName: string;
  username: string;
  fullName: string;
  about: string;
  imageUrl: string;
  bannerUrl: string;
  loginType: string;
  email: string;
  isVerified: boolean;
  timezone: number;
  pinnedPost: number;
  pinnedShort: number;
  createdAt: string;
  deletedAt: string;
}

export type { User };
