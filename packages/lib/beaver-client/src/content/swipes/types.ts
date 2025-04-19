/**
 * Types for Swipe data and API responses
 */

// Base API response format
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

// Media type
export interface SwipeMedia {
  contentId: number;
  contentTypeId: number;
  url: string;
  type: string;
  thumbnailUrl?: string;
  duration?: number;
  width?: number;
  height?: number;
  altText?: string;
}

// Core Swipe data structure
export interface SwipeData {
  id: number;
  authorId: number;
  caption: string;
  tags?: string;
  mentions?: string;
  parentId?: number;
  nsfw: boolean;
  subscriberOnly?: boolean;
  likesCount: number;
  repostsCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Combined Swipe with Media
export interface SwipeWithMedia extends SwipeData {
  media: SwipeMedia[];
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

// Interaction types with user data
export interface LikeWithUser {
  like: {
    id: number;
    userId: number;
    contentId: number;
    contentTypeId: number;
    createdAt: string;
  };
  user: UserData;
}

export interface RepostWithUser {
  repost: {
    id: number;
    userId: number;
    contentId: number;
    contentTypeId: number;
    quote?: string;
    createdAt: string;
  };
  user: UserData;
}

export interface SaveWithUser {
  save: {
    id: number;
    userId: number;
    contentId: number;
    contentTypeId: number;
    createdAt: string;
  };
  user: UserData;
}

export interface CommentWithUser {
  comment: {
    id: number;
    userId: number;
    contentId: number;
    contentTypeId: number;
    content: string;
    createdAt: string;
  };
  user: UserData;
}

// Create response
export interface CreateSwipeResponse {
  swipeId: number;
}

// API method specific response types
export type GetSwipeResponse = ApiResponse<SwipeWithMedia>;
export type GetSwipeFeedResponse = ApiResponse<SwipeWithMedia[]>;
export type GetInteractionsResponse = ApiResponse<
  LikeWithUser[] | RepostWithUser[] | SaveWithUser[] | CommentWithUser[]
>;
export type CreateSwipeApiResponse = ApiResponse<CreateSwipeResponse>;
export type UpdateSwipeResponse = ApiResponse<null>;
export type DeleteSwipeResponse = ApiResponse<null>;
export type LikeSwipeResponse = ApiResponse<null>;
export type UnlikeSwipeResponse = ApiResponse<null>;
export type RepostSwipeResponse = ApiResponse<null>;
export type UnrepostSwipeResponse = ApiResponse<null>;
export type SaveSwipeResponse = ApiResponse<null>;
export type UnsaveSwipeResponse = ApiResponse<null>;
export type ReportSwipeResponse = ApiResponse<null>;
export type PinSwipeResponse = ApiResponse<null>;
export type UnpinSwipeResponse = ApiResponse<null>;
