# Content API

## Overview

This document outlines the API endpoints for content creation, management, and interactions within the Beaver Social platform, including posts, media, shorts, and collections.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Post Creation & Management

### Base Path: `/posts`

| Endpoint       | Method | Description           | Query Params                                     | Request Body                         | Response                    |
| -------------- | ------ | --------------------- | ------------------------------------------------ | ------------------------------------ | --------------------------- |
| `/`            | POST   | Create a new post     | -                                                | `{ content, media?: [{url, type}] }` | `{ post }`                  |
| `/`            | GET    | Get feed posts        | `?page=1&limit=20&type=all\|following\|trending` | -                                    | `{ posts: [], pagination }` |
| `/:id`         | GET    | Get a specific post   | -                                                | -                                    | `{ post, media, author }`   |
| `/:id`         | DELETE | Delete a post         | -                                                | -                                    | `{ success }`               |
| `/:id`         | PATCH  | Update a post         | -                                                | `{ content? }`                       | `{ post }`                  |
| `/trending`    | GET    | Get trending posts    | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |
| `/recommended` | GET    | Get recommended posts | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |

## 2. Post Interactions

### Base Path: `/posts/:id`

| Endpoint      | Method | Description                | Query Params       | Request Body           | Response                      |
| ------------- | ------ | -------------------------- | ------------------ | ---------------------- | ----------------------------- |
| `/like`       | POST   | Like a post                | -                  | -                      | `{ success, likesCount }`     |
| `/unlike`     | POST   | Unlike a post              | -                  | -                      | `{ success, likesCount }`     |
| `/repost`     | POST   | Repost/share a post        | -                  | `{ comment? }`         | `{ success, repost }`         |
| `/pin`        | POST   | Pin post to profile        | -                  | -                      | `{ success }`                 |
| `/unpin`      | POST   | Unpin post from profile    | -                  | -                      | `{ success }`                 |
| `/likers`     | GET    | Get users who liked post   | `?page=1&limit=20` | -                      | `{ users: [], pagination }`   |
| `/reposters`  | GET    | Get users who reposted     | `?page=1&limit=20` | -                      | `{ users: [], pagination }`   |
| `/bookmark`   | POST   | Bookmark a post            | -                  | -                      | `{ success }`                 |
| `/unbookmark` | POST   | Remove post from bookmarks | -                  | -                      | `{ success }`                 |
| `/report`     | POST   | Report a post              | -                  | `{ reason, details? }` | `{ success, reportId }`       |
| `/reactions`  | POST   | React with emoji           | -                  | `{ emoji }`            | `{ success, reactionsCount }` |
| `/reactions`  | GET    | Get reactions to post      | `?page=1&limit=20` | -                      | `{ reactions: [], counts }`   |

## 3. Replies & Threads

### Base Path: `/posts/:id/replies`

| Endpoint           | Method | Description                        | Query Params       | Request Body                         | Response                      |
| ------------------ | ------ | ---------------------------------- | ------------------ | ------------------------------------ | ----------------------------- |
| `/`                | GET    | Get replies to a post              | `?page=1&limit=20` | -                                    | `{ replies: [], pagination }` |
| `/`                | POST   | Reply to a post                    | -                  | `{ content, media?: [{url, type}] }` | `{ reply }`                   |
| `/thread`          | GET    | Get full thread (parent + replies) | -                  | -                                    | `{ thread: [], rootPost }`    |
| `/:replyId`        | GET    | Get specific reply                 | -                  | -                                    | `{ reply }`                   |
| `/:replyId`        | DELETE | Delete a reply                     | -                  | -                                    | `{ success }`                 |
| `/:replyId`        | PATCH  | Update a reply                     | -                  | `{ content? }`                       | `{ reply }`                   |
| `/:replyId/like`   | POST   | Like a reply                       | -                  | -                                    | `{ success, likesCount }`     |
| `/:replyId/unlike` | POST   | Unlike a reply                     | -                  | -                                    | `{ success, likesCount }`     |

## 4. Media Management

### Base Path: `/media`

| Endpoint      | Method | Description                 | Query Params                              | Request Body                  | Response                    |
| ------------- | ------ | --------------------------- | ----------------------------------------- | ----------------------------- | --------------------------- |
| `/upload`     | POST   | Upload media (image/video)  | -                                         | `{ file, aspectRatio, type }` | `{ url, type, id }`         |
| `/explore`    | GET    | Get media posts for explore | `?page=1&limit=20&type=all\|image\|video` | -                             | `{ media: [], pagination }` |
| `/:id/delete` | DELETE | Delete specific media       | -                                         | -                             | `{ success }`               |
| `/trending`   | GET    | Get trending media          | `?type=image\|video`                      | -                             | `{ media: [] }`             |
| `/tags/:tag`  | GET    | Get media by tag            | `?page=1&limit=20`                        | -                             | `{ media: [], pagination }` |

## 5. Shorts/Reels Management

### Base Path: `/shorts`

| Endpoint        | Method | Description                   | Query Params       | Request Body                                  | Response                       |
| --------------- | ------ | ----------------------------- | ------------------ | --------------------------------------------- | ------------------------------ |
| `/`             | GET    | Get feed shorts/reels         | `?page=1&limit=10` | -                                             | `{ shorts: [], pagination }`   |
| `/`             | POST   | Create a new short            | -                  | `{ videoUrl, caption?, soundId?, tags?: [] }` | `{ short }`                    |
| `/:id`          | GET    | Get a specific short          | -                  | -                                             | `{ short }`                    |
| `/:id`          | DELETE | Delete a short                | -                  | -                                             | `{ success }`                  |
| `/:id/like`     | POST   | Like a short                  | -                  | -                                             | `{ success, likesCount }`      |
| `/:id/unlike`   | POST   | Unlike a short                | -                  | -                                             | `{ success, likesCount }`      |
| `/:id/comments` | GET    | Get comments on a short       | `?page=1&limit=20` | -                                             | `{ comments: [], pagination }` |
| `/:id/comments` | POST   | Comment on a short            | -                  | `{ content }`                                 | `{ comment }`                  |
| `/trending`     | GET    | Get trending shorts           | `?limit=20`        | -                                             | `{ shorts: [] }`               |
| `/sounds`       | GET    | Get popular sounds for shorts | `?page=1&limit=20` | -                                             | `{ sounds: [], pagination }`   |
| `/sounds/:id`   | GET    | Get shorts using a sound      | `?page=1&limit=20` | -                                             | `{ shorts: [], pagination }`   |

## 6. Collections & Bookmarks

### Base Path: `/collections`

| Endpoint             | Method | Description                 | Query Params       | Request Body                        | Response                        |
| -------------------- | ------ | --------------------------- | ------------------ | ----------------------------------- | ------------------------------- |
| `/`                  | GET    | Get user's collections      | -                  | -                                   | `{ collections: [] }`           |
| `/`                  | POST   | Create a new collection     | -                  | `{ name, description?, private? }`  | `{ collection }`                |
| `/:id`               | GET    | Get a specific collection   | -                  | -                                   | `{ collection, posts: [] }`     |
| `/:id`               | PATCH  | Update a collection         | -                  | `{ name?, description?, private? }` | `{ collection }`                |
| `/:id`               | DELETE | Delete a collection         | -                  | -                                   | `{ success }`                   |
| `/:id/posts`         | GET    | Get posts in collection     | `?page=1&limit=20` | -                                   | `{ posts: [], pagination }`     |
| `/:id/posts`         | POST   | Add post to collection      | -                  | `{ postId }`                        | `{ success }`                   |
| `/:id/posts/:postId` | DELETE | Remove post from collection | -                  | -                                   | `{ success }`                   |
| `/bookmarks`         | GET    | Get user's bookmarked posts | `?page=1&limit=20` | -                                   | `{ bookmarks: [], pagination }` |

## 7. Polls & Interactive Content

### Base Path: `/polls`

| Endpoint      | Method | Description      | Query Params       | Request Body                      | Response                     |
| ------------- | ------ | ---------------- | ------------------ | --------------------------------- | ---------------------------- |
| `/`           | POST   | Create a poll    | -                  | `{ question, options, duration }` | `{ poll }`                   |
| `/:id`        | GET    | Get poll details | -                  | -                                 | `{ poll }`                   |
| `/:id/vote`   | POST   | Vote in a poll   | -                  | `{ optionId }`                    | `{ success, updatedPoll }`   |
| `/:id/voters` | GET    | Get poll voters  | `?page=1&limit=20` | -                                 | `{ voters: [], pagination }` |

## Data Models

### Post

```typescript
interface Post {
  id: string;
  authorId: string;
  content: string;
  parent: string | null; // Parent post ID for replies
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
```

### PostMedia

```typescript
interface PostMedia {
  id: string;
  postId: string;
  url: string;
  type: "image" | "video";
  aspectRatio: "square" | "portrait" | "landscape";
  createdAt: string;
}
```

### Like

```typescript
interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}
```

### Bookmark

```typescript
interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  collectionId: string | null;
  createdAt: string;
}
```

### Collection

```typescript
interface Collection {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  private: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Short

```typescript
interface Short {
  id: string;
  userId: string;
  videoUrl: string;
  caption: string | null;
  soundId: string | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  duration: number; // in seconds
  createdAt: string;
}
```

### Sound

```typescript
interface Sound {
  id: string;
  name: string;
  artist: string | null;
  url: string;
  duration: number;
  usageCount: number;
  createdAt: string;
}
```

### Poll

```typescript
interface Poll {
  id: string;
  userId: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  expiresAt: string;
  createdAt: string;
}
```

### Reaction

```typescript
interface Reaction {
  id: string;
  userId: string;
  contentId: string;
  contentType: "post" | "comment" | "short";
  emoji: string;
  createdAt: string;
}
```

## Implementation Considerations

1. **Content Performance**

   - Implement efficient pagination for timeline feeds
   - Consider caching strategies for frequently accessed posts/feeds
   - Optimize media delivery with CDN integration
   - Load balancing for media processing services

2. **Content Moderation**

   - Apply content filtering based on user preferences
   - Implement spam detection for posts and comments
   - Flag potentially sensitive content for review
   - Automated content policy detection

3. **Media Processing**

   - Server-side validation of media files (size, format, content)
   - Image/video optimization and compression
   - Generate thumbnails and previews
   - Support for various media types and formats

4. **Feed Algorithms**

   - Personalized feed algorithm logic
   - Trending calculation based on engagement metrics
   - Content relevance scoring
   - Web3/token-gated content integration

5. **Real-time Features**

   - Consider WebSockets for real-time engagement updates
   - Optimistic UI updates for likes and other reactions
   - Push notifications for high-engagement posts

6. **Security & Privacy**
   - Respect user visibility settings for all content
   - Secure media upload and processing
   - Content attribution and ownership verification
   - NFT gating for exclusive content
