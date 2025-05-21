## Overview

The Beaver Server API is a RESTful API service that powers the social network functionality and handles blockchain integration. It provides endpoints for user management, authentication, social interactions, content creation, and blockchain transactions.

## API Base URL

The API is available at:

- Production: `https://api.beaver.social/v1`
- Testnet: `https://testnet.api.beaver.social/v1`

## Authentication

Most API endpoints require authentication using a JWT token. This token is obtained through the wallet authentication flow.

**Authentication Headers:**

```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

The API implements rate limiting to ensure fair usage and system stability. Rate limits vary by endpoint but generally follow these guidelines:

- Public endpoints: 60 requests per minute
- Authenticated endpoints: 120 requests per minute
- Post creation: 30 requests per 5 minutes

## Core Endpoints

### Authentication & Users

#### Register User

Creates a new user account with a connected wallet.

```
POST /users/register
```

**Request Body:**

```json
{
  "username": "beaverfan123",
  "walletAddress": "0x...",
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "userId": 42,
    "username": "beaverfan123",
    "walletAddress": "0x...",
    "jwt": "eyJhbGciOiJ..."
  }
}
```

#### Login User

Authenticates a user with their wallet.

```
POST /users/login
```

**Request Body:**

```json
{
  "walletAddress": "0x...",
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "userId": 42,
    "username": "beaverfan123",
    "jwt": "eyJhbGciOiJ..."
  }
}
```

#### Get User Profile

Retrieves a user's profile information.

```
GET /users/profile/:userId
```

or

```
GET /users/profile?username=beaverfan123
```

**Response:**

```json
{
  "success": true,
  "data": {
    "userId": 42,
    "username": "beaverfan123",
    "walletAddress": "0x...",
    "followerCount": 150,
    "followingCount": 75,
    "postCount": 32,
    "bio": "Web3 enthusiast",
    "avatarUrl": "https://..."
  }
}
```

### Social Interactions

#### Follow User

Follows another user.

```
POST /users/follow
```

**Request Body:**

```json
{
  "userId": 55,
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "followerId": 42,
    "followingId": 55,
    "timestamp": "2023-06-14T10:23:45Z"
  }
}
```

#### Unfollow User

Unfollows a user.

```
POST /users/unfollow
```

**Request Body:**

```json
{
  "userId": 55,
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true
}
```

#### Get Followers

Retrieves a list of users following the specified user.

```
GET /users/:userId/followers?page=1&perPage=20
```

**Response:**

```json
{
  "success": true,
  "data": {
    "followers": [
      {
        "userId": 12,
        "username": "cryptofriend",
        "avatarUrl": "https://..."
      }
      // More followers...
    ],
    "total": 150,
    "page": 1,
    "perPage": 20,
    "totalPages": 8
  }
}
```

#### Get Following

Retrieves a list of users that the specified user is following.

```
GET /users/:userId/following?page=1&perPage=20
```

**Response:**

```json
{
  "success": true,
  "data": {
    "following": [
      {
        "userId": 55,
        "username": "blockchain_dev",
        "avatarUrl": "https://..."
      }
      // More following...
    ],
    "total": 75,
    "page": 1,
    "perPage": 20,
    "totalPages": 4
  }
}
```

### Content Management

#### Create Post

Creates a new post.

```
POST /posts/create
```

**Request Body:**

```json
{
  "content": "Just published my first smart contract on Sui! #blockchain #sui",
  "parentId": null,
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "postId": 123,
    "authorId": 42,
    "content": "Just published my first smart contract on Sui! #blockchain #sui",
    "parentId": null,
    "createdAt": "2023-06-15T08:30:22Z",
    "onChainId": "0x..."
  }
}
```

#### Get Posts

Retrieves a paginated list of posts.

```
GET /posts?page=1&perPage=20&authorId=42
```

**Response:**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "postId": 123,
        "authorId": 42,
        "author": {
          "username": "beaverfan123",
          "avatarUrl": "https://..."
        },
        "content": "Just published my first smart contract on Sui! #blockchain #sui",
        "parentId": null,
        "createdAt": "2023-06-15T08:30:22Z",
        "likeCount": 15,
        "replyCount": 3,
        "repostCount": 5
      }
      // More posts...
    ],
    "total": 32,
    "page": 1,
    "perPage": 20,
    "totalPages": 2,
    "hasMore": true
  }
}
```

#### Get Post by ID

Retrieves a specific post by its ID.

```
GET /posts/:postId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "postId": 123,
    "authorId": 42,
    "author": {
      "username": "beaverfan123",
      "avatarUrl": "https://..."
    },
    "content": "Just published my first smart contract on Sui! #blockchain #sui",
    "parentId": null,
    "createdAt": "2023-06-15T08:30:22Z",
    "likeCount": 15,
    "replyCount": 3,
    "repostCount": 5,
    "onChainId": "0x..."
  }
}
```

#### Like Post

Likes a post.

```
POST /posts/like
```

**Request Body:**

```json
{
  "postId": 123,
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "postId": 123,
    "userId": 42,
    "timestamp": "2023-06-15T09:45:30Z"
  }
}
```

#### Unlike Post

Unlikes a post.

```
POST /posts/unlike
```

**Request Body:**

```json
{
  "postId": 123,
  "signature": "0x..."
}
```

**Response:**

```json
{
  "success": true
}
```

### Blockchain Integration

#### Get Contracts

Retrieves the contracts metadata for blockchain integration.

```
GET /contracts
```

**Response:**

```json
{
  "success": true,
  "data": {
    "packageId": "0x...",
    "modules": {
      "social": {
        "address": "0x...",
        "functions": {
          "createPost": "0x...",
          "likePost": "0x...",
          "followUser": "0x..."
        }
      },
      "identity": {
        "address": "0x...",
        "functions": {
          "createIdentity": "0x...",
          "updateIdentity": "0x..."
        }
      }
    }
  }
}
```

#### Verify Transaction

Verifies a blockchain transaction.

```
POST /transactions/verify
```

**Request Body:**

```json
{
  "txDigest": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "verified": true,
    "timestamp": "2023-06-15T10:22:18Z",
    "effectsDigest": "0x..."
  }
}
```

## Action Chain Verification

The Beaver Social API implements a unique action-chain verification system to ensure the authenticity of user actions. This system uses cryptographic signatures to verify that actions are performed by the rightful users.

### How It Works

1. Each action requires a signature from the user's wallet
2. The signature is verified against the user's blockchain identity
3. Actions are linked in a chain to prevent replay attacks
4. The server maintains a sequence number for each user

### Signature Format

The signature format follows this pattern:

```
sign(keccak256(actionType + timestamp + userId + actionData + prevActionHash))
```

Where:

- `actionType`: The type of action (e.g., "post", "like", "follow")
- `timestamp`: The current timestamp in ISO format
- `userId`: The ID of the user performing the action
- `actionData`: JSON string of action-specific data
- `prevActionHash`: Hash of the previous action performed by the user

## Error Handling

The API returns standard HTTP status codes along with JSON responses for errors:

**Example Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SIGNATURE",
    "message": "The signature provided is invalid or has expired",
    "details": {
      "field": "signature"
    }
  }
}
```

Common error codes:

| Code                  | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `INVALID_CREDENTIALS` | Authentication credentials are invalid                  |
| `INVALID_SIGNATURE`   | The signature is invalid or has expired                 |
| `USER_NOT_FOUND`      | The specified user does not exist                       |
| `POST_NOT_FOUND`      | The specified post does not exist                       |
| `RATE_LIMIT_EXCEEDED` | You have exceeded the rate limit for this endpoint      |
| `VALIDATION_ERROR`    | The request data failed validation                      |
| `BLOCKCHAIN_ERROR`    | An error occurred while interacting with the blockchain |

## Pagination

Most endpoints that return lists support pagination using the following query parameters:

- `page`: Page number (starting from 1)
- `perPage`: Number of items per page (default and max values vary by endpoint)

Pagination responses include these standard fields:

- `total`: Total number of items available
- `page`: Current page number
- `perPage`: Number of items per page
- `totalPages`: Total number of pages
- `hasMore`: Boolean indicating if there are more pages

## Websocket API

For real-time updates, the platform provides a WebSocket API at:

```
wss://api.beaver.social/v1/ws
```

### Authentication

WebSocket connections require authentication using a JWT token:

```
wss://api.beaver.social/v1/ws?token=eyJhbGciOiJ...
```

### Subscriptions

After connecting, you can subscribe to different event types:

```json
{
  "action": "subscribe",
  "channel": "posts",
  "data": {
    "userId": 42
  }
}
```

Available channels:

- `posts`: New posts from followed users
- `notifications`: User notifications
- `likes`: Likes on user's posts
- `replies`: Replies to user's posts
- `follows`: New followers

### Events

The server sends events in this format:

```json
{
  "type": "NEW_POST",
  "data": {
    "postId": 456,
    "authorId": 55,
    "author": {
      "username": "blockchain_dev",
      "avatarUrl": "https://..."
    },
    "content": "Excited about the new Sui update!",
    "createdAt": "2023-06-15T14:20:15Z"
  }
}
```

## Database Schema

The API backend is built on a relational database with the following core tables:

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  wallet_address VARCHAR(66) UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);
```

### Posts Table

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  author_id INTEGER NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  parent_id INTEGER REFERENCES posts(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  on_chain_id VARCHAR(66),
  CONSTRAINT content_length CHECK (LENGTH(content) <= 280)
);
```

### Follows Table

```sql
CREATE TABLE follows (
  follower_id INTEGER NOT NULL REFERENCES users(id),
  following_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, following_id)
);
```

### Likes Table

```sql
CREATE TABLE likes (
  user_id INTEGER NOT NULL REFERENCES users(id),
  post_id INTEGER NOT NULL REFERENCES posts(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id)
);
```

## API Development

### Local Development Setup

To set up the API for local development:

1. Clone the repository
2. Install dependencies
   ```bash
   cd packages/server/api
   npm install
   ```
3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
4. Start the development server
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:3000/api/v1`.

### Testing

Run the test suite with:

```bash
npm test
```

For coverage reports:

```bash
npm run test:coverage
```

## Deployment

The API can be deployed as a standalone service or as part of the full Beaver Social platform. Deployment configurations for various environments are included in the repository.

## Security Considerations

The API implements several security measures:

1. All requests are validated against JSON schemas
2. Rate limiting protects against abuse
3. Cryptographic signatures ensure action authenticity
4. CORS policies restrict access to authorized domains
5. JWT tokens expire and require refresh
6. Blockchain identity verification adds an additional security layer

## Further Resources

- [API Reference (OpenAPI Specification)](https://api.beaver.social/docs)
- [SDK Documentation](./4_beaver_client_sdk.md)
- [Server API Architecture](./2_architecture.md)
