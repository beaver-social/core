/**
 * Types for Post data and API responses
 */

// Base API response format
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

// Media type
export interface PostMedia {
  contentId: number;
  contentTypeId: number;
  url: string;
  type: string;
  order: number;
  thumbnailUrl?: string;
  duration?: number;
  width?: number;
  height?: number;
  altText?: string;
}

// Core Post data structure
export interface PostData {
  id: number;
  authorId: number;
  content: string;
  parentId?: number;
  nsfw: boolean;
  subscriberOnly?: boolean;
  likesCount: number;
  repostsCount: number;
  repliesCount: number;
  createdAt: string;
  updatedAt: string;
}

// Combined Post with Media
export interface PostWithMedia extends PostData {
  media: PostMedia[];
}

// User data structure
export interface UserData {
  id: number;
  username: string;
  fullName?: string;
  about?: string;
  imageUrl?: string;
  bannerUrl?: string;
  isVerified: boolean;
}

// Interaction types
export interface Like {
  id: number;
  userId: number;
  contentId: number;
  contentTypeId: number;
  reaction?: string;
  createdAt: string;
}

export interface Repost {
  id: number;
  userId: number;
  contentId: number;
  contentTypeId: number;
  content?: string;
  createdAt: string;
}

export interface PostAward {
  id: number;
  postId: number;
  userId: number;
  awardTypeId: number;
  createdAt: string;
}

// API method specific response types
export type GetPostResponse = ApiResponse<PostWithMedia>;
export type GetPostFeedResponse = ApiResponse<PostWithMedia[]>;
export type GetPostInteractionsResponse = ApiResponse<
  Like[] | PostData[] | Repost[]
>;
export type GetPostAwardsResponse = ApiResponse<PostAward[]>;
export type CreatePostResponse = ApiResponse<{}>;
export type UpdatePostResponse = ApiResponse<{}>;
export type DeletePostResponse = ApiResponse<{}>;
export type LikePostResponse = ApiResponse<{}>;
export type UnlikePostResponse = ApiResponse<{}>;
export type RepostResponse = ApiResponse<{}>;
export type UnrepostResponse = ApiResponse<{}>;
export type SavePostResponse = ApiResponse<{}>;
export type UnsavePostResponse = ApiResponse<{}>;
export type ReportPostResponse = ApiResponse<{}>;
export type PinPostResponse = ApiResponse<{}>;
export type UnpinPostResponse = ApiResponse<{}>;
