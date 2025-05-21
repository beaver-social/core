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
