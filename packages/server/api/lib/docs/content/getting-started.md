## Overview

Beaver Social is a Web3 Social Network Layer built on the Sui Blockchain. It provides developers with:

- Authentication using blockchain wallets
- Social features (profiles, posts, follows, likes, etc.)
- Blockchain integration for data permanence and verification
- Customizable UI components

## Prerequisites

Before getting started, make sure you have:

- You will need to acquire an AppID to start developing with Beaver. [Get your AppID](/dev/appid)

## Installation Options

Depending on your needs, you can integrate Beaver Social in multiple ways:

1. **Beaver React SDK** - For React applications needing full UI components
2. **Beaver Client SDK** - For any JavaScript/TypeScript applications
3. **Direct API Integration** - For custom integrations in any language

### Option 1: React SDK (Recommended for Web Apps)

```bash
# Install the React SDK and dependencies
npm install @beaver/react @tanstack/react-query
```

### Option 2: Client SDK

```bash
# Install the client SDK
npm install @beaver/client
```

### Option 3: Direct API Integration

Use your preferred HTTP client to integrate directly with our REST API.

## Quick Start (React SDK)

Here's how to get started with the React SDK:

### 1. Set Up Provider

Wrap your application with the `BeaverProvider` and React Query's `QueryClientProvider`:

```tsx
// src/App.tsx
import React from "react";
import { BeaverProvider } from "@beaver/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BeaverProvider
        config={{
          network: "testnet", // Use 'testnet' for development
          apiBaseUrl: "https://beaversocial.xyz/api/v1",
          debug: true, // Enable logging during development
          // Optional: Configure zkLogin wallets
          zkLoginWallets: {
            enabled: true,
          },
          appId: "your-app-id",
        }}
      >
        <YourApp />
      </BeaverProvider>
    </QueryClientProvider>
  );
}

export default App;
```

### 2. Implement Authentication

Add wallet connection and user authentication:

```tsx
// src/components/Auth.tsx
import React from "react";
import { useBeaver, useWallets, useLogin, useRegister } from "@beaver/react";

function Auth() {
  const { user } = useBeaver();
  const { wallets, isConnected, connect, disconnect } = useWallets();
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: register, isPending: isRegistering } = useRegister();
  const [username, setUsername] = useState("");

  // If user is already logged in
  if (user) {
    return (
      <div>
        <h2>Welcome, {user.username}!</h2>
        <button onClick={() => disconnect()}>Disconnect Wallet</button>
      </div>
    );
  }

  // If connected but not registered/logged in
  if (isConnected) {
    return (
      <div>
        <h2>Wallet Connected</h2>

        {/* Login button */}
        <button onClick={() => login()} disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login with Connected Wallet"}
        </button>

        {/* Registration form */}
        <div>
          <h3>New user? Register:</h3>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => register({ username })}
            disabled={isRegistering || !username}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    );
  }

  // Not connected to a wallet
  return (
    <div>
      <h2>Connect your wallet</h2>
      {wallets.map((wallet) => (
        <button
          key={wallet.name}
          onClick={() => connect({ wallet: wallet.name })}
        >
          Connect {wallet.name}
        </button>
      ))}
    </div>
  );
}

export default Auth;
```

### 3. Create a Post Feed

Display a feed of posts:

```tsx
// src/components/PostFeed.tsx
import React from "react";
import { usePost } from "@beaver/react";

function PostFeed() {
  const { getPosts } = usePost();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    getPosts({ perPage: 10 });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="post-feed">
      <h2>Recent Posts</h2>

      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <img src={post.author.avatarUrl} alt={post.author.username} />
                <span>{post.author.username}</span>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-footer">
                <span>Likes: {post.likeCount}</span>
                <span>Replies: {post.replyCount}</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </div>
  );
}

export default PostFeed;
```

### 4. Create a Post Composer

Allow users to create new posts:

```tsx
// src/components/PostComposer.tsx
import React, { useState } from "react";
import { usePost, useBeaver } from "@beaver/react";

function PostComposer() {
  const [content, setContent] = useState("");
  const { createPost } = usePost();
  const { user } = useBeaver();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    createPost.mutate(
      { content },
      {
        onSuccess: () => {
          setContent(""); // Clear the input on success
        },
      }
    );
  };

  if (!user) {
    return <div>Please log in to post</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="post-composer">
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={280}
      />
      <div className="composer-footer">
        <span>{280 - content.length} characters left</span>
        <button
          type="submit"
          disabled={!content.trim() || createPost.isPending}
        >
          {createPost.isPending ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}

export default PostComposer;
```

### 5. User Profile Page

Display a user's profile and their posts:

```tsx
// src/components/UserProfile.tsx
import React from "react";
import { useProfile, usePost, useFollow, useBeaver } from "@beaver/react";

function UserProfile({ username }) {
  const { user: currentUser } = useBeaver();
  const { getProfile } = useProfile();
  const { getPosts } = usePost();
  const { followUser, unfollowUser } = useFollow();

  const { data: profile, isLoading: profileLoading } = getProfile({ username });

  const { data: postsData, isLoading: postsLoading } = getPosts({
    authorId: profile?.id,
    perPage: 10,
  });

  if (profileLoading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>User not found</div>;
  }

  const isCurrentUser = currentUser?.id === profile.id;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={profile.avatarUrl}
          alt={profile.username}
          className="avatar"
        />
        <h2>{profile.username}</h2>
        {profile.bio && <p className="bio">{profile.bio}</p>}

        <div className="stats">
          <span>Followers: {profile.followerCount}</span>
          <span>Following: {profile.followingCount}</span>
          <span>Posts: {profile.postCount}</span>
        </div>

        {!isCurrentUser && currentUser && (
          <button
            onClick={() =>
              profile.isFollowing
                ? unfollowUser.mutate({ userId: profile.id })
                : followUser.mutate({ userId: profile.id })
            }
            disabled={followUser.isPending || unfollowUser.isPending}
          >
            {profile.isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      <div className="profile-posts">
        <h3>Posts</h3>
        {postsLoading ? (
          <div>Loading posts...</div>
        ) : (
          postsData?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.posts.map((post) => (
                <div key={post.id} className="post">
                  <div className="post-content">{post.content}</div>
                  <div className="post-footer">
                    <span>Likes: {post.likeCount}</span>
                    <span>Replies: {post.replyCount}</span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

export default UserProfile;
```

## Client SDK Integration

If you're not using React, you can use the Client SDK directly:

```typescript
import { BeaverClient } from "@beaver/client";

// Initialize the client
const client = new BeaverClient({
  network: "testnet",
  apiBaseUrl: "https://beaversocial.xyz/api/v1",
  debug: true,
});

// Wait for client initialization
client.on("beaver:ready", async () => {
  try {
    // Connect wallet
    await client.connector.connect({ wallet: "sui-wallet" });

    // Log in
    await client.user.login();

    // Get user's profile
    const profile = await client.user.getProfile({
      userId: client.auth.user.id,
    });
    console.log("My profile:", profile);

    // Get recent posts
    const posts = await client.posts.getPosts({ perPage: 10 });
    console.log("Recent posts:", posts);

    // Create a post
    await client.posts.createPost({
      content: "Hello from Beaver Social!",
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
```

## Advanced Integration

### Customizing the UI

The React SDK provides basic functionality, but you can customize the UI components to match your application's design:

1. Create your own components that use the hooks from the React SDK
2. Implement your own styling on top of the provided components
3. Mix and match SDK components with your own custom components

### Handling Authentication Flows

For a smooth authentication experience:

1. Store authentication state in your application
2. Check for existing connections on app startup
3. Implement proper error handling for wallet connection issues
4. Guide users through the wallet connection and account creation process

### Offline Support

For applications that need offline capabilities:

1. Implement a local queue for actions performed while offline
2. Sync the queue with the server when the connection is restored
3. Use optimistic UI updates for immediate feedback

## Running a Local Development Environment

For contributing to Beaver Social or developing with a local instance:

1. Clone the repository:

   ```bash
   git clone https://github.com/beaver-social/beaver.git
   cd beaver
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Start the API server:
   ```bash
   cd packages/server/api
   npm run dev
   ```

You can now interact with the local API at `http://localhost:3000/api/v1`.

## Common Pitfalls and Troubleshooting

### Wallet Connection Issues

- Ensure your browser has the wallet extension installed
- Check that the wallet is configured for the correct network
- Try refreshing the page if the wallet doesn't connect

### API Errors

- Check your API configuration (correct URL and network)
- Verify that your JWT token is valid and not expired
- Check rate limiting headers if you're making many requests

### Build Issues

- Ensure you're using compatible versions of React and React Query
- Check for environment-specific issues (browser support, etc.)
- Verify that all dependencies are correctly installed

## Next Steps

Now that you've got the basics set up, you can:

1. Explore the [Beaver React SDK Documentation](./3_beaver_react_sdk.md) for more advanced React integration
2. Check out the [Beaver Client SDK Documentation](./4_beaver_client_sdk.md) for direct API usage
3. Learn about the [Server API](./5_server_api.md) for custom integrations
4. Understand the [Move Contracts](./6_move_contracts.md) for blockchain interactions

## Community and Support

- **GitHub Repository**: [https://github.com/beaver-social/beaver](https://github.com/beaver-social/beaver)
- **Documentation**: [https://docs.beaver.social](https://docs.beaver.social)
- **Discord**: [https://discord.gg/beaversocial](https://discord.gg/beaversocial)
- **Twitter**: [@BeaverSocial](https://twitter.com/BeaverSocial)
