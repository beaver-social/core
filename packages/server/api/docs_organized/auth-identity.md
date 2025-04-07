# Authentication & Identity API

## Overview

This document outlines the API endpoints for user authentication, identity management, and web3 identity integration in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Authentication

### Base Path: `/auth`

| Endpoint            | Method | Description                  | Request Body                    | Response                                        |
| ------------------- | ------ | ---------------------------- | ------------------------------- | ----------------------------------------------- |
| `/zklogin/nonce`    | POST   | Get nonce for zkLogin        | `{ jwt: string }`               | `{ salt: { hex, base64, integer } }`            |
| `/zklogin/verify`   | POST   | Verify zkLogin auth          | `{ jwt, userAddress, zkProof }` | `{ success, token, userAddress, isRegistered }` |
| `/wallet/challenge` | POST   | Get challenge for wallet sig | `{ address: string }`           | `{ challenge, message }`                        |
| `/wallet/verify`    | POST   | Verify wallet signature      | `{ address, signature }`        | `{ success, token, address, isRegistered }`     |
| `/session`          | GET    | Get current session info     | -                               | `{ user, isLoggedIn }`                          |
| `/logout`           | POST   | End user session             | -                               | `{ success }`                                   |

## 2. User Registration

### Base Path: `/users`

| Endpoint          | Method | Description                 | Query Params       | Request Body                             | Response                  |
| ----------------- | ------ | --------------------------- | ------------------ | ---------------------------------------- | ------------------------- |
| `/register`       | POST   | Complete user registration  | -                  | `{ username, fullName, image_url, ... }` | `{ user, identityNFT }`   |
| `/check-username` | GET    | Check username availability | `?username=string` | -                                        | `{ available, message? }` |
| `/verify-email`   | POST   | Request email verification  | -                  | `{ email }`                              | `{ success, message }`    |

## 3. Web3 Identity Management

### Base Path: `/identity`

| Endpoint          | Method | Description                          | Request Body                 | Response                       |
| ----------------- | ------ | ------------------------------------ | ---------------------------- | ------------------------------ |
| `/`               | GET    | Get identity NFT details             | -                            | `{ identityNFT, owner, user }` |
| `/transfer`       | POST   | Transfer identity to another address | `{ targetAddress, reason? }` | `{ success, transactionHash }` |
| `/verify`         | POST   | Verify account with NFT              | `{ signature }`              | `{ success, verificationId }`  |
| `/zklogin/setup`  | POST   | Set up zkLogin                       | `{ provider, token }`        | `{ success, setupId }`         |
| `/zklogin/status` | GET    | Check zkLogin setup status           | -                            | `{ isEnabled, providers: [] }` |

## 4. Identity Verification

### Base Path: `/verification`

| Endpoint   | Method | Description                  | Request Body            | Response                            |
| ---------- | ------ | ---------------------------- | ----------------------- | ----------------------------------- |
| `/request` | POST   | Request account verification | `{ reason, evidence? }` | `{ success, requestId }`            |
| `/status`  | GET    | Check verification status    | -                       | `{ status, message?, verifiedAt? }` |

## 5. Account Recovery

### Base Path: `/settings/recovery`

| Endpoint         | Method | Description                 | Request Body                       | Response       |
| ---------------- | ------ | --------------------------- | ---------------------------------- | -------------- |
| `/`              | GET    | Get recovery settings       | -                                  | `{ recovery }` |
| `/`              | PATCH  | Update recovery settings    | `{ methods, contacts, guardians }` | `{ recovery }` |
| `/backup-phrase` | POST   | Generate new backup phrase  | `{ password }`                     | `{ phrase }`   |
| `/backup-phrase` | GET    | Verify backup phrase exists | -                                  | `{ exists }`   |

## Data Models

### User Authentication

```typescript
interface AuthResponse {
  success: boolean;
  token?: string;
  userAddress?: string;
  isRegistered: boolean;
}

interface Challenge {
  challenge: string;
  message: string;
  expiresAt: number;
}

interface ZkLoginSalt {
  hex: string;
  base64: string;
  integer: string;
}
```

### Identity

```typescript
interface IdentityNFT {
  id: string;
  objectId: string;
  owner: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  metadata: {
    username: string;
    image_url?: string;
  };
}

interface VerificationRequest {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
  submittedAt: string;
  reviewedAt?: string;
  evidence?: string[];
}

interface RecoverySettings {
  methods: string[];
  contacts: string[];
  guardians: string[];
  hasBackupPhrase: boolean;
}
```

## Implementation Considerations

1. **Security**

   - Implement proper JWT validation and expiration
   - Secure storage of cryptographic challenges
   - Rate limiting on authentication endpoints
   - Protection against enumeration attacks

2. **Web3 Integration**

   - Proper verification of on-chain identity
   - Secure handling of zkLogin integration
   - Support for multiple wallet types
   - Secure NFT transfer mechanisms

3. **Recovery**
   - Secure backup phrase generation and storage
   - Multi-factor recovery mechanisms
   - Guardian-based recovery protocols
   - Off-chain identity verification for recovery
