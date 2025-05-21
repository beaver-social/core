# Beaver React SDK

This document provides comprehensive documentation for working with the Beaver React SDK, which offers React-specific bindings for interacting with the Beaver Social API.

## Installation

```bash
npm install @beaver/react
# or
yarn add @beaver/react
```

## Getting Started

The Beaver React SDK provides a React Context provider and custom hooks for interacting with the Beaver Social platform. It's built on top of the Beaver Client SDK and leverages React Query for data fetching.

### Basic Setup

```tsx
import { BeaverProvider } from "@beaver/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BeaverProvider
        config={{
          network: "testnet", // or 'mainnet', 'devnet'
          apiBaseUrl: "https://api.beaver.social/v1",
          // Optional: enable zkLogin wallet support
          zkLoginWallets: {
            enabled: true,
            windowFeatures: {}, // Optional window features for wallet connections
          },
          debug: true, // Optional: enables SDK logging
        }}
      >
        <YourApp />
      </BeaverProvider>
    </QueryClientProvider>
  );
}
```

## Context Provider

The `BeaverProvider` component establishes the connection to the Beaver Social platform and provides access to authentication state and client methods throughout your application.

### Props

| Prop       | Type                 | Description                                                  |
| ---------- | -------------------- | ------------------------------------------------------------ |
| `config`   | `BeaverClientConfig` | Configuration object for the Beaver client                   |
| `children` | `React.ReactNode`    | Child components that will have access to the Beaver context |

### Context Values

The Beaver context provides the following values through the `useBeaverContext` hook:

| Value             | Type                 | Description                                                    |
| ----------------- | -------------------- | -------------------------------------------------------------- |
| `client`          | `BeaverClient`       | The initialized Beaver client instance                         |
| `user`            | `BeaverUser \| null` | The currently authenticated user, or null if not authenticated |
| `isAuthenticated` | `boolean`            | Whether a user is currently authenticated                      |
| `isConnected`     | `boolean`            | Whether the wallet is connected                                |
| `hasIdentity`     | `boolean`            | Whether the connected wallet has a Beaver identity             |

## Hooks

The SDK provides various hooks for interacting with the Beaver Social platform:

### `useBeaver()`

The main hook that provides access to all SDK functionality.

```tsx
import { useBeaver } from "@beaver/react";

function ProfileComponent() {
  const { user, wallet, profile, post, follow } = useBeaver();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return <div>Welcome, {user.username}!</div>;
}
```

### Authentication Hooks

#### `useLogin()`

Hook for logging in with a connected wallet.

```tsx
import { useLogin } from "@beaver/react";

function LoginButton() {
  const { mutate: login, isPending } = useLogin();

  return (
    <button onClick={() => login()} disabled={isPending}>
      {isPending ? "Logging in..." : "Login with Wallet"}
    </button>
  );
}
```

#### `useRegister()`

Hook for registering a new account.

```tsx
import { useRegister } from "@beaver/react";

function RegisterForm() {
  const { mutate: register, isPending } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;

    register({ username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
```

### Wallet Hooks

#### `useWallets()`

Hook for managing wallet connections.

```tsx
import { useWallets } from "@beaver/react";

function WalletConnect() {
  const { wallets, isConnected, connect, disconnect } = useWallets();

  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect()}>Disconnect Wallet</button>
      ) : (
        <div>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => connect({ wallet: wallet.name })}
            >
              Connect {wallet.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Social Interaction Hooks

#### `usePost()`

Hook for creating and interacting with posts.

```tsx
import { usePost } from "@beaver/react";

function CreatePostForm() {
  const { createPost } = usePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.content.value;

    createPost.mutate({ content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="content" placeholder="What's happening?" />
      <button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

function PostFeed() {
  const { getPosts } = usePost();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = getPosts({
    perPage: 20,
  });

  return (
    <div>
      {data?.pages.map((page) =>
        page.posts.map((post) => <div key={post.id}>{post.content}</div>)
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </div>
  );
}

function PostDetails({ postId }) {
  const { getPostById, likePost, unlikePost } = usePost();
  const { data: post, isLoading } = getPostById({ postId });

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h2>{post.author.username}</h2>
      <p>{post.content}</p>
      <button
        onClick={() =>
          post.liked
            ? unlikePost.mutate({ postId })
            : likePost.mutate({ postId })
        }
      >
        {post.liked ? "Unlike" : "Like"} ({post.likeCount})
      </button>
    </div>
  );
}
```

#### `useFollow()`

Hook for managing follow relationships.

```tsx
import { useFollow } from "@beaver/react";

function FollowButton({ userId, initialIsFollowing }) {
  const { followUser, unfollowUser } = useFollow();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggleFollow = () => {
    if (isFollowing) {
      unfollowUser.mutate({ userId });
      setIsFollowing(false);
    } else {
      followUser.mutate({ userId });
      setIsFollowing(true);
    }
  };

  return (
    <button
      onClick={handleToggleFollow}
      disabled={followUser.isPending || unfollowUser.isPending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

function FollowersList({ userId }) {
  const { getFollowers } = useFollow();
  const { data, isLoading } = getFollowers({ userId });

  if (isLoading) return <div>Loading followers...</div>;

  return (
    <div>
      <h3>Followers</h3>
      <ul>
        {data?.followers.map((follower) => (
          <li key={follower.id}>{follower.username}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### `useProfile()`

Hook for accessing user profiles.

```tsx
import { useProfile } from "@beaver/react";

function UserProfile({ username }) {
  const { getProfile } = useProfile();
  const { data: profile, isLoading } = getProfile({ username });

  if (isLoading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>Followers: {profile.followerCount}</p>
      <p>Following: {profile.followingCount}</p>
      <p>Posts: {profile.postCount}</p>
    </div>
  );
}

function UserSearch({ query }) {
  const { searchSuggestions } = useProfile();
  const { data: results, isLoading } = searchSuggestions({ query });

  if (isLoading) return <div>Searching...</div>;

  return (
    <div>
      <h3>Search Results</h3>
      <ul>
        {results?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Advanced Usage

### Combining Multiple Hooks

You can combine multiple hooks to create complex components:

```tsx
import { useBeaver, usePost, useProfile } from "@beaver/react";

function UserProfileWithPosts({ username }) {
  const { user } = useBeaver();
  const { getProfile } = useProfile();
  const { getPosts } = usePost();

  const { data: profile } = getProfile({ username });
  const { data: postsData } = getPosts({
    authorId: profile?.id,
    perPage: 10,
  });

  const isOwnProfile = user?.id === profile?.id;

  return (
    <div>
      {/* Profile information */}
      {profile && (
        <div>
          <h1>{profile.username}</h1>
          {isOwnProfile && <span>(This is you)</span>}
          {/* Follow button, etc. */}
        </div>
      )}

      {/* User's posts */}
      {postsData?.pages.map((page) =>
        page.posts.map((post) => <div key={post.id}>{post.content}</div>)
      )}
    </div>
  );
}
```

## Error Handling

All hooks that perform mutations or queries use React Query's error handling capabilities:

```tsx
function ErrorHandlingExample() {
  const { createPost } = usePost();

  return (
    <div>
      <button
        onClick={() =>
          createPost.mutate(
            { content: "" }, // This would cause an error
            {
              onError: (error) => {
                console.error("Post creation failed:", error);
                alert(`Error: ${error.message}`);
              },
            }
          )
        }
      >
        Create Empty Post
      </button>

      {createPost.isError && (
        <div style={{ color: "red" }}>Error: {createPost.error.message}</div>
      )}
    </div>
  );
}
```

## TypeScript Support

The Beaver React SDK provides full TypeScript support with type definitions for all hooks, functions, and returned data.

## API Reference

Please refer to the [Beaver Client SDK documentation](./4_beaver_client_sdk.md) for complete details on the underlying API methods that these React hooks wrap.
