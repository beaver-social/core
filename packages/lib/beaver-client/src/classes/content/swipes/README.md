# Swipe Module

The Swipe module provides functionality for interacting with swipes in the Beaver Social platform. Swipes are a type of content that users can create, interact with, and manage.

## Usage

```typescript
import { BeaverClient } from "@beavers/client";

// Initialize the client
const client = new BeaverClient({
  // configuration options
});

// Create a swipe
await client.content.swipes.create({
  caption: "Hello world!",
  media: {
    buffer: videoBuffer, // Buffer or Uint8Array containing video data
    thumbnailUrl: "https://example.com/thumbnail.jpg", // optional
    duration: 15, // optional, in seconds
    width: 1080, // optional
    height: 1920, // optional
    altText: "Description of the video", // optional
  },
  flags: {
    nsfw: false,
  },
});

// Get a swipe by ID
const swipe = await client.content.swipes.getByID({ id: 123 });

// Like a swipe
await client.content.swipes.like({ id: 123 });

// Get swipes feed
const feed = await client.content.swipes.getFeed({ page: 1, limit: 10 });
```

## API Reference

### Retrieval Methods

- `getByID({ id })` - Get a swipe by ID
- `getFeed({ page, limit })` - Get public swipe feed
- `getInteractionsByType({ id, type, page, limit })` - Get interactions for a swipe
- `getUserFeed({ page, limit, type })` - Get personalized swipe feed
- `getUserProfileSwipes({ page, limit })` - Get user's swipes

### Management Methods

- `create({ caption, media, parentId, flags })` - Create a new swipe with video media
- `update({ id, caption, flags })` - Update an existing swipe
- `delete({ id })` - Delete a swipe

### Interaction Methods

- `like({ id })` - Like a swipe
- `unlike({ id })` - Unlike a swipe
- `repost({ id, quote })` - Repost a swipe
- `unrepost({ id })` - Remove a repost
- `save({ id })` - Save a swipe
- `unsave({ id })` - Unsave a swipe

### Moderation Methods

- `report({ id, reason, details })` - Report a swipe
- `pin({ id })` - Pin a swipe to profile
- `unpin({ id })` - Unpin a swipe from profile
