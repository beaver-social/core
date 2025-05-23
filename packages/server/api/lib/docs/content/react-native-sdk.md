## Installation

```bash
npm install @beaver/react-native
# or
yarn add @beaver/react-native
```

## Getting Started

The Beaver React Native SDK provides a React Native Context provider and custom hooks for interacting with the Beaver Social platform. It's built on top of the Beaver Client SDK and leverages React Query for data fetching.

### Basic Setup

```tsx
import { BeaverProvider } from "@beaver/react-native";
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
            deepLinkOptions: {}, // Optional deep linking configuration
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

The `BeaverProvider` component establishes the connection to the Beaver Social platform and provides access to authentication state and client methods throughout your React Native application.

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
import { useBeaver } from "@beaver/react-native";

function ProfileComponent() {
  const { user, wallet, profile, post, follow } = useBeaver();

  if (!user) {
    return <Text>Not logged in</Text>;
  }

  return <Text>Welcome, {user.username}!</Text>;
}
```

### Authentication Hooks

#### `useLogin()`

Hook for logging in with a connected wallet.

```tsx
import { useLogin } from "@beaver/react-native";
import { Button, ActivityIndicator } from "react-native";

function LoginButton() {
  const { mutate: login, isPending } = useLogin();

  return (
    <Button
      title={isPending ? "Logging in..." : "Login with Wallet"}
      onPress={() => login()}
      disabled={isPending}
    />
  );
}
```

#### `useRegister()`

Hook for registering a new account.

```tsx
import { useState } from "react";
import { useRegister } from "@beaver/react-native";
import { View, TextInput, Button } from "react-native";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const { mutate: register, isPending } = useRegister();

  const handleSubmit = () => {
    register({ username });
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        title={isPending ? "Registering..." : "Register"}
        onPress={handleSubmit}
        disabled={isPending}
      />
    </View>
  );
}
```

### Wallet Hooks

#### `useWallets()`

Hook for managing wallet connections.

```tsx
import { useWallets } from "@beaver/react-native";
import { View, Button, FlatList } from "react-native";

function WalletConnect() {
  const { wallets, isConnected, connect, disconnect } = useWallets();

  return (
    <View>
      {isConnected ? (
        <Button title="Disconnect Wallet" onPress={() => disconnect()} />
      ) : (
        <FlatList
          data={wallets}
          keyExtractor={(wallet) => wallet.name}
          renderItem={({ item: wallet }) => (
            <Button
              title={`Connect ${wallet.name}`}
              onPress={() => connect({ wallet: wallet.name })}
            />
          )}
        />
      )}
    </View>
  );
}
```

### Social Interaction Hooks

#### `usePost()`

Hook for creating and interacting with posts.

```tsx
import { useState } from "react";
import { usePost } from "@beaver/react-native";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

function CreatePostForm() {
  const [content, setContent] = useState("");
  const { createPost } = usePost();

  const handleSubmit = () => {
    createPost.mutate({ content });
  };

  return (
    <View>
      <TextInput
        placeholder="What's happening?"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button
        title={createPost.isPending ? "Posting..." : "Post"}
        onPress={handleSubmit}
        disabled={createPost.isPending}
      />
    </View>
  );
}

function PostFeed() {
  const { getPosts } = usePost();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    getPosts({
      perPage: 20,
    });

  if (isLoading) return <Text>Loading posts...</Text>;

  return (
    <View>
      <FlatList
        data={data?.pages.flatMap((page) => page.posts) || []}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item: post }) => (
          <View>
            <Text>{post.content}</Text>
          </View>
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
}
```

#### `useFollow()`

Hook for managing follow relationships.

```tsx
import { useState } from "react";
import { useFollow } from "@beaver/react-native";
import { View, Button, Text, FlatList } from "react-native";

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
    <Button
      title={isFollowing ? "Unfollow" : "Follow"}
      onPress={handleToggleFollow}
      disabled={followUser.isPending || unfollowUser.isPending}
    />
  );
}

function FollowersList({ userId }) {
  const { getFollowers } = useFollow();
  const { data, isLoading } = getFollowers({ userId });

  if (isLoading) return <Text>Loading followers...</Text>;

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Followers</Text>
      <FlatList
        data={data?.followers || []}
        keyExtractor={(follower) => follower.id.toString()}
        renderItem={({ item: follower }) => <Text>{follower.username}</Text>}
      />
    </View>
  );
}
```

#### `useProfile()`

Hook for accessing user profiles.

```tsx
import { useProfile } from "@beaver/react-native";
import { View, Text, ActivityIndicator } from "react-native";

function UserProfile({ username }) {
  const { getProfile } = useProfile();
  const { data: profile, isLoading } = getProfile({ username });

  if (isLoading) return <ActivityIndicator />;
  if (!profile) return <Text>Profile not found</Text>;

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {profile.username}
      </Text>
      <Text>Followers: {profile.followerCount}</Text>
      <Text>Following: {profile.followingCount}</Text>
      <Text>Posts: {profile.postCount}</Text>
    </View>
  );
}
```

## Mobile-Specific Features

### Deep Linking

The React Native SDK supports deep linking for wallet connections and authentication flows:

```tsx
import { useBeaverDeepLinks } from "@beaver/react-native";

function DeepLinkHandler() {
  useBeaverDeepLinks({
    onLogin: (user) => {
      console.log("User logged in via deep link:", user);
      // Navigate to home screen
    },
    onError: (error) => {
      console.error("Deep link error:", error);
      // Show error message
    },
  });

  return null; // This component doesn't render anything
}
```

### Biometric Authentication

Optional biometric authentication for enhanced security:

```tsx
import { useBiometricAuth } from "@beaver/react-native";

function BiometricLoginButton() {
  const { authenticate, isAvailable } = useBiometricAuth();

  if (!isAvailable) return null;

  return (
    <Button
      title="Login with Biometrics"
      onPress={() => {
        authenticate().then((success) => {
          if (success) {
            console.log("Biometric authentication successful");
            // Proceed with login
          }
        });
      }}
    />
  );
}
```

### Push Notifications

Register for push notifications for social interactions:

```tsx
import { useNotifications } from "@beaver/react-native";

function NotificationSetup() {
  const { registerForPushNotifications, unregisterFromPushNotifications } =
    useNotifications();

  return (
    <View>
      <Button
        title="Enable Notifications"
        onPress={() => registerForPushNotifications()}
      />
      <Button
        title="Disable Notifications"
        onPress={() => unregisterFromPushNotifications()}
      />
    </View>
  );
}
```

## Navigation Integration

Integrate with React Navigation:

```tsx
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BeaverNavigationProvider, useBeaver } from "@beaver/react-native";

const Stack = createStackNavigator();

function AuthGuard({ children }) {
  const { user, isAuthenticated } = useBeaver();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return children;
}

function App() {
  return (
    <NavigationContainer>
      <BeaverNavigationProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      </BeaverNavigationProvider>
    </NavigationContainer>
  );
}
```

## Offline Support

The SDK provides offline support through data persistence:

```tsx
import { useOfflineSupport } from "@beaver/react-native";

function OfflineIndicator() {
  const { isOffline, pendingActions, syncWhenOnline } = useOfflineSupport();

  if (!isOffline) return null;

  return (
    <View>
      <Text>
        You're offline. {pendingActions.length} actions will sync when
        connection is restored.
      </Text>
      <Button title="Sync Now" onPress={syncWhenOnline} />
    </View>
  );
}
```

## Error Handling

All hooks that perform mutations or queries use React Query's error handling capabilities:

```tsx
import { Alert } from "react-native";
import { usePost } from "@beaver/react-native";

function ErrorHandlingExample() {
  const { createPost } = usePost();

  return (
    <View>
      <Button
        title="Create Empty Post"
        onPress={() =>
          createPost.mutate(
            { content: "" }, // This would cause an error
            {
              onError: (error) => {
                console.error("Post creation failed:", error);
                Alert.alert("Error", error.message);
              },
            },
          )
        }
      />

      {createPost.isError && (
        <Text style={{ color: "red" }}>Error: {createPost.error.message}</Text>
      )}
    </View>
  );
}
```

## TypeScript Support

The Beaver React Native SDK provides full TypeScript support with type definitions for all hooks, functions, and returned data.

## API Reference

Please refer to the [Beaver Client SDK documentation](./typescript-sdk.md) for complete details on the underlying API methods that these React Native hooks wrap.
