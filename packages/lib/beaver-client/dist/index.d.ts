import * as _mysten_sui_client from '@mysten/sui/client';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Contracts } from 'contracts';
import { hc } from 'hono/client';
import { S3Client } from '@aws-sdk/client-s3';

declare class Logger {
    private prefix;
    private isLoggingEnabled;
    constructor(prefix?: string, isLoggingEnabled?: boolean);
    private formatMessage;
    private logMessage;
    log(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
}

type BeaverClientConfig = {
    debug?: boolean;
    network?: Parameters<typeof getFullnodeUrl>[0];
    apiBaseUrl?: string;
};
type ApiClient = ReturnType<typeof hc<typeof API>>;
type Defaults = {
    apiClient: ApiClient;
    suiClient: SuiClient;
    s3Client: S3Client;
    surface: Surface;
    contracts: Contracts;
};
type Surface = {
    sign: Ed25519Keypair["sign"];
    signPersonalMessage: Ed25519Keypair["signPersonalMessage"];
    signTransaction: Ed25519Keypair["signTransaction"];
    signWithIntent: Ed25519Keypair["signWithIntent"];
};

declare class Identity {
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
    mint(options: {
        username: string;
        about: string;
    }): Promise<_mysten_sui_client.SuiTransactionBlockResponse>;
    setAbout(options: {
        identity: string;
        about: string;
    }): Promise<_mysten_sui_client.SuiTransactionBlockResponse>;
}

declare class Post {
    /** @hidden */
    static CREATE_ERROR: string;
    /** @hidden */
    static UPDATE_ERROR: string;
    /** @hidden */
    static DELETE_ERROR: string;
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
}

declare class Swipe {
    /** @hidden */
    static CREATE_ERROR: string;
    /** @hidden */
    static UPDATE_ERROR: string;
    /** @hidden */
    static DELETE_ERROR: string;
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
}

declare class User$1 {
    /** @hidden */
    static UPDATE_ERROR: string;
    /** @hidden */
    static FETCH_ERROR: string;
    /** @hidden */
    static INTERACTIONS_ERROR: string;
    /** @hidden */
    static SUINS_SYNC_ERROR: string;
    /** @hidden */
    static AWARDS_ERROR: string;
    /** @hidden */
    static ANALYTICS_ERROR: string;
    defaults: Defaults;
    logger: Logger;
    constructor(defaults: Defaults, logger: Logger);
}

type User = {
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
    isVerified: boolean;
    timezone: number | null;
    pinnedPost: number | null;
    pinnedShort: number | null;
    createdAt: string;
    updatedAt: string;
};
type UserUpdateOptions = {
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
type GetUserResponse = {
    user: User;
};
type FindUserOptions = {
    identity?: string;
    username?: string;
    suinsDomainName?: string;
    address?: string;
};
type FindUserResponse = {
    id: number;
};
type UpdateUserResponse = {
    user: User;
};
type InteractionType = "likes" | "saves" | "reposts" | "comments" | "follows" | "topicFollows";
type GetInteractionsOptions = {
    page: number;
    limit: number;
    type: InteractionType;
};
type GetInteractionsResponse$1 = {
    data: InteractionData[];
};
type InteractionData = {
    id: number;
    userId: number;
    contentId: number;
    contentType: "post" | "swipe" | "user" | "topic";
    createdAt: string;
    updatedAt: string;
};
type GetSuggestionsResponse = {
    data: User[];
};
type SyncSuinsResponse = {
    success: boolean;
};
type AwardType = "owned" | "given";
type GetAwardsOptions = {
    page: number;
    limit: number;
    type: AwardType;
};
type Award = {
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
type GetAwardsResponse = {
    data: Award[];
};
type UserAnalytics = {
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

type user_types_Award = Award;
type user_types_AwardType = AwardType;
type user_types_FindUserOptions = FindUserOptions;
type user_types_FindUserResponse = FindUserResponse;
type user_types_GetAwardsOptions = GetAwardsOptions;
type user_types_GetAwardsResponse = GetAwardsResponse;
type user_types_GetInteractionsOptions = GetInteractionsOptions;
type user_types_GetSuggestionsResponse = GetSuggestionsResponse;
type user_types_GetUserResponse = GetUserResponse;
type user_types_InteractionData = InteractionData;
type user_types_InteractionType = InteractionType;
type user_types_SyncSuinsResponse = SyncSuinsResponse;
type user_types_UpdateUserResponse = UpdateUserResponse;
type user_types_User = User;
type user_types_UserAnalytics = UserAnalytics;
type user_types_UserUpdateOptions = UserUpdateOptions;
declare namespace user_types {
  export {
    user_types_Award as Award,
    user_types_AwardType as AwardType,
    user_types_FindUserOptions as FindUserOptions,
    user_types_FindUserResponse as FindUserResponse,
    user_types_GetAwardsOptions as GetAwardsOptions,
    user_types_GetAwardsResponse as GetAwardsResponse,
    user_types_GetInteractionsOptions as GetInteractionsOptions,
    GetInteractionsResponse$1 as GetInteractionsResponse,
    user_types_GetSuggestionsResponse as GetSuggestionsResponse,
    user_types_GetUserResponse as GetUserResponse,
    user_types_InteractionData as InteractionData,
    user_types_InteractionType as InteractionType,
    user_types_SyncSuinsResponse as SyncSuinsResponse,
    user_types_UpdateUserResponse as UpdateUserResponse,
    user_types_User as User,
    user_types_UserAnalytics as UserAnalytics,
    user_types_UserUpdateOptions as UserUpdateOptions,
  };
}

/**
 * Types for Swipe data and API responses
 */
interface ApiResponse$1<T> {
    data: T;
    message: string;
    statusCode: number;
}
interface SwipeMedia {
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
interface SwipeData {
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
interface SwipeWithMedia extends SwipeData {
    media: SwipeMedia[];
}
interface UserData$1 {
    id: number;
    username: string;
    fullName?: string;
    about?: string;
    imageUrl?: string;
    bannerUrl?: string;
    isVerified: boolean;
}
interface LikeWithUser {
    like: {
        id: number;
        userId: number;
        contentId: number;
        contentTypeId: number;
        createdAt: string;
    };
    user: UserData$1;
}
interface RepostWithUser {
    repost: {
        id: number;
        userId: number;
        contentId: number;
        contentTypeId: number;
        quote?: string;
        createdAt: string;
    };
    user: UserData$1;
}
interface SaveWithUser {
    save: {
        id: number;
        userId: number;
        contentId: number;
        contentTypeId: number;
        createdAt: string;
    };
    user: UserData$1;
}
interface CommentWithUser {
    comment: {
        id: number;
        userId: number;
        contentId: number;
        contentTypeId: number;
        content: string;
        createdAt: string;
    };
    user: UserData$1;
}
interface CreateSwipeResponse {
    swipeId: number;
}
type GetSwipeResponse = ApiResponse$1<SwipeWithMedia>;
type GetSwipeFeedResponse = ApiResponse$1<SwipeWithMedia[]>;
type GetInteractionsResponse = ApiResponse$1<LikeWithUser[] | RepostWithUser[] | SaveWithUser[] | CommentWithUser[]>;
type CreateSwipeApiResponse = ApiResponse$1<CreateSwipeResponse>;
type UpdateSwipeResponse = ApiResponse$1<null>;
type DeleteSwipeResponse = ApiResponse$1<null>;
type LikeSwipeResponse = ApiResponse$1<null>;
type UnlikeSwipeResponse = ApiResponse$1<null>;
type RepostSwipeResponse = ApiResponse$1<null>;
type UnrepostSwipeResponse = ApiResponse$1<null>;
type SaveSwipeResponse = ApiResponse$1<null>;
type UnsaveSwipeResponse = ApiResponse$1<null>;
type ReportSwipeResponse = ApiResponse$1<null>;
type PinSwipeResponse = ApiResponse$1<null>;
type UnpinSwipeResponse = ApiResponse$1<null>;

type swipe_types_CommentWithUser = CommentWithUser;
type swipe_types_CreateSwipeApiResponse = CreateSwipeApiResponse;
type swipe_types_CreateSwipeResponse = CreateSwipeResponse;
type swipe_types_DeleteSwipeResponse = DeleteSwipeResponse;
type swipe_types_GetInteractionsResponse = GetInteractionsResponse;
type swipe_types_GetSwipeFeedResponse = GetSwipeFeedResponse;
type swipe_types_GetSwipeResponse = GetSwipeResponse;
type swipe_types_LikeSwipeResponse = LikeSwipeResponse;
type swipe_types_LikeWithUser = LikeWithUser;
type swipe_types_PinSwipeResponse = PinSwipeResponse;
type swipe_types_ReportSwipeResponse = ReportSwipeResponse;
type swipe_types_RepostSwipeResponse = RepostSwipeResponse;
type swipe_types_RepostWithUser = RepostWithUser;
type swipe_types_SaveSwipeResponse = SaveSwipeResponse;
type swipe_types_SaveWithUser = SaveWithUser;
type swipe_types_SwipeData = SwipeData;
type swipe_types_SwipeMedia = SwipeMedia;
type swipe_types_SwipeWithMedia = SwipeWithMedia;
type swipe_types_UnlikeSwipeResponse = UnlikeSwipeResponse;
type swipe_types_UnpinSwipeResponse = UnpinSwipeResponse;
type swipe_types_UnrepostSwipeResponse = UnrepostSwipeResponse;
type swipe_types_UnsaveSwipeResponse = UnsaveSwipeResponse;
type swipe_types_UpdateSwipeResponse = UpdateSwipeResponse;
declare namespace swipe_types {
  export {
    ApiResponse$1 as ApiResponse,
    swipe_types_CommentWithUser as CommentWithUser,
    swipe_types_CreateSwipeApiResponse as CreateSwipeApiResponse,
    swipe_types_CreateSwipeResponse as CreateSwipeResponse,
    swipe_types_DeleteSwipeResponse as DeleteSwipeResponse,
    swipe_types_GetInteractionsResponse as GetInteractionsResponse,
    swipe_types_GetSwipeFeedResponse as GetSwipeFeedResponse,
    swipe_types_GetSwipeResponse as GetSwipeResponse,
    swipe_types_LikeSwipeResponse as LikeSwipeResponse,
    swipe_types_LikeWithUser as LikeWithUser,
    swipe_types_PinSwipeResponse as PinSwipeResponse,
    swipe_types_ReportSwipeResponse as ReportSwipeResponse,
    swipe_types_RepostSwipeResponse as RepostSwipeResponse,
    swipe_types_RepostWithUser as RepostWithUser,
    swipe_types_SaveSwipeResponse as SaveSwipeResponse,
    swipe_types_SaveWithUser as SaveWithUser,
    swipe_types_SwipeData as SwipeData,
    swipe_types_SwipeMedia as SwipeMedia,
    swipe_types_SwipeWithMedia as SwipeWithMedia,
    swipe_types_UnlikeSwipeResponse as UnlikeSwipeResponse,
    swipe_types_UnpinSwipeResponse as UnpinSwipeResponse,
    swipe_types_UnrepostSwipeResponse as UnrepostSwipeResponse,
    swipe_types_UnsaveSwipeResponse as UnsaveSwipeResponse,
    swipe_types_UpdateSwipeResponse as UpdateSwipeResponse,
    UserData$1 as UserData,
  };
}

/**
 * Types for Post data and API responses
 */
interface ApiResponse<T> {
    data: T;
    message: string;
    statusCode: number;
}
interface PostMedia {
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
interface PostData {
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
interface PostWithMedia extends PostData {
    media: PostMedia[];
}
interface UserData {
    id: number;
    username: string;
    fullName?: string;
    about?: string;
    imageUrl?: string;
    bannerUrl?: string;
    isVerified: boolean;
}
interface Like {
    id: number;
    userId: number;
    contentId: number;
    contentTypeId: number;
    reaction?: string;
    createdAt: string;
}
interface Repost {
    id: number;
    userId: number;
    contentId: number;
    contentTypeId: number;
    content?: string;
    createdAt: string;
}
interface PostAward {
    id: number;
    postId: number;
    userId: number;
    awardTypeId: number;
    createdAt: string;
}
type GetPostResponse = ApiResponse<PostWithMedia>;
type GetPostFeedResponse = ApiResponse<PostWithMedia[]>;
type GetPostInteractionsResponse = ApiResponse<Like[] | PostData[] | Repost[]>;
type GetPostAwardsResponse = ApiResponse<PostAward[]>;
type CreatePostResponse = ApiResponse<{}>;
type UpdatePostResponse = ApiResponse<{}>;
type DeletePostResponse = ApiResponse<{}>;
type LikePostResponse = ApiResponse<{}>;
type UnlikePostResponse = ApiResponse<{}>;
type RepostResponse = ApiResponse<{}>;
type UnrepostResponse = ApiResponse<{}>;
type SavePostResponse = ApiResponse<{}>;
type UnsavePostResponse = ApiResponse<{}>;
type ReportPostResponse = ApiResponse<{}>;
type PinPostResponse = ApiResponse<{}>;
type UnpinPostResponse = ApiResponse<{}>;

type post_types_ApiResponse<T> = ApiResponse<T>;
type post_types_CreatePostResponse = CreatePostResponse;
type post_types_DeletePostResponse = DeletePostResponse;
type post_types_GetPostAwardsResponse = GetPostAwardsResponse;
type post_types_GetPostFeedResponse = GetPostFeedResponse;
type post_types_GetPostInteractionsResponse = GetPostInteractionsResponse;
type post_types_GetPostResponse = GetPostResponse;
type post_types_Like = Like;
type post_types_LikePostResponse = LikePostResponse;
type post_types_PinPostResponse = PinPostResponse;
type post_types_PostAward = PostAward;
type post_types_PostData = PostData;
type post_types_PostMedia = PostMedia;
type post_types_PostWithMedia = PostWithMedia;
type post_types_ReportPostResponse = ReportPostResponse;
type post_types_Repost = Repost;
type post_types_RepostResponse = RepostResponse;
type post_types_SavePostResponse = SavePostResponse;
type post_types_UnlikePostResponse = UnlikePostResponse;
type post_types_UnpinPostResponse = UnpinPostResponse;
type post_types_UnrepostResponse = UnrepostResponse;
type post_types_UnsavePostResponse = UnsavePostResponse;
type post_types_UpdatePostResponse = UpdatePostResponse;
type post_types_UserData = UserData;
declare namespace post_types {
  export {
    post_types_ApiResponse as ApiResponse,
    post_types_CreatePostResponse as CreatePostResponse,
    post_types_DeletePostResponse as DeletePostResponse,
    post_types_GetPostAwardsResponse as GetPostAwardsResponse,
    post_types_GetPostFeedResponse as GetPostFeedResponse,
    post_types_GetPostInteractionsResponse as GetPostInteractionsResponse,
    post_types_GetPostResponse as GetPostResponse,
    post_types_Like as Like,
    post_types_LikePostResponse as LikePostResponse,
    post_types_PinPostResponse as PinPostResponse,
    post_types_PostAward as PostAward,
    post_types_PostData as PostData,
    post_types_PostMedia as PostMedia,
    post_types_PostWithMedia as PostWithMedia,
    post_types_ReportPostResponse as ReportPostResponse,
    post_types_Repost as Repost,
    post_types_RepostResponse as RepostResponse,
    post_types_SavePostResponse as SavePostResponse,
    post_types_UnlikePostResponse as UnlikePostResponse,
    post_types_UnpinPostResponse as UnpinPostResponse,
    post_types_UnrepostResponse as UnrepostResponse,
    post_types_UnsavePostResponse as UnsavePostResponse,
    post_types_UpdatePostResponse as UpdatePostResponse,
    post_types_UserData as UserData,
  };
}

declare class BeaverClient {
    config: BeaverClientConfig;
    defaults: Defaults;
    ready: boolean;
    logger: Logger;
    constructor(surface: Surface, config: BeaverClientConfig);
    initialize(): Promise<void>;
    destroy(): void;
    get identity(): Identity;
    get post(): Post;
    get swipe(): Swipe;
    get user(): User$1;
}

export { BeaverClient, BeaverClientConfig, Defaults, post_types as PostTypes, Surface, swipe_types as SwipeTypes, user_types as UserTypes };
