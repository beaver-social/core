## 1. Post Creation & Management

### Base Path: `/api/v1/posts`

| Endpoint       | Method | Description           | Query/Params                                     | Request Body                         | Response                    |
| -------------- | ------ | --------------------- | ------------------------------------------------ | ------------------------------------ | --------------------------- |
| `/`            | POST   | Create a new post     | -                                                | `{ content, media?: [{url, type}] }` | `{ post }`                  |
| `/`            | GET    | Get feed posts        | `?page=1&limit=20&type=all\|following\|trending` | -                                    | `{ posts: [], pagination }` |
| `/:id`         | GET    | Get a specific post   | -                                                | -                                    | `{ post, media, author }`   |
| `/:id`         | DELETE | Delete a post         | -                                                | -                                    | `{ success }`               |
| `/:id`         | PATCH  | Update a post         | -                                                | `{ content? }`                       | `{ post }`                  |
| `/trending`    | GET    | Get trending posts    | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |
| `/recommended` | GET    | Get recommended posts | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |

## 2. Post Interactions

### Base Path: `/api/v1/posts/:id`

| Endpoint      | Method | Description                | Query/Params       | Request Body           | Response                    |
| ------------- | ------ | -------------------------- | ------------------ | ---------------------- | --------------------------- |
| `/like`       | POST   | Like a post                | -                  | -                      | `{ success, likesCount }`   |
| `/unlike`     | POST   | Unlike a post              | -                  | -                      | `{ success, likesCount }`   |
| `/repost`     | POST   | Repost/share a post        | -                  | `{ comment? }`         | `{ success, repost }`       |
| `/pin`        | POST   | Pin post to profile        | -                  | -                      | `{ success }`               |
| `/unpin`      | POST   | Unpin post from profile    | -                  | -                      | `{ success }`               |
| `/likers`     | GET    | Get users who liked post   | `?page=1&limit=20` | -                      | `{ users: [], pagination }` |
| `/reposters`  | GET    | Get users who reposted     | `?page=1&limit=20` | -                      | `{ users: [], pagination }` |
| `/bookmark`   | POST   | Bookmark a post            | -                  | -                      | `{ success }`               |
| `/unbookmark` | POST   | Remove post from bookmarks | -                  | -                      | `{ success }`               |
| `/report`     | POST   | Report a post              | -                  | `{ reason, details? }` | `{ success, reportId }`     |

## 3. Replies & Threads

### Base Path: `/api/v1/posts/:id/replies`

| Endpoint           | Method | Description                        | Query/Params       | Request Body                         | Response                      |
| ------------------ | ------ | ---------------------------------- | ------------------ | ------------------------------------ | ----------------------------- |
| `/`                | GET    | Get replies to a post              | `?page=1&limit=20` | -                                    | `{ replies: [], pagination }` |
| `/`                | POST   | Reply to a post                    | -                  | `{ content, media?: [{url, type}] }` | `{ reply }`                   |
| `/thread`          | GET    | Get full thread (parent + replies) | -                  | -                                    | `{ thread: [], rootPost }`    |
| `/:replyId`        | GET    | Get specific reply                 | -                  | -                                    | `{ reply }`                   |
| `/:replyId`        | DELETE | Delete a reply                     | -                  | -                                    | `{ success }`                 |
| `/:replyId`        | PATCH  | Update a reply                     | -                  | `{ content? }`                       | `{ reply }`                   |
| `/:replyId/like`   | POST   | Like a reply                       | -                  | -                                    | `{ success, likesCount }`     |
| `/:replyId/unlike` | POST   | Unlike a reply                     | -                  | -                                    | `{ success, likesCount }`     |

## 4. Media Posts & Management

### Base Path: `/api/v1/media`

| Endpoint      | Method | Description                 | Query/Params                              | Request Body                  | Response                    |
| ------------- | ------ | --------------------------- | ----------------------------------------- | ----------------------------- | --------------------------- |
| `/upload`     | POST   | Upload media (image/video)  | -                                         | `{ file, aspectRatio, type }` | `{ url, type, id }`         |
| `/explore`    | GET    | Get media posts for explore | `?page=1&limit=20&type=all\|image\|video` | -                             | `{ media: [], pagination }` |
| `/:id/delete` | DELETE | Delete specific media       | -                                         | -                             | `{ success }`               |
| `/trending`   | GET    | Get trending media          | `?type=image\|video`                      | -                             | `{ media: [] }`             |
| `/tags/:tag`  | GET    | Get media by tag            | `?page=1&limit=20`                        | -                             | `{ media: [], pagination }` |

## 5. Shorts/Reels Management

### Base Path: `/api/v1/shorts`

| Endpoint        | Method | Description                   | Query/Params       | Request Body                                  | Response                       |
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

## 6. Post Search & Discovery

### Base Path: `/api/v1/discover`

| Endpoint        | Method | Description              | Query/Params                       | Request Body | Response                      |
| --------------- | ------ | ------------------------ | ---------------------------------- | ------------ | ----------------------------- |
| `/search`       | GET    | Search for posts         | `?q=string&page=1&limit=20`        | -            | `{ posts: [], pagination }`   |
| `/hashtags`     | GET    | Get trending hashtags    | `?limit=10`                        | -            | `{ hashtags: [] }`            |
| `/hashtag/:tag` | GET    | Get posts with hashtag   | `?page=1&limit=20`                 | -            | `{ posts: [], pagination }`   |
| `/explore`      | GET    | Get explore page content | `?page=1&limit=20&category=string` | -            | `{ content: [], pagination }` |

## 7. User Collections & Bookmarks

### Base Path: `/api/v1/collections`

| Endpoint             | Method | Description                 | Query/Params       | Request Body                        | Response                        |
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

## Data Models

### Post

```typescript
{
  id: number;
  authorId: number;
  content: string;
  parent: number | null; // Parent post ID for replies
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  pinned: boolean;
  createdAt: timestamp;
  updatedAt: timestamp;
  deletedAt: timestamp | null;
}
```

### PostMedia

```typescript
{
  id: number;
  postId: number;
  url: string;
  type: "image" | "video";
  aspectRatio: "square" | "portrait" | "landscape";
  createdAt: timestamp;
}
```

### Like

```typescript
{
  id: number;
  userId: number;
  postId: number;
  createdAt: timestamp;
}
```

### Bookmark

```typescript
{
  id: number;
  userId: number;
  postId: number;
  collectionId: number | null;
  createdAt: timestamp;
}
```

### Collection

```typescript
{
  id: number;
  userId: number;
  name: string;
  description: string | null;
  private: boolean;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### CollectionPost

```typescript
{
  id: number;
  collectionId: number;
  postId: number;
  addedAt: timestamp;
}
```

### Short

```typescript
{
  id: number;
  userId: number;
  videoUrl: string;
  caption: string | null;
  soundId: number | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  duration: number; // in seconds
  createdAt: timestamp;
}
```

### ShortComment

```typescript
{
  id: number;
  shortId: number;
  userId: number;
  content: string;
  likesCount: number;
  createdAt: timestamp;
}
```

### Sound

```typescript
{
  id: number;
  name: string;
  artist: string | null;
  url: string;
  duration: number;
  usageCount: number;
  createdAt: timestamp;
}
```

### ShortTag

```typescript
{
  id: number;
  shortId: number;
  tag: string;
}
```

## Implementation Considerations

1. **Performance Optimization**

   - Implement efficient pagination for timeline feeds
   - Consider caching strategies for frequently accessed posts/feeds
   - Optimize media delivery with CDN integration

2. **Content Moderation**

   - Implement spam detection system
   - Content filtering for inappropriate material
   - Report handling workflow

3. **Multimedia Handling**

   - Server-side validation of media files (size, format, content)
   - Compression and optimization of uploaded media
   - Generate appropriate thumbnails/previews

4. **Feed Algorithms**

   - Algorithm for "For You" personalized feed
   - Trending calculation based on engagement metrics
   - Content relevance scoring

5. **Real-time Features**

   - Consider WebSocket integration for real-time likes/comments
   - Push notifications for post engagement

6. **Analytics & Metrics**

   - Track post engagement metrics
   - Monitor content distribution patterns
   - Gather usage analytics to improve feed algorithms

7. **Web3 Integration**
   - NFT gating for exclusive content
   - Token-based governance for content moderation
   - On-chain verification of content authenticity

This API structure provides a comprehensive foundation for handling all post-related features in your Web3 social platform, following the same schema as your user.md documentation. The endpoints are designed to be RESTful, intuitive, and cover all the functionality visible in your client code.
