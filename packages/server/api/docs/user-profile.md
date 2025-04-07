# User Profile & Relationships API

## Overview

This document outlines the API endpoints for user profile management, relationships, and user-specific content in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. User Profile Management

### Base Path: `/users`

| Endpoint       | Method | Description                   | Query Params         | Request Body                                           | Response              |
| -------------- | ------ | ----------------------------- | -------------------- | ------------------------------------------------------ | --------------------- |
| `/:username`   | GET    | Get user profile by username  | -                    | -                                                      | `{ user }`            |
| `/:username`   | PATCH  | Update user profile           | -                    | `{ fullName?, image_url?, banner_url?, about?, etc. }` | `{ user }`            |
| `/me`          | GET    | Get current user's profile    | -                    | -                                                      | `{ user }`            |
| `/search`      | GET    | Search for users              | `?q=string&limit=10` | -                                                      | `{ users: [] }`       |
| `/suggestions` | GET    | Get suggested users to follow | `?limit=number`      | -                                                      | `{ suggestions: [] }` |

## 2. User Relationships

### Base Path: `/users/:username`

| Endpoint     | Method | Description              | Query Params       | Response                           |
| ------------ | ------ | ------------------------ | ------------------ | ---------------------------------- |
| `/follow`    | POST   | Follow a user            | -                  | `{ success, follower, following }` |
| `/unfollow`  | POST   | Unfollow a user          | -                  | `{ success }`                      |
| `/followers` | GET    | Get user's followers     | `?page=1&limit=20` | `{ followers: [], pagination }`    |
| `/following` | GET    | Get users being followed | `?page=1&limit=20` | `{ following: [], pagination }`    |
| `/block`     | POST   | Block a user             | -                  | `{ success }`                      |
| `/unblock`   | POST   | Unblock a user           | -                  | `{ success }`                      |
| `/mute`      | POST   | Mute a user              | -                  | `{ success }`                      |
| `/unmute`    | POST   | Unmute a user            | -                  | `{ success }`                      |

## 3. User Content & Activity

### Base Path: `/users/:username`

| Endpoint    | Method | Description                 | Query Params                | Response                         |
| ----------- | ------ | --------------------------- | --------------------------- | -------------------------------- |
| `/posts`    | GET    | Get user's posts            | `?page=1&limit=20`          | `{ posts: [], pagination }`      |
| `/replies`  | GET    | Get user's replies/comments | `?page=1&limit=20`          | `{ replies: [], pagination }`    |
| `/media`    | GET    | Get user's media posts      | `?page=1&limit=20`          | `{ media: [], pagination }`      |
| `/likes`    | GET    | Get posts liked by user     | `?page=1&limit=20`          | `{ likes: [], pagination }`      |
| `/activity` | GET    | Get user's activity         | `?page=1&limit=20&type=all` | `{ activities: [], pagination }` |
| `/shorts`   | GET    | Get user's short videos     | `?page=1&limit=20`          | `{ shorts: [], pagination }`     |

## 4. User Privacy Management

### Base Path: `/settings/privacy`

| Endpoint   | Method | Description             | Query Params       | Request Body                             | Response                    |
| ---------- | ------ | ----------------------- | ------------------ | ---------------------------------------- | --------------------------- |
| `/`        | GET    | Get privacy settings    | -                  | -                                        | `{ settings }`              |
| `/`        | PATCH  | Update privacy settings | -                  | `{ postVisibility, allowTagging, etc. }` | `{ settings }`              |
| `/blocked` | GET    | Get blocked users       | `?page=1&limit=20` | -                                        | `{ users: [], pagination }` |
| `/muted`   | GET    | Get muted users         | `?page=1&limit=20` | -                                        | `{ users: [], pagination }` |

## 5. Connected Accounts

### Base Path: `/settings/connected-accounts`

| Endpoint | Method | Description         | Request Body          | Response               |
| -------- | ------ | ------------------- | --------------------- | ---------------------- |
| `/`      | GET    | Get linked accounts | -                     | `{ accounts: [] }`     |
| `/`      | POST   | Link new account    | `{ provider, token }` | `{ success, account }` |
| `/:id`   | DELETE | Unlink account      | -                     | `{ success }`          |

## Data Models

### User

```typescript
interface User {
  id: string;
  username: string;
  fullName: string;
  address: string; // Sui wallet address
  identity: string; // NFT objectId
  image_url: string;
  banner_url: string | null;
  about: string | null;
  suins_domain_name: string | null;
  timezone: number | null;
  isVerified: boolean;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  lastActive: string;
}
```

### UserRelationship

```typescript
interface UserRelationship {
  id: string;
  follower_id: string;
  following_id: string;
  createdAt: string;
}
```

### BlockedUser

```typescript
interface BlockedUser {
  id: string;
  user_id: string;
  blocked_id: string;
  createdAt: string;
}
```

### MutedUser

```typescript
interface MutedUser {
  id: string;
  user_id: string;
  muted_id: string;
  createdAt: string;
}
```

### UserPrivacySettings

```typescript
interface UserPrivacySettings {
  id: string;
  user_id: string;
  postVisibility: "public" | "followers" | "token-holders";
  allowTagging: "anyone" | "following" | "verified";
  allowDirectMessages: "anyone" | "following" | "verified" | "none";
  showReadReceipts: boolean;
  allowPostEmbedding: boolean;
  showInSearchResults: boolean;
  allowContentAggregators: boolean;
  showLocationInfo: boolean;
  updatedAt: string;
}
```

### ConnectedAccount

```typescript
interface ConnectedAccount {
  id: string;
  user_id: string;
  provider: "google" | "twitter" | "facebook" | "github";
  provider_user_id: string;
  email: string | null;
  accessToken: string;
  connectedAt: string;
}
```

## Implementation Considerations

1. **Privacy & Security**

   - Respect user privacy settings in all queries
   - Privacy-aware follower/following lists
   - Block/mute functionality affecting content visibility
   - Secure handling of connected account tokens

2. **Performance**

   - Pagination for all list endpoints
   - Efficient queries for user activity streams
   - Caching of frequently accessed user profiles

3. **Content Access Control**

   - Apply relationship-based visibility filters (public/followers/token-holders)
   - Properly handle blocked user content filtering
   - Honor user's visibility preferences across the platform

4. **Web3 Integration**
   - Profile verification with NFT identity
   - Token-gated content visibility
   - Integration with on-chain identity systems
