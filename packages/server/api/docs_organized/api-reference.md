# API Reference & Overview

## Introduction

This document provides an overview of the Beaver Social platform API, including conventions, authentication methods, and common patterns. Detailed endpoint documentation can be found in the respective feature documentation files.

## Base URL

All API endpoints are relative to the base URL:

```
https://api.beaversocial.io/api/v1/
```

For local development:

```
http://localhost:3000/api/v1/
```

## Authentication

### Authentication Methods

The Beaver Social API supports the following authentication methods:

1. **Bearer Token Authentication**

   ```
   Authorization: Bearer <token>
   ```

2. **zkLogin Authentication**
   Secure authentication using zero-knowledge proofs with wallet integration.

3. **Wallet Signature Authentication**
   Direct wallet connection with cryptographic signature verification.

### Authentication Flow

1. Request a challenge:

   ```
   POST /auth/wallet/challenge
   { "address": "0x..." }
   ```

2. Sign the challenge with the user's wallet

3. Verify the signature:

   ```
   POST /auth/wallet/verify
   { "address": "0x...", "signature": "0x..." }
   ```

4. Receive a JWT token to use for subsequent requests:
   ```
   { "success": true, "token": "eyJhbGciOiJIUzI...", "isRegistered": true }
   ```

## Request/Response Format

### Content Type

All requests and responses use JSON format with the content type `application/json`.

### Success Response Format

Successful responses follow this general structure:

```json
{
  "data": { ... },     // Actual response data
  "pagination": { ... } // Optional pagination information
}
```

### Error Response Format

Error responses follow this general structure:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": { ... } // Optional additional error details
  }
}
```

### Common Error Codes

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

## Pagination

Endpoints that return lists support pagination using the following query parameters:

- `page`: Page number (1-indexed)
- `limit`: Number of items per page
- `cursor`: For cursor-based pagination (when available)

Paginated responses include:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 100,
    "totalPages": 5,
    "nextCursor": "abc123" // When cursor-based pagination is used
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. Rate limits are specified in the response headers:

- `X-RateLimit-Limit`: Total requests allowed in the window
- `X-RateLimit-Remaining`: Remaining requests in the current window
- `X-RateLimit-Reset`: Unix timestamp when the rate limit resets

When rate limits are exceeded, a 429 response is returned.

## Versioning

The API is versioned to ensure compatibility. The current version is `v1`.

Major version changes will be indicated in the URL path. Minor changes will be backward-compatible within the same major version.

## Web3 Integration

### Supported Networks

The Beaver Social API supports the following blockchain networks:

- Sui
- Ethereum
- Polygon
- Solana

### Transaction Signing

For operations requiring on-chain transactions, the API follows this pattern:

1. Request transaction preparation:

   ```
   POST /api/v1/transaction/prepare
   { "type": "transfer", "params": {...} }
   ```

2. Receive transaction details to be signed:

   ```
   { "txBytes": "...", "gas": {...} }
   ```

3. Sign transaction client-side

4. Submit the signed transaction:
   ```
   POST /api/v1/transaction/submit
   { "signature": "...", "txBytes": "..." }
   ```

## Common Data Models

### UserSummary

```typescript
interface UserSummary {
  id: string;
  username: string;
  fullName: string;
  image_url: string;
  isVerified: boolean;
  address: string; // Wallet address
  followerCount: number;
  followingCount: number;
}
```

### Timestamps

All timestamps are returned in ISO 8601 format (UTC):

```
"2025-04-07T12:34:56Z"
```

### Media Object

```typescript
interface Media {
  id: string;
  url: string;
  type: "image" | "video";
  aspectRatio: "square" | "portrait" | "landscape";
  width?: number;
  height?: number;
  thumbnailUrl?: string;
  blurHash?: string;
}
```

### Pagination

```typescript
interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  nextCursor?: string;
  prevCursor?: string;
}
```

## Documentation Organization

The API documentation is organized into the following sections:

1. [Authentication & Identity](./auth-identity.md) - Authentication, registration, and identity management
2. [User Profile](./user-profile.md) - User profile management and relationships
3. [Content](./content.md) - Posts, media, shorts, and content interactions
4. [Messaging](./messaging.md) - Direct messaging and group chats
5. [Notifications](./notifications.md) - Notifications, alerts, and web3 events
6. [Settings](./settings.md) - User settings and preferences
7. [Discovery](./discovery.md) - Search, explore, and content discovery
8. [NFT & Monetization](./nft-monetization.md) - NFT gallery and creator economy features

## API Client Libraries

Official client libraries are available for:

- JavaScript/TypeScript: `@beaversocial/client`
- React/React Native: `@beaversocial/react`
- Python: `beaversocial-py`

## Webhooks

Beaver Social supports webhooks for real-time event notifications. Webhook configuration is available through the developer portal.

### Webhook Events

- `post.created`
- `post.interaction`
- `user.followed`
- `message.received`
- `nft.transferred`
- `transaction.completed`

### Webhook Format

```json
{
  "event": "post.created",
  "timestamp": "2025-04-07T12:34:56Z",
  "data": {
    // Event-specific data
  },
  "signature": "..." // HMAC signature for verification
}
```

## Best Practices

1. **Authentication**

   - Store tokens securely
   - Implement refresh token rotation
   - Set appropriate token expiration

2. **Error Handling**

   - Implement proper error handling for all API calls
   - Provide user-friendly error messages
   - Add retry logic with exponential backoff for transient errors

3. **Caching**

   - Respect Cache-Control headers
   - Implement efficient client-side caching
   - Use ETags for conditional requests

4. **Performance**

   - Request only needed fields
   - Use pagination for large result sets
   - Batch related requests when possible

5. **Security**
   - Validate all user inputs
   - Implement proper CORS policies
   - Use HTTPS for all API calls

## Support & Resources

- Developer Portal: [https://developers.beaversocial.io](https://developers.beaversocial.io)
- API Status: [https://status.beaversocial.io](https://status.beaversocial.io)
- Developer Community: [https://discord.gg/beaversocial-dev](https://discord.gg/beaversocial-dev)
- Bug Reports: [https://github.com/beaver-social/api-issues](https://github.com/beaver-social/api-issues)

## Change Log

### v1.0.0 - April 2025

- Initial public API release

### v1.1.0 - Planned

- Enhanced NFT integration
- Advanced analytics endpoints
- Improved content moderation features
