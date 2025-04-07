# Authentication API

## Base URL

All endpoints are relative to: `http://localhost:5173/api/v1/`

## 1. Authentication

### Base Path: `/auth`

| Endpoint                  | Method | Description                  | Request Body             | Response                                    |
| ------------------------- | ------ | ---------------------------- | ------------------------ | ------------------------------------------- |
| `/zklogin/salt-service`   | POST   | Get salt for zkLogin         | `{ jwt: string }`        | `{ salt: { hex, base64, integer } }`        |
| `/zklogin/prover-service` | POST   | Get prover for zkLogin       | `{ jwt: string }`        | `{ prover: { hex, base64, integer } }`      |
| `/challenge`              | POST   | Get challenge for wallet sig | `{ address: string }`    | `{ challenge, message }`                    |
| `/verify`                 | POST   | Verify wallet signature      | `{ address, signature }` | `{ success, token, address, isRegistered }` |

## 2. User Registration

### Base Path: `/auth`

| Endpoint          | Method | Description                 | Query Params       | Request Body                             | Response                  |
| ----------------- | ------ | --------------------------- | ------------------ | ---------------------------------------- | ------------------------- |
| `/register`       | POST   | Complete user registration  | -                  | `{ username, fullName, image_url, ... }` | `{ user, identityNFT }`   |
| `/check-username` | GET    | Check username availability | `?username=string` | -                                        | `{ available, message? }` |

## 3. Web3 Identity Management

### Base Path: `/auth/identity`

| Endpoint | Method      | Description | Request Body                         | Response                     |
| -------- | ----------- | ----------- | ------------------------------------ | ---------------------------- | ------------------------------ | -------------------- |
| <!--     | `/`         | GET         | Get identity NFT details             | -                            | `{ identityNFT, owner, user }` | owns nft already --> |
| <!--     | `/transfer` | POST        | Transfer identity to another address | `{ targetAddress, reason? }` | `{ success, transactionHash }` | client side only --> |
