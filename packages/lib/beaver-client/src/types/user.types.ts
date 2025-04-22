export type User = {
  id: number;
  identity: string;
  address: string;
  suinsDomainName: string | null;
  username: string;
  fullName: string;
  about: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  loginType: "wallet" | "zk";
  email: string | null;
  isVerified: boolean | null;
  timezone: number | null;
  pinnedPost: number | null;
  pinnedShort: number | null;
  createdAt: string;
  deletedAt: string | null;
};

export type UserUpdateOptions = {
  username?: string;
  fullName?: string;
  about?: string;
  imageUrl?: string;
  bannerUrl?: string;
  timezone?: number;
  isVerified?: boolean;
  pinnedPost?: number;
  pinnedShort?: number;
  email?: string;
};

export type GetUserResponse = {
  user: User;
  message: string;
};

export type FindUserOptions = {
  type: "identity" | "username" | "suinsDomainName" | "address";
  value: string;
};

export type FindUserResponse = {
  id: number;
};

export type UpdateUserResponse = {
  user: User;
};

export type InteractionType =
  | "likes"
  | "saves"
  | "reposts"
  | "comments"
  | "follows"
  | "topicFollows";

export type GetInteractionsOptions = {
  page: number;
  limit: number;
  type: InteractionType;
};

export type GetInteractionsResponse = {
  data: InteractionData[];
};

export type InteractionData = {
  id: number;
  userId: number;
  contentId: number;
  contentType: "post" | "swipe" | "user" | "topic";
  createdAt: string;
  updatedAt: string;
};

export type GetSuggestionsResponse = {
  data: User[];
};

export type SyncSuinsResponse = {
  success: boolean;
};

export type AwardType = "owned" | "given";

export type GetAwardsOptions = {
  page: number;
  limit: number;
  type: AwardType;
};

export type Award = {
  id: number;
  userId: number;
  awardedBy: number;
  postId: number;
  swipeId: number;
  type: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type GetAwardsResponse = {
  data: Award[];
};

export type UserAnalytics = {
  id: number;
  userId: number;
  profileVisitsCount: number;
  profileSharesCount: number;
  profileViewsCount: number;
  postCount: number;
  postLikesCount: number;
  postRepostsCount: number;
  postSharesCount: number;
  postCommentsCount: number;
  postViewsCount: number;
  postSavesCount: number;
  swipeCount: number;
  swipeLikesCount: number;
  swipeRepostsCount: number;
  swipeSharesCount: number;
  swipeCommentsCount: number;
  swipeViewsCount: number;
  swipeSavesCount: number;
  awardsCount: number;
  earnings: number;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
};
