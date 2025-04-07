# User API

## Overview

This document outlines the API endpoints for user profiles, settings, analytics, messages, notifications, and other user-related functionality in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. User Profile Management

### Base Path: `/user/profile`

| Endpoint       | Method | Description                   | Query Params         | Request Body                                           | Response              |
| -------------- | ------ | ----------------------------- | -------------------- | ------------------------------------------------------ | --------------------- |
| `/:username`   | GET    | Get user profile by username  | -                    | -                                                      | `{ user }`            |
| `/:username`   | PATCH  | Update user profile           | -                    | `{ fullName?, image_url?, banner_url?, about?, etc. }` | `{ user }`            |
| `/me`          | GET    | Get current user's profile    | -                    | -                                                      | `{ user }`            |
| `/search`      | GET    | Search for users              | `?q=string&limit=10` | -                                                      | `{ users: [] }`       |
| `/suggestions` | GET    | Get suggested users to follow | `?limit=number`      | -                                                      | `{ suggestions: [] }` |

## 2. User Relationships

### Base Path: `/user/relationships`

| Endpoint               | Method | Description              | Query Params       | Response                           |
| ---------------------- | ------ | ------------------------ | ------------------ | ---------------------------------- |
| `/follow/:username`    | POST   | Follow a user            | -                  | `{ success, follower, following }` |
| `/unfollow/:username`  | POST   | Unfollow a user          | -                  | `{ success }`                      |
| `/followers/:username` | GET    | Get user's followers     | `?page=1&limit=20` | `{ followers: [], pagination }`    |
| `/following/:username` | GET    | Get users being followed | `?page=1&limit=20` | `{ following: [], pagination }`    |
| `/block/:username`     | POST   | Block a user             | -                  | `{ success }`                      |
| `/unblock/:username`   | POST   | Unblock a user           | -                  | `{ success }`                      |
| `/mute/:username`      | POST   | Mute a user              | -                  | `{ success }`                      |
| `/unmute/:username`    | POST   | Unmute a user            | -                  | `{ success }`                      |
| `/blocked`             | GET    | Get blocked users        | `?page=1&limit=20` | `{ users: [], pagination }`        |
| `/muted`               | GET    | Get muted users          | `?page=1&limit=20` | `{ users: [], pagination }`        |

## 3. User Content & Activity

### Base Path: `/user/content`

| Endpoint              | Method | Description                 | Query Params                | Response                         |
| --------------------- | ------ | --------------------------- | --------------------------- | -------------------------------- |
| `/posts/:username`    | GET    | Get user's posts            | `?page=1&limit=20`          | `{ posts: [], pagination }`      |
| `/replies/:username`  | GET    | Get user's replies/comments | `?page=1&limit=20`          | `{ replies: [], pagination }`    |
| `/media/:username`    | GET    | Get user's media posts      | `?page=1&limit=20`          | `{ media: [], pagination }`      |
| `/likes/:username`    | GET    | Get posts liked by user     | `?page=1&limit=20`          | `{ likes: [], pagination }`      |
| `/activity/:username` | GET    | Get user's activity         | `?page=1&limit=20&type=all` | `{ activities: [], pagination }` |
| `/shorts/:username`   | GET    | Get user's short videos     | `?page=1&limit=20`          | `{ shorts: [], pagination }`     |
| `/bookmarks`          | GET    | Get user's bookmarked posts | `?page=1&limit=20`          | `{ bookmarks: [], pagination }`  |

## 4. User Settings

### Base Path: `/user/settings`

| Endpoint                    | Method | Description                    | Request Body                                      | Response                 |
| --------------------------- | ------ | ------------------------------ | ------------------------------------------------- | ------------------------ |
| `/display`                  | GET    | Get display settings           | -                                                 | `{ settings }`           |
| `/display`                  | PATCH  | Update display settings        | `{ theme, fontSize, fontFamily, etc }`            | `{ settings }`           |
| `/theme`                    | PATCH  | Update theme settings          | `{ mode, color, contrast }`                       | `{ theme }`              |
| `/accessibility`            | PATCH  | Update accessibility settings  | `{ colorBlind, screenReader, motion }`            | `{ accessibility }`      |
| `/content`                  | GET    | Get content preferences        | -                                                 | `{ preferences }`        |
| `/content`                  | PATCH  | Update content preferences     | `{ languages, sensitiveContent, dataUsage, etc }` | `{ preferences }`        |
| `/privacy`                  | GET    | Get privacy settings           | -                                                 | `{ settings }`           |
| `/privacy`                  | PATCH  | Update privacy settings        | `{ postVisibility, allowTagging, etc }`           | `{ settings }`           |
| `/security/password`        | PATCH  | Update password                | `{ currentPassword, newPassword }`                | `{ success }`            |
| `/security/two-factor`      | GET    | Get 2FA settings               | -                                                 | `{ twoFactor }`          |
| `/security/two-factor`      | PATCH  | Update 2FA settings            | `{ enabled, method, phone? }`                     | `{ twoFactor }`          |
| `/security/connected-apps`  | GET    | Get connected applications     | -                                                 | `{ apps: [] }`           |
| `/security/connected-apps`  | PATCH  | Update connected apps settings | `{ autoReview, transactionApproval }`             | `{ settings }`           |
| `/connected-accounts`       | GET    | Get linked accounts            | -                                                 | `{ accounts: [] }`       |
| `/connected-accounts`       | POST   | Link new account               | `{ provider, token }`                             | `{ success, account }`   |
| `/connected-accounts/:id`   | DELETE | Unlink account                 | -                                                 | `{ success }`            |
| `/wallet/connected-wallets` | GET    | Get connected wallets          | -                                                 | `{ wallets: [] }`        |
| `/wallet/connected-wallets` | POST   | Connect new wallet             | `{ address, type, signature }`                    | `{ wallet }`             |
| `/wallet/primary`           | PATCH  | Set primary wallet             | `{ walletId }`                                    | `{ wallet }`             |
| `/data/export`              | POST   | Request data export            | `{ format, dataTypes: [] }`                       | `{ requestId, expires }` |
| `/data/deletion`            | POST   | Request account deletion       | `{ password, reason?, feedback? }`                | `{ requestId, expires }` |

## 5. User Messaging

### Base Path: `/user/messages`

| Endpoint                                  | Method | Description                     | Query Params                          | Request Body                                        | Response                             |
| ----------------------------------------- | ------ | ------------------------------- | ------------------------------------- | --------------------------------------------------- | ------------------------------------ |
| `/conversations`                          | GET    | Get user's conversations        | `?page=1&limit=20&status=all\|unread` | -                                                   | `{ conversations: [], pagination }`  |
| `/conversations`                          | POST   | Create a new conversation       | -                                     | `{ participants: [userId1, userId2], title? }`      | `{ conversationId, gunChannelKey }`  |
| `/conversations/:id`                      | GET    | Get a conversation details      | -                                     | -                                                   | `{ conversation, participants: [] }` |
| `/conversations/:id`                      | DELETE | Leave/delete a conversation     | -                                     | -                                                   | `{ success }`                        |
| `/conversations/:id/participants`         | POST   | Add participant to conversation | -                                     | `{ userId }`                                        | `{ success, conversation }`          |
| `/conversations/:id/participants/:userId` | DELETE | Remove participant              | -                                     | -                                                   | `{ success }`                        |
| `/relay`                                  | POST   | Relay encrypted message         | -                                     | `{ conversationId, encryptedData, recipients: [] }` | `{ delivered: true, messageId }`     |
| `/read/:conversationId`                   | POST   | Mark conversation as read       | -                                     | `{ lastReadMessageId? }`                            | `{ success }`                        |
| `/typing/:conversationId`                 | POST   | Send typing indicator           | -                                     | `{ isTyping: boolean }`                             | `{ success }`                        |
| `/block/:userId`                          | POST   | Block user from messaging       | -                                     | -                                                   | `{ success }`                        |
| `/unblock/:userId`                        | POST   | Unblock user from messaging     | -                                     | -                                                   | `{ success }`                        |
| `/blocked`                                | GET    | Get list of blocked users       | `?page=1&limit=20`                    | -                                                   | `{ users: [], pagination }`          |
| `/search`                                 | GET    | Search messages                 | `?q=string`                           | -                                                   | `{ results: [] }`                    |

## 6. Group Messaging

### Base Path: `/user/groups`

| Endpoint               | Method | Description                | Query Params       | Request Body                                    | Response                      |
| ---------------------- | ------ | -------------------------- | ------------------ | ----------------------------------------------- | ----------------------------- |
| `/`                    | GET    | Get user's groups          | `?page=1&limit=20` | -                                               | `{ groups: [], pagination }`  |
| `/`                    | POST   | Create a new group         | -                  | `{ name, description?, image?, members: [] }`   | `{ group, gunChannelKey }`    |
| `/:id`                 | GET    | Get group details          | -                  | -                                               | `{ group, members: [] }`      |
| `/:id`                 | PATCH  | Update group               | -                  | `{ name?, description?, image? }`               | `{ group }`                   |
| `/:id`                 | DELETE | Delete/leave group         | -                  | -                                               | `{ success }`                 |
| `/:id/members`         | GET    | Get group members          | `?page=1&limit=50` | -                                               | `{ members: [], pagination }` |
| `/:id/members`         | POST   | Add member to group        | -                  | `{ userId, role?: "member"\|"admin"\|"owner" }` | `{ success, member }`         |
| `/:id/members/:userId` | DELETE | Remove member from group   | -                  | -                                               | `{ success }`                 |
| `/:id/members/:userId` | PATCH  | Update member role         | -                  | `{ role: "member"\|"admin"\|"owner" }`          | `{ success, member }`         |
| `/:id/join`            | POST   | Join a group by invitation | -                  | `{ inviteCode }`                                | `{ success, group }`          |
| `/:id/invites`         | POST   | Create group invitation    | -                  | `{ expiry?: timestamp }`                        | `{ inviteCode }`              |
| `/:id/invites/:code`   | DELETE | Revoke group invitation    | -                  | -                                               | `{ success }`                 |

## 7. Notifications

### Base Path: `/user/alerts`

| Endpoint        | Method | Description                         | Query Params                                             | Request Body              | Response                      |
| --------------- | ------ | ----------------------------------- | -------------------------------------------------------- | ------------------------- | ----------------------------- |
| `/`             | GET    | Get user notifications              | `?page=1&limit=20&types=likes,mentions,follows&read=all` | -                         | `{ alerts: [], unreadCount }` |
| `/count`        | GET    | Get unread notification count       | `?types=likes,mentions,follows`                          | -                         | `{ count }`                   |
| `/:id`          | GET    | Get specific notification details   | -                                                        | -                         | `{ alert }`                   |
| `/:id/read`     | POST   | Mark notification as read           | -                                                        | -                         | `{ success }`                 |
| `/read`         | POST   | Mark multiple notifications as read | -                                                        | `{ ids?: [] }`            | `{ success, updatedCount }`   |
| `/read/all`     | POST   | Mark all notifications as read      | `?types=likes,mentions,follows`                          | -                         | `{ success, updatedCount }`   |
| `/settings`     | GET    | Get user notification settings      | -                                                        | -                         | `{ settings }`                |
| `/settings`     | PATCH  | Update notification settings        | -                                                        | `{ [settingKey]: value }` | `{ settings }`                |
| `/mute/:type`   | POST   | Mute specific notification type     | -                                                        | `{ duration?: seconds }`  | `{ success, muteExpiry? }`    |
| `/unmute/:type` | POST   | Unmute notification type            | -                                                        | -                         | `{ success }`                 |

## 8. Push Notification Management

### Base Path: `/user/devices`

| Endpoint                 | Method | Description                        | Request Body                           | Response                      |
| ------------------------ | ------ | ---------------------------------- | -------------------------------------- | ----------------------------- |
| `/`                      | GET    | Get registered devices             | -                                      | `{ devices: [] }`             |
| `/:id`                   | DELETE | Remove device                      | -                                      | `{ success }`                 |
| `/current`               | GET    | Get current device info            | -                                      | `{ device }`                  |
| `/push-subscription`     | POST   | Register push subscription         | `{ endpoint, keys: { p256dh, auth } }` | `{ success, subscriptionId }` |
| `/push-subscription/:id` | DELETE | Remove push subscription           | -                                      | `{ success }`                 |
| `/email`                 | GET    | Get email notification settings    | -                                      | `{ settings }`                |
| `/email`                 | PATCH  | Update email notification settings | `{ digest, marketing, frequency? }`    | `{ settings }`                |
| `/verify-email`          | POST   | Verify email for notifications     | `{ verificationCode }`                 | `{ success }`                 |
| `/send-verification`     | POST   | Send email verification code       | `{ email }`                            | `{ success, expiresAt }`      |

## 9. Mentions & Tags

### Base Path: `/user/mentions`

| Endpoint       | Method | Description                  | Query Params                                | Response                       |
| -------------- | ------ | ---------------------------- | ------------------------------------------- | ------------------------------ |
| `/`            | GET    | Get mentions of current user | `?page=1&limit=20&status=all\|unread\|read` | `{ mentions: [], pagination }` |
| `/:id/read`    | POST   | Mark mention as read         | -                                           | `{ success }`                  |
| `/read/all`    | POST   | Mark all mentions as read    | -                                           | `{ success, count }`           |
| `/count`       | GET    | Get unread mentions count    | -                                           | `{ count }`                    |
| `/users`       | GET    | Get mentionable users        | `?query=string&limit=10`                    | `{ users: [] }`                |
| `/suggestions` | GET    | Get mention suggestions      | `?context=string&limit=10`                  | `{ suggestions: [] }`          |

## 10. Analytics

### Base Path: `/user/analytics`

| Endpoint           | Method | Description                     | Query Params              | Request Body | Response                      |
| ------------------ | ------ | ------------------------------- | ------------------------- | ------------ | ----------------------------- |
| `/profile`         | GET    | Get profile analytics           | `?timeRange=7d\|30d\|90d` | -            | `{ analytics }`               |
| `/content/:id`     | GET    | Get content performance metrics | -                         | -            | `{ metrics }`                 |
| `/audience`        | GET    | Get audience insights           | `?timeRange=7d\|30d\|90d` | -            | `{ demographics, geography }` |
| `/dashboard`       | GET    | Get creator analytics dashboard | `?timeRange=7d\|30d\|90d` | -            | `{ overview, trends }`        |
| `/engagement`      | GET    | Get engagement metrics          | `?timeRange=7d\|30d\|90d` | -            | `{ engagement }`              |
| `/traffic-sources` | GET    | Get referral sources            | `?timeRange=7d\|30d\|90d` | -            | `{ sources: [] }`             |

### Base Path: `/user/analytics/content`

| Endpoint       | Method | Description                   | Query Params                       | Response                          |
| -------------- | ------ | ----------------------------- | ---------------------------------- | --------------------------------- |
| `/performance` | GET    | Get content performance stats | `?timeRange=7d\|30d\|90d&type=all` | `{ performance, topContent: [] }` |
| `/posts`       | GET    | Get post analytics            | `?timeRange=7d\|30d\|90d`          | `{ posts: [], metrics }`          |
| `/shorts`      | GET    | Get shorts analytics          | `?timeRange=7d\|30d\|90d`          | `{ shorts: [], metrics }`         |
| `/media`       | GET    | Get media performance         | `?timeRange=7d\|30d\|90d`          | `{ media: [], metrics }`          |
| `/comparison`  | GET    | Compare content performance   | `?ids=[id1,id2]`                   | `{ comparison: [] }`              |
| `/virality`    | GET    | Get virality metrics          | `?timeRange=7d\|30d\|90d`          | `{ viral: [], factors }`          |
| `/hashtags`    | GET    | Get hashtag performance       | `?timeRange=7d\|30d\|90d`          | `{ hashtags: [], effectiveness }` |

### Base Path: `/user/analytics/audience`

| Endpoint           | Method | Description                 | Query Params              | Response              |
| ------------------ | ------ | --------------------------- | ------------------------- | --------------------- |
| `/demographics`    | GET    | Get audience demographics   | `?timeRange=7d\|30d\|90d` | `{ demographics }`    |
| `/geography`       | GET    | Get audience geography      | `?timeRange=7d\|30d\|90d` | `{ geography: [] }`   |
| `/growth`          | GET    | Get audience growth metrics | `?timeRange=7d\|30d\|90d` | `{ growth, trends }`  |
| `/activity`        | GET    | Get audience activity times | `?timeRange=7d\|30d\|90d` | `{ activity }`        |
| `/interests`       | GET    | Get audience interests      | `?limit=20`               | `{ interests: [] }`   |
| `/retention`       | GET    | Get audience retention      | `?timeRange=7d\|30d\|90d` | `{ retention }`       |
| `/followers/gains` | GET    | Get new follower analytics  | `?timeRange=7d\|30d\|90d` | `{ gained, sources }` |
| `/followers/lost`  | GET    | Get lost follower analytics | `?timeRange=7d\|30d\|90d` | `{ lost, reasons? }`  |

### Base Path: `/user/analytics/export`

| Endpoint        | Method | Description                  | Query Params | Request Body          | Response                  |
| --------------- | ------ | ---------------------------- | ------------ | --------------------- | ------------------------- |
| `/`             | POST   | Create analytics export      | -            | `{ type, timeRange }` | `{ exportId, expires }`   |
| `/:id`          | GET    | Get export status            | -            | -                     | `{ status, downloadUrl }` |
| `/formats`      | GET    | Get available export formats | -            | -                     | `{ formats: [] }`         |
| `/schedule`     | POST   | Schedule recurring report    | -            | `{ frequency, type }` | `{ scheduleId }`          |
| `/schedule`     | GET    | Get report schedules         | -            | -                     | `{ schedules: [] }`       |
| `/schedule/:id` | DELETE | Delete report schedule       | -            | -                     | `{ success }`             |

## 11. Moderation & Reporting

### Base Path: `/user/moderation`

| Endpoint       | Method | Description                  | Query Params       | Request Body                          | Response                         |
| -------------- | ------ | ---------------------------- | ------------------ | ------------------------------------- | -------------------------------- |
| `/reports`     | GET    | Get user's submitted reports | `?page=1&limit=20` | -                                     | `{ reports: [], pagination }`    |
| `/reports/:id` | GET    | Get report status            | -                  | -                                     | `{ report, status, resolution }` |
| `/appeals`     | POST   | Appeal a moderation action   | -                  | `{ moderationId, reason, evidence? }` | `{ success, appealId }`          |
| `/appeals/:id` | GET    | Check appeal status          | -                  | -                                     | `{ status, details, notes? }`    |
| `/reported`    | GET    | Get content reported by user | `?page=1&limit=20` | -                                     | `{ reports: [], pagination }`    |
| `/sensitive`   | POST   | Mark content as sensitive    | -                  | `{ contentId, contentType }`          | `{ success }`                    |
