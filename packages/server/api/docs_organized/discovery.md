# Discovery API

## Overview

This document outlines the API endpoints for search, discovery, trends, and recommendations in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Search

### Base Path: `/search`

| Endpoint           | Method | Description                  | Query Params                                      | Response                               |
| ------------------ | ------ | ---------------------------- | ------------------------------------------------- | -------------------------------------- |
| `/combined`        | GET    | Search across all content    | `?query=string&types=posts,users,topics&limit=20` | `{ users: [], posts: [], topics: [] }` |
| `/users/typeahead` | GET    | Get user search suggestions  | `?query=string&limit=10`                          | `{ users: [] }`                        |
| `/topics/trending` | GET    | Get trending topics          | `?limit=10&category=string`                       | `{ topics: [] }`                       |
| `/filters`         | GET    | Get available search filters | -                                                 | `{ filters: [] }`                      |
| `/history`         | GET    | Get user's search history    | `?limit=10`                                       | `{ history: [] }`                      |
| `/history`         | DELETE | Clear search history         | -                                                 | `{ success }`                          |

## 2. Discover & Explore

### Base Path: `/discover`

| Endpoint         | Method | Description              | Query Params                       | Response                      |
| ---------------- | ------ | ------------------------ | ---------------------------------- | ----------------------------- |
| `/search`        | GET    | Search for posts         | `?q=string&page=1&limit=20`        | `{ posts: [], pagination }`   |
| `/hashtags`      | GET    | Get trending hashtags    | `?limit=10`                        | `{ hashtags: [] }`            |
| `/hashtag/:tag`  | GET    | Get posts with hashtag   | `?page=1&limit=20`                 | `{ posts: [], pagination }`   |
| `/explore`       | GET    | Get explore page content | `?page=1&limit=20&category=string` | `{ content: [], pagination }` |
| `/tags/trending` | GET    | Get trending hashtags    | `?limit=10&timeRange=24h`          | `{ tags: [] }`                |

## 3. Content Recommendations

### Base Path: `/recommendations`

| Endpoint       | Method | Description                     | Query Params                       | Response                     |
| -------------- | ------ | ------------------------------- | ---------------------------------- | ---------------------------- |
| `/users`       | GET    | Get recommended users           | `?page=1&limit=20&interests=true`  | `{ users: [], pagination }`  |
| `/posts`       | GET    | Get recommended posts           | `?page=1&limit=20`                 | `{ posts: [], pagination }`  |
| `/topics`      | GET    | Get recommended topics          | `?limit=10`                        | `{ topics: [] }`             |
| `/collections` | GET    | Get recommended collections     | `?page=1&limit=10`                 | `{ collections: [] }`        |
| `/shorts`      | GET    | Get recommended shorts          | `?page=1&limit=10`                 | `{ shorts: [], pagination }` |
| `/settings`    | GET    | Get recommendation settings     | -                                  | `{ settings }`               |
| `/settings`    | PATCH  | Update recommendation settings  | `{ interests, history, based_on }` | `{ settings }`               |
| `/feedback`    | POST   | Provide recommendation feedback | `{ itemId, itemType, relevant }`   | `{ success }`                |
| `/reset`       | POST   | Reset recommendation data       | -                                  | `{ success }`                |

## 4. Trends

### Base Path: `/trends`

| Endpoint      | Method | Description              | Query Params                              | Response                     |
| ------------- | ------ | ------------------------ | ----------------------------------------- | ---------------------------- |
| `/`           | GET    | Get all trending content | `?category=all&timeRange=24h`             | `{ trends }`                 |
| `/topics`     | GET    | Get trending topics      | `?limit=10&timeRange=24h&category=string` | `{ topics: [] }`             |
| `/posts`      | GET    | Get trending posts       | `?page=1&limit=20&category=string`        | `{ posts: [], pagination }`  |
| `/hashtags`   | GET    | Get trending hashtags    | `?limit=20&timeRange=24h`                 | `{ hashtags: [] }`           |
| `/shorts`     | GET    | Get trending shorts      | `?page=1&limit=20`                        | `{ shorts: [], pagination }` |
| `/for-you`    | GET    | Get personalized trends  | `?limit=10`                               | `{ trends: [] }`             |
| `/categories` | GET    | Get trend categories     | -                                         | `{ categories: [] }`         |

## Data Models

### SearchHistory

```typescript
interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  type: "user" | "post" | "topic" | "combined";
  createdAt: string;
}
```

### SearchFilter

```typescript
interface SearchFilter {
  id: string;
  name: string;
  type: "checkbox" | "select" | "radio" | "range";
  options?: string[];
  key: string;
}
```

### Topic

```typescript
interface Topic {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  followerCount: number;
  imageUrl?: string;
  trending?: boolean;
  category?: string;
  relatedTopics?: string[];
  createdAt: string;
}
```

### Hashtag

```typescript
interface Hashtag {
  id: string;
  name: string;
  postCount: number;
  recentPostCount: number;
  trendingScore: number;
  trending: boolean;
}
```

### RecommendationSettings

```typescript
interface RecommendationSettings {
  id: string;
  userId: string;
  useInterests: boolean;
  useBrowsingHistory: boolean;
  useLocation: boolean;
  excludedTopics: string[];
  contentTypes: {
    posts: boolean;
    shorts: boolean;
    users: boolean;
    nfts: boolean;
  };
  diversity: number; // 1-10 scale, higher means more diverse recommendations
  exploreNew: boolean;
  updatedAt: string;
}
```

### TrendingItem

```typescript
interface TrendingItem {
  id: string;
  type: "post" | "hashtag" | "topic" | "user" | "short";
  itemId: string;
  rank: number;
  score: number;
  postCount?: number;
  category?: string;
  metadata?: any;
  since: string; // When it started trending
}
```

## Implementation Considerations

1. **Search Performance**

   - Implement efficient search indexing (consider Elasticsearch/Algolia)
   - Optimize autocomplete for low latency
   - Implement proper text analysis for different languages
   - Cache frequent search patterns

2. **Recommendation Quality**

   - Balance between content relevance and discovery
   - Consider collaborative and content-based filtering
   - Implement feedback loops for recommendation improvement
   - A/B testing infrastructure for algorithm refinement

3. **Trend Detection**

   - Real-time trend analysis algorithms
   - Spam and manipulation detection
   - Geographic and demographic segmentation options
   - Weighted scoring based on engagement quality

4. **Personalization**

   - Respect user privacy settings and data preferences
   - Transparent recommendation explanations
   - User control over recommendation inputs
   - Content diversity and filter bubble prevention

5. **Discovery Experience**

   - Balance between trending content and personal interests
   - Support for content filtering by topic/type
   - New user cold-start recommendations
   - Token-gated exclusive content discovery

6. **Performance**
   - Efficient caching of trending and popular content
   - Pagination with cursor-based approaches
   - Content preloading for improved UX
   - Rate limiting for search endpoints
