## 1. Messaging System

### Base Path: `/api/v1/messages`

| Endpoint                                  | Method | Description                     | Query/Params                          | Request Body                                        | Response                             |
| ----------------------------------------- | ------ | ------------------------------- | ------------------------------------- | --------------------------------------------------- | ------------------------------------ |
| `/conversations`                          | GET    | Get user's conversations        | `?page=1&limit=20&status=all\|unread` | -                                                   | `{ conversations: [], pagination }`  |
| `/conversations`                          | POST   | Create a new conversation       | -                                     | `{ participants: [userId1, userId2], title? }`      | `{ conversationId, gunChannelKey }`  |
| `/conversations/:id`                      | GET    | Get a conversation details      | -                                     | -                                                   | `{ conversation, participants: [] }` |
| `/conversations/:id`                      | DELETE | Leave/delete a conversation     | -                                     | -                                                   | `{ success }`                        |
| `/conversations/:id/participants`         | POST   | Add participant to conversation | -                                     | `{ userId }`                                        | `{ success, conversation }`          |
| `/conversations/:id/participants/:userId` | DELETE | Remove participant              | -                                     | -                                                   | `{ success }`                        |
| `/relay`                                  | POST   | Relay encrypted message         | -                                     | `{ conversationId, encryptedData, recipients: [] }` | `{ delivered: true, messageId }`     |
| `/signal`                                 | POST   | Send connection signal          | -                                     | `{ type, recipient, payload }`                      | `{ success, signalId }`              |
| `/status`                                 | POST   | Update user message status      | -                                     | `{ online: boolean, lastSeen? }`                    | `{ success }`                        |
| `/status/:userId`                         | GET    | Get user message status         | -                                     | -                                                   | `{ online, lastSeen? }`              |
| `/read/:conversationId`                   | POST   | Mark conversation as read       | -                                     | `{ lastReadMessageId? }`                            | `{ success }`                        |
| `/typing/:conversationId`                 | POST   | Send typing indicator           | -                                     | `{ isTyping: boolean }`                             | `{ success }`                        |
| `/block/:userId`                          | POST   | Block user from messaging       | -                                     | -                                                   | `{ success }`                        |
| `/unblock/:userId`                        | POST   | Unblock user from messaging     | -                                     | -                                                   | `{ success }`                        |
| `/blocked`                                | GET    | Get list of blocked users       | `?page=1&limit=20`                    | -                                                   | `{ users: [], pagination }`          |

## 2. Group Messaging

### Base Path: `/api/v1/groups`

| Endpoint                | Method | Description                | Query/Params       | Request Body                                    | Response                      |
| ----------------------- | ------ | -------------------------- | ------------------ | ----------------------------------------------- | ----------------------------- |
| `/`                     | GET    | Get user's groups          | `?page=1&limit=20` | -                                               | `{ groups: [], pagination }`  |
| `/`                     | POST   | Create a new group         | -                  | `{ name, description?, image?, members: [] }`   | `{ group, gunChannelKey }`    |
| `/:id`                  | GET    | Get group details          | -                  | -                                               | `{ group, members: [] }`      |
| `/:id`                  | PATCH  | Update group               | -                  | `{ name?, description?, image? }`               | `{ group }`                   |
| `/:id`                  | DELETE | Delete/leave group         | -                  | -                                               | `{ success }`                 |
| `/:id/members`          | GET    | Get group members          | `?page=1&limit=50` | -                                               | `{ members: [], pagination }` |
| `/:id/members`          | POST   | Add member to group        | -                  | `{ userId, role?: "member"\|"admin"\|"owner" }` | `{ success, member }`         |
| `/:id/members/:userId`  | DELETE | Remove member from group   | -                  | -                                               | `{ success }`                 |
| `/:id/members/:userId`  | PATCH  | Update member role         | -                  | `{ role: "member"\|"admin"\|"owner" }`          | `{ success, member }`         |
| `/:id/join`             | POST   | Join a group by invitation | -                  | `{ inviteCode }`                                | `{ success, group }`          |
| `/:id/invites`          | POST   | Create group invitation    | -                  | `{ expiry?: timestamp }`                        | `{ inviteCode }`              |
| `/:id/invites/:code`    | DELETE | Revoke group invitation    | -                  | -                                               | `{ success }`                 |
| `/:id/relay`            | POST   | Relay message to group     | -                  | `{ encryptedData }`                             | `{ delivered, messageId }`    |
| `/:id/pin/:messageId`   | POST   | Pin message in group       | -                  | -                                               | `{ success }`                 |
| `/:id/unpin/:messageId` | POST   | Unpin message in group     | -                  | -                                               | `{ success }`                 |

## 3. Notification System

### Base Path: `/api/v1/alerts`

| Endpoint             | Method | Description                         | Query/Params                                             | Request Body               | Response                         |
| -------------------- | ------ | ----------------------------------- | -------------------------------------------------------- | -------------------------- | -------------------------------- |
| `/`                  | GET    | Get user notifications              | `?page=1&limit=20&types=likes,mentions,follows&read=all` | -                          | `{ alerts: [], unreadCount }`    |
| `/count`             | GET    | Get unread notification count       | `?types=likes,mentions,follows`                          | -                          | `{ count }`                      |
| `/:id`               | GET    | Get specific notification details   | -                                                        | -                          | `{ alert }`                      |
| `/:id/read`          | POST   | Mark notification as read           | -                                                        | -                          | `{ success }`                    |
| `/read`              | POST   | Mark multiple notifications as read | -                                                        | `{ ids?: [] }`             | `{ success, updatedCount }`      |
| `/read/all`          | POST   | Mark all notifications as read      | `?types=likes,mentions,follows`                          | -                          | `{ success, updatedCount }`      |
| `/settings`          | GET    | Get user notification settings      | -                                                        | -                          | `{ settings }`                   |
| `/settings`          | PATCH  | Update notification settings        | -                                                        | `{ [settingKey]: value }`  | `{ settings }`                   |
| `/settings/channels` | GET    | Get notification delivery channels  | -                                                        | -                          | `{ channels: [] }`               |
| `/settings/types`    | GET    | Get available notification types    | -                                                        | -                          | `{ types: [] }`                  |
| `/mute/:type`        | POST   | Mute specific notification type     | -                                                        | `{ duration?: seconds }`   | `{ success, muteExpiry? }`       |
| `/unmute/:type`      | POST   | Unmute notification type            | -                                                        | -                          | `{ success }`                    |
| `/subscribe`         | POST   | Subscribe to push notifications     | -                                                        | `{ endpoint, keys, auth }` | `{ success, subscriptionId }`    |
| `/unsubscribe/:id`   | POST   | Unsubscribe from push notifications | -                                                        | -                          | `{ success }`                    |
| `/digest`            | GET    | Get notification digest             | `?period=daily\|weekly`                                  | -                          | `{ digest: { categories: [] } }` |
| `/test`              | POST   | Send test notification              | -                                                        | `{ type }`                 | `{ success, notificationId }`    |

## 4. Mentions & Tags

### Base Path: `/api/v1/mentions`

| Endpoint       | Method | Description                  | Query/Params                                | Request Body | Response                       |
| -------------- | ------ | ---------------------------- | ------------------------------------------- | ------------ | ------------------------------ |
| `/`            | GET    | Get mentions of current user | `?page=1&limit=20&status=all\|unread\|read` | -            | `{ mentions: [], pagination }` |
| `/:id/read`    | POST   | Mark mention as read         | -                                           | -            | `{ success }`                  |
| `/read/all`    | POST   | Mark all mentions as read    | -                                           | -            | `{ success, count }`           |
| `/count`       | GET    | Get unread mentions count    | -                                           | -            | `{ count }`                    |
| users          | GET    | Get mentionable users        | `?query=string&limit=10`                    | -            | `{ users: [] }`                |
| `/suggestions` | GET    | Get mention suggestions      | `?context=string&limit=10`                  | -            | `{ suggestions: [] }`          |

## 5. Web3 Event Notifications

### Base Path: `/api/v1/web3-events`

| Endpoint            | Method | Description                           | Query/Params                 | Request Body                                          | Response                        |
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

## 6. Email & Device Management

### Base Path: `/api/v1/devices`

| Endpoint                 | Method | Description                        | Query/Params | Request Body                                          | Response                      |
| ------------------------ | ------ | ---------------------------------- | ------------ | ----------------------------------------------------- | ----------------------------- |
| `/`                      | GET    | Get registered devices             | -            | -                                                     | `{ devices: [] }`             |
| `/:id`                   | DELETE | Remove device                      | -            | -                                                     | `{ success }`                 |
| `/current`               | GET    | Get current device info            | -            | -                                                     | `{ device }`                  |
| `/push-subscription`     | POST   | Register push subscription         | -            | `{ endpoint, keys: { p256dh, auth } }`                | `{ success, subscriptionId }` |
| `/push-subscription/:id` | DELETE | Remove push subscription           | -            | -                                                     | `{ success }`                 |
| `/email`                 | GET    | Get email notification settings    | -            | -                                                     | `{ settings }`                |
| `/email`                 | PATCH  | Update email notification settings | -            | `{ digest: boolean, marketing: boolean, frequency? }` | `{ settings }`                |
| `/verify-email`          | POST   | Verify email for notifications     | -            | `{ verificationCode }`                                | `{ success }`                 |
| `/send-verification`     | POST   | Send email verification code       | -            | `{ email }`                                           | `{ success, expiresAt }`      |

## Data Models

### Conversation

```typescript
{
  id: number;
  title?: string; // For group conversations
  createdAt: timestamp;
  updatedAt: timestamp;
  lastMessageAt: timestamp;
  lastMessage?: {
    text: string;
    senderId: number;
    sentAt: timestamp;
  };
  gunChannelKey: string; // Reference to Gun-DB channel for e2e encryption
  isDirectMessage: boolean;
}
```

### ConversationParticipant

```typescript
{
  id: number;
  conversationId: number;
  userId: number;
  role: "owner" | "member";
  joinedAt: timestamp;
  leftAt?: timestamp;
  lastReadMessageId?: string;
  lastReadAt?: timestamp;
  isActive: boolean;
}
```

### Group

```typescript
{
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  createdBy: number; // userId
  createdAt: timestamp;
  updatedAt: timestamp;
  memberCount: number;
  isPublic: boolean;
  gunChannelKey: string; // Reference to Gun-DB channel
}
```

### GroupMember

```typescript
{
  id: number;
  groupId: number;
  userId: number;
  role: "owner" | "admin" | "member";
  joinedAt: timestamp;
  invitedBy?: number; // userId
  lastReadAt?: timestamp;
}
```

### Alert

```typescript
{
  id: number;
  userId: number; // Recipient
  type: string; // like, mention, follow, comment, etc.
  actorId?: number; // User who triggered the notification
  entityId?: number; // Related entity (post, comment, etc)
  entityType?: string; // Type of related entity
  message: string;
  read: boolean;
  readAt?: timestamp;
  metadata?: any; // Additional context data
  createdAt: timestamp;
  priority: "high" | "medium" | "low";
  actionUrl?: string; // URL to navigate when clicking notification
}
```

### NotificationSetting

```typescript
{
  id: number;
  userId: number;
  settingKey: string; // e.g. "comments", "likes", "mentions", "follows"
  email: boolean;
  push: boolean;
  inApp: boolean;
  muted: boolean;
  muteUntil?: timestamp;
  updatedAt: timestamp;
}
```

### NotificationSubscription

```typescript
{
  id: number;
  userId: number;
  endpoint: string; // Push notification endpoint
  p256dhKey: string; // Public key for push encryption
  authKey: string; // Auth secret for push API
  userAgent?: string;
  createdAt: timestamp;
  updatedAt: timestamp;
  lastUsed?: timestamp;
}
```

### Web3EventSubscription

```typescript
{
  id: number;
  userId: number;
  network: string; // ethereum, polygon, etc.
  eventType: string; // transfer, approval, governance, etc.
  contractAddress?: string;
  tokenId?: string;
  parameters?: any; // JSON for specific filters
  createdAt: timestamp;
  updatedAt: timestamp;
  active: boolean;
}
```

### PriceAlert

```typescript
{
  id: number;
  userId: number;
  token: string; // Token symbol or address
  condition: "above" | "below";
  price: number;
  triggered: boolean;
  lastTriggeredAt?: timestamp;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### Device

```typescript
{
  id: number;
  userId: number;
  deviceType: string; // mobile, desktop, etc.
  deviceName: string;
  deviceIdentifier: string;
  notificationsEnabled: boolean;
  lastActive: timestamp;
  createdAt: timestamp;
  pushToken?: string;
}
```

## Implementation Considerations

1. **End-to-End Encryption**

   - Server only acts as a relay for encrypted messages
   - Store message encryption keys in Gun-DB, not in main server database
   - Implement proper key exchange protocols
   - Consider implementing Perfect Forward Secrecy

2. **Real-time Capabilities**

   - Use WebSockets for typing indicators and online status
   - Implement efficient pub/sub for messaging relays
   - Consider Redis for temporary data like typing indicators

3. **Notification Delivery**

   - Batch notifications to avoid overwhelming users
   - Use exponential backoff for repeat notifications
   - Implement digest grouping (e.g. "Person A and 3 others liked your post")
   - Add rate limiting to prevent notification spam

4. **Web3 Integration**

   - Use event listeners/webhooks for blockchain events
   - Implement retry mechanisms for chain reorganizations
   - Support multiple networks and wallet addresses per user
   - Consider gas price notifications service

5. **Scalability Considerations**

   - Shard conversations by user groups
   - Implement read receipts efficiently to avoid database load
   - Cache recent conversations and notifications
   - Use a background worker for notification processing

6. **Privacy & Security**

   - Implement proper access control for conversations/groups
   - Allow users to control who can message them
   - Provide robust blocking mechanisms
   - Consider ephemeral/disappearing messages

7. **Mobile Considerations**

   - Optimize push notification payload size
   - Implement badge counts for unread notifications
   - Support silent notifications for background updates
   - Consider battery impact of real-time features

8. **Compliance & Data Retention**

   - Allow users to export their conversation history
   - Implement proper data retention policies
   - Consider legal requirements for message monitoring
   - Implement reporting mechanisms for abusive content

This API structure provides a comprehensive foundation for handling messaging and notifications in your Web3 social platform, following the same schema as your existing documentation. The endpoints are designed to be RESTful, intuitive, and cover all necessary functionality for a robust social media experience.
