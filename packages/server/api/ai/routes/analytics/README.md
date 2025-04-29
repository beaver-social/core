# Analytics Routes

This folder contains API routes for analytics-related data in the Beaver Social backend. The routes are built using the [Hono](https://hono.dev/) framework and provide endpoints for retrieving interaction statistics for posts, swipes, and user profiles.

## Folder Structure

```
analytics/
├── index.ts      # Main router for analytics endpoints
├── posts.ts      # Endpoints for post analytics
├── swipes.ts     # Endpoints for swipe analytics
└── users.ts      # Endpoints for user analytics
```

---

## Route Composition

All analytics routes are mounted under `/analytics` in the API. The `index.ts` file composes the sub-routes:

- `/analytics/posts` → Post analytics
- `/analytics/swipes` → Swipe analytics
- `/analytics/users` → User analytics

---

## Endpoints

### 1. `/analytics/posts`

#### `GET /analytics/posts/:id/interactions`

- **Description:** Get interaction counts for a specific post.
- **Params:**
  - `id` (string, required): The post ID (must be a number string).
- **Response:**
  - `200 OK` with:
    ```json
    {
      "likesCount": number,
      "repliesCount": number,
      "sharesCount": number,
      "repostsCount": number,
      "viewCount": number
    }
    ```
  - `400 Bad Request` if the query fails.
  - `404 Not Found` if the post does not exist.

---

### 2. `/analytics/swipes`

#### `GET /analytics/swipes/:id/interactions`

- **Description:** Get interaction counts for a specific swipe.
- **Params:**
  - `id` (string, required): The swipe ID (must be a number string).
- **Response:**
  - `200 OK` with:
    ```json
    {
      "viewCount": number,
      "likesCount": number,
      "repostsCount": number,
      "sharesCount": number,
      "commentsCount": number
    }
    ```
  - `400 Bad Request` if the query fails.
  - `404 Not Found` if the swipe does not exist.

---

### 3. `/analytics/users`

#### `GET /analytics/users/profile`

- **Description:** Get analytics for the authenticated user's profile.
- **Authentication:** Requires authentication middleware.
- **Response:**
  - Returns the user's analytics data (structure depends on the `users` table).
  - Error handling is present but not fully implemented in the code snippet.

---

## Common Features

- **Validation:** Uses [zod](https://zod.dev/) and `@hono/zod-validator` for parameter validation.
- **Database:** Uses Drizzle ORM for querying the database.
- **Error Handling:** Uses a `tryCatch` utility for async error handling. Returns appropriate error messages and status codes.
- **Authentication:** The `/users/profile` endpoint requires authentication.

---

## Example Usage

**Get post interactions:**

```
GET /analytics/posts/123/interactions
```

**Get swipe interactions:**

```
GET /analytics/swipes/456/interactions
```

**Get authenticated user profile analytics:**

```
GET /analytics/users/profile
Authorization: Bearer <token>
```

---

## Extending

To add more analytics endpoints, create a new file in this folder and register it in `index.ts` using `.route()`.
