## 1. User Authentication & Identity

### Base Path: `/api/v1/auth`

| Endpoint            | Method | Description                  | Query/Params | Request Body                    | Response                                        |
| ------------------- | ------ | ---------------------------- | ------------ | ------------------------------- | ----------------------------------------------- |
| `/zklogin/nonce`    | POST   | Get nonce for zkLogin        | -            | `{ jwt: string }`               | `{ salt: { hex, base64, integer } }`            |
| `/zklogin/verify`   | POST   | Verify zkLogin auth          | -            | `{ jwt, userAddress, zkProof }` | `{ success, token, userAddress, isRegistered }` |
| `/wallet/challenge` | POST   | Get challenge for wallet sig | -            | `{ address: string }`           | `{ challenge, message }`                        |
| `/wallet/verify`    | POST   | Verify wallet signature      | -            | `{ address, signature }`        | `{ success, token, address, isRegistered }`     |
| `/session`          | GET    | Get current session info     | -            | -                               | `{ user, isLoggedIn }`                          |
| `/logout`           | POST   | End user session             | -            | -                               | `{ success }`                                   |

## 2. User Registration & Profile Management

### Base Path: `/api/v1/users`

| Endpoint          | Method | Description                   | Query/Params         | Request Body                                                   | Response                  |
| ----------------- | ------ | ----------------------------- | -------------------- | -------------------------------------------------------------- | ------------------------- |
| `/register`       | POST   | Complete user registration    | -                    | `{ username, fullName, image_url, banner_url?, about?, etc. }` | `{ user, identityNFT }`   |
| `/:username`      | GET    | Get user profile by username  | -                    | -                                                              | `{ user }`                |
| `/:username`      | PATCH  | Update user profile           | -                    | `{ fullName?, image_url?, banner_url?, about?, etc. }`         | `{ user }`                |
| `/me`             | GET    | Get current user's profile    | -                    | -                                                              | `{ user }`                |
| `/check-username` | GET    | Check username availability   | `?username=string`   | -                                                              | `{ available, message? }` |
| `/verify-email`   | POST   | Request email verification    | -                    | `{ email }`                                                    | `{ success, message }`    |
| `/search`         | GET    | Search for users              | `?q=string&limit=10` | -                                                              | `{ users: [] }`           |
| `/suggestions`    | GET    | Get suggested users to follow | `?limit=number`      | -                                                              | `{ suggestions: [] }`     |

## 3. User Relationships

### Base Path: `/api/v1/users/:username`

| Endpoint     | Method | Description              | Query/Params       | Request Body | Response                           |
| ------------ | ------ | ------------------------ | ------------------ | ------------ | ---------------------------------- |
| `/follow`    | POST   | Follow a user            | -                  | -            | `{ success, follower, following }` |
| `/unfollow`  | POST   | Unfollow a user          | -                  | -            | `{ success }`                      |
| `/followers` | GET    | Get user's followers     | `?page=1&limit=20` | -            | `{ followers: [], pagination }`    |
| `/following` | GET    | Get users being followed | `?page=1&limit=20` | -            | `{ following: [], pagination }`    |
| `/block`     | POST   | Block a user             | -                  | -            | `{ success }`                      |
| `/unblock`   | POST   | Unblock a user           | -                  | -            | `{ success }`                      |
| `/mute`      | POST   | Mute a user              | -                  | -            | `{ success }`                      |
| `/unmute`    | POST   | Unmute a user            | -                  | -            | `{ success }`                      |

## 4. User Content & Activity

### Base Path: `/api/v1/users/:username`

| Endpoint    | Method | Description                 | Query/Params                | Request Body | Response                         |
| ----------- | ------ | --------------------------- | --------------------------- | ------------ | -------------------------------- |
| `/posts`    | GET    | Get user's posts            | `?page=1&limit=20`          | -            | `{ posts: [], pagination }`      |
| `/replies`  | GET    | Get user's replies/comments | `?page=1&limit=20`          | -            | `{ replies: [], pagination }`    |
| `/media`    | GET    | Get user's media posts      | `?page=1&limit=20`          | -            | `{ media: [], pagination }`      |
| `/likes`    | GET    | Get posts liked by user     | `?page=1&limit=20`          | -            | `{ likes: [], pagination }`      |
| `/activity` | GET    | Get user's activity         | `?page=1&limit=20&type=all` | -            | `{ activities: [], pagination }` |
| `/shorts`   | GET    | Get user's short videos     | `?page=1&limit=20`          | -            | `{ shorts: [], pagination }`     |

## 5. User Privacy & Settings

### Base Path: `/api/v1/settings`

| Endpoint                  | Method | Description                  | Query/Params       | Request Body                             | Response                    |
| ------------------------- | ------ | ---------------------------- | ------------------ | ---------------------------------------- | --------------------------- |
| `/privacy`                | GET    | Get privacy settings         | -                  | -                                        | `{ settings }`              |
| `/privacy`                | PATCH  | Update privacy settings      | -                  | `{ postVisibility, allowTagging, etc. }` | `{ settings }`              |
| `/notifications`          | GET    | Get notification settings    | -                  | -                                        | `{ settings }`              |
| `/notifications`          | PATCH  | Update notification settings | -                  | `{ emailAlerts, pushAlerts, etc. }`      | `{ settings }`              |
| `/blocked`                | GET    | Get blocked users            | `?page=1&limit=20` | -                                        | `{ users: [], pagination }` |
| `/muted`                  | GET    | Get muted users              | `?page=1&limit=20` | -                                        | `{ users: [], pagination }` |
| `/connected-accounts`     | GET    | Get linked accounts          | -                  | -                                        | `{ accounts: [] }`          |
| `/connected-accounts`     | POST   | Link new account             | -                  | `{ provider, token }`                    | `{ success, account }`      |
| `/connected-accounts/:id` | DELETE | Unlink account               | -                  | -                                        | `{ success }`               |

## 6. Web3 Identity Management

### Base Path: `/api/v1/identity`

| Endpoint          | Method | Description                          | Query/Params | Request Body                 | Response                       |
| ----------------- | ------ | ------------------------------------ | ------------ | ---------------------------- | ------------------------------ |
| `/`               | GET    | Get identity NFT details             | -            | -                            | `{ identityNFT, owner, user }` |
| `/transfer`       | POST   | Transfer identity to another address | -            | `{ targetAddress, reason? }` | `{ success, transactionHash }` |
| `/verify`         | POST   | Verify account with NFT              | -            | `{ signature }`              | `{ success, verificationId }`  |
| `/zklogin/setup`  | POST   | Set up zkLogin                       | -            | `{ provider, token }`        | `{ success, setupId }`         |
| `/zklogin/status` | GET    | Check zkLogin setup status           | -            | -                            | `{ isEnabled, providers: [] }` |

## 7. User Messaging

### Base Path: `/api/v1/messages`

| Endpoint                | Method | Description                  | Query/Params                 | Request Body                    | Response                                |
| ----------------------- | ------ | ---------------------------- | ---------------------------- | ------------------------------- | --------------------------------------- |
| `/`                     | GET    | Get conversations            | `?page=1&limit=20`           | -                               | `{ conversations: [], unread: number }` |
| `/new`                  | POST   | Create new conversation      | -                            | `{ recipients: [], message }`   | `{ conversation }`                      |
| `/:conversationId`      | GET    | Get conversation messages    | `?before=timestamp&limit=20` | -                               | `{ messages: [], participants: [] }`    |
| `/:conversationId`      | POST   | Send message to conversation | -                            | `{ content, attachments?: [] }` | `{ message }`                           |
| `/:conversationId/read` | POST   | Mark conversation as read    | -                            | -                               | `{ success }`                           |
| `/search`               | GET    | Search messages              | `?q=string`                  | -                               | `{ results: [] }`                       |

## 8. User Notification Management

### Base Path: `/api/v1/notifications`

| Endpoint    | Method | Description                     | Query/Params                | Request Body      | Response                                |
| ----------- | ------ | ------------------------------- | --------------------------- | ----------------- | --------------------------------------- |
| `/`         | GET    | Get user notifications          | `?page=1&limit=20&type=all` | -                 | `{ notifications: [], unread: number }` |
| `/:id/read` | PATCH  | Mark notification as read       | -                           | -                 | `{ success }`                           |
| `/read-all` | POST   | Mark all notifications as read  | -                           | -                 | `{ success }`                           |
| `/settings` | GET    | Get notification preferences    | -                           | -                 | `{ settings }`                          |
| `/settings` | PATCH  | Update notification preferences | -                           | `{ preferences }` | `{ settings }`                          |

## 9. User Verification

### Base Path: `/api/v1/verification`

| Endpoint   | Method | Description                  | Query/Params | Request Body            | Response                            |
| ---------- | ------ | ---------------------------- | ------------ | ----------------------- | ----------------------------------- |
| `/request` | POST   | Request account verification | -            | `{ reason, evidence? }` | `{ success, requestId }`            |
| `/status`  | GET    | Check verification status    | -            | -                       | `{ status, message?, verifiedAt? }` |

## Data Models

### User

```typescript
{
  id: string(uuid);
  username: string(unique);
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
  createdAt: timestamp;
  lastActive: timestamp;
}
```

### UserRelationship

```typescript
{
  id: string(uuid);
  follower_id: string(User.id);
  following_id: string(User.id);
  createdAt: timestamp;
}
```

### BlockedUser

```typescript
{
  id: string(uuid);
  user_id: string(User.id);
  blocked_id: string(User.id);
  createdAt: timestamp;
}
```

### MutedUser

```typescript
{
  id: string(uuid);
  user_id: string(User.id);
  muted_id: string(User.id);
  createdAt: timestamp;
}
```

### UserPrivacySettings

```typescript
{
  id: string(uuid);
  user_id: string(User.id);
  postVisibility: "public" | "followers" | "token-holders";
  allowTagging: "anyone" | "following" | "verified";
  allowDirectMessages: "anyone" | "following" | "verified" | "none";
  showReadReceipts: boolean;
  allowPostEmbedding: boolean;
  showInSearchResults: boolean;
  allowContentAggregators: boolean;
  showLocationInfo: boolean;
  updatedAt: timestamp;
}
```

### ConnectedAccount

```typescript
{
  id: string(uuid);
  user_id: string(User.id);
  provider: "google" | "twitter" | "facebook" | "github";
  provider_user_id: string;
  email: string | null;
  accessToken: string;
  connectedAt: timestamp;
}
```

## Implementation Considerations

1. **Authentication Requirements**

   - JWT tokens for session management
   - Token expiry and refresh strategy
   - Signature verification for wallet auth
   - zkLogin integration with proper security

2. **User Privacy**

   - Respect user privacy settings in all queries
   - Privacy-aware follower/following lists
   - Block/mute functionality affecting content visibility

3. **Rate Limiting**

   - Implement rate limits on auth endpoints to prevent abuse
   - Rate limit sensitive operations (follow/unfollow, messaging)

4. **Web3 Integration**

   - Proper verification of on-chain identity
   - Secure NFT interaction
   - Token gating for exclusive content

5. **Security Considerations**
   - Input validation for all endpoints
   - Prevent user enumeration attacks
   - Secure handling of wallet addresses

This API structure provides a comprehensive foundation for handling all the user-related features in your Twitter-like web3 social platform. The endpoints are designed to be RESTful, intuitive, and cover all the functionality visible in your client code.
