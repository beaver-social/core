## 1. Post Creation & Management

### Base Path: `/content/posts`.

| Endpoint       | Method | Description           | Query Params                                     | Request Body                         | Response                    |
| -------------- | ------ | --------------------- | ------------------------------------------------ | ------------------------------------ | --------------------------- |
| `/`            | POST   | Create a new post     | -                                                | `{ content, media?: [{url, type}] }` | `{ post }`                  |
| `/`            | GET    | Get feed posts        | `?page=1&limit=20&type=all\|following\|trending` | -                                    | `{ posts: [], pagination }` |
| `/trending`    | GET    | Get trending posts    | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |
| `/recommended` | GET    | Get recommended posts | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |
| `/following`   | GET    | Get following posts   | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |

## 3. Replies & Threads

### Base Path: `/content/posts/:id/replies`

| Endpoint  | Method | Description                        | Query Params       | Request Body                         | Response                      |
| --------- | ------ | ---------------------------------- | ------------------ | ------------------------------------ | ----------------------------- |
| `/`       | GET    | Get replies to a post              | `?page=1&limit=20` | -                                    | `{ replies: [], pagination }` |
| `/`       | POST   | Reply to a post                    | -                  | `{ content, media?: [{url, type}] }` | `{ reply }`                   |
| `/thread` | GET    | Get full thread (parent + replies) | -                  | -                                    | `{ thread: [], rootPost }`    |

## 4. Media Management

### Base Path: `/content/media`

| Endpoint      | Method | Description                 | Query Params                              | Request Body                  | Response                    |
| ------------- | ------ | --------------------------- | ----------------------------------------- | ----------------------------- | --------------------------- |
| `/upload`     | POST   | Upload media (image/video)  | -                                         | `{ file, aspectRatio, type }` | `{ url, type, id }`         |
| `/explore`    | GET    | Get media posts for explore | `?page=1&limit=20&type=all\|image\|video` | -                             | `{ media: [], pagination }` |
| `/:id/delete` | DELETE | Delete specific media       | -                                         | -                             | `{ success }`               |
| `/trending`   | GET    | Get trending media          | `?type=image\|video`                      | -                             | `{ media: [] }`             |
| `/tags/:tag`  | GET    | Get media by tag            | `?page=1&limit=20`                        | -                             | `{ media: [], pagination }` |

## 5. Shorts/Reels Management

### Base Path: `/content/shorts`

| Endpoint        | Method | Description                   | Query Params       | Request Body                                  | Response                       |
| --------------- | ------ | ----------------------------- | ------------------ | --------------------------------------------- | ------------------------------ |
| `/`             | GET    | Get feed shorts/reels         | `?page=1&limit=10` | -                                             | `{ shorts: [], pagination }`   |
| `/`             | POST   | Create a new short            | -                  | `{ videoUrl, caption?, soundId?, tags?: [] }` | `{ short }`                    |
| `/:id`          | GET    | Get a specific short          | -                  | -                                             | `{ short }`                    |
| `/:id`          | DELETE | Delete a short                | -                  | -                                             | `{ success }`                  |
| `/:id/like`     | POST   | Like a short                  | -                  | -                                             | `{ success, likesCount }`      |
| `/:id/unlike`   | POST   | Unlike a short                | -                  | -                                             | `{ success, likesCount }`      |
| `/:id/comments` | GET    | Get comments on a short       | `?page=1&limit=20` | -                                             | `{ comments: [], pagination }` |
| `/:id/comments` | POST   | Comment on a short            | -                  | `{ content }`                                 | `{ comment }`                  |
| `/trending`     | GET    | Get trending shorts           | `?limit=20`        | -                                             | `{ shorts: [] }`               |
| `/sounds`       | GET    | Get popular sounds for shorts | `?page=1&limit=20` | -                                             | `{ sounds: [], pagination }`   |
| `/sounds/:id`   | GET    | Get shorts using a sound      | `?page=1&limit=20` | -                                             | `{ shorts: [], pagination }`   |

## 7. Polls & Interactive Content

### Base Path: `/content/polls`

| Endpoint      | Method | Description      | Query Params       | Request Body                      | Response                     |
| ------------- | ------ | ---------------- | ------------------ | --------------------------------- | ---------------------------- |
| `/`           | POST   | Create a poll    | -                  | `{ question, options, duration }` | `{ poll }`                   |
| `/:id`        | GET    | Get poll details | -                  | -                                 | `{ poll }`                   |
| `/:id/vote`   | POST   | Vote in a poll   | -                  | `{ optionId }`                    | `{ success, updatedPoll }`   |
| `/:id/voters` | GET    | Get poll voters  | `?page=1&limit=20` | -                                 | `{ voters: [], pagination }` |

## 8. Content Visibility & Embedding

### Base Path: `/content/visibility`

| Endpoint               | Method | Description                     | Query Params | Request Body                      | Response        |
| ---------------------- | ------ | ------------------------------- | ------------ | --------------------------------- | --------------- |
| `/`                    | GET    | Get content visibility settings | -            | -                                 | `{ settings }`  |
| `/`                    | PATCH  | Update visibility settings      | -            | `{ discoverable, comments, etc }` | `{ settings }`  |
| `/embed/:postId`       | GET    | Get post embed code             | -            | -                                 | `{ embedCode }` |
| `/embed/settings`      | GET    | Get embed settings              | -            | -                                 | `{ settings }`  |
| `/embed/settings`      | PATCH  | Update embed settings           | -            | `{ allowEmbedding, domains? }`    | `{ settings }`  |
| `/aggregator-settings` | GET    | Get aggregator settings         | -            | -                                 | `{ settings }`  |
| `/aggregator-settings` | PATCH  | Update aggregator settings      | -            | `{ allowAggregation, include? }`  | `{ settings }`  |

## 10. Content Discovery

### Base Path: `/content/discovery`

| Endpoint         | Method | Description              | Query Params                        | Response                      |
| ---------------- | ------ | ------------------------ | ----------------------------------- | ----------------------------- |
| `/search`        | GET    | Search for posts         | `?q=string&page=1&limit=20`         | `{ posts: [], pagination }`   |
| `/hashtags`      | GET    | Get trending hashtags    | `?limit=10`                         | `{ hashtags: [] }`            |
| `/hashtag/:tag`  | GET    | Get posts with hashtag   | `?page=1&limit=20`                  | `{ posts: [], pagination }`   |
| `/explore`       | GET    | Get explore page content | `?page=1&limit=20&category=string`  | `{ content: [], pagination }` |
| `/tags/trending` | GET    | Get trending hashtags    | `?limit=10&timeRange=24h`           | `{ tags: [] }`                |
| `/topics`        | GET    | Get trending topics      | `?limit=10&timeRange=24h&category=` | `{ topics: [] }`              |

### Base Path: `/content/recommendations`

| Endpoint       | Method | Description                     | Query Params                      | Response                     |
| -------------- | ------ | ------------------------------- | --------------------------------- | ---------------------------- |
| `/posts`       | GET    | Get recommended posts           | `?page=1&limit=20`                | `{ posts: [], pagination }`  |
| `/users`       | GET    | Get recommended users           | `?page=1&limit=20&interests=true` | `{ users: [], pagination }`  |
| `/topics`      | GET    | Get recommended topics          | `?limit=10`                       | `{ topics: [] }`             |
| `/collections` | GET    | Get recommended collections     | `?page=1&limit=10`                | `{ collections: [] }`        |
| `/shorts`      | GET    | Get recommended shorts          | `?page=1&limit=10`                | `{ shorts: [], pagination }` |
| `/feedback`    | POST   | Provide recommendation feedback | `{ itemId, itemType, relevant }`  | `{ success }`                |
