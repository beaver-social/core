# Beaver Social API

## Overview

The Beaver Social API is a comprehensive backend service powering a social media platform built on Web3 technologies. It provides RESTful endpoints for user management, content creation, interaction, authentication, and various utility services. The API is built with modern TypeScript, using Hono.js for request handling, Drizzle ORM for database operations, and integrates with the Sui blockchain for Web3 functionality.

## Directory Structure

```
api/
├── index.ts                # Main entry point
├── constants.ts            # API constants and configuration
├── legacy/                 # Legacy API endpoints and schema (for backward compatibility)
├── lib/                    # Shared libraries and utilities
├── middlewares/            # API middleware functions
├── routes/                 # API routes organized by domain
├── schema/                 # Database schema definitions
```

## Key Components

### Routes (`/routes`)

The routes directory organizes API endpoints by domain. Each domain has its own folder with route definitions.

```
routes/
├── auth/                   # Authentication routes
│   ├── index.ts            # Route aggregation
│   ├── auth.ts             # Authentication handlers
│   ├── auth.action.ts      # Authentication business logic
│   └── zk.ts               # Zero-knowledge proof auth routes
├── content/                # Content-related routes
│   ├── index.ts            # Route aggregation
│   ├── post.ts             # Post endpoints
│   ├── post.action.ts      # Post business logic
│   ├── post.helpers.ts     # Post utility functions
│   ├── post.readme.md      # Documentation
│   ├── short.ts            # Short-form content endpoints
│   ├── shorts.ts           # Short content aggregation endpoints
│   ├── topic.ts            # Topic/community endpoints
│   └── topics.ts           # Topics listing endpoints
├── user/                   # User-related routes
│   ├── index.ts            # Route aggregation
│   ├── user.ts             # User profile endpoints
│   ├── settings.ts         # User settings endpoints
│   ├── messages.ts         # Messaging endpoints
│   ├── topics.ts           # User topic membership endpoints
│   └── monetization.ts     # Monetization endpoints
└── misc/                   # Miscellaneous routes
    ├── index.ts            # Route aggregation
    └── search.ts           # Search endpoints
```

### Schema (`/schema`)

The schema directory defines database tables and relationships using Drizzle ORM.

```
schema/
├── index.ts                # Schema aggregation and DB setup
├── helpers.ts              # Schema utility functions
├── content/                # Content-related schemas
│   ├── index.ts            # Content schema aggregation
│   ├── posts.ts            # Posts table definition
│   ├── shorts.ts           # Shorts table definition
│   ├── topics.ts           # Topics table definition
│   └── media.ts            # Media attachments table definition
├── interactions/           # User interaction schemas
│   ├── index.ts            # Interaction schema aggregation
│   ├── actions.ts          # User actions table definition
│   ├── content.ts          # Content interactions (likes, saves, views)
│   ├── social.ts           # Social interactions (follows)
│   └── moderation.ts       # Moderation actions (reports)
├── user/                   # User-related schemas
│   ├── index.ts            # User schema aggregation
│   └── users.ts            # Users table definition
└── misc/                   # Miscellaneous schemas
    ├── index.ts            # Misc schema aggregation
    ├── awards.ts           # Awards table definition
    └── timezones.ts        # Timezones table definition
```

### Libraries (`/lib`)

The lib directory contains shared utilities, helpers, and integrations.

```
lib/
├── actions/                # Action creator pattern implementation
│   ├── factory.ts          # Action factory function
│   └── factory.helpers.ts  # Action factory helper functions
├── s3/                     # S3 storage integration
│   └── upload.ts           # File upload utilities
├── sui/                    # Sui blockchain integration
│   ├── client.ts           # Sui client configuration
│   ├── contracts.ts        # Contract interface definitions
│   └── constants.ts        # Blockchain constants
├── tryCatch.ts             # Error handling utility
├── utils.ts                # General utilities
└── zod/                    # Zod validation schemas
    └── helpers.ts          # Common validation schemas
```

### Middleware (`/middlewares`)

The middlewares directory contains request processing functions.

```
middlewares/
├── auth.ts                 # Authentication middleware
└── staticRequestsHandler.ts # Static content handling
```

## Design Patterns

### Action Pattern

The API uses a consistent action pattern for business logic in `.action.ts` files, separating API endpoints from their implementation. This pattern:

1. Encapsulates business logic in functions
2. Provides transaction management
3. Records actions in the action log for audit/replay
4. Verifies user signatures for secure operations

Example action file structure:

```typescript
// post.action.ts
export const createPost = createAction<{
  content: string;
  parentId?: number;
  media: MediaItem[];
  flags?: PostFlags;
}>()(
  // Implementation function
  async (tx, { userId, content, parentId, media, flags }) => {
    // Database operations using transaction (tx)
    // Return created entity
  },

  // Optional callback after action is recorded
  async (tx, post, action) => {
    // Additional operations after main transaction succeeds
    // Often used for analytics or linking action records
  },
);
```

### Helper Pattern

Helper files (`.helpers.ts`) contain utility functions that support route handlers and actions. These functions:

1. Handle common operations like content sanitization
2. Provide data formatting and transformation
3. Encapsulate complex processing logic (like media processing)

Example helper pattern:

```typescript
// post.helpers.ts
export function sanitizePostContent(content: string): string {
  // Content cleaning and sanitization logic
}

export function extractHashtags(content: string): string[] {
  // Hashtag extraction logic
}

export async function processAndUploadImage(
  imageBuffer: Buffer,
): Promise<UploadResult> {
  // Complex image processing and upload logic
}
```

### Route Pattern

Route files (`.ts` in `/routes` subdirectories) define API endpoints using Hono.js. They:

1. Define URL paths and HTTP methods
2. Handle request validation using Zod validators
3. Call appropriate action functions for business logic
4. Format and return responses

Example route pattern:

```typescript
// post.ts
export default new Hono()
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (ctx) => {
      // Handler implementation
      // Often calls a function from a .action.ts file
    },
  )
  .post("/create", zValidator("json", PostCreateSchema), async (ctx) => {
    // Handler implementation
  });
```

## Schema Design

### Table and Relationship Design

The API uses Drizzle ORM with a well-structured schema:

1. Core tables in appropriate domain folders
2. Foreign key relationships for data integrity
3. Indexes for optimized queries
4. Consistent timestamp fields

Example schema definition:

```typescript
// posts.ts
export const posts = table(
  "posts",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    authorId: t
      .int("user_id")
      .notNull()
      .references(() => users.id),
    content: t.text().notNull(),
    // Additional fields...
    ...timestamps,
  },
  (table) => [
    // Indexes
    t.index("author_idx").on(table.authorId),
    // Additional indexes...
  ],
);
```

### Transactions and Database Access

Database operations use transactions for data consistency:

1. Most mutations are wrapped in transactions
2. Actions handle transaction management
3. Rollbacks on failure to maintain integrity

## Authentication and Security

### Web3 Authentication

The API implements Web3 authentication:

1. Signature-based authentication using Sui wallet
2. Action verification through signed messages
3. Zero-knowledge proof support (for anonymous actions)

### Action Verification

Actions are secured through:

1. Message signing and verification
2. Action chaining with previous hash references
3. Compressed action payload storage (using MessagePack)

## Media Handling

The API includes sophisticated media processing:

1. Image optimization and compression
2. Thumbnail generation
3. Video processing
4. S3-compatible storage integration

## Development Guidelines

When extending or modifying the API:

1. **Routes**: Add endpoints to appropriate domain folder
2. **Actions**: Implement business logic in `.action.ts` files
3. **Helpers**: Keep utility functions in `.helpers.ts` files
4. **Schema**: Define tables in the appropriate schema folder
5. **Validation**: Use Zod schemas for input validation
6. **Documentation**: Document new endpoints in README files
7. **Error Handling**: Use consistent error handling patterns

## API Response Format

The API follows a consistent response format:

```typescript
{
  data?: any;           // Response data if successful
  error?: string;       // Error message if unsuccessful
  message?: string;     // Human-readable message
  status: number;       // HTTP status code
  pagination?: {        // Pagination info if applicable
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  }
}
```
