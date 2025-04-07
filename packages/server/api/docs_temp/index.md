# Beaver Social API Documentation

## Overview

This documentation outlines the API endpoints for the Beaver Social platform, a web3-enabled social media application. All endpoints have been organized into four major categories for clarity and ease of use.

## Base URL

All endpoints are relative to: `/api/v1/`

## API Categories

### 1. Authentication API (`/auth`)

The Authentication API handles user authentication, identity management, and web3 identity integration.

Major endpoints:

- `/auth/zklogin/*` - zkLogin authentication flow
- `/auth/wallet/*` - Wallet-based authentication
- `/auth/session` - Session management
- `/auth/register` - User registration
- `/auth/identity/*` - Web3 identity management
- `/auth/verification/*` - Account verification
- `/auth/recovery/*` - Account recovery

[View Authentication API Documentation](./auth.md)

### 2. User API (`/user`)

The User API manages user profiles, settings, analytics, messages, notifications, and other user-related functionality.

Major endpoints:

- `/user/profile/*` - User profile management
- `/user/relationships/*` - Follow, unfollow, block, mute
- `/user/content/*` - User-specific content listings
- `/user/settings/*` - User settings and preferences
- `/user/messages/*` - Direct messaging
- `/user/groups/*` - Group messaging
- `/user/alerts/*` - Notifications
- `/user/devices/*` - Device management
- `/user/mentions/*` - User mentions
- `/user/analytics/*` - User analytics
- `/user/moderation/*` - User-specific moderation actions

[View User API Documentation](./user.md)

### 3. Content API (`/content`)

The Content API handles content creation, management, interactions, and monetization features.

Major endpoints:

- `/content/posts/*` - Post creation and interaction
- `/content/media/*` - Media upload and management
- `/content/shorts/*` - Short-form video content
- `/content/collections/*` - Collections management
- `/content/polls/*` - Interactive polls
- `/content/visibility/*` - Content visibility settings
- `/content/nft/*` - NFT integration
- `/content/monetization/*` - Creator monetization
- `/content/discovery/*` - Content discovery
- `/content/recommendations/*` - Content recommendations

[View Content API Documentation](./content.md)

### 4. Miscellaneous API (`/misc`)

The Miscellaneous API contains endpoints that don't fit directly into the other categories, including search, moderation, web3 events, trends, and analytics exports.

Major endpoints:

- `/misc/search/*` - Search functionality
- `/misc/moderation/*` - Content moderation
- `/misc/flags/*` - Content flagging
- `/misc/web3-events/*` - Web3 event notifications
- `/misc/trends/*` - Trending content
- `/misc/analytics/export/*` - Analytics export functionality

[View Miscellaneous API Documentation](./misc.md)

## Data Models

The API uses consistent data models across endpoints. Each category documentation contains the relevant data models for that section.

## Implementation Considerations

Each API category has its own implementation considerations that address performance, security, and user experience concerns. See individual documentation pages for details.

## Versioning

The API is versioned to ensure compatibility. The current version is `v1`.

Major version changes will be indicated in the URL path. Minor changes will be backward-compatible within the same major version.

## Rate Limiting

The API implements rate limiting to prevent abuse. Rate limits are specified in the response headers:

- `X-RateLimit-Limit`: Total requests allowed in the window
- `X-RateLimit-Remaining`: Remaining requests in the current window
- `X-RateLimit-Reset`: Unix timestamp when the rate limit resets

When rate limits are exceeded, a 429 response is returned.

## Common Error Codes

| Code | Description                               |
| ---- | ----------------------------------------- |
| 400  | Bad Request - Invalid input parameters    |
| 401  | Unauthorized - Authentication required    |
| 403  | Forbidden - Insufficient permissions      |
| 404  | Not Found - Resource does not exist       |
| 409  | Conflict - Resource state conflict        |
| 422  | Unprocessable Entity - Validation error   |
| 429  | Too Many Requests - Rate limit exceeded   |
| 500  | Internal Server Error - Server-side issue |
