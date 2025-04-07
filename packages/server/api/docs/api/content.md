# Content API

## Overview

This document outlines the API endpoints for content creation, management, and interactions within the Beaver Social platform, including posts, media, shorts, and collections.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Post Creation & Management

### Base Path: `/content/posts`

| Endpoint       | Method | Description           | Query Params                                     | Request Body                         | Response                    |
| -------------- | ------ | --------------------- | ------------------------------------------------ | ------------------------------------ | --------------------------- |
| `/`            | POST   | Create a new post     | -                                                | `{ content, media?: [{url, type}] }` | `{ post }`                  |
| `/`            | GET    | Get feed posts        | `?page=1&limit=20&type=all\|following\|trending` | -                                    | `{ posts: [], pagination }` |
| `/:id`         | GET    | Get a specific post   | -                                                | -                                    | `{ post, media, author }`   |
| `/:id`         | DELETE | Delete a post         | -                                                | -                                    | `{ success }`               |
| `/:id`         | PATCH  | Update a post         | -                                                | `{ content? }`                       | `{ post }`                  |
| `/trending`    | GET    | Get trending posts    | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |
| `/recommended` | GET    | Get recommended posts | `?page=1&limit=20`                               | -                                    | `{ posts: [], pagination }` |

## 2. Post Interactions

### Base Path: `/content/posts/:id`

| Endpoint      | Method | Description                | Query Params       | Request Body           | Response                      |
| ------------- | ------ | -------------------------- | ------------------ | ---------------------- | ----------------------------- |
| `/like`       | POST   | Like a post                | -                  | -                      | `{ success, likesCount }`     |
| `/unlike`     | POST   | Unlike a post              | -                  | -                      | `{ success, likesCount }`     |
| `/repost`     | POST   | Repost/share a post        | -                  | `{ comment? }`         | `{ success, repost }`         |
| `/pin`        | POST   | Pin post to profile        | -                  | -                      | `{ success }`                 |
| `/unpin`      | POST   | Unpin post from profile    | -                  | -                      | `{ success }`                 |
| `/likers`     | GET    | Get users who liked post   | `?page=1&limit=20` | -                      | `{ users: [], pagination }`   |
| `/reposters`  | GET    | Get users who reposted     | `?page=1&limit=20` | -                      | `{ users: [], pagination }`   |
| `/bookmark`   | POST   | Bookmark a post            | -                  | -                      | `{ success }`                 |
| `/unbookmark` | POST   | Remove post from bookmarks | -                  | -                      | `{ success }`                 |
| `/report`     | POST   | Report a post              | -                  | `{ reason, details? }` | `{ success, reportId }`       |
| `/reactions`  | POST   | React with emoji           | -                  | `{ emoji }`            | `{ success, reactionsCount }` |
| `/reactions`  | GET    | Get reactions to post      | `?page=1&limit=20` | -                      | `{ reactions: [], counts }`   |

## 3. Replies & Threads

### Base Path: `/content/posts/:id/replies`

| Endpoint           | Method | Description                        | Query Params       | Request Body                         | Response                      |
| ------------------ | ------ | ---------------------------------- | ------------------ | ------------------------------------ | ----------------------------- |
| `/`                | GET    | Get replies to a post              | `?page=1&limit=20` | -                                    | `{ replies: [], pagination }` |
| `/`                | POST   | Reply to a post                    | -                  | `{ content, media?: [{url, type}] }` | `{ reply }`                   |
| `/thread`          | GET    | Get full thread (parent + replies) | -                  | -                                    | `{ thread: [], rootPost }`    |
| `/:replyId`        | GET    | Get specific reply                 | -                  | -                                    | `{ reply }`                   |
| `/:replyId`        | DELETE | Delete a reply                     | -                  | -                                    | `{ success }`                 |
| `/:replyId`        | PATCH  | Update a reply                     | -                  | `{ content? }`                       | `{ reply }`                   |
| `/:replyId/like`   | POST   | Like a reply                       | -                  | -                                    | `{ success, likesCount }`     |
| `/:replyId/unlike` | POST   | Unlike a reply                     | -                  | -                                    | `{ success, likesCount }`     |

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

## 6. Collections & Bookmarks

### Base Path: `/content/collections`

| Endpoint             | Method | Description                 | Query Params       | Request Body                        | Response                    |
| -------------------- | ------ | --------------------------- | ------------------ | ----------------------------------- | --------------------------- |
| `/`                  | GET    | Get user's collections      | -                  | -                                   | `{ collections: [] }`       |
| `/`                  | POST   | Create a new collection     | -                  | `{ name, description?, private? }`  | `{ collection }`            |
| `/:id`               | GET    | Get a specific collection   | -                  | -                                   | `{ collection, posts: [] }` |
| `/:id`               | PATCH  | Update a collection         | -                  | `{ name?, description?, private? }` | `{ collection }`            |
| `/:id`               | DELETE | Delete a collection         | -                  | -                                   | `{ success }`               |
| `/:id/posts`         | GET    | Get posts in collection     | `?page=1&limit=20` | -                                   | `{ posts: [], pagination }` |
| `/:id/posts`         | POST   | Add post to collection      | -                  | `{ postId }`                        | `{ success }`               |
| `/:id/posts/:postId` | DELETE | Remove post from collection | -                  | -                                   | `{ success }`               |

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

## 9. NFT & Monetization

### Base Path: `/content/nft`

| Endpoint            | Method | Description                 | Query Params                       | Request Body                    | Response                       |
| ------------------- | ------ | --------------------------- | ---------------------------------- | ------------------------------- | ------------------------------ |
| `/gallery`          | GET    | Get user's NFT gallery      | `?username=string&page=1&limit=20` | -                               | `{ nfts: [], pagination }`     |
| `/gallery/settings` | GET    | Get NFT gallery settings    | -                                  | -                               | `{ settings }`                 |
| `/gallery/settings` | PATCH  | Update NFT gallery settings | -                                  | `{ visibility, featured, etc }` | `{ settings }`                 |
| `/details/:tokenId` | GET    | Get NFT details             | -                                  | -                               | `{ nft, metadata, history }`   |
| `/collections`      | GET    | Get user's NFT collections  | `?username=string`                 | -                               | `{ collections: [] }`          |
| `/featured`         | GET    | Get user's featured NFTs    | `?username=string`                 | -                               | `{ nfts: [] }`                 |
| `/verify-ownership` | POST   | Verify NFT ownership        | -                                  | `{ tokenId, contractAddress }`  | `{ verified, ownershipProof }` |

### Base Path: `/content/monetization`

| Endpoint                     | Method | Description               | Query Params           | Request Body                         | Response                          |
| ---------------------------- | ------ | ------------------------- | ---------------------- | ------------------------------------ | --------------------------------- |
| `/creator-fund`              | GET    | Check creator fund status | -                      | -                                    | `{ eligible, requirements }`      |
| `/creator-fund/apply`        | POST   | Apply to creator fund     | -                      | `{ details, wallet }`                | `{ success, applicationId }`      |
| `/creator-fund/stats`        | GET    | Get creator fund earnings | `?timeRange=7d\|30d`   | -                                    | `{ earnings, analytics }`         |
| `/subscriptions`             | GET    | Get subscription status   | -                      | -                                    | `{ isSubscriber, subscribers }`   |
| `/subscriptions/tiers`       | GET    | Get subscription tiers    | -                      | -                                    | `{ tiers: [] }`                   |
| `/subscriptions/tiers`       | POST   | Create subscription tier  | -                      | `{ name, price, benefits, color }`   | `{ tier }`                        |
| `/subscriptions/subscribers` | GET    | Get subscribers list      | `?page=1&limit=20`     | -                                    | `{ subscribers: [], pagination }` |
| `/tips`                      | POST   | Send tip to creator       | -                      | `{ recipient, amount, message? }`    | `{ success, transactionId }`      |
| `/tips`                      | GET    | Get tip history           | `?type=sent\|received` | -                                    | `{ tips: [], pagination }`        |
| `/tokens/balance`            | GET    | Get token balances        | -                      | -                                    | `{ balances: [] }`                |
| `/tokens/claim`              | POST   | Claim earned tokens       | -                      | -                                    | `{ success, amount }`             |
| `/gating/verify`             | POST   | Verify access to content  | -                      | `{ contentId, contentType, proof? }` | `{ hasAccess, requiredGates }`    |

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