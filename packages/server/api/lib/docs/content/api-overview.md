## Overview

The Beaver Server API is a RESTful API service that powers the social network functionality and handles blockchain integration. It provides endpoints for user management, authentication, social interactions, content creation, and blockchain transactions.

## API Base URL

The API is available at:

- Production: `https://beaversocial.xyz/api/v1`
- Testnet: `https://beaversocial.xyz/api/v1`

## Authentication

Most API endpoints require authentication using a JWT token. This token is obtained through the wallet authentication flow.

**Authentication Headers:**

```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

The API implements rate limiting to ensure fair usage and system stability. Rate limits vary by endpoint but generally follow these guidelines:

- Public endpoints: 60 requests per minute
- Authenticated endpoints: 120 requests per minute
- Post creation: 30 requests per 5 minutes
