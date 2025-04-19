# Post Module

This module provides functionality for interacting with posts in the Beaver Social platform.

## Structure

The post module has been refactored to improve maintainability and organization. Here's the structure:

- `Post.ts` - Core class with constructor and properties
- `index.ts` - Entry point that imports and assembles all components
- `retrieval.ts` - Methods for retrieving posts and feeds
- `management.ts` - Methods for creating, updating, and deleting posts
- `interactions.ts` - Methods for post interactions (likes, reposts, etc.)
- `moderation.ts` - Methods for post moderation (reporting, pinning, etc.)

## Usage

```typescript
// Get the post module from the BeaverClient
const post = client.post;

// Example: Create a post
await post.create({
  content: "Hello world!",
  flags: { nsfw: false },
});

// Example: Get feed
const feed = await post.getFeed({ page: 1, limit: 10 });
```

## API Methods

### Retrieval Methods

- `getByID`: Retrieve a post by ID
- `getFeed`: Get the public post feed
- `getInteractionCount`: Get interaction counts for a post
- `getInteractionsByType`: Get interactions of a specific type
- `getUserFeed`: Get user-specific feed
- `getUserProfilePosts`: Get posts for user profile

### Management Methods

- `create`: Create a new post
- `delete`: Delete a post
- `update`: Update a post

### Interaction Methods

- `like`: Like a post
- `unlike`: Unlike a post
- `repost`: Repost a post
- `unrepost`: Unrepost a post
- `save`: Save a post
- `unsave`: Unsave a post

### Moderation Methods

- `report`: Report a post
- `pin`: Pin a post to profile
- `unpin`: Unpin a post from profile

## Development

When adding new functionality to the post module:

1. Determine which category your functionality belongs to
2. Add your method to the appropriate file (or create a new file if needed)
3. If creating a new category file, import and add it to the `index.ts` file
