# Posts API Documentation

## Overview

The Posts API provides a comprehensive set of endpoints to manage social media content creation, interaction, and consumption. This document outlines the architecture, routes, schemas, actions, and helper functions that make up the Posts API.

## Table of Contents

- [Routes](#routes)
- [Schema](#schema)
- [Actions](#actions)
- [Helpers](#helpers)
- [Media Processing](#media-processing)
- [S3 Integration](#s3-integration)
- [Error Handling](#error-handling)

## Routes

The Posts API is accessible through the `/posts` endpoint. All routes are defined in `post.ts` and follow a RESTful architecture.

### Read Operations

| Endpoint            | Method | Description               | Query Parameters                                     |
| ------------------- | ------ | ------------------------- | ---------------------------------------------------- |
| `/`                 | GET    | Get posts feed            | `page`, `limit`, `type` (trending/following/for_you) |
| `/:id`              | GET    | Get post details by ID    | -                                                    |
| `/interactions/:id` | GET    | Get post interaction data | -                                                    |
| `/views/:id`        | GET    | Get post view count       | -                                                    |

### Write Operations

| Endpoint      | Method | Description               | Body                                      | Query Parameters              |
| ------------- | ------ | ------------------------- | ----------------------------------------- | ----------------------------- |
| `/create`     | POST   | Create a new post         | `content`, `media`, `topicId`, `parentId` | `userId`, `signature`, `type` |
| `/:id`        | DELETE | Delete a post             | -                                         | `userId`, `signature`, `type` |
| `/:id`        | PATCH  | Update post content       | `content`, `media`                        | `userId`, `signature`, `type` |
| `/like/:id`   | POST   | Like a post               | Optional `reaction`                       | `userId`, `signature`, `type` |
| `/unlike/:id` | POST   | Unlike a post             | -                                         | `userId`, `signature`, `type` |
| `/repost`     | POST   | Repost existing content   | `postId`, `content`                       | `userId`, `signature`, `type` |
| `/unrepost`   | POST   | Remove a repost           | `postId`, `repostId`                      | `userId`, `signature`, `type` |
| `/pin/:id`    | POST   | Pin a post to profile     | -                                         | `userId`, `signature`, `type` |
| `/unpin/:id`  | POST   | Unpin a post from profile | -                                         | `userId`, `signature`, `type` |
| `/view/:id`   | POST   | Record a view on a post   | -                                         | `userId`, `signature`, `type` |
| `/save/:id`   | POST   | Save a post               | -                                         | `userId`, `signature`, `type` |
| `/unsave/:id` | POST   | Unsave a post             | -                                         | `userId`, `signature`, `type` |
| `/report/:id` | POST   | Report a post             | `reason`, `details`                       | `userId`, `signature`, `type` |

## Schema

The posts API relies on several database schemas that work together. Below is the detailed schema structure with table relationships.

### Content Schema

- **posts**: Stores the main content data including:

  - `id`: Unique identifier (PRIMARY KEY)
  - `authorId`: User who created the post (FOREIGN KEY → users.id)
  - `content`: Post text content
  - `parent`: Optional parent post ID for replies (FOREIGN KEY → posts.id, self-referential)
  - `topicId`: Optional topic association (FOREIGN KEY → topics.id)
  - `likesCount`: Counter for likes
  - `repliesCount`: Counter for replies
  - `sharesCount`: Counter for shares
  - `repostsCount`: Counter for reposts
  - `viewCount`: Counter for views
  - `isPinned`: Whether post is pinned
  - `hashtags`: Comma-separated list of hashtags in the post
  - `mentions`: Comma-separated list of user mentions in the post
  - `createdAt`: Post creation timestamp
  - `deletedAt`: Soft deletion timestamp

- **media**: Stores media attachments for posts:
  - `id`: Unique identifier (PRIMARY KEY)
  - `contentId`: Associated post ID (FOREIGN KEY → posts.id)
  - `contentTypeId`: Type of content (FOREIGN KEY → contentTypes.id)
  - `url`: S3 URL to media
  - `type`: Media type (image, video, audio)
  - `thumbnailUrl`: Thumbnail URL for videos
  - `duration`: Length of video/audio in seconds
  - `width`: Image/video width in pixels
  - `height`: Image/video height in pixels
  - `altText`: Accessibility text for images
  - `order`: Display order for multiple media attachments
  - `createdAt`: Media creation timestamp

### Interaction Schema

- **contentTypes**: Defines types of content in the system (posts, shorts, comments, etc.)

  - `id`: Unique identifier (PRIMARY KEY)
  - `name`: Content type name (e.g., "post", "short", "comment")

- **likes**: Records user likes on posts

  - `id`: Unique identifier (PRIMARY KEY)
  - `userId`: User who liked the content (FOREIGN KEY → users.id)
  - `contentId`: ID of the liked content
  - `contentTypeId`: Type of content (FOREIGN KEY → contentTypes.id)
  - `reaction`: Type of reaction (default: "like")
  - `createdAt`: Like creation timestamp

- **views**: Tracks post views by users

  - `id`: Unique identifier (PRIMARY KEY)
  - `userId`: User who viewed the content (FOREIGN KEY → users.id, optional)
  - `contentId`: ID of the viewed content
  - `contentTypeId`: Type of content (FOREIGN KEY → contentTypes.id)
  - `viewedAt`: Timestamp of view
  - `duration`: View duration in seconds
  - `createdAt`: Record creation timestamp

- **saves**: Records saved posts by users

  - `id`: Unique identifier (PRIMARY KEY)
  - `userId`: User who saved the content (FOREIGN KEY → users.id)
  - `contentId`: ID of the saved content
  - `contentTypeId`: Type of content (FOREIGN KEY → contentTypes.id)
  - `createdAt`: Save creation timestamp

- **reports**: Stores user reports on posts

  - `id`: Unique identifier (PRIMARY KEY)
  - `reporterId`: User reporting the content (FOREIGN KEY → users.id)
  - `contentId`: ID of the reported content
  - `contentTypeId`: Type of content (FOREIGN KEY → contentTypes.id)
  - `reason`: Reason for report
  - `details`: Additional report details
  - `status`: Report status (pending, reviewed, rejected, etc.)
  - `reviewerId`: Moderator who reviewed the report (FOREIGN KEY → users.id)
  - `reviewedAt`: Timestamp of review
  - `createdAt`: Report creation timestamp

- **contentActions**: Records content-related actions
  - `id`: Unique identifier (PRIMARY KEY)
  - `contentId`: ID of the content
  - `actionId`: Action performed (FOREIGN KEY → actions.id)
  - `deleted`: Whether the action was undone/deleted

### Schema Relationships Diagram

```
users
  ↑
  |
  +---------------------+
  |                     |
  |                     |
posts ----------------→ topics
  |
  |
  +---------+
  |         |
  |         |
  ↓         |
media      views
            |
            |
            ↓
contentTypes ←-----+
  ↑                |
  |                |
  +-------+        |
  |       |        |
  |       |        |
likes   saves    reports
```

This diagram shows the primary relationships between tables in the Posts API schema.

## Actions

All business logic is implemented in actions (defined in `post.action.ts`) to ensure data integrity, security, and consistent behavior across the application. Each action performs specific validations and database operations.

### `createPost`

Creates a new social media post with optional media attachments.

**Parameters:**

- `userId`: ID of the user creating the post (required)
- `content`: Text content of the post (required, 1-5000 characters)
- `media`: Array of media objects to attach (optional)
- `topicId`: Associated topic/space ID (optional)
- `parentId`: Parent post ID for replies/comments (optional)

**Process:**

1. **Authentication & Authorization**: Verifies user exists and has permission to post
2. **Content Validation**:
   - Sanitizes HTML to prevent XSS attacks
   - Trims whitespace and normalizes line breaks
   - Validates content against length requirements (1-5000 chars)
   - Rejects posts with only whitespace
3. **Media Processing**:
   - Validates media formats (supported image/video types)
   - Compresses images/videos for efficient storage and delivery
   - Generates thumbnails for preview purposes
   - Uploads media to S3 storage with proper content type headers
4. **Metadata Extraction**:
   - Parses hashtags using regex pattern matching (#tag)
   - Extracts user mentions using regex pattern matching (@user)
   - Stores as comma-separated values for efficient search
5. **Database Operations**:
   - Creates post record with all metadata
   - Creates separate media records for each attachment
   - Updates user's post count
   - If replying, increments parent post's reply count
6. **Activity Tracking**:
   - Records post creation in contentActions for analytics
   - Updates activity timestamps on user profile

**Error Handling:**

- Returns validation errors for invalid content/media
- Handles S3 upload failures with proper error reporting
- Rolls back database operations on failure

### `deletePost`

Removes a post from the system with proper cleanup of associated data.

**Parameters:**

- `postId`: ID of the post to delete
- `userId`: ID of the user requesting deletion

**Process:**

1. **Authentication & Authorization**:
   - Verifies post exists
   - Checks if user is post author or has admin/moderator permissions
2. **Child Content Handling**:
   - Identifies replies/comments linked to this post
   - Updates reference links or cascade deletes as appropriate
3. **Database Operations**:
   - Soft deletes post by setting deletedAt timestamp
   - Resets counter values (views, likes, etc.)
   - Marks post content as "[deleted]" to preserve thread continuity
   - Updates parent post's reply count if applicable
4. **Media Cleanup**:
   - Identifies all media assets associated with the post
   - Marks media as deleted in database
   - Schedules background job to remove media from S3 (with grace period)
5. **Activity Cleanup**:
   - Updates contentActions to reflect deletion
   - Removes post from trending calculations

**Security Considerations:**

- Prevents deletion of posts with legal hold requirements
- Maintains audit trail of deletion for compliance purposes

### `likePost`

Records a user's like/reaction on a post and updates relevant counters.

**Parameters:**

- `postId`: ID of the post to like
- `userId`: ID of the user performing the action
- `reaction`: Optional reaction type (default: "like")

**Process:**

1. **Validation**:
   - Verifies post exists and is not deleted
   - Ensures the post is not already liked by this user
2. **Database Operations**:
   - Creates a record in the likes table
   - Atomically increments the likesCount on the post
3. **Notifications**:
   - Triggers notification to post author (unless disabled)
   - Includes reaction type in notification data
4. **Analytics**:
   - Records timestamp for engagement metrics
   - Updates post's algorithmic ranking score

**Optimizations:**

- Uses database transactions to ensure counter consistency
- Implements rate limiting to prevent spam
- Maintains counter cache to avoid expensive COUNT queries

### `unlikePost`

Removes a user's like/reaction from a post.

**Parameters:**

- `postId`: ID of the post to unlike
- `userId`: ID of the user performing the action

**Process:**

1. **Validation**:
   - Verifies like record exists for this user+post combination
2. **Database Operations**:
   - Removes the record from the likes table
   - Atomically decrements the likesCount on the post (with floor of 0)
3. **Analytics**:
   - Records unlike action for engagement metrics
   - Updates post's algorithmic ranking score

**Error Handling:**

- Returns appropriate error if like doesn't exist
- Ensures counter never goes below zero

### `pinPost`

Pins a post to a user's profile, making it appear at the top.

**Parameters:**

- `postId`: ID of the post to pin
- `userId`: ID of the user performing the action

**Process:**

1. **Validation**:
   - Verifies post exists and is not deleted
   - Confirms user is the post author
   - Checks if user already has maximum pins (configurable limit)
2. **Database Operations**:
   - Sets isPinned flag to true on the post
   - Updates user's pinned posts list
3. **UI State**:
   - Returns updated pin status for immediate UI feedback

**Business Rules:**

- Users can pin up to 5 posts at once
- Only original posts can be pinned (not replies)
- Only the post author can pin their own posts

### `unpinPost`

Removes a post from pinned status on a user's profile.

**Parameters:**

- `postId`: ID of the post to unpin
- `userId`: ID of the user performing the action

**Process:**

1. **Validation**:
   - Verifies post is currently pinned
   - Confirms user is the post author
2. **Database Operations**:
   - Sets isPinned flag to false on the post
   - Updates user's pinned posts list
3. **UI State**:
   - Returns updated pin status for immediate UI feedback

### `reply`

Creates a reply to an existing post, establishing a parent-child relationship.

**Parameters:**

- `userId`: ID of the user creating the reply
- `content`: Text content of the reply
- `media`: Optional array of media attachments
- `parentId`: ID of the post being replied to

**Process:**

1. **Validation**:
   - Verifies parent post exists and is not deleted
   - Validates content and media (same as createPost)
2. **Content Processing**:
   - Sanitizes and processes content (same as createPost)
   - Handles media uploads (same as createPost)
3. **Database Operations**:
   - Creates new post with parent reference
   - Atomically increments repliesCount on parent post
   - Updates reply chain statistics
4. **Notifications**:
   - Notifies parent post author of new reply
   - Notifies mentioned users in reply content
5. **Thread Management**:
   - Maintains proper thread depth counters
   - Updates conversation participants list

**Performance Considerations:**

- Implements efficient nested reply querying using materialized paths
- Optimizes notification batching for active discussions

### `updatePost`

Modifies an existing post's content and/or media.

**Parameters:**

- `postId`: ID of the post to update
- `userId`: ID of the user performing the update
- `content`: New text content
- `media`: New array of media objects

**Process:**

1. **Authentication & Authorization**:
   - Verifies post exists and is not deleted
   - Checks if user is post author or has admin rights
   - Verifies post is within editable timeframe (configurable)
2. **Content Processing**:
   - Validates and sanitizes updated content
   - Extracts updated hashtags and mentions
3. **Media Handling**:
   - Identifies media to keep, remove, or add
   - Processes new media uploads
   - Deletes removed media from storage
   - Maintains media ordering
4. **Database Operations**:
   - Updates post content and metadata
   - Updates or creates media records
   - Records edit history for compliance (optional)
5. **Notification**:
   - Notifies newly mentioned users
   - Does not re-notify previously mentioned users

**Edit Limitations:**

- Posts can only be edited within 24 hours of creation
- Edit history is maintained for moderation purposes
- Some posts may be non-editable based on platform rules

### `viewPost`

Records a view event on a post and updates view counters.

**Parameters:**

- `postId`: ID of the post being viewed
- `userId`: Optional ID of the viewing user
- `duration`: Optional viewing duration in seconds

**Process:**

1. **Validation**:
   - Verifies post exists
   - Implements view counting logic to prevent duplicate counts
2. **Anonymous vs. Authenticated**:
   - For authenticated users: creates view record with userId
   - For anonymous users: updates view counter only
3. **Database Operations**:
   - Atomically increments post's viewCount
   - Records view timestamp and duration if authenticated
4. **Analytics**:
   - Updates post's trending score based on view patterns
   - Records geographical and device metadata for analytics

**Anti-Abuse Measures:**

- Rate limits views from same IP/user
- Uses fingerprinting to detect fraudulent views
- Implements cooldown periods between counted views

### `repostPost`

Shares an existing post to the user's followers with optional additional content.

**Parameters:**

- `postId`: ID of the post to repost
- `userId`: ID of the user reposting
- `content`: Optional additional commentary

**Process:**

1. **Validation**:
   - Verifies original post exists and is not deleted
   - Checks if user has already reposted this post
   - Validates additional content if provided
2. **Database Operations**:
   - Creates new post with reference to original
   - Sets appropriate repost metadata
   - Increments repostsCount on original post
   - Records in contentActions table
3. **Notifications**:
   - Notifies original post author of repost
4. **Distribution**:
   - Makes repost visible in user's followers' feeds
   - Applies appropriate algorithmic boosts

**Business Rules:**

- Users cannot repost their own posts
- Reposting deleted content is prevented
- Repost chains limited to prevent spam (max 1 level deep)

### `unrepostPost`

Removes a previously created repost.

**Parameters:**

- `postId`: ID of the original post
- `repostId`: ID of the repost to remove
- `userId`: ID of the user who created the repost

**Process:**

1. **Validation**:
   - Verifies repost exists and belongs to user
2. **Database Operations**:
   - Soft deletes the repost
   - Decrements repostsCount on original post
   - Updates contentActions to reflect deletion
3. **Feed Updates**:
   - Removes repost from followers' feeds
   - Updates aggregated content metrics

### `savePost`

Bookmarks a post for the user to access later.

**Parameters:**

- `postId`: ID of the post to save
- `userId`: ID of the user saving the post

**Process:**

1. **Validation**:
   - Verifies post exists and is not deleted
   - Checks if post is already saved by user
2. **Database Operations**:
   - Creates save record linking user to post
   - Optionally adds to user-defined collection
3. **Privacy**:
   - Respects privacy settings (public vs private saves)
4. **UI State**:
   - Returns updated save status for immediate feedback

**Features:**

- Supports organizing saves into collections
- Enables syncing saves across devices
- Provides offline access to saved content (mobile)

### `unsavePost`

Removes a post from user's bookmarks.

**Parameters:**

- `postId`: ID of the post to unsave
- `userId`: ID of the user unsaving the post

**Process:**

1. **Validation**:
   - Verifies save record exists
2. **Database Operations**:
   - Removes save record from database
   - Updates collection metadata if applicable
3. **UI State**:
   - Returns updated save status for immediate feedback

### `reportPost`

Flags a post for review by moderators due to policy violations.

**Parameters:**

- `postId`: ID of the post being reported
- `userId`: ID of the reporting user
- `reason`: Category of violation being reported
- `details`: Optional additional details about the violation

**Process:**

1. **Validation**:
   - Verifies post exists
   - Validates report reason against allowed categories
   - Checks for duplicate reports from same user
2. **Database Operations**:
   - Creates report record with all details
   - Increments report count on post
3. **Moderation Workflow**:
   - Triggers review if threshold reached
   - Adds to moderation queue with priority level
   - May automatically limit visibility if multiple reports
4. **Reporter Experience**:
   - Provides confirmation of report receipt
   - Optionally allows blocking post author
   - Removes post from reporter's feed

**Abuse Prevention:**

- Rate limits reports from individual users
- Analyzes reporting patterns to identify misuse
- Implements reviewer assignment algorithm based on report type

## Helpers

Helper functions provide reusable utilities for processing posts and media:

### Content Helpers

| Function                | Description                                                      | Used By                            |
| ----------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| `sanitizePostContent`   | Removes unsafe HTML, controls max length, normalizes line breaks | createPost, updatePost, repostPost |
| `validatePostContent`   | Checks content for minimum/maximum length requirements           | createPost, updatePost, repostPost |
| `extractHashtags`       | Extracts hashtags from post content                              | createPost, processPostForDisplay  |
| `extractMentions`       | Extracts user mentions from post content                         | createPost, processPostForDisplay  |
| `processPostForDisplay` | Formats posts for display with time elapsed, hashtags, mentions  | GET routes                         |
| `canUserModifyPost`     | Checks if user has permission to modify a post                   | deletePost, updatePost, pinPost    |
| `getPaginationParams`   | Creates pagination parameters based on page and limit            | GET routes                         |

### Media Processing Helpers

| Function                   | Description                                         | Used By                  |
| -------------------------- | --------------------------------------------------- | ------------------------ |
| `compressImage`            | Optimizes image size using quality adjustment       | processAndUploadImage    |
| `optimizeImageForFeed`     | Resizes images for feed display (max 1200px width)  | processAndUploadImage    |
| `validateImageFormat`      | Ensures image is in a supported format              | processAndUploadImage    |
| `generateThumbnail`        | Creates small thumbnails for image previews         | createAndUploadThumbnail |
| `processAndUploadImage`    | End-to-end image processing and S3 upload           | createPost, updatePost   |
| `createAndUploadThumbnail` | Creates and uploads image thumbnails                | createPost, updatePost   |
| `validateVideoFormat`      | Checks if video is in supported format/codec        | processAndUploadVideo    |
| `compressVideo`            | Compresses video for efficient storage and playback | processAndUploadVideo    |
| `generateVideoThumbnail`   | Creates thumbnails from video frames                | processAndUploadVideo    |
| `processAndUploadVideo`    | End-to-end video processing and S3 upload           | createPost, updatePost   |

## Media Processing

The Posts API handles sophisticated media processing for both images and videos:

### Image Processing

1. **Validation**: Checks image format against supported types (JPEG, PNG, WebP, GIF)
2. **Compression**: Reduces file size while maintaining quality (80% JPEG quality with mozjpeg)
3. **Resizing**: Maintains aspect ratio while limiting dimensions for feed (max width 1200px)
4. **Thumbnail Generation**: Creates 150x150px thumbnails for previews
5. **S3 Upload**: Stores processed images in the media folder

### Video Processing

1. **Validation**: Verifies video format and codec compatibility
2. **Compression**:
   - H.264 codec with medium preset for optimal quality/size balance
   - 720p resolution maximum
   - 30fps frame rate
   - 1Mbps video bitrate
   - AAC audio at 128kbps
3. **Thumbnail Extraction**: Captures frame at 10% mark for video preview
4. **S3 Upload**: Stores processed videos in the videos folder
5. **DB Storage**: Saves both video URL and thumbnail URL in the media table

## S3 Integration

Media content is stored in S3-compatible storage:

- **Configuration**: Uses Bun.S3Client to connect to R2 or other S3 providers
- **Upload Process**: Randomized filenames with UUID to prevent collisions
- **Directory Structure**:
  - `/media/` for images
  - `/videos/` for video content
- **URL Construction**: Uses R2_PUBLIC_URL or builds URL from endpoint and bucket name
- **Error Handling**: Graceful handling of upload failures

## Error Handling

The Posts API implements robust error handling:

- **Input Validation**: Zod schemas validate all input data
- **Permission Checks**: Verifies user permissions before mutations
- **Media Processing**: Gracefully handles media processing failures
- **Transactional Actions**: Uses transaction-based actions to ensure data consistency
- **Client Responses**: Clear error messages with appropriate HTTP status codes

## Development Guidelines

When extending or modifying the Posts API, consider the following:

1. **Add new routes in post.ts**
2. **Implement business logic in post.action.ts**
3. **Keep helper functions in post.helpers.ts**
4. **Add media processing in post.helpers.ts**
5. **Update schema as needed in schema/content or schema/interactions**
6. **Add appropriate validation using Zod**
7. **Ensure proper error handling**
8. **Document changes in this README**
