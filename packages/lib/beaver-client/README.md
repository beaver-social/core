# Beaver Social Client SDK

A TypeScript SDK for interacting with the Beaver Social platform.

## Overview

The Beaver Client SDK provides a simple interface for interacting with the Beaver Social API. It handles authentication, data fetching, and data manipulation operations. The SDK is designed to work with both web and mobile applications.

## Project Structure

```
packages/lib/beaver-client/
├── src/
│   ├── comment/        # Comment-related functionality
│   ├── identity/       # User identity and authentication
│   ├── logger/         # Logging utilities
│   ├── post/           # Post creation, retrieval, and interaction
│   ├── styles/         # Style-related utilities
│   ├── utils/          # Helper functions
│   ├── index.ts        # Main entry point
│   └── types.ts        # TypeScript type definitions
├── package.json        # Package configuration
└── tsconfig.json       # TypeScript configuration
```

$$
## Development Setup

1. Install dependencies:

   ```
   bun install
   ```

2. Build the SDK:

   ```
   bun run build
   ```

3. Run in development mode (with watch):
   ```
   bun run dev
   ```

## Architecture

The SDK follows a modular architecture with these key components:

### BeaverClient

The main client class that initializes the SDK and provides access to all modules.

```typescript
const client = new BeaverClient(surface, config);
await client.initialize();
```

### Identity Module

Handles user authentication, profile creation, and profile updates.

### Post Module

Manages post-related operations like creating, updating, deleting posts, and interactions (likes, reposts, etc.).

### Comment Module

Handles comment-related functionality.

## Code Conventions

### 1. Module Structure

Each feature module follows this pattern:

- Class-based implementation
- Constructor that takes `defaults` and `logger` parameters
- Public methods for API interactions
- Private helper methods when needed

### 2. API Interaction Pattern

API calls follow this pattern:

1. Extract client and parameters
2. Prepare request data
3. Sign data when required
4. Make API request using Hono client
5. Return response or handle errors

Example:

```typescript
public async create(options: { /* parameters */ }) {
  const { apiClient, surface } = this.defaults;
  const { /* extract parameters */ } = options;

  // Prepare payload
  const payload = JSON.stringify({ /* payload data */ });

  // Sign if needed
  const messageBytes = new TextEncoder().encode(payload);
  const signatureResult = await tryCatch(surface.signPersonalMessage(messageBytes));

  // Handle potential signing errors
  if (signatureResult.error) {
    this.logger.error(`error message: ${signatureResult.error}`);
    throw new Error(`error message: ${signatureResult.error}`);
  }

  // Make API call
  return apiClient.some.endpoint.$post({
    json: { /* request data */ },
    query: { signature: signatureResult.data.signature },
  });
}
```

### 3. Error Handling

- Use the `tryCatch` utility for operations that might fail
- Log errors with appropriate context
- Throw meaningful errors for client applications

### 4. Documentation

- Use JSDoc comments for all public methods
- Document parameters, return types, and possible errors
- Include examples when appropriate

## Contributing Guidelines

### Adding New Features

1. **Understand Existing Patterns**: Review similar modules before adding new ones
2. **Add New Module**: Create a new directory in `src/` for the feature
3. **Implement Class**: Create an index.ts with a class following the established pattern
4. **Export in Main Index**: Add your module to the main index.ts file
5. **Document**: Add JSDoc comments to all public methods
6. **Test**: Verify functionality works as expected

### Modifying Existing Code

1. **Follow Existing Patterns**: Maintain consistency with the codebase
2. **Preserve Interface**: Avoid breaking changes to public methods
3. **Update Documentation**: Ensure JSDoc comments are updated

## API Integration

When integrating with API routes:

1. Use the Hono client from `this.defaults.apiClient`
2. Follow the route structure defined in the server package
3. Use proper parameter types and response handling

## Building for Production

Run the build command to generate production-ready distribution files:

```
npm run build
```

This generates:

- CJS format (CommonJS)
- ESM format (ES Modules)
- TypeScript declaration files

## Generating Documentation

Run the docs command to generate API documentation:

```
npm run docs
```

Documentation will be generated in the `docs/` directory.


## VERIFY THE FOLLOWING CHANGES @MARSIAN

- [ ] is the tsconfig/base.json file correct?
- [ ] why did we have JSDoc comments in the methods? (i removed them for now, let me know if we need them)
$$w
$$
