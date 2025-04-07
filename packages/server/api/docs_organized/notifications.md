# Notifications API

## Overview

This document outlines the API endpoints for notifications, alerts, and web3 event notifications in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Notification System

### Base Path: `/alerts`

| Endpoint             | Method | Description                         | Query Params                                             | Request Body              | Response                         |
| -------------------- | ------ | ----------------------------------- | -------------------------------------------------------- | ------------------------- | -------------------------------- |
| `/`                  | GET    | Get user notifications              | `?page=1&limit=20&types=likes,mentions,follows&read=all` | -                         | `{ alerts: [], unreadCount }`    |
| `/count`             | GET    | Get unread notification count       | `?types=likes,mentions,follows`                          | -                         | `{ count }`                      |
| `/:id`               | GET    | Get specific notification details   | -                                                        | -                         | `{ alert }`                      |
| `/:id/read`          | POST   | Mark notification as read           | -                                                        | -                         | `{ success }`                    |
| `/read`              | POST   | Mark multiple notifications as read | -                                                        | `{ ids?: [] }`            | `{ success, updatedCount }`      |
| `/read/all`          | POST   | Mark all notifications as read      | `?types=likes,mentions,follows`                          | -                         | `{ success, updatedCount }`      |
| `/settings`          | GET    | Get user notification settings      | -                                                        | -                         | `{ settings }`                   |
| `/settings`          | PATCH  | Update notification settings        | -                                                        | `{ [settingKey]: value }` | `{ settings }`                   |
| `/settings/channels` | GET    | Get notification delivery channels  | -                                                        | -                         | `{ channels: [] }`               |
| `/settings/types`    | GET    | Get available notification types    | -                                                        | -                         | `{ types: [] }`                  |
| `/mute/:type`        | POST   | Mute specific notification type     | -                                                        | `{ duration?: seconds }`  | `{ success, muteExpiry? }`       |
| `/unmute/:type`      | POST   | Unmute notification type            | -                                                        | -                         | `{ success }`                    |
| `/digest`            | GET    | Get notification digest             | `?period=daily\|weekly`                                  | -                         | `{ digest: { categories: [] } }` |
| `/test`              | POST   | Send test notification              | -                                                        | `{ type }`                | `{ success, notificationId }`    |

## 2. Alert Notification Settings

### Base Path: `/settings/alerts`

| Endpoint              | Method | Description                       | Request Body                               | Response          |
| --------------------- | ------ | --------------------------------- | ------------------------------------------ | ----------------- |
| `/filters`            | GET    | Get alert filters                 | -                                          | `{ filters }`     |
| `/filters`            | PATCH  | Update alert filters              | `{ keywords, notifications, accounts }`    | `{ filters }`     |
| `/preferences`        | GET    | Get alert preferences             | -                                          | `{ preferences }` |
| `/preferences`        | PATCH  | Update alert preferences          | `{ realTime, digest, quietHours }`         | `{ preferences }` |
| `/preferences/timing` | GET    | Get timing preferences            | -                                          | `{ timing }`      |
| `/preferences/timing` | PATCH  | Update timing preferences         | `{ quietHoursStart, quietHoursEnd, days }` | `{ timing }`      |
| `/priority`           | GET    | Get priority settings             | -                                          | `{ priority }`    |
| `/priority`           | PATCH  | Update priority settings          | `{ mentions, importantOnly, favorites }`   | `{ priority }`    |
| `/email`              | GET    | Get email alert settings          | -                                          | `{ email }`       |
| `/email`              | PATCH  | Update email alert settings       | `{ enabled, types, digest }`               | `{ email }`       |
| `/push`               | GET    | Get push notification settings    | -                                          | `{ push }`        |
| `/push`               | PATCH  | Update push notification settings | `{ enabled, types, sounds }`               | `{ push }`        |
| `/push/devices`       | GET    | Get push-enabled devices          | -                                          | `{ devices: [] }` |
| `/push/devices/:id`   | DELETE | Remove push device                | -                                          | `{ success }`     |
| `/onchain`            | GET    | Get on-chain alert settings       | -                                          | `{ onchain }`     |
| `/onchain`            | PATCH  | Update on-chain alert settings    | `{ transactions, wallet, governance }`     | `{ onchain }`     |

## 3. Push Notification Management

### Base Path: `/devices`

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

## 4. Web3 Event Notifications

### Base Path: `/web3-events`

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

## Data Models

### Alert

```typescript
interface Alert {
  id: string;
  userId: string; // Recipient
  type: string; // like, mention, follow, comment, etc.
  actorId?: string; // User who triggered the notification
  entityId?: string; // Related entity (post, comment, etc)
  entityType?: string; // Type of related entity
  message: string;
  read: boolean;
  readAt?: string;
  metadata?: any; // Additional context data
  createdAt: string;
  priority: "high" | "medium" | "low";
  actionUrl?: string; // URL to navigate when clicking notification
}
```

### NotificationSetting

```typescript
interface NotificationSetting {
  id: string;
  userId: string;
  settingKey: string; // e.g. "comments", "likes", "mentions", "follows"
  email: boolean;
  push: boolean;
  inApp: boolean;
  muted: boolean;
  muteUntil?: string;
  updatedAt: string;
}
```

### AlertSettings

```typescript
interface AlertSettings {
  id: string;
  userId: string;
  filters: {
    keywords: string[];
    notifications: string[];
    accounts: string[];
  };
  preferences: {
    realTime: boolean;
    digest: boolean;
    quietHours: boolean;
    quietHoursStart: string; // "22:00"
    quietHoursEnd: string; // "07:00"
    quietHoursDays: string[]; // ["Mon", "Tue", etc]
  };
  priority: {
    priorityMentions: boolean;
    importantOnly: boolean;
    favoriteAccounts: boolean;
  };
  email: {
    enabled: boolean;
    types: {
      mentions: boolean;
      replies: boolean;
      follows: boolean;
      likes: boolean;
      reposts: boolean;
      directMessages: boolean;
    };
    digest: "never" | "daily" | "weekly";
  };
  push: {
    enabled: boolean;
    types: {
      mentions: boolean;
      replies: boolean;
      follows: boolean;
      likes: boolean;
      reposts: boolean;
      directMessages: boolean;
    };
    sounds: boolean;
  };
  onchain: {
    transactions: boolean;
    walletActivity: boolean;
    governance: boolean;
    priceAlerts: boolean;
  };
  updatedAt: string;
}
```

### NotificationSubscription

```typescript
interface NotificationSubscription {
  id: string;
  userId: string;
  endpoint: string; // Push notification endpoint
  p256dhKey: string; // Public key for push encryption
  authKey: string; // Auth secret for push API
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
}
```

### Device

```typescript
interface Device {
  id: string;
  userId: string;
  deviceType: string; // mobile, desktop, etc.
  deviceName: string;
  deviceIdentifier: string;
  notificationsEnabled: boolean;
  lastActive: string;
  createdAt: string;
  pushToken?: string;
}
```

### Web3EventSubscription

```typescript
interface Web3EventSubscription {
  id: string;
  userId: string;
  network: string; // ethereum, polygon, etc.
  eventType: string; // transfer, approval, governance, etc.
  contractAddress?: string;
  tokenId?: string;
  parameters?: any; // JSON for specific filters
  createdAt: string;
  updatedAt: string;
  active: boolean;
}
```

### PriceAlert

```typescript
interface PriceAlert {
  id: string;
  userId: string;
  token: string; // Token symbol or address
  condition: "above" | "below";
  price: number;
  triggered: boolean;
  lastTriggeredAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Implementation Considerations

1. **Notification Delivery**

   - Multi-channel notification delivery (in-app, push, email)
   - Batch notifications to avoid overwhelming users
   - Smart grouping of related notifications
   - Respect user's quiet hours and preferences

2. **Real-time Infrastructure**

   - WebSocket or Server-Sent Events for real-time notifications
   - Notification queue for reliable delivery
   - Notification delivery retry mechanisms
   - Notification read/unread state sync across devices

3. **Web3 Event Monitoring**

   - Blockchain event listeners and webhooks
   - Gas price monitoring services
   - Token price monitoring integration
   - Governance proposal tracking

4. **Performance & Scaling**

   - Efficient notification storage and retrieval
   - Archiving old notifications
   - Caching of recent notifications
   - Background processing for notification generation

5. **Privacy & Preferences**

   - Granular user control over notification types
   - Privacy-aware notification content
   - Time-zone aware delivery timing
   - Digest formatting and frequency options

6. **Mobile Considerations**
   - Battery-efficient push notification delivery
   - Support for rich notifications
   - Deep linking to relevant content
   - Badge count management
