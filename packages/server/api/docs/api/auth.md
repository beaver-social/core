# Authentication API

## Base URL

All endpoints are relative to: `http://localhost:5173/api/v1/`

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

### Base Path: `/auth`

| Endpoint          | Method | Description                 | Query Params       | Request Body                             | Response                  |
| ----------------- | ------ | --------------------------- | ------------------ | ---------------------------------------- | ------------------------- |
| `/register`       | POST   | Complete user registration  | -                  | `{ username, fullName, image_url, ... }` | `{ user, identityNFT }`   |
| `/check-username` | GET    | Check username availability | `?username=string` | -                                        | `{ available, message? }` |
| `/verify-email`   | POST   | Request email verification  | -                  | `{ email }`                              | `{ success, message }`    |

## 3. Web3 Identity Management

### Base Path: `/auth/identity`

| Endpoint          | Method | Description                          | Request Body                 | Response                       |
| ----------------- | ------ | ------------------------------------ | ---------------------------- | ------------------------------ |
| `/`               | GET    | Get identity NFT details             | -                            | `{ identityNFT, owner, user }` |
| `/transfer`       | POST   | Transfer identity to another address | `{ targetAddress, reason? }` | `{ success, transactionHash }` |
| `/verify`         | POST   | Verify account with NFT              | `{ signature }`              | `{ success, verificationId }`  |
| `/zklogin/setup`  | POST   | Set up zkLogin                       | `{ provider, token }`        | `{ success, setupId }`         |
| `/zklogin/status` | GET    | Check zkLogin setup status           | -                            | `{ isEnabled, providers: [] }` |

## 4. Identity Verification

### Base Path: `/auth/verification`

| Endpoint   | Method | Description                  | Request Body            | Response                            |
| ---------- | ------ | ---------------------------- | ----------------------- | ----------------------------------- |
| `/request` | POST   | Request account verification | `{ reason, evidence? }` | `{ success, requestId }`            |
| `/status`  | GET    | Check verification status    | -                       | `{ status, message?, verifiedAt? }` |

## 5. Account Recovery

### Base Path: `/auth/recovery`

| Endpoint         | Method | Description                 | Request Body                       | Response       |
| ---------------- | ------ | --------------------------- | ---------------------------------- | -------------- |
| `/`              | GET    | Get recovery settings       | -                                  | `{ recovery }` |
| `/`              | PATCH  | Update recovery settings    | `{ methods, contacts, guardians }` | `{ recovery }` |
| `/backup-phrase` | POST   | Generate new backup phrase  | `{ password }`                     | `{ phrase }`   |
| `/backup-phrase` | GET    | Verify backup phrase exists | -                                  | `{ exists }`   |
