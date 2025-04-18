# Content Routes

This directory contains the Hono routers and helper functions for content-related features in Beaver Social, including Posts, Swipes (shorts), and Topics.

## File Structure

- **index.ts**: Main router that combines all content sub-routers.
- **post.ts**: Defines public and authenticated endpoints for post operations (feed, CRUD, interactions, and actions).
- **post.actions.ts**: Implements action handlers invoked by post routes (create, delete, like, repost, save, report, pin, etc.).
- **helpers.ts**: Utility functions for content processing, including hashtag/mention extraction, content sanitization, and media helpers (image/video processing and uploads).
- **swipe.ts**: Defines public and authenticated endpoints for swipe (short) operations.
- **swipe.action.ts**: Implements action handlers invoked by swipe routes (create, delete, like, repost, save, report, etc.).
- **topics.ts**: Router for topics listing and user topic management.
- **topic.ts**: Router for single-topic actions (viewer, member, and admin operations).

## Mounting

The `index.ts` file exports a Hono router with the following mounts:

- `/posts` → Handled by `post.ts`
- `/swipes` → Handled by `swipe.ts`
- `/topics` → Handled by `topics.ts` (listing) and within that the `topic.ts` router (single-topic actions).

All endpoints below are relative to these base paths.

---

## Posts Routes (`post.ts`)

### Public Endpoints

| Method | Path                     | Query Parameters                                  | Description                        |
| ------ | ------------------------ | ------------------------------------------------- | ---------------------------------- |
| GET    | `/posts`                 | `page` (number), `limit` (number)                 | Get public feed of top-level posts |
| GET    | `/posts/:id`             |                                                   | Get details for a single post      |
| GET    | `/posts/:id/interaction` | `type`: `likes` &#124; `replies` &#124; `reposts` | Get interaction data for a post    |
| GET    | `/posts/:id/awards`      | `page` (number), `limit` (number)                 | Get awards associated with a post  |

### Authenticated Endpoints (Requires `authenticated` middleware)

#### Feeds & Profile

| Method | Path                  | Query Parameters                                                                                                         | Description                    |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| GET    | `/posts/user/feed`    | `page`, `limit`, `type`: `following` &#124; `for_you`                                                                    | Get personalized feed of posts |
| GET    | `/posts/user/profile` | `page`, `limit`, `type`: `your-posts` &#124; `your-replies` &#124; `your-media` &#124; `your-saved` &#124; `your-pinned` | Get posts from user's profile  |

#### CRUD Operations

| Method | Path            | Query Parameters     | Request Body                                                                                                        | Description       |
| ------ | --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------- |
| POST   | `/posts/create` | `signature` (string) | JSON: `{ content: string; media?: Media[]; parentId?: number; flags: { nsfw: boolean; subscriberOnly?: boolean } }` | Create a new post |
| DELETE | `/posts/:id`    | `signature`          |                                                                                                                     | Delete a post     |
| PATCH  | `/posts/:id`    | `signature`          | JSON: `{ content: string; media: Media[] }`                                                                         | Update a post     |

#### Post Actions

| Method | Path                  | Query Parameters         | Request Body                                                 | Description                      |
| ------ | --------------------- | ------------------------ | ------------------------------------------------------------ | -------------------------------- |
| POST   | `/posts/:id/like`     | `signature`, `reaction?` |                                                              | Like (or react to) a post        |
| POST   | `/posts/:id/unlike`   | `signature`              |                                                              | Remove like from a post          |
| POST   | `/posts/:id/repost`   | `signature`              | JSON: `{ content?: string }`                                 | Repost a post                    |
| POST   | `/posts/:id/unrepost` | `signature`              | JSON: `{ postId: number; repostId: number }`                 | Remove a repost                  |
| POST   | `/posts/:id/save`     | `signature`              |                                                              | Save a post to user's saved list |
| POST   | `/posts/:id/unsave`   | `signature`              |                                                              | Remove post from saved list      |
| POST   | `/posts/:id/report`   | `signature`              | JSON: `{ postId: number; reason: string; details?: string }` | Report a post for review         |
| POST   | `/posts/:id/pin`      | `signature`              | JSON: `{ postId: number }`                                   | Pin a post to user profile       |
| POST   | `/posts/:id/unpin`    | `signature`              | JSON: `{ postId: number }`                                   | Unpin a post from user profile   |

---

## Swipe Routes (`swipe.ts`)

### Public Endpoints

| Method | Path                       | Query Parameters                                                                   | Description                  |
| ------ | -------------------------- | ---------------------------------------------------------------------------------- | ---------------------------- |
| GET    | `/swipes`                  | `page` (number), `limit` (number)                                                  | Get public feed of swipes    |
| GET    | `/swipes/:id`              |                                                                                    | Get swipe details by ID      |
| GET    | `/swipes/:id/interactions` | `type`: `likes` &#124; `reposts` &#124; `saves` &#124; `comments`, `page`, `limit` | Get interactions for a swipe |

### Authenticated Endpoints

| Method | Path                   | Query Parameters                                      | Request Body                                                                                                     | Description                      |
| ------ | ---------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| GET    | `/swipes/user/feed`    | `page`, `limit`, `type`: `following` &#124; `for_you` |                                                                                                                  | Get personalized swipe feed      |
| GET    | `/swipes/user/profile` | `page`, `limit`                                       |                                                                                                                  | Get swipes by authenticated user |
| POST   | `/swipes/create`       | `signature`                                           | JSON: `{ caption: string; media: Media; parentId?: number; flags: { nsfw: boolean; subscriberOnly?: boolean } }` | Create a new swipe               |
| DELETE | `/swipes/:id`          | `signature`                                           |                                                                                                                  | Delete a swipe                   |
| PATCH  | `/swipes/:id`          | `signature`                                           | JSON: `{ caption?: string; media?: Media }`                                                                      | Update an existing swipe         |
| POST   | `/swipes/:id/like`     | `signature`                                           |                                                                                                                  | Like a swipe                     |
| POST   | `/swipes/:id/unlike`   | `signature`                                           |                                                                                                                  | Unlike a swipe                   |
| POST   | `/swipes/:id/save`     | `signature`                                           |                                                                                                                  | Save a swipe                     |
| POST   | `/swipes/:id/unsave`   | `signature`                                           |                                                                                                                  | Remove swipe from saved list     |
| POST   | `/swipes/:id/unrepost` | `signature`                                           |                                                                                                                  | Remove swipe repost              |
| POST   | `/swipes/:id/repost`   | `signature`, `quote?`                                 |                                                                                                                  | Repost a swipe                   |
| POST   | `/swipes/:id/report`   | `signature`                                           | JSON: `{ reason: string; details?: string }`                                                                     | Report a swipe for review        |

---

## Topics Routes

### Topics Listing (`topics.ts`)

| Method | Path                  | Description                                                       |
| ------ | --------------------- | ----------------------------------------------------------------- |
| GET    | `/topics`             | Get curated topics feed (filter by `trending`, `following`, etc.) |
| GET    | `/topics/featured`    | Get editorially featured topics                                   |
| POST   | `/topics/create`      | Create a new topic                                                |
| GET    | `/topics/your-topics` | Get topics created or followed by the authenticated user          |

### Single Topic Actions (`topic.ts`)

#### Viewer Actions

| Method | Path                  | Description                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| GET    | `/topics/:id`         | Get basic details for a topic by ID                   |
| GET    | `/topics/:id/posts`   | Get posts or swipes within a topic (filter via query) |
| GET    | `/topics/:id/related` | Get related topics                                    |
| GET    | `/topics/:id/search`  | Search content within a topic                         |

#### Member Actions

| Method | Path                             | Description                                             |
| ------ | -------------------------------- | ------------------------------------------------------- |
| POST   | `/topics/:id/follow`             | Follow or join a topic                                  |
| POST   | `/topics/:id/unfollow`           | Unfollow or leave a topic                               |
| POST   | `/topics/:id/report`             | Report a topic for review                               |
| POST   | `/topics/:id/mute`               | Mute a topic (hide from feed)                           |
| POST   | `/topics/:id/unmute`             | Unmute a topic (show in feed)                           |
| PATCH  | `/topics/:id`                    | Update topic details (name, desc, avatar, banner, tags) |
| POST   | `/topics/:id/pin-post/:postId`   | Pin a post to the topic                                 |
| POST   | `/topics/:id/unpin-post/:postId` | Unpin a post from the topic                             |
| PATCH  | `/topics/:id/settings`           | Update topic settings (privacy, approval)               |
| GET    | `/topics/:id/analytics`          | Get topic analytics (moderator view)                    |

#### Admin Actions

| Method | Path          | Description                |
| ------ | ------------- | -------------------------- |
| DELETE | `/topics/:id` | Delete a topic permanently |

---

## Helpers (`helpers.ts`)

Utility functions used across content routes:

- `canUserModifyPost(userId: number, authorId: number): boolean` — Check if a user can modify a post.
- `extractHashtags(content: string): string[]` — Extract hashtags from content.
- `extractMentions(content: string): string[]` — Extract mentions from content.
- `validatePostContent(content: string): { valid: boolean; message?: string }` — Validate post content length and emptiness.
- `sanitizePostContent(content: string): string` — Remove harmful HTML and normalize content.
- `preprocessPostContent(content: string): { content: string; hashtags: string[]; mentions: string[] }` — Sanitize, validate, and extract tags/mentions.
- Media Helpers (image/video): compress, thumbnail generation, upload to S3, and cleanup.

For full implementation details, refer to `helpers.ts`.
