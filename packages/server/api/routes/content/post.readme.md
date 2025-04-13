# 📝 Post Route Documentation

This document provides detailed information about the post-related endpoints, actions, helpers, and media processing flow in the Beaver Social API.

![Beaver Social](https://raw.githubusercontent.com/beaver-social/assets/main/banner.png)

## 📚 Table of Contents

- [📡 Route Structure](#-route-structure)
- [⚙️ Post Actions](#️-post-actions)
- [🛠️ Helper Functions](#️-helper-functions)
- [🖼️ Media Processing Flow](#️-media-processing-flow)
- [📋 Development Guidelines](#-development-guidelines)

## 📡 Route Structure

The post route is implemented using the Hono framework and provides endpoints for creating, retrieving, updating, and interacting with posts.

> **Base Path:** `/api/content/post`

### 🌐 Public Endpoints

#### Get Public Feed

```http
GET /
```

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `page`    | number | Yes      | The page number to retrieve |
| `limit`   | number | Yes      | Number of posts per page    |

**Response:**

```json
{
  "data": [
    {
      "id": 123,
      "content": "Post content",
      "authorId": 456,
      "createdAt": 1649123456789,
      "media": [
        {
          "url": "https://example.com/image.jpg",
          "type": "image"
        }
      ]
    }
  ],
  "message": "Posts feed fetched successfully",
  "statusCode": 200
}
```

#### Get Post by ID

```http
GET /:id
```

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `id`      | number | Yes      | The ID of the post to retrieve |

**Response:**

```json
{
  "data": {
    "id": 123,
    "content": "Post content",
    "authorId": 456,
    "createdAt": 1649123456789,
    "media": [
      {
        "url": "https://example.com/image.jpg",
        "type": "image"
      }
    ]
  },
  "message": "Post details fetched successfully",
  "statusCode": 200
}
```

#### Get Post Interaction Counts

```http
GET /:id/interaction/count
```

| Parameter | Type   | Required | Description        |
| --------- | ------ | -------- | ------------------ |
| `id`      | number | Yes      | The ID of the post |

**Response:**

```json
{
  "data": {
    "likesCount": 42,
    "repliesCount": 7,
    "sharesCount": 3,
    "repostsCount": 5,
    "viewCount": 128
  },
  "message": "Post interactions fetched successfully",
  "statusCode": 200
}
```

#### Get Post Interactions by Type

```http
GET /:id/interaction
```

| Parameter | Type   | Required | Description                                            |
| --------- | ------ | -------- | ------------------------------------------------------ |
| `id`      | number | Yes      | The ID of the post                                     |
| `type`    | string | Yes      | The interaction type: "likes", "replies", or "reposts" |

**Example:** `GET /123/interaction?type=likes`

**Response:**

```json
{
  "data": [
    {
      "userId": 456,
      "contentId": 123,
      "createdAt": 1649123456789
    }
  ],
  "message": "Likes fetched successfully",
  "statusCode": 200
}
```

### 🔒 Authenticated Endpoints

> **Note:** These endpoints require user authentication via JWT token in the Authorization header.

#### Get User Feed

```
GET /user/feed
```

- **Query Parameters**:
  - `page` (number): The page number to retrieve
  - `limit` (number): Number of posts per page
  - `type` (string): Feed type ("following" or "for_you")
- **Response**: Array of posts based on feed type

#### Get User Profile Posts

```
GET /user/profile
```

- **Query Parameters**:
  - `page` (number): The page number to retrieve
  - `limit` (number): Number of posts per page
  - `type` (string): Post type ("your-posts", "your-replies", "your-media", "your-saved", or "your-pinned")
- **Response**: Array of posts based on the specified type

#### Create Post

```
POST /create
```

- **Body**:
  - `content` (string): The post content text
  - `media` (array, optional): Media items to attach to the post
  - `parentId` (number, optional): ID of the parent post if this is a reply
  - `flags` (object): Object containing flags:
    - `nsfw` (boolean): Whether the post is NSFW
    - `subscriberOnly` (boolean, optional): Whether the post is for subscribers only
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
- **Response**: Success message with post ID

#### Delete Post

```
DELETE /:id
```

- **Path Parameters**:
  - `id` (number): The ID of the post to delete
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Update Post

```
PATCH /:id
```

- **Path Parameters**:
  - `id` (number): The ID of the post to update
- **Body**:
  - `content` (string): Updated post content
  - `media` (array): Updated media items
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Like Post

```
POST /like/:id
```

- **Path Parameters**:
  - `id` (number): The ID of the post to like
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
  - `reaction` (string, optional): Emoji reaction type
- **Response**: Success message

#### Unlike Post

```
POST /unlike/:id
```

- **Path Parameters**:
  - `id` (number): The ID of the post to unlike
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Repost

```
POST /repost
```

- **Body**:
  - `postId` (number): The ID of the post to repost
  - `content` (string, optional): Additional content for the repost
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message with repost ID

#### Unrepost

```
POST /unrepost
```

- **Body**:
  - `postId` (number): The ID of the original post
  - `repostId` (number): The ID of the repost to delete
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Save Post

```
POST /save
```

- **Body**:
  - `postId` (number): The ID of the post to save
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Unsave Post

```
POST /unsave
```

- **Body**:
  - `postId` (number): The ID of the post to unsave
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Report Post

```
POST /report
```

- **Body**:
  - `postId` (number): The ID of the post to report
  - `reason` (string): Reason for reporting
  - `details` (string, optional): Additional details about the report
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Pin Post

```
POST /pin
```

- **Body**:
  - `postId` (number): The ID of the post to pin to profile
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

#### Unpin Post

```
POST /unpin
```

- **Body**:
  - `postId` (number): The ID of the post to unpin
- **Query Parameters**:
  - `signature` (string): Cryptographic signature for the action
  - `type` (string): Signature type
- **Response**: Success message

## ⚙️ Post Actions

The post actions are defined in `post.action.ts` and encapsulate the business logic for interacting with posts in the database.

### `createPost`

Creates a new post with content, optional parent ID (for replies), media, and flags.

**Steps:**

1. **Sanitize and validate** the post content.
2. If it's a reply (`parentId` provided):
   - Verify the parent post exists and isn't deleted.
   - Check if the user is trying to reply to their own post (not allowed).
   - For subscriber-only posts, verify the user is a subscriber.
3. Extract **hashtags** and **mentions** from the content.
4. Insert the post into the database.
5. Process and store media items if provided:
   - For images: Convert from base64, process, upload to S3, and store URL.
   - For videos: Convert from base64, process, generate thumbnail, upload both to S3.
6. Update the post with an action ID and increment the parent's reply count if it's a reply.

**Code Example:**

```typescript
const result = await actions.createPost(
  {
    userId,
    content: "Hello World!",
    media: [],
    parentId: null,
    flags: { nsfw: false },
  },
  signature
);
```

### `deletePost`

Deletes a post if the user has permission.

**Steps:**

1. Check if the post exists.
2. Verify the user has permission to delete (is the author).
3. Soft delete by updating fields (deleted timestamp, reset like count, anonymize content).
4. Delete associated media.
5. Mark associated content actions as deleted.

**Code Example:**

```typescript
const result = await actions.deletePost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `likePost`

Likes a post if it exists and hasn't been liked by the user yet.

**Steps:**

1. Check if the post exists and isn't deleted.
2. Verify the user hasn't already liked the post.
3. Insert a new like record.
4. Increment the post's like count.

**Code Example:**

```typescript
const result = await actions.likePost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `unlikePost`

Unlikes a post if it has been liked by the user.

**Steps:**

1. Check if the user has liked the post.
2. Delete the like record.
3. Decrement the post's like count (ensuring it doesn't go below zero).

**Code Example:**

```typescript
const result = await actions.unlikePost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `pinPost`

Pins a post to the user's profile.

**Steps:**

1. Verify the post exists, isn't deleted, and the user is the author.
2. Check if the user has permission to pin the post.
3. Verify the post isn't already pinned.
4. Update the user's pinned post field.

**Code Example:**

```typescript
const result = await actions.pinPost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `unpinPost`

Unpins a post from the user's profile.

**Steps:**

1. Check if a post is currently pinned.
2. Update the user's pinned post field to null.

**Code Example:**

```typescript
const result = await actions.unpinPost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `updatePost`

Updates an existing post with new content and media.

**Steps:**

1. Sanitize and validate the new content.
2. Check if the post exists and the user is the author.
3. Verify the user has permission to edit the post.
4. Update the post content.
5. Delete existing media associated with the post.
6. Process and add new media (similar to `createPost`).

**Code Example:**

```typescript
const result = await actions.updatePost(
  {
    postId: 123,
    userId: 456,
    content: "Updated content",
    media: [],
  },
  signature
);
```

### `viewPost`

Records a view for a post and increments the view count.

**Steps:**

1. Check if the post exists.
2. Increment the view count on the post.
3. Record the view in the views table if a user ID is provided.

**Code Example:**

```typescript
const result = await actions.viewPost(
  {
    postId: 123,
    viewerId: 456,
  },
  signature
);
```

### `repostPost`

Reposts an existing post with optional new content.

**Steps:**

1. If content is provided, sanitize and validate it.
2. Check if the original post exists and isn't deleted.
3. Create a new post with reference to the original.
4. Increment the repost count on the original post.
5. Add a content action record for the repost.

**Code Example:**

```typescript
const result = await actions.repostPost(
  {
    postId: 123,
    userId: 456,
    content: "Check this out!",
  },
  signature
);
```

### `unrepostPost`

Deletes a repost if the user has permission.

**Steps:**

1. Check if the repost exists and the user is the author.
2. Verify the user has permission to delete the repost.
3. Soft delete the repost.
4. Decrement the repost count on the original post.

**Code Example:**

```typescript
const result = await actions.unrepostPost(
  {
    postId: 123,
    repostId: 789,
    userId: 456,
  },
  signature
);
```

### `savePost`

Saves a post for the user if it hasn't been saved already.

**Steps:**

1. Check if the post exists and isn't deleted.
2. Verify the post isn't already saved by the user.
3. Create a save record.

**Code Example:**

```typescript
const result = await actions.savePost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `unsavePost`

Unsaves a post for the user.

**Steps:**

1. Check if the post is saved by the user.
2. Delete the save record.

**Code Example:**

```typescript
const result = await actions.unsavePost(
  {
    postId: 123,
    userId: 456,
  },
  signature
);
```

### `reportPost`

Reports a post for inappropriate content.

**Steps:**

1. Check if the post exists.
2. Validate that a reason is provided.
3. Create a report record with pending status.

**Code Example:**

```typescript
const result = await actions.reportPost(
  {
    postId: 123,
    userId: 456,
    reason: "Inappropriate content",
    details: "Contains offensive language",
  },
  signature
);
```

## 🛠️ Helper Functions

The helper functions in `post.helpers.ts` provide utility functionality for the post actions:

### User Permission Helpers

- `canUserModifyPost`: Determines if a user can modify a post based on their ID and the author's ID

### Pagination Helpers

- `getPaginationParams`: Generates pagination parameters (offset) based on page and limit

### Content Processing Helpers

- `extractHashtags`: Extracts hashtags from content using regex
- `extractMentions`: Extracts mentions from content using regex
- `validatePostContent`: Checks if content is empty or exceeds maximum length
- `sanitizePostContent`: Removes harmful HTML elements and normalizes line breaks

### Image Processing Helpers

- `compressImage`: Compresses images using Sharp with 80% quality and mozjpeg optimization
- `generateThumbnail`: Creates a 150x150px thumbnail maintaining aspect ratio
- `validateImageFormat`: Checks if an image is in a supported format (jpeg, jpg, png, webp, gif)
- `optimizeImageForFeed`: Resizes images to max width of 1200px while preserving aspect ratio
- `processAndUploadImage`: Validates format, optimizes, and uploads image to S3
- `createAndUploadThumbnail`: Creates and uploads a thumbnail image to S3

### Video Processing Helpers

- `bufferToTempFile`: Converts a buffer to a temporary file for processing
- `cleanupTempFile`: Removes temporary files after processing
- `validateVideoFormat`: Checks if a video is in a supported format with a supported codec
- `compressVideo`: Compresses videos using ffmpeg with H.264 codec, 1Mbps bitrate, 720p max height
- `generateVideoThumbnail`: Creates a thumbnail from the 10% mark of a video
- `processAndUploadVideo`: Validates format, compresses, generates thumbnail, and uploads both to S3

### Utilities from `lib` Folder

The post routes make use of several utility functions and helpers from the `lib` folder to streamline operations and ensure consistency:

1. **`tryCatch` (from `lib/tryCatch.ts`)**:

   - Simplifies error handling by wrapping asynchronous operations.
   - Returns a consistent result object with `data` and `error` properties.

2. **`zod` Helpers (from `lib/zod/helpers.ts`)**:

   - `zMedia`: Validates media objects with properties like `url`, `type`, `order`, etc.
   - `zNumberString`: Ensures numeric strings are properly parsed and validated.
   - `zSignType`: Enum for signature types (e.g., `wallet`, `zk`).

3. **Pagination Helper (from `lib/utils.ts`)**:

   - `getPaginationParams`: Calculates the offset for paginated queries based on page and limit.

4. **Hashing Utility (from `lib/utils.ts`)**:

   - `generateHash`: Creates a SHA3-256 hash for data integrity and verification.

5. **S3 Upload Utilities (from `lib/s3/upload.ts`)**:

   - `uploadToS3`: Handles direct uploads of files to S3.
   - `processAndUploadImage`: Validates, optimizes, and uploads images.
   - `processAndUploadVideo`: Compresses, generates thumbnails, and uploads videos.

6. **Post Content Helpers (from `post.helpers.ts`)**:
   - `sanitizePostContent`: Cleans and normalizes post content.
   - `validatePostContent`: Ensures content meets length and format requirements.
   - `extractHashtags` and `extractMentions`: Parses hashtags and mentions from content.

These utilities ensure modularity, reusability, and maintainability across the post routes.

## 🖼️ Media Processing Flow

The API handles both image and video processing with a comprehensive pipeline:

### Image Processing Flow

1. **Validation**: Check if the image is in a supported format (JPEG, PNG, WebP, GIF)
2. **Optimization**:
   - Resize to a maximum width of 1200px while preserving aspect ratio
   - Compress using Sharp with 85% quality and mozjpeg for better compression
3. **Thumbnail Generation**:
   - Create a 150x150px thumbnail with "cover" fit to maintain aspect ratio
   - Compress the thumbnail with 80% quality
4. **Upload**:
   - Upload both the optimized image and thumbnail to S3
   - Store URLs in the database

### Video Processing Flow

1. **Validation**: Check if the video has valid video streams with supported codecs (H.264, VP8, VP9, etc.)
2. **Compression**:
   - Convert to MP4 with H.264 codec using "medium" preset
   - Limit bitrate to 1Mbps for balanced quality/size
   - Resize to max height of 720p while maintaining aspect ratio
   - Limit to 30fps
   - Use AAC audio codec with 128k bitrate
3. **Thumbnail Generation**:
   - Take a screenshot at the 10% mark of the video
   - Resize to 480px width
4. **Upload**:
   - Upload compressed video and thumbnail to S3
   - Store URLs in the database, including reference to the thumbnail

### Processing Steps for Post Creation/Update

1. Extract media items from the request
2. For each media item:
   - Identify the type (image, video)
   - Convert from base64 to buffer
   - Process according to type (using the flows above)
   - Upload to S3 and get URLs
   - Store URLs and metadata in the database

## 📋 Development Guidelines

1. **Add new routes in post.ts**
2. **Implement business logic in post.action.ts**
3. **Keep helper functions in post.helpers.ts**
4. **Add JSDoc comments to all helper functions.**
5. **Add media processing in post.helpers.ts**
6. **Update schema as needed in schema/content or schema/interactions**
7. **Add appropriate validation using Zod**
8. **Ensure proper error handling**
9. **Document changes in this README**
