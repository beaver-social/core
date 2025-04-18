# Auth Routes

This folder contains all authentication and identity management logic for the Beaver Social backend, supporting both standard wallet-based and zkLogin authentication. The routes are built using the [Hono](https://hono.dev/) framework and leverage Drizzle ORM for database operations.

---

## Folder Structure

```
auth/
├── index.ts         # Main router for auth endpoints
├── auth.ts          # Endpoints for registration and challenge
├── auth.action.ts   # Identity creation logic (on-chain and DB)
├── helpers.ts       # Helper functions for auth (username, address, challenge)
├── zk.ts            # Endpoints for zkLogin services
└── zk.helpers.ts    # Helper functions for zkLogin salt derivation
```

---

## Route Composition

All auth routes are mounted under `/auth` in the API. The `index.ts` file composes the sub-routes:

- `/auth` → Main authentication endpoints (register, challenge)
- `/auth/zk` → zkLogin-related endpoints (salt, prover)

---

## Endpoints

### 1. `/auth`

#### `POST /auth/register`

- **Description:** Register a new user identity, both on-chain and in the database.
- **Body (JSON):**
  - `username` (string, required)
  - `fullName` (string, required)
  - `address` (string, required, Sui address)
  - `imageUrl` (string, required)
  - `about` (string, required)
  - `loginType` (enum: `"wallet"` or `"zk"`, required)
- **Query Params:**
  - `userId` (number, required)
  - `signature` (string, required)
- **Response:**
  - `201 Created` on success.
  - `400 Bad Request` if creation fails.

#### `GET /auth/challenge`

- **Description:** Generate a challenge (nonce) for the authenticated user for a specific route. The challenge is stored in the database and used for signature verification.
- **Authentication:** Requires authentication middleware.
- **Query Params:**
  - `route` (string, required)
- **Response:**
  - `200 OK` with `{ nonce: string }` on success.
  - `400 Bad Request` if challenge generation fails.

---

### 2. `/auth/zk`

#### `POST /auth/zk/salt`

- **Description:** Derive a user salt for zkLogin using a JWT. The salt is derived using a secure HKDF-like process and is required for zkLogin cryptography.
- **Body (JSON):**
  - `jwt` (object, required): JWT payload.
- **Response:**
  - `200 OK` with:
    ```json
    {
      "salt": {
        "hex": "string",
        "base64": "string",
        "integer": "string"
      }
    }
    ```

#### `POST /auth/zk/prover`

- **Description:** zkLogin prover service (currently returns a placeholder message).
- **Response:**
  - `200 OK` with `{ message: "zkLogin prover service" }`.

---

## Helper Functions

### `helpers.ts`

- **checkUsernameAvailability(username: string):** Checks if a username is available in the database.
- **isAddressRegistered(address: string):** Checks if a Sui address is already registered.
- **generateNonce():** Generates a secure random nonce (hex string) for challenges.
- **getUser(userId: number):** Fetches a user by ID from the database.
- **verifyChallenge(message, userId, signature):** Verifies a user's signature against a stored challenge and deletes the challenge after use.

### `auth.action.ts`

- **createIdentity:** Handles both on-chain identity creation (via Sui smart contract) and user insertion into the database. Ensures atomicity and error handling.

### `zk.helpers.ts`

- **deriveUserSalt(jwt):** Securely derives a 16-byte salt from JWT fields using HKDF-like logic and a master seed from environment variables. Used for zkLogin cryptography.

---

## Common Features

- **Validation:** Uses [zod](https://zod.dev/) and `@hono/zod-validator` for parameter and body validation.
- **Database:** Uses Drizzle ORM for querying and inserting into the database.
- **Error Handling:** Uses a `tryCatch` utility for async error handling. Returns appropriate error messages and status codes.
- **Authentication:** Some endpoints require authentication middleware.

---

## Example Usage

**Register a new user:**

```
POST /auth/register?userId=1&signature=0xabc...
Content-Type: application/json

{
  "username": "alice",
  "fullName": "Alice Smith",
  "address": "0x123...",
  "imageUrl": "https://example.com/avatar.png",
  "about": "Web3 enthusiast",
  "loginType": "wallet"
}
```

**Get a challenge:**

```
GET /auth/challenge?route=/some/protected/route
Authorization: Bearer <token>
```

**Get zkLogin salt:**

```
POST /auth/zk/salt
Content-Type: application/json

{
  "jwt": { ... }
}
```

---

## Extending

To add more authentication endpoints, create a new file in this folder and register it in `index.ts` using `.route()`.
