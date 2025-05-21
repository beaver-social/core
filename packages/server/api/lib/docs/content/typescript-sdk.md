## Installation

```bash
npm install @beaver/client
# or
yarn add @beaver/client
```

## Getting Started

The Beaver Client SDK provides a modular, TypeScript-based interface for interacting with the Beaver Social platform.

```typescript
import { BeaverClient } from "@beaver/client";

// Initialize the client
const client = new BeaverClient({
  network: "testnet", // or 'mainnet', 'devnet'
  apiBaseUrl: "https://api.beaver.social/v1",
  debug: true, // Optional: enables SDK logging
  // Optional: enable zkLogin wallet support
  zkLoginWallets: {
    enabled: true,
    windowFeatures: {}, // Optional window features for wallet connections
  },
});

// Wait for the client to be ready
client.on("beaver:ready", async () => {
  console.log("Beaver Client is ready!");

  // Example: List available wallets
  const wallets = client.connector.getWallets();
  console.log("Available wallets:", wallets);
});
```

## Client Configuration

The `BeaverClient` constructor accepts a configuration object with the following properties:

| Property         | Type                                            | Required | Description                                                               |
| ---------------- | ----------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `network`        | `string`                                        | Yes      | The Sui network to connect to: 'devnet', 'testnet', or 'mainnet'          |
| `apiBaseUrl`     | `string`                                        | No       | The base URL for the Beaver API (defaults to 'https://beaver.xyz/api/v1') |
| `debug`          | `boolean`                                       | No       | Enable debug logging                                                      |
| `zkLoginWallets` | `{ enabled: boolean, windowFeatures?: object }` | No       | Configuration for zkLogin wallets                                         |

## Core Modules

The Beaver Client SDK is organized into several modules, each handling a different aspect of the platform:

### Connector

The Connector module manages wallet connections and identity verification.

```typescript
// Get available wallets
const wallets = client.connector.getWallets();

// Connect to a wallet
await client.connector.connect({ wallet: "sui-wallet" });

// Disconnect current wallet
await client.connector.disconnect();
```

#### Key Methods

| Method                          | Description                                      | Parameters                    |
| ------------------------------- | ------------------------------------------------ | ----------------------------- |
| `getWallets()`                  | Returns a list of available wallets              | None                          |
| `connect(options)`              | Connects to a specified wallet                   | `{ wallet: string }`          |
| `disconnect()`                  | Disconnects the current wallet                   | None                          |
| `enableZkLoginWallets(options)` | Enables zkLogin wallet support                   | `{ windowFeatures?: object }` |
| `tryRestoreConnection()`        | Attempts to restore a previous wallet connection | None                          |

### User

The User module handles user authentication, profile management, and social interactions.

```typescript
// Register a new user
await client.user.register({ username: "beaverfan123" });

// Log in with connected wallet
await client.user.login();

// Get a user's profile
const profile = await client.user.getProfile({ username: "cryptobuilder" });

// Follow a user
await client.user.followUser({ userId: 42 });
```

#### Key Methods

| Method                       | Description                                 | Parameters                                            |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| `register(options)`          | Registers a new user                        | `{ username: string }`                                |
| `login()`                    | Logs in with the connected wallet           | None                                                  |
| `logout()`                   | Logs out the current user                   | None                                                  |
| `getProfile(options)`        | Retrieves a user's profile                  | `{ username?: string, userId?: number }`              |
| `followUser(options)`        | Follows a user                              | `{ userId: number }`                                  |
| `unfollowUser(options)`      | Unfollows a user                            | `{ userId: number }`                                  |
| `getFollowers(options)`      | Gets a user's followers                     | `{ userId: number, page?: number, perPage?: number }` |
| `getFollowing(options)`      | Gets users that a user is following         | `{ userId: number, page?: number, perPage?: number }` |
| `getFollowCount(options)`    | Gets a user's follower and following counts | `{ userId: number }`                                  |
| `searchSuggestions(options)` | Searches for users matching a query         | `{ query: string, page?: number, perPage?: number }`  |

### Posts

The Posts module manages creation and interaction with posts in the social network.

```typescript
// Create a new post
await client.posts.createPost({ content: "Hello, Beaver Social!" });

// Get recent posts
const posts = await client.posts.getPosts({ perPage: 20, page: 1 });

// Like a post
await client.posts.likePost({ postId: 123 });
```

#### Key Methods

| Method                            | Description                                    | Parameters                                                                                         |
| --------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `createPost(options)`             | Creates a new post                             | `{ content: string, parentId?: number }`                                                           |
| `getPosts(options)`               | Gets a paginated list of posts                 | `{ page?: number, perPage?: number, authorId?: number, parentId?: number, repliesOnly?: boolean }` |
| `getPostById(options)`            | Gets a specific post by ID                     | `{ postId: number }`                                                                               |
| `getPostReplies(options)`         | Gets replies to a specific post                | `{ postId: number, page?: number, perPage?: number }`                                              |
| `getFollowingPosts(options)`      | Gets posts from users the current user follows | `{ page?: number, perPage?: number }`                                                              |
| `likePost(options)`               | Likes a post                                   | `{ postId: number }`                                                                               |
| `unlikePost(options)`             | Unlikes a post                                 | `{ postId: number }`                                                                               |
| `bookmarkPost(options)`           | Bookmarks a post                               | `{ postId: number }`                                                                               |
| `unbookmarkPost(options)`         | Removes a bookmark from a post                 | `{ postId: number }`                                                                               |
| `getPostLikes(options)`           | Gets users who liked a post                    | `{ postId: number, page?: number, perPage?: number }`                                              |
| `getPostReposts(options)`         | Gets users who reposted a post                 | `{ postId: number, page?: number, perPage?: number }`                                              |
| `getUserPostInteraction(options)` | Gets a user's interaction with a post          | `{ postId: number, userId?: number }`                                                              |

## Event System

The Beaver Client SDK uses an event system to communicate state changes and important events.

```typescript
// Listen for authentication events
client.on("user:login", ({ user }) => {
  console.log("User logged in:", user);
});

client.on("user:logout", () => {
  console.log("User logged out");
});

// Listen for connection events
client.on("connection:change", ({ connection, hasIdentity }) => {
  console.log("Connection changed:", connection);
  console.log("Has identity:", hasIdentity);
});

// Listen for client ready event
client.on("beaver:ready", () => {
  console.log("Beaver client is ready");
});
```

### Key Events

| Event               | Description                                | Payload                                            |
| ------------------- | ------------------------------------------ | -------------------------------------------------- |
| `beaver:ready`      | Fired when the client is fully initialized | `{}`                                               |
| `user:login`        | Fired when a user logs in                  | `{ user: BeaverUser }`                             |
| `user:logout`       | Fired when a user logs out                 | `{}`                                               |
| `connection:change` | Fired when wallet connection changes       | `{ connection: Connection, hasIdentity: boolean }` |

## Blockchain Integration

The SDK integrates with the Sui blockchain through the official Sui SDK.

```typescript
// Access the Sui client
const suiClient = client.defaults.suiClient;

// Access contract interface
const contracts = client.contracts;
```

## Error Handling

The SDK provides consistent error handling through JavaScript Error objects:

```typescript
try {
  await client.user.login();
} catch (error) {
  console.error("Login failed:", error.message);

  // Example for specific error handling
  if (error.message.includes("wallet not connected")) {
    // Prompt user to connect wallet first
  }
}
```

## TypeScript Support

The Beaver Client SDK is built with TypeScript and provides full type definitions for all methods, parameters, and return types.

## Examples

### Complete User Registration & Post Flow

```typescript
import { BeaverClient } from "@beaver/client";

async function registerAndPost() {
  const client = new BeaverClient({
    network: "testnet",
    apiBaseUrl: "https://api.beaver.social/v1",
  });

  // Wait for client to be ready
  await new Promise((resolve) => client.on("beaver:ready", resolve));

  try {
    // 1. Connect wallet
    await client.connector.connect({ wallet: "sui-wallet" });

    // 2. Register a new user (if new)
    try {
      await client.user.register({ username: "beaverfan123" });
    } catch (e) {
      // User might already exist, try logging in
      console.log("Registration failed, attempting login");
    }

    // 3. Login with connected wallet
    await client.user.login();

    // 4. Create a post
    await client.posts.createPost({
      content: "My first post on Beaver Social!",
    });

    // 5. Get my profile
    const myProfile = await client.user.getProfile({
      userId: client.auth.user?.id,
    });
    console.log("My profile:", myProfile);

    // 6. Get my posts
    const myPosts = await client.posts.getPosts({
      authorId: client.auth.user?.id,
    });
    console.log("My posts:", myPosts);
  } catch (error) {
    console.error("Error in flow:", error.message);
  }
}

registerAndPost();
```

### Search & Follow Users

```typescript
import { BeaverClient } from "@beaver/client";

async function searchAndFollow(query: string) {
  const client = new BeaverClient({
    network: "testnet",
    apiBaseUrl: "https://api.beaver.social/v1",
  });

  // Wait for client to be ready
  await new Promise((resolve) => client.on("beaver:ready", resolve));

  try {
    // Ensure user is logged in
    if (!client.auth.isAuthenticated) {
      console.log("Please log in first");
      return;
    }

    // Search for users
    const results = await client.user.searchSuggestions({
      query,
      perPage: 5,
    });

    console.log(`Found ${results.length} users matching "${query}"`);

    // Follow the first user in results (if any)
    if (results.length > 0) {
      const userToFollow = results[0];
      await client.user.followUser({ userId: userToFollow.id });
      console.log(`You are now following ${userToFollow.username}`);

      // Get your updated following list
      const following = await client.user.getFollowing({
        userId: client.auth.user?.id as number,
      });
      console.log("Your following list:", following);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

searchAndFollow("crypto");
```

## API Reference

For a complete list of methods and parameters, please refer to the TypeScript definitions provided with the package.
