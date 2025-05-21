## Overview

Beaver Social is a Web3 Social Network Layer built on the Sui Blockchain. It's designed as a headless logic layer that provides developers with the tools to create customized social network UI clients. The platform consists of several modular components that work together to deliver a complete social networking experience with blockchain integration.

## Component Architecture

The platform follows a layered architecture pattern with the following levels:

1. **Level 0: API Layer** - The fundamental server API that can be consumed directly or through the Client SDK
2. **Level 1: Beaver Client SDK** - A TypeScript SDK that provides a simplified interface to the API
3. **Level 2: Beaver React SDK** - A React-specific SDK built on top of the Client SDK
4. **Level 3: UI Clients** - Custom applications built using the provided SDKs

```
┌───────────────────────────────────────────────────────────────┐
│ Level 3: UI Clients                                           │
│ (Mobile App, Web App, or Custom Applications)                 │
└───────────────┬───────────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│ Level 2: Beaver React SDK                                     │
│ (React-specific components and hooks)                         │
└───────────────┬───────────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│ Level 1: Beaver Client SDK                                    │
│ (TypeScript SDK with modular features)                        │
└───────────────┬───────────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│ Level 0: API Layer                                            │
│ (Server API with endpoints for social network functionality)  │
└───────────────┬───────────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────────┐
│ Sui Blockchain Integration                                     │
│ (Move Smart Contracts)                                         │
└───────────────────────────────────────────────────────────────┘
```

## Core Packages

### 1. Move Contracts (`packages/move`)

Smart contracts written in the Move programming language that interact with the Sui Blockchain.

### 2. Server API (`packages/server/api`)

The API backend service that powers the platform:

- RESTful endpoints for all social platform functionality inside `src/routes`
- The schema for the database inside `src/lib/db`
- We have created a user action-chain using cryptographic signatures to verify the authenticity of the user's actions. The logic is present inside `src/lib/actions`.

### 3. Beaver Client SDK (`packages/lib/beaver-client`)

A TypeScript SDK for interacting with the Beaver Social API. The SDK follows a modular architecture with these key components:

- `src/index.ts`: Main entry point for the SDK
- `src/bindings`: All the business logic for interacting with the Beaver Social API.
- `src/utils`: Utility functions for the SDK.

### 4. Beaver React SDK (`packages/lib/beaver-react`)

A React wrapper around the Beaver Client SDK that provides:

- React Context Provider for easy integration inside `src/context/beaver.tsx`
- React Hooks for accessing all client functionality inside `src/hooks/index.ts`

### 5. Example Application (`packages/server/app`)

A sample application that consume the Beaver React SDK to provide a complete social media experience like Twitter and Instagram.
