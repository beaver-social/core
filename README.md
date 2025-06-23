# Beaver Social

Beaver Social is a Web3 Social Network Layer built on the Sui Blockchain. It's designed as a headless logic layer that provides developers with the tools to create customized social network UI clients.

The platform consists of several modular components that work together to deliver a complete social networking experience with blockchain integration, enabling developers to focus on creating unique user experiences while leveraging our robust social infrastructure.

## Key Features

- **Blockchain Authentication**: Secure Web3 authentication using wallet connections
- **Social Graph**: Complete social network functionality (profiles, follows, posts, likes, etc.)
- **On-chain Verification**: Critical data secured and verified by the Sui blockchain
- **Developer-Friendly**: Multiple integration options from SDKs to direct API access
- **Customizable**: Build your own UI while leveraging our social backend
- **Modular**: Use only the components you need for your specific use case
- **Scalable**: Infrastructure designed to handle millions of users and interactions

## Architecture

The platform follows a layered architecture pattern with the following levels:

1.  **Level 0: API Layer** - The fundamental server API that can be consumed directly or through the Client SDK
2.  **Level 1: Beaver Client SDK** - A TypeScript SDK that provides a simplified interface to the API
3.  **Level 2: Beaver React SDK** - A React-specific SDK built on top of the Client SDK
4.  **Level 3: UI Clients** - Custom applications built using the provided SDKs

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

The API backend service that powers the platform.

### 3. Beaver Client SDK (`packages/lib/beaver-client`)

A TypeScript SDK for interacting with the Beaver Social API.

### 4. Beaver React SDK (`packages/lib/beaver-react`)

A React wrapper around the Beaver Client SDK.

### 5. Example Application (`packages/server/app`)

A sample application that consume the Beaver React SDK to provide a complete social media experience.

## Getting Started

To get the project running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/beaver-social/beaver-social.git
    cd beaver-social
    ```

2.  **Install dependencies:**

    This project uses [Bun](https://bun.sh/) as a package manager.

    ```bash
    bun install
    ```

3.  **Run the development server:**

    The main application is in the `packages/server` directory.

    ```bash
    cd packages/server
    bun run dev
    ```

    This will start the development server. You can now view the application in your browser.

## Usage (SDKs)

You have multiple options for integrating Beaver Social:

1.  **React SDK**: The fastest way to build a React-based social application
2.  **Client SDK**: For any JavaScript-based application
3.  **Direct API Integration**: For custom implementations in any language

### Quick Start with React SDK

Install the SDK:

```bash
npm install @beaver-social/react @tanstack/react-query
```

Wrap your application with the `BeaverProvider`:

```tsx
// src/App.tsx
import React from "react";
import { BeaverProvider } from "@beaver-social/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BeaverProvider
        config={{
          network: "testnet",
          apiBaseUrl: "https://beaversocial.xyz/api/v1",
          debug: true,
          appId: "your-app-id", // Get your AppID from the developer portal
        }}
      >
        <YourApp />
      </BeaverProvider>
    </QueryClientProvider>
  );
}
```

For more detailed usage, please refer to the [official documentation](https://beaversocial.xyz/docs).