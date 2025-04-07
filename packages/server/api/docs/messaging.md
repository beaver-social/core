# Messaging API

## Overview

This document outlines the API endpoints for messaging, group chats, and communication features in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Direct Messaging

### Base Path: `/messages`

| Endpoint                                  | Method | Description                     | Query Params                          | Request Body                                        | Response                             |
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
| `/search`                                 | GET    | Search messages                 | `?q=string`                           | -                                                   | `{ results: [] }`                    |

## 2. Group Messaging

### Base Path: `/groups`

| Endpoint                | Method | Description                | Query Params       | Request Body                                    | Response                      |
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

## 3. Mentions & Tags

### Base Path: `/mentions`

| Endpoint       | Method | Description                  | Query Params                                | Response                       |
| -------------- | ------ | ---------------------------- | ------------------------------------------- | ------------------------------ |
| `/`            | GET    | Get mentions of current user | `?page=1&limit=20&status=all\|unread\|read` | `{ mentions: [], pagination }` |
| `/:id/read`    | POST   | Mark mention as read         | -                                           | `{ success }`                  |
| `/read/all`    | POST   | Mark all mentions as read    | -                                           | `{ success, count }`           |
| `/count`       | GET    | Get unread mentions count    | -                                           | `{ count }`                    |
| `/users`       | GET    | Get mentionable users        | `?query=string&limit=10`                    | `{ users: [] }`                |
| `/suggestions` | GET    | Get mention suggestions      | `?context=string&limit=10`                  | `{ suggestions: [] }`          |

## Data Models

### Conversation

```typescript
interface Conversation {
  id: string;
  title?: string; // For group conversations
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  lastMessage?: {
    text: string;
    senderId: string;
    sentAt: string;
  };
  gunChannelKey: string; // Reference to Gun-DB channel for e2e encryption
  isDirectMessage: boolean;
}
```

### ConversationParticipant

```typescript
interface ConversationParticipant {
  id: string;
  conversationId: string;
  userId: string;
  role: "owner" | "member";
  joinedAt: string;
  leftAt?: string;
  lastReadMessageId?: string;
  lastReadAt?: string;
  isActive: boolean;
}
```

### Group

```typescript
interface Group {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  createdBy: string; // userId
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  isPublic: boolean;
  gunChannelKey: string; // Reference to Gun-DB channel
}
```

### GroupMember

```typescript
interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: "owner" | "admin" | "member";
  joinedAt: string;
  invitedBy?: string; // userId
  lastReadAt?: string;
}
```

### Mention

```typescript
interface Mention {
  id: string;
  userId: string;
  mentionedBy: string;
  contentId: string;
  contentType: "post" | "comment" | "message";
  read: boolean;
  readAt?: string;
  createdAt: string;
}
```

## Implementation Considerations

1. **End-to-End Encryption**

   - Server functions as a relay for encrypted messages
   - Content encryption handled client-side
   - Key exchange protocols for secure communications
   - Consider Perfect Forward Secrecy implementation

2. **Real-time Communication**

   - WebSocket implementation for typing indicators and online status
   - Efficient publish/subscribe for message relaying
   - Offline message handling and delivery guarantees
   - Read receipts and delivery confirmation

3. **Privacy & Security**

   - Respect user messaging privacy settings
   - Proper access control for conversations/groups
   - Support for blocking and message filtering
   - Ephemeral messaging options

4. **Performance**

   - Efficient pagination for message history
   - Message indexing for search functionality
   - Optimize for mobile networks with varying connectivity
   - Caching strategies for active conversations

5. **Scalability**

   - Sharding conversations by user groups
   - Message queue architecture for high volume
   - Distributed storage for message history
   - Background workers for notifications and processing

6. **User Experience**
   - Typing indicators
   - Online presence tracking
   - Support for rich content (media, links, etc.)
   - Message formatting and styling
