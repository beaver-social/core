import { useBeaver } from "@beaver/react";
import MarkdownIt from "markdown-it";
// Create markdown parser instance
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// Import raw markdown content
// In a real application, you would want to load these from files
// but for simplicity we'll include the first portion of each one directly
const markdownContent: Record<string, string> = {
  "1_getting_started": `# Getting Started with Beaver Social

This guide will help you get started with integrating Beaver Social into your application or building a custom UI client on top of our platform.

## Overview

Beaver Social is a Web3 Social Network Layer built on the Sui Blockchain. It provides developers with:

- Authentication using blockchain wallets
- Social features (profiles, posts, follows, likes, etc.)
- Blockchain integration for data permanence and verification
- Customizable UI components

## Prerequisites

Before getting started, make sure you have:

- Node.js (v16 or later)
- npm or yarn
- Basic knowledge of React (for React-based integrations)
- Basic understanding of blockchains and Web3 concepts`,

  "2_architecture": `# Beaver Social Architecture

## Overview

Beaver Social is a Web3 Social Network Layer built on the Sui Blockchain. It's designed as a headless logic layer that provides developers with the tools to create customized social network UI clients. The platform consists of several modular components that work together to deliver a complete social networking experience with blockchain integration.

NOTE: Ignore folders called "ai" or "legacy". They contain old code that is not used in the current implementation.

## Component Architecture

The platform follows a layered architecture pattern with the following levels:

1. **Level 0: API Layer** - The fundamental server API that can be consumed directly or through the Client SDK
2. **Level 1: Beaver Client SDK** - A TypeScript SDK that provides a simplified interface to the API
3. **Level 2: Beaver React SDK** - A React-specific SDK built on top of the Client SDK
4. **Level 3: UI Clients** - Custom applications built using the provided SDKs`,

  "3_beaver_react_sdk": `# Beaver React SDK

This document provides comprehensive documentation for working with the Beaver React SDK, which offers React-specific bindings for interacting with the Beaver Social API.

## Installation

\`\`\`bash
npm install @beaver/react
# or
yarn add @beaver/react
\`\`\`

## Getting Started

The Beaver React SDK provides a React Context provider and custom hooks for interacting with the Beaver Social platform. It's built on top of the Beaver Client SDK and leverages React Query for data fetching.`,

  "4_beaver_client_sdk": `# Beaver Client SDK

This document provides comprehensive documentation for the Beaver Client SDK, the TypeScript foundation that powers the Beaver React SDK and enables direct interaction with the Beaver Social API.

## Installation

\`\`\`bash
npm install @beaver/client
# or
yarn add @beaver/client
\`\`\`

## Getting Started

The Beaver Client SDK provides a modular, TypeScript-based interface for interacting with the Beaver Social platform.

\`\`\`typescript
import { BeaverClient } from "@beaver/client";

// Initialize the client
const client = new BeaverClient({
  network: "testnet", // or 'mainnet', 'devnet'
  apiBaseUrl: "https://api.beaver.social/v1",
  debug: true, // Optional: enables SDK logging
  // Optional: enable zkLogin wallet support
  zkLoginWallets: {
    enabled: true,
    windowFeatures: {}, // Optional window features for wallet connections
  },
});
\`\`\``,

  "5_server_api": `# Beaver Server API

This document provides comprehensive documentation for the Beaver Server API, which serves as the foundation (Level 0) of the Beaver Social platform architecture.

## Overview

The Beaver Server API is a RESTful API service that powers the social network functionality and handles blockchain integration. It provides endpoints for user management, authentication, social interactions, content creation, and blockchain transactions.

## API Base URL

The API is available at:

- Production: \`https://api.beaver.social/v1\`
- Testnet: \`https://testnet.api.beaver.social/v1\``,

  "6_move_contracts": `# Move Smart Contracts

This document provides comprehensive documentation for the Move smart contracts that power the Beaver Social platform on the Sui blockchain.

## Overview

The Beaver Social platform leverages Sui's Move smart contracts to provide on-chain verification and permanence for social interactions. These contracts handle identity management, content verification, and social graph relationships in a decentralized manner.

## Contract Structure

The Move contracts are organized into several modules:

\`\`\`
packages/move
├── sources
│   ├── social.move     # Core social functionality
│   ├── identity.move   # User identity management
│   ├── content.move    # Content storage and verification
│   ├── governance.move # Platform governance
│   └── utils.move      # Utility functions
└── tests
    └── ...             # Unit tests for contract functionality
\`\`\``,

  README: `# Beaver Social Documentation

Welcome to the Beaver Social documentation. This comprehensive guide covers everything you need to know about integrating and using the Beaver Social Web3 Social Network Layer.

## What is Beaver Social?

Beaver Social is a Web3 Social Network Layer built on the Sui Blockchain. It's designed as a headless logic layer that provides developers with the tools to create customized social network UI clients.

The platform consists of several modular components that work together to deliver a complete social networking experience with blockchain integration, enabling developers to focus on creating unique user experiences while leveraging our robust social infrastructure.`,
};

// Map of doc IDs to their corresponding markdown files
const docFileMap: Record<string, string> = {
  installation: "1_getting_started",
  "quick-start": "1_getting_started",
  authentication: "1_getting_started",
  "social-graph": "2_architecture",
  "content-model": "2_architecture",
  "web3-integration": "2_architecture",
  "client-api": "4_beaver_client_sdk",
  hooks: "3_beaver_react_sdk",
  utilities: "4_beaver_client_sdk",
  "social-feed": "3_beaver_react_sdk",
  "user-profiles": "3_beaver_react_sdk",
  "wallet-connect": "3_beaver_react_sdk",
  "build-profile": "4_beaver_client_sdk",
  "create-post": "3_beaver_react_sdk",
  "follow-users": "3_beaver_react_sdk",
};

// Helper function to load and render markdown content
export async function generateDocContent(
  title: string,
  mdString: string
): Promise<string> {
  try {
    // Parse markdown to HTML
    const html = md.render(mdString);
    return html;
  } catch (error) {
    console.error(`Error generating documentation for ${title}:`, error);
    return `
      <h2>Documentation Error</h2>
      <p>We're sorry, but there was an error loading the documentation for "${title}".</p>
      <p>Please try another topic from the navigation menu.</p>
    `;
  }
}
