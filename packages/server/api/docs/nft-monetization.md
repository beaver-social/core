# NFT & Monetization API

## Overview

This document outlines the API endpoints for NFT integration, monetization features, and creator economy tools within the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. NFT Gallery

### Base Path: `/nft`

| Endpoint            | Method | Description                 | Query Params                       | Request Body                    | Response                       |
| ------------------- | ------ | --------------------------- | ---------------------------------- | ------------------------------- | ------------------------------ |
| `/gallery`          | GET    | Get user's NFT gallery      | `?username=string&page=1&limit=20` | -                               | `{ nfts: [], pagination }`     |
| `/gallery/settings` | GET    | Get NFT gallery settings    | -                                  | -                               | `{ settings }`                 |
| `/gallery/settings` | PATCH  | Update NFT gallery settings | -                                  | `{ visibility, featured, etc }` | `{ settings }`                 |
| `/details/:tokenId` | GET    | Get NFT details             | -                                  | -                               | `{ nft, metadata, history }`   |
| `/collections`      | GET    | Get user's NFT collections  | `?username=string`                 | -                               | `{ collections: [] }`          |
| `/featured`         | GET    | Get user's featured NFTs    | `?username=string`                 | -                               | `{ nfts: [] }`                 |
| `/verify-ownership` | POST   | Verify NFT ownership        | -                                  | `{ tokenId, contractAddress }`  | `{ verified, ownershipProof }` |

## 2. Creator Fund

### Base Path: `/monetization/creator-fund`

| Endpoint       | Method | Description                    | Query Params         | Request Body                        | Response                        |
| -------------- | ------ | ------------------------------ | -------------------- | ----------------------------------- | ------------------------------- |
| `/`            | GET    | Check creator fund eligibility | -                    | -                                   | `{ eligible, requirements }`    |
| `/stats`       | GET    | Get creator fund earnings      | `?timeRange=7d\|30d` | -                                   | `{ earnings, analytics }`       |
| `/apply`       | POST   | Apply to creator fund          | -                    | `{ details, wallet }`               | `{ success, applicationId }`    |
| `/eligibility` | GET    | Check creator fund eligibility | -                    | -                                   | `{ eligibility, requirements }` |
| `/payout`      | GET    | Get payout settings            | -                    | -                                   | `{ payout }`                    |
| `/payout`      | PATCH  | Update payout settings         | -                    | `{ wallet, threshold, autoPayout }` | `{ payout }`                    |
| `/earnings`    | GET    | Get earnings                   | `?period=30days`     | -                                   | `{ earnings, analytics }`       |

## 3. Subscription Management

### Base Path: `/monetization/subscriptions`

| Endpoint         | Method | Description                | Query Params       | Request Body                           | Response                          |
| ---------------- | ------ | -------------------------- | ------------------ | -------------------------------------- | --------------------------------- |
| `/`              | GET    | Get subscription status    | -                  | -                                      | `{ isSubscriber, subscribers }`   |
| `/tiers`         | GET    | Get subscription tiers     | -                  | -                                      | `{ tiers: [] }`                   |
| `/tiers`         | POST   | Create subscription tier   | -                  | `{ name, price, benefits, color }`     | `{ tier }`                        |
| `/tiers/:id`     | PATCH  | Update subscription tier   | -                  | `{ name?, price?, benefits?, color? }` | `{ tier }`                        |
| `/tiers/:id`     | DELETE | Delete subscription tier   | -                  | -                                      | `{ success }`                     |
| `/analytics`     | GET    | Get subscription analytics | `?period=30days`   | -                                      | `{ analytics }`                   |
| `/subscribers`   | GET    | Get subscribers list       | `?page=1&limit=20` | -                                      | `{ subscribers: [], pagination }` |
| `/subscribe/:id` | POST   | Subscribe to a tier        | -                  | `{ paymentMethod?, promocode? }`       | `{ success, subscription }`       |
| `/cancel`        | POST   | Cancel subscription        | -                  | `{ reason? }`                          | `{ success }`                     |

## 4. Tipping System

### Base Path: `/monetization/tips`

| Endpoint    | Method | Description               | Query Params           | Request Body                       | Response                     |
| ----------- | ------ | ------------------------- | ---------------------- | ---------------------------------- | ---------------------------- |
| `/`         | POST   | Send tip to creator       | -                      | `{ recipient, amount, message? }`  | `{ success, transactionId }` |
| `/`         | GET    | Get tip history           | `?type=sent\|received` | -                                  | `{ tips: [], pagination }`   |
| `/settings` | GET    | Get tipping settings      | -                      | -                                  | `{ settings }`               |
| `/settings` | PATCH  | Update tipping settings   | -                      | `{ enabled, suggestedAmounts }`    | `{ settings }`               |
| `/amounts`  | GET    | Get suggested tip amounts | -                      | -                                  | `{ amounts }`                |
| `/amounts`  | PATCH  | Update tip amounts        | -                      | `{ small, medium, large, custom }` | `{ amounts }`                |

## 5. Token Management

### Base Path: `/monetization/tokens`

| Endpoint    | Method | Description           | Request Body                                   | Response                      |
| ----------- | ------ | --------------------- | ---------------------------------------------- | ----------------------------- |
| `/`         | GET    | Get token settings    | -                                              | `{ tokens }`                  |
| `/`         | PATCH  | Update token settings | `{ autoClaim, notifications, displayBalance }` | `{ tokens }`                  |
| `/balance`  | GET    | Get token balances    | -                                              | `{ balances: [] }`            |
| `/claim`    | POST   | Claim earned tokens   | -                                              | `{ success, amount }`         |
| `/history`  | GET    | Get token history     | `?page=1&limit=20`                             | `{ history: [], pagination }` |
| `/transfer` | POST   | Transfer tokens       | `{ recipient, amount, memo? }`                 | `{ success, transactionId }`  |

## 6. Content Gating

### Base Path: `/monetization/gating`

| Endpoint       | Method | Description                      | Request Body                                    | Response                       |
| -------------- | ------ | -------------------------------- | ----------------------------------------------- | ------------------------------ |
| `/tokens`      | GET    | Get token-gating settings        | -                                               | `{ settings }`                 |
| `/tokens`      | PATCH  | Update token-gating settings     | `{ enabled, tokenType, thresholds }`            | `{ settings }`                 |
| `/nfts`        | GET    | Get NFT-gating settings          | -                                               | `{ settings }`                 |
| `/nfts`        | PATCH  | Update NFT-gating settings       | `{ enabled, collections, allowlist }`           | `{ settings }`                 |
| `/subscribers` | GET    | Get subscription-gating settings | -                                               | `{ settings }`                 |
| `/subscribers` | PATCH  | Update subscription gating       | `{ enabled, tierIds, minimumSubscriptionDays }` | `{ settings }`                 |
| `/verify`      | POST   | Verify access to gated content   | `{ contentId, contentType, proof? }`            | `{ hasAccess, requiredGates }` |

## Data Models

### NFT

```typescript
interface NFT {
  id: string;
  userId: string;
  tokenId: string;
  contractAddress: string;
  network: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: any[];
  };
  featured: boolean;
  hidden: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### NFTCollection

```typescript
interface NFTCollection {
  id: string;
  name: string;
  contractAddress: string;
  network: string;
  itemCount: number;
  floorPrice?: number;
  verified: boolean;
  banner?: string;
  logo?: string;
  createdAt: string;
}
```

### CreatorFundApplication

```typescript
interface CreatorFundApplication {
  id: string;
  userId: string;
  details: any;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  notes?: string;
}
```

### SubscriptionTier

```typescript
interface SubscriptionTier {
  id: string;
  creatorId: string;
  name: string;
  price: number;
  currency: string;
  color: string;
  benefits: string[];
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### Subscription

```typescript
interface Subscription {
  id: string;
  subscriberId: string;
  creatorId: string;
  tierId: string;
  startDate: string;
  endDate?: string;
  status: "active" | "cancelled" | "expired";
  renewalDate?: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}
```

### Tip

```typescript
interface Tip {
  id: string;
  senderId: string;
  recipientId: string;
  amount: number;
  currency: string;
  message?: string;
  transactionHash?: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}
```

### TokenSettings

```typescript
interface TokenSettings {
  id: string;
  userId: string;
  autoClaim: boolean;
  notifications: boolean;
  displayBalance: boolean;
  updatedAt: string;
}
```

### TokenTransaction

```typescript
interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: "earned" | "claimed" | "transferred" | "received";
  details?: string;
  relatedUserId?: string;
  transactionHash?: string;
  createdAt: string;
}
```

### ContentGatingSettings

```typescript
interface ContentGatingSettings {
  id: string;
  userId: string;
  tokenGating: {
    enabled: boolean;
    tokenType: string;
    thresholds: {
      content: number;
      comments: number;
    };
  };
  nftGating: {
    enabled: boolean;
    collections: string[];
    allowlist: string[];
  };
  subscriptionGating: {
    enabled: boolean;
    tierIds: string[];
    minimumSubscriptionDays: number;
  };
  updatedAt: string;
}
```

## Implementation Considerations

1. **NFT Integration**

   - Efficient NFT verification and ownership proof
   - Metadata retrieval and caching strategies
   - Cross-chain compatibility with multiple networks
   - NFT display and rendering optimizations

2. **Creator Economy**

   - Secure payment processing and transaction handling
   - Automated distribution for creator fund rewards
   - Analytics for creator performance metrics
   - Tax reporting and compliance features

3. **Token Systems**

   - Integration with on-chain token functionality
   - Secure custody of user tokens when appropriate
   - Gas-efficient token operations
   - Token reward distribution mechanisms

4. **Subscription Services**

   - Recurring payment handling and billing
   - Subscription lifecycle management
   - Access control for subscriber-only content
   - Renewal reminders and grace periods

5. **Security & Compliance**

   - KYC/AML compliance for monetization features
   - Secure handling of payment information
   - Fraud prevention for tips and subscriptions
   - Dispute resolution processes

6. **Web3 Integration**
   - Gas fee estimation and management
   - User-controlled wallet operations
   - Smart contract interaction for NFT and token functionality
   - Multi-chain support for different assets
