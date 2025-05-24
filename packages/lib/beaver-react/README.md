# Beaver React SDK

A React SDK for integrating with the Beaver Social platform. This SDK is a complete wrapper around the `@beaver/client` package and provides all of its functionality in a React-friendly way.

## Features

- Complete wrapping of `@beaver/client` - All types, functions, and modules are re-exported
- React Context Provider for easy integration
- React Hooks for accessing all client functionality
- TypeScript support with full type definitions

## Installation

```bash
npm install @beaver/react
# or
yarn add @beaver/react
# or
pnpm add @beaver/react
```

## Getting Started

Wrap your application with the `BeaverProvider`:

```tsx
import { BeaverProvider } from "@beaver/react";
import { MySurfaceImplementation } from "./my-wallet-surface";

function App() {
  const surface = new MySurfaceImplementation();
  const config = {
    apiBaseUrl: "https://beaversocial.xyz/api/v1",
    network: "mainnet",
    debug: true,
  };

  return (
    <BeaverProvider surface={surface} config={config}>
      <YourApp />
    </BeaverProvider>
  );
}
```

## Hooks

### useBeaverClient

The primary hook that provides access to the entire Beaver client and its state:

```tsx
import { useBeaverClient } from "@beaver/react";

function MyComponent() {
  const {
    client, // Full access to the raw client
    isInitialized,
    isLoading,
    error,
    // Direct access to client modules:
    identity, // Same as client.identity
    post, // Same as client.post
    swipe, // Same as client.swipe
    user, // Same as client.user
  } = useBeaverClient();

  if (isLoading) {
    return <div>Loading Beaver client...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isInitialized) {
    return <div>Beaver client not initialized</div>;
  }

  // Now you can use any client module directly
  return <div>Beaver client is ready!</div>;
}
```

### useIdentity

Work with user identity and authentication:

```tsx
import { useIdentity } from "@beaver/react";

function ProfileComponent() {
  const { identity, isInitialized, error } = useIdentity();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (identity) {
      identity.getProfile().then(setProfile);
    }
  }, [identity]);

  if (!isInitialized || !identity) {
    return <div>Loading identity...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {profile && <p>Username: {profile.username}</p>}
      <button onClick={() => identity.signOut()}>Sign Out</button>
    </div>
  );
}
```

### usePost

Create and interact with posts:

```tsx
import { usePost } from "@beaver/react";

function PostsComponent() {
  const { post, isInitialized } = usePost();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (post) {
      post.getLatestPosts().then(setPosts);
    }
  }, [post]);

  const createNewPost = async (content) => {
    if (post) {
      const newPost = await post.create({ content });
      setPosts([newPost, ...posts]);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => createNewPost("Hello Beaver Social!")}>
        Create Post
      </button>
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.content}</div>
        ))}
      </div>
    </div>
  );
}
```

### useSwipe

Work with swipes (if applicable to your app):

```tsx
import { useSwipe } from "@beaver/react";

function SwipesComponent() {
  const { swipe } = useSwipe();

  const handleSwipe = async (postId, direction) => {
    if (swipe) {
      await swipe.create({ postId, direction });
    }
  };

  return (
    <div>
      <button onClick={() => handleSwipe("post123", "right")}>
        Swipe Right
      </button>
    </div>
  );
}
```

### useUser

Work with user-related functionality:

```tsx
import { useUser } from "@beaver/react";

function UserComponent() {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      user.getProfile().then(setUserProfile);
    }
  }, [user]);

  return (
    <div>
      {userProfile && (
        <div>
          <h2>{userProfile.username}</h2>
          <p>{userProfile.bio}</p>
        </div>
      )}
    </div>
  );
}
```

## Example Application

Check out the example application in the examples directory for a complete implementation.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request
