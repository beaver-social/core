# Beaver Social - Move Smart Contracts

This document provides a comprehensive overview of the Beaver Social Move smart contracts, explaining their purpose, structure, and integration points for client-side development.

## Project Overview

Beaver Social is a decentralized social platform built on the Sui blockchain that allows users to:

- Register unique usernames
- Create and manage social identities
- Link their Sui Name Service (SuiNS) domain names to their identities
- Follow other users
- Manage the platform through an admin system

## Smart Contract Architecture

The project consists of three main smart contract modules:

### 1. Identity Registration (`identity_registration.move`)

This module handles the core identity functionality:

#### Key structs:

- `IdentityRegistration`: Represents a user's identity NFT with a unique username
- `IdentityData`: Contains user information including owner address, linked SuiNS domain, and about text
- `FollowRegistry`: Stores following/follower relationships between users

#### Key functions:

- `new`: Creates a new identity registration
- `attach_suins`: Links a SuiNS domain to an identity
- `set_about`: Updates a user's about information
- Various getters for identity data

### 2. Registry (`registry.move`)

This module manages all identities on the platform:

#### Key structs:

- `Registry`: Central registry for all identities, tracking username ownership and history

#### Key functions:

- `mint`: Public function for users to register a username
- `mint_`: Package-scoped function used by admins to mint on behalf of users
- `switch_owner`: Allows ownership changes when a valid SuiNS domain is provided

### 3. Admin (`admin.move`)

This module implements administrative capabilities:

#### Key structs:

- `AdminCap`: Capability object that grants admin privileges
- `AdminsRecord`: Tracks all admin capability IDs

#### Key functions:

- `elevate`: Creates a new admin and transfers capability to another address
- `mint_for`: Allows admins to mint usernames on behalf of other users
- `revoke`: Removes admin access for a specific capability

## Client Integration Guide

Beaver Social uses a custom `Contracts` class that provides a clean interface for interacting with the Move smart contracts. Here's how to integrate it in your client application:

### 1. Setting Up the Client

```typescript
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Contracts } from "contracts"; // Import from the contracts package

// Initialize SUI client
const suiClient = new SuiClient({
  url: getFullnodeUrl("testnet"), // Or "mainnet" as needed
});

// Object IDs configuration
const onchainDefinitions = {
  testnet: {
    packageId: "0x...", // Your package ID
    objects: {
      adminsRecord: {
        id: "0x...", // AdminsRecord object ID
      },
      clock: {
        id: "0x...", // System clock object ID
      },
      registry: {
        id: "0x...", // Registry object ID
      },
    },
  },
};

// Initialize the Contracts instance
const contracts = new Contracts({
  packageId: onchainDefinitions.testnet.packageId,
  objects: onchainDefinitions.testnet.objects,
});
```

### 2. User Registration

```typescript
// Register a new username
async function registerUsername(signer, username, about) {
  // Create a new transaction
  const tx = new Transaction();

  // Add the mint call to the transaction
  contracts.registry.mint(tx, {
    username: username,
    about: about,
  });

  // Execute the transaction
  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}
```

### 3. Updating User Profile

```typescript
// Update user's about information
async function updateAbout(signer, identityRegistrationId, newAbout) {
  const tx = new Transaction();

  contracts.identityRegistration.setAbout(tx, {
    identityRegistration: { id: identityRegistrationId },
    about: newAbout,
  });

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}

// Link SuiNS domain to identity
async function attachSuins(
  signer,
  identityRegistrationId,
  suinsRegistrationId
) {
  const tx = new Transaction();

  contracts.identityRegistration.attachSuins(tx, {
    identityRegistration: { id: identityRegistrationId },
    suinsRegistration: { id: suinsRegistrationId },
  });

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}

// Transfer identity ownership via SuiNS
async function switchOwner(
  signer,
  identityRegistrationId,
  suinsRegistrationId
) {
  const tx = new Transaction();

  contracts.registry.switchOwner(tx, {
    identityRegistration: { id: identityRegistrationId },
    suinsRegistration: { id: suinsRegistrationId },
  });

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}
```

### 4. Administrative Actions

```typescript
// For admin use: mint identity for another user
async function adminMintFor(
  signer,
  adminCapId,
  username,
  about,
  receiverAddress
) {
  const tx = new Transaction();

  contracts.admin.mint_for(tx, {
    adminCap: { id: adminCapId },
    username: username,
    about: about,
    receiver: receiverAddress,
  });

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}

// Elevate a user to admin status
async function elevateToAdmin(signer, adminCapId, receiverAddress) {
  const tx = new Transaction();

  contracts.admin.elevate(tx, {
    adminCap: { id: adminCapId },
    receiver: receiverAddress,
  });

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}

// Revoke admin privileges
async function revokeAdmin(signer, adminCapId, adminCapIdToRevoke) {
  const tx = new Transaction();

  contracts.admin.revoke(tx, {
    adminCap: { id: adminCapId },
    adminCapIdToRevoke: adminCapIdToRevoke,
  });

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: signer,
  });
}
```

## Important Constraints

1. Usernames:

   - Minimum length: 3 characters
   - Maximum length: 32 characters
   - Must be unique in the registry

2. About text:

   - Maximum length: 255 characters

3. Identity:
   - Each address can only have one identity
   - Ownership changes require valid SuiNS domain verification

## Deployment Information

To deploy the contracts, use the provided test.ts script:

```bash
# Install dependencies
bun install

# Deploy contracts
bun run deploy
```

## Object IDs to Track

After deployment, you'll need to track several critical object IDs:

1. Package ID - The ID of the deployed Move package
2. Registry Object ID - The shared Registry object
3. AdminsRecord Object ID - The shared AdminsRecord object
4. Individual user IdentityRegistration IDs

These IDs should be stored in your client application's configuration for making calls to the smart contracts.

## Development Progress

The current implementation includes:

- Complete identity management system
- Username registration with constraints
- SuiNS integration
- Admin capabilities for platform management
- Follow relationship tracking

Next steps:

- Implement content creation and sharing
- Add commenting functionality
- Develop reputation/verification system
