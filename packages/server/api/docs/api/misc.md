# Miscellaneous API

## Overview

This document outlines the API endpoints that don't fit directly under the user, authentication, or content categories, including search, discovery, moderation, and other utility functions in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Search

### Base Path: `/misc/search`

| Endpoint           | Method | Description                  | Query Params                                      | Response                               |
| ------------------ | ------ | ---------------------------- | ------------------------------------------------- | -------------------------------------- |
| `/combined`        | GET    | Search across all content    | `?query=string&types=posts,users,topics&limit=20` | `{ users: [], posts: [], topics: [] }` |
| `/users/typeahead` | GET    | Get user search suggestions  | `?query=string&limit=10`                          | `{ users: [] }`                        |
| `/history`         | GET    | Get user's search history    | `?limit=10`                                       | `{ history: [] }`                      |
| `/history`         | DELETE | Clear search history         | -                                                 | `{ success }`                          |
| `/filters`         | GET    | Get available search filters | -                                                 | `{ filters: [] }`                      |

## 2. Content Moderation

### Base Path: `/misc/moderation`

| Endpoint             | Method | Description                    | Query Params | Request Body                          | Response                      |
| -------------------- | ------ | ------------------------------ | ------------ | ------------------------------------- | ----------------------------- |
| `/report-types`      | GET    | Get available report reasons   | -            | -                                     | `{ reportTypes: [] }`         |
| `/content-standards` | GET    | Get content policy information | -            | -                                     | `{ policies: [] }`            |
| `/appeals`           | POST   | Appeal a moderation action     | -            | `{ moderationId, reason, evidence? }` | `{ success, appealId }`       |
| `/appeals/:id`       | GET    | Check appeal status            | -            | -                                     | `{ status, details, notes? }` |

### Base Path: `/misc/flags`

| Endpoint    | Method | Description                  | Request Body                         | Response        |
| ----------- | ------ | ---------------------------- | ------------------------------------ | --------------- |
| `/types`    | GET    | Get flagging categories      | -                                    | `{ types: [] }` |
| `/feedback` | POST   | Provide feedback on decision | `{ moderationId, feedback, rating }` | `{ success }`   |

## 3. Web3 Events

### Base Path: `/misc/web3-events`

| Endpoint            | Method | Description                           | Query Params                 | Request Body                                          | Response                        |
| ------------------- | ------ | ------------------------------------- | ---------------------------- | ----------------------------------------------------- | ------------------------------- |
| `/`                 | GET    | Get on-chain events for user          | `?page=1&limit=20&type=all`  | -                                                     | `{ events: [], pagination }`    |
| `/subscribe`        | POST   | Subscribe to on-chain event           | -                            | `{ eventType, contractAddress?, filter? }`            | `{ success, subscriptionId }`   |
| `/unsubscribe/:id`  | POST   | Unsubscribe from on-chain event       | -                            | -                                                     | `{ success }`                   |
| `/subscriptions`    | GET    | Get user's event subscriptions        | `?page=1&limit=20`           | -                                                     | `{ subscriptions: [] }`         |
| `/price-alerts`     | GET    | Get user's price alerts               | -                            | -                                                     | `{ alerts: [] }`                |
| `/price-alerts`     | POST   | Create price alert                    | -                            | `{ token, condition: "above"\|"below", price }`       | `{ alert }`                     |
| `/price-alerts/:id` | DELETE | Delete price alert                    | -                            | -                                                     | `{ success }`                   |
| `/gas-alerts`       | GET    | Get user's gas price alerts           | -                            | -                                                     | `{ alerts: [] }`                |
| `/gas-alerts`       | POST   | Create gas price alert                | -                            | `{ network, threshold, condition: "above"\|"below" }` | `{ alert }`                     |
| `/gas-alerts/:id`   | DELETE | Delete gas price alert                | -                            | -                                                     | `{ success }`                   |
| `/governance`       | GET    | Get governance proposal notifications | `?page=1&limit=10`           | -                                                     | `{ proposals: [], pagination }` |
| `/token-transfers`  | GET    | Get token transfer notifications      | `?page=1&limit=20&token=all` | -                                                     | `{ transfers: [], pagination }` |
| `/settings`         | GET    | Get web3 notification settings        | -                            | -                                                     | `{ settings }`                  |
| `/settings`         | PATCH  | Update web3 notification settings     | -                            | `{ [settingKey]: value }`                             | `{ settings }`                  |

## 4. Trends

### Base Path: `/misc/trends`

| Endpoint      | Method | Description              | Query Params                              | Response                     |
| ------------- | ------ | ------------------------ | ----------------------------------------- | ---------------------------- |
| `/`           | GET    | Get all trending content | `?category=all&timeRange=24h`             | `{ trends }`                 |
| `/topics`     | GET    | Get trending topics      | `?limit=10&timeRange=24h&category=string` | `{ topics: [] }`             |
| `/posts`      | GET    | Get trending posts       | `?page=1&limit=20&category=string`        | `{ posts: [], pagination }`  |
| `/hashtags`   | GET    | Get trending hashtags    | `?limit=20&timeRange=24h`                 | `{ hashtags: [] }`           |
| `/shorts`     | GET    | Get trending shorts      | `?page=1&limit=20`                        | `{ shorts: [], pagination }` |
| `/for-you`    | GET    | Get personalized trends  | `?limit=10`                               | `{ trends: [] }`             |
| `/categories` | GET    | Get trend categories     | -                                         | `{ categories: [] }`         |

## 5. Analytics Exports

### Base Path: `/misc/analytics/export`

| Endpoint        | Method | Description                  | Query Params | Request Body          | Response                  |
| --------------- | ------ | ---------------------------- | ------------ | --------------------- | ------------------------- |
| `/`             | POST   | Create analytics export      | -            | `{ type, timeRange }` | `{ exportId, expires }`   |
| `/:id`          | GET    | Get export status            | -            | -                     | `{ status, downloadUrl }` |
| `/formats`      | GET    | Get available export formats | -            | -                     | `{ formats: [] }`         |
| `/schedule`     | POST   | Schedule recurring report    | -            | `{ frequency, type }` | `{ scheduleId }`          |
| `/schedule`     | GET    | Get report schedules         | -            | -                     | `{ schedules: [] }`       |
| `/schedule/:id` | DELETE | Delete report schedule       | -            | -                     | `{ success }`             |
