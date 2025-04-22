# 📝 Swipe Route Documentation

This document provides detailed information about the swipe-related endpoints, actions, helpers, and media processing flow in the Beaver Social API.

![Beaver Social](https://raw.githubusercontent.com/beaver-social/assets/main/banner.png)

## 📚 Table of Contents

- [📡 Route Structure](#route-structure)
  - [🌐 Public Endpoints](#public-endpoints)
  - [🔒 Authenticated Endpoints](#authenticated-endpoints)
- [⚙️ Swipe Actions](#swipe-actions)
- [🛠️ Helper Functions](#helper-functions)
- [🖼️ Media Processing Flow](#media-processing-flow)
- [📋 Development Guidelines](#development-guidelines)

## Route Structure

The swipe route is implemented using the Hono framework and provides endpoints for creating, retrieving, updating, and interacting with swipes.

> **Base Path:** `/api/content/swipe`

### Public Endpoints

These endpoints do not require authentication.

#### Get Swipes Feed

```http
GET /
```

Retrieves a paginated feed of swipes ordered by like count.

**Query Parameters**:
| Parameter | Type | Required | Description |
| --------- | ------ | -------- | --------------------------- |
| `page` | number | Yes | The page number to retrieve |
| `limit` | number | Yes | Number of swipes per page |

**Response**:

```json
{
  "data": [
    // Array of swipe objects with associated media
  ],
  "message": "Swipes feed fetched successfully",
  "statusCode": 200
}
```

#### Get Single Swipe

```http
GET /:id
```

Retrieves a specific swipe by its ID.

**Path Parameters**:

- `id` (number): The ID of the swipe to retrieve

**Response**:

```json
{
  "data": {
    // Swipe object with associated media
  },
  "message": "Swipe fetched successfully",
  "statusCode": 200
}
```

#### Get Swipe Interactions

```http
GET /:id/interactions
```

Retrieves interactions (likes, reposts, saves, or comments) for a specific swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe

**Query Parameters**:
| Parameter | Type | Required | Description |
| --------- | ------ | -------- | -------------------------------------------------- |
| `type` | string | Yes | Type of interaction: "likes", "reposts", "saves", or "comments" |
| `page` | number | Yes | The page number to retrieve |
| `limit` | number | Yes | Number of interactions per page |

**Response**:

```json
{
  "data": [
    // Array of interaction objects with associated user data
  ],
  "message": "{type} fetched successfully",
  "statusCode": 200
}
```

### Authenticated Endpoints

These endpoints require user authentication via the `authenticated` middleware.

#### Get User's Personal Feed

```http
GET /user/feed
```

Retrieves a personalized feed for the authenticated user.

**Query Parameters**:
| Parameter | Type | Required | Description |
| --------- | ------ | -------- | ----------------------------------------------- |
| `page` | number | Yes | The page number to retrieve |
| `limit` | number | Yes | Number of swipes per page |
| `type` | string | Yes | Feed type: "following" or "for_you" |

**Response**:

```json
{
  "data": [
    // Array of swipe objects from followed users or recommended
  ],
  "message": "Posts feed fetched successfully",
  "statusCode": 200
}
```

#### Get User's Own Swipes

```http
GET /user/profile
```

Retrieves the authenticated user's own swipes.

**Query Parameters**:
| Parameter | Type | Required | Description |
| --------- | ------ | -------- | --------------------------- |
| `page` | number | Yes | The page number to retrieve |
| `limit` | number | Yes | Number of swipes per page |

**Response**:

```json
{
  "data": [
    // Array of the user's swipe objects with associated media
  ],
  "message": "User's swipes fetched successfully",
  "statusCode": 200
}
```

#### Create Swipe

```http
POST /create
```

Creates a new swipe with media content.

**Body**:

```json
{
  "caption": "String content of the swipe",
  "media": {
    "buffer": "Base64 encoded video data",
    "thumbnailUrl": "Optional thumbnail URL",
    "duration": 15,
    "width": 1080,
    "height": 1920,
    "altText": "Optional accessibility description"
  },
  "parentId": 123, // Optional, for replies
  "flags": {
    "nsfw": false,
    "subscriberOnly": false
  }
}
```

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": {
    "swipeId": 456
  },
  "message": "Post Created Successfully",
  "statusCode": 201
}
```

#### Delete Swipe

```http
DELETE /:id
```

Deletes a swipe by ID. User must be the author of the swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe to delete

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe deleted successfully",
  "statusCode": 200
}
```

#### Update Swipe

```http
PATCH /:id
```

Updates an existing swipe. User must be the author of the swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe to update

**Body**:

```json
{
  "caption": "Updated caption text", // Optional
  "flags": {
    // Optional
    "nsfw": true,
    "subscriberOnly": false
  }
}
```

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe updated successfully",
  "statusCode": 200
}
```

#### Like Swipe

```http
POST /:id/like
```

Likes a swipe with the given ID.

**Path Parameters**:

- `id` (number): The ID of the swipe to like

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe liked successfully",
  "statusCode": 200
}
```

#### Unlike Swipe

```http
POST /:id/unlike
```

Removes a like from a swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe to unlike

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe unliked successfully",
  "statusCode": 200
}
```

#### Repost Swipe

```http
POST /:id/repost
```

Reposts a swipe with optional quote.

**Path Parameters**:

- `id` (number): The ID of the swipe to repost

**Body**:

```json
{
  "quote": "Optional comment on the reposted content"
}
```

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe reposted successfully",
  "statusCode": 200
}
```

#### Unrepost Swipe

```http
POST /:id/unrepost
```

Removes a repost of a swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe to unrepost

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe unreposted successfully",
  "statusCode": 200
}
```

#### Save Swipe

```http
POST /:id/save
```

Saves a swipe to the user's saved items.

**Path Parameters**:

- `id` (number): The ID of the swipe to save

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe saved successfully",
  "statusCode": 200
}
```

#### Unsave Swipe

```http
POST /:id/unsave
```

Removes a swipe from the user's saved items.

**Path Parameters**:

- `id` (number): The ID of the swipe to unsave

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe unsaved successfully",
  "statusCode": 200
}
```

#### Report Swipe

```http
POST /:id/report
```

Reports a swipe for inappropriate content.

**Path Parameters**:

- `id` (number): The ID of the swipe to report

**Body**:

```json
{
  "reason": "spam", // One of: "spam", "nudity", "violence", "harassment", "false_information", "hate_speech", "terrorism", "other"
  "details": "Optional additional details about the report"
}
```

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Report submitted successfully",
  "statusCode": 200
}
```

#### Pin Swipe

```http
POST /:id/pin
```

Pins a swipe to the user's profile. User must be the author of the swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe to pin

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe pinned successfully",
  "statusCode": 200
}
```

#### Unpin Swipe

```http
POST /:id/unpin
```

Unpins a swipe from the user's profile. User must be the author of the swipe.

**Path Parameters**:

- `id` (number): The ID of the swipe to unpin

**Query Parameters**:

- `signature` (string): Cryptographic signature for the action

**Response**:

```json
{
  "data": null,
  "message": "Swipe unpinned successfully",
  "statusCode": 200
}
```

## Swipe Actions

The `swipe.action.ts` file contains implementation functions for creating and managing swipes, including:

- **`createSwipe`**: Creates a new swipe with media processing
- **`updateSwipe`**: Updates an existing swipe's content or flags
- **`deleteSwipe`**: Deletes a swipe and related content
- **`likeSwipe`**: Adds a like to a swipe
- **`unlikeSwipe`**: Removes a like from a swipe
- **`repostSwipe`**: Creates a repost of a swipe with optional quote text
- **`unrepostSwipe`**: Removes a repost
- **`saveSwipe`**: Saves a swipe to user's collection
- **`unsaveSwipe`**: Removes a swipe from user's saved collection
- **`reportSwipe`**: Reports a swipe for inappropriate content
- **`pinSwipe`**: Pins a swipe to user profile
- **`unpinSwipe`**: Unpins a swipe from user profile
- **`canUserModifyPost`**: Validates if a user has permission to modify a swipe
- **`processAndUploadVideo`**: Processes and uploads video media for swipes

## Helper Functions

The helper functions available in the swipe-related codebase include:

- **`getPaginationParams`**: Calculates offset from page and limit parameters
- **`preprocessPostContent`**: Extracts hashtags and mentions from post content
- **`tryCatch`**: Utility function for error handling with typed responses
- **`verifyChallenge`**: Validates cryptographic signatures for secure operations

## Media Processing Flow

The media processing flow for swipe content consists of:

1. **Validation**:

   - Media files are validated for type, size, and format
   - Duration checks enforce platform limits
   - NSFW content detection may be applied

2. **Processing**:

   - Videos are processed using `processAndUploadVideo`
   - Thumbnails are generated if not provided
   - Compression may be applied to optimize storage and bandwidth

3. **Storage**:

   - Media files are uploaded to the storage service (likely S3 or similar)
   - URLs are generated and stored in the database
   - Metadata (dimensions, duration, etc.) is preserved

4. **Association**:
   - Media records are linked to swipe content via contentId
   - Multiple pieces of media can be associated with a single swipe

## 📋 Development Guidelines

When extending or modifying the swipe routes, follow these guidelines:

- Ensure all endpoints are properly authenticated where required
- Validate all input data using Zod schemas
- Use the `tryCatch` utility to handle errors gracefully
- Update interaction counts (likes, reposts) atomically to prevent race conditions
- Verify user permissions before allowing modifications to swipes
- Follow the existing folder structure and naming conventions for consistency
- Add appropriate database indexes for performance optimization
- Document any new endpoints or parameters in this readme
