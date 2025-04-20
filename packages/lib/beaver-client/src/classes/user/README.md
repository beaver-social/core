# User Module

This module provides functionality to interact with user-related features in the Beaver Social Layer.

## Usage

```typescript
import { BeaverClient } from "@beaver/client";

// Initialize the client
const client = new BeaverClient(surface, { debug: true });
await client.initialize();

// Get the user instance
const user = client.user;

// Use the user methods
const currentUser = await user.getCurrentUser();
```

## Available Methods

### Retrieval Methods

- `getCurrentUser()`: Get the currently authenticated user's details.
- `getById({ id })`: Get a user's details by their ID.
- `find({ identity, username, suinsDomainName, address })`: Find a user by various identifiers.
- `getInteractions({ page, limit, type })`: Get a user's interactions (likes, saves, reposts, comments, follows, topic follows).
- `getSuggestions()`: Get suggested users to follow.
- `getAwards({ page, limit, type })`: Get a user's awards (owned or given).

### Management Methods

- `update({ username, bio, pfp, banner })`: Update the current user's profile details.
- `syncSuins()`: Sync Suins domain names with the user's account.

## Examples

### Get Current User

```typescript
const currentUser = await user.getCurrentUser();
console.log(currentUser.user);
```

### Update User Profile

```typescript
const updatedUser = await user.update({
  username: "newusername",
  bio: "My new bio",
});
console.log(updatedUser.user);
```

### Find User by Username

```typescript
const foundUser = await user.find({
  username: "someusername",
});
console.log(foundUser.id);
```

### Get User Interactions

```typescript
const likes = await user.getInteractions({
  page: 1,
  limit: 10,
  type: "likes",
});
console.log(likes.data);
```
