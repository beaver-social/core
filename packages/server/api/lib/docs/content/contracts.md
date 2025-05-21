## Overview

The Beaver Social platform leverages Sui's Move smart contracts to provide on-chain verification and permanence for social interactions. These contracts handle identity management, content verification, and social graph relationships in a decentralized manner.

## Contract Structure

The Move contracts are organized into several modules:

```
packages/move
├── sources
│   ├── social.move     # Core social functionality
│   ├── identity.move   # User identity management
│   ├── content.move    # Content storage and verification
│   ├── governance.move # Platform governance
│   └── utils.move      # Utility functions
└── tests
    └── ...             # Unit tests for contract functionality
```

## Key Modules

### Identity Module

The Identity module manages user identities on the blockchain.

```move
module beaver::identity {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::table::{Self, Table};
    use std::string::{Self, String};

    // Struct representing a user's identity
    struct Identity has key, store {
        id: UID,
        owner: address,
        username: String,
        timestamp: u64,
        profile_data: Table<String, String>,
    }

    // Events
    struct IdentityCreated has copy, drop {
        identity_id: ID,
        owner: address,
        username: String,
        timestamp: u64,
    }

    // Error codes
    const EIdentityAlreadyExists: u64 = 1;
    const EUnauthorizedAccess: u64 = 2;
    const EUsernameAlreadyTaken: u64 = 3;

    // Functions
    public entry fun create_identity(
        username: vector<u8>,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    public entry fun update_profile(
        identity: &mut Identity,
        key: vector<u8>,
        value: vector<u8>,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    // Other functions...
}
```

#### Key Functions

| Function            | Description                       | Parameters                                                    |
| ------------------- | --------------------------------- | ------------------------------------------------------------- |
| `create_identity`   | Creates a new identity for a user | `username: vector<u8>`                                        |
| `update_profile`    | Updates a profile field           | `identity: &mut Identity, key: vector<u8>, value: vector<u8>` |
| `transfer_identity` | Transfers identity to a new owner | `identity: &mut Identity, new_owner: address`                 |
| `verify_identity`   | Verifies identity ownership       | `identity: &Identity, expected_owner: address`                |

### Social Module

The Social module manages relationships between users, such as following.

```move
module beaver::social {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::transfer;
    use beaver::identity::{Self, Identity};

    // Struct representing a follow relationship
    struct Follow has key, store {
        id: UID,
        follower: address,
        following: address,
        timestamp: u64,
    }

    // Events
    struct FollowCreated has copy, drop {
        follow_id: ID,
        follower: address,
        following: address,
        timestamp: u64,
    }

    struct FollowDeleted has copy, drop {
        follow_id: ID,
        follower: address,
        following: address,
        timestamp: u64,
    }

    // Error codes
    const EAlreadyFollowing: u64 = 1;
    const ENotFollowing: u64 = 2;
    const ECannotFollowYourself: u64 = 3;

    // Functions
    public entry fun follow_user(
        follower_identity: &Identity,
        following_address: address,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    public entry fun unfollow_user(
        follow: Follow,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    // Other functions...
}
```

#### Key Functions

| Function        | Description                        | Parameters                                                 |
| --------------- | ---------------------------------- | ---------------------------------------------------------- |
| `follow_user`   | Creates a follow relationship      | `follower_identity: &Identity, following_address: address` |
| `unfollow_user` | Removes a follow relationship      | `follow: Follow`                                           |
| `is_following`  | Checks if one user follows another | `follower: address, following: address`                    |
| `get_followers` | Gets all followers of a user       | `user_address: address`                                    |

### Content Module

The Content module manages posts and content interactions.

```move
module beaver::content {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::transfer;
    use sui::table::{Self, Table};
    use std::string::{Self, String};
    use beaver::identity::{Self, Identity};

    // Struct representing a post
    struct Post has key, store {
        id: UID,
        author: address,
        content_hash: vector<u8>,
        parent_post_id: Option<ID>,
        timestamp: u64,
        metadata: Table<String, String>,
    }

    // Struct representing a post interaction (like, repost, etc.)
    struct Interaction has key, store {
        id: UID,
        post_id: ID,
        user: address,
        interaction_type: u8, // 1 = like, 2 = repost, 3 = bookmark
        timestamp: u64,
    }

    // Constants for interaction types
    const INTERACTION_LIKE: u8 = 1;
    const INTERACTION_REPOST: u8 = 2;
    const INTERACTION_BOOKMARK: u8 = 3;

    // Events
    struct PostCreated has copy, drop {
        post_id: ID,
        author: address,
        content_hash: vector<u8>,
        parent_post_id: Option<ID>,
        timestamp: u64,
    }

    struct InteractionCreated has copy, drop {
        interaction_id: ID,
        post_id: ID,
        user: address,
        interaction_type: u8,
        timestamp: u64,
    }

    // Error codes
    const EUnauthorizedAccess: u64 = 1;
    const EInteractionAlreadyExists: u64 = 2;
    const EInteractionDoesNotExist: u64 = 3;

    // Functions
    public entry fun create_post(
        identity: &Identity,
        content_hash: vector<u8>,
        parent_post_id: Option<ID>,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    public entry fun like_post(
        identity: &Identity,
        post_id: ID,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    public entry fun unlike_post(
        interaction: Interaction,
        ctx: &mut TxContext
    ) {
        // Implementation details...
    }

    // Other functions...
}
```

#### Key Functions

| Function        | Description                    | Parameters                                                                  |
| --------------- | ------------------------------ | --------------------------------------------------------------------------- |
| `create_post`   | Creates a new post             | `identity: &Identity, content_hash: vector<u8>, parent_post_id: Option<ID>` |
| `like_post`     | Creates a like interaction     | `identity: &Identity, post_id: ID`                                          |
| `unlike_post`   | Removes a like interaction     | `interaction: Interaction`                                                  |
| `repost`        | Creates a repost interaction   | `identity: &Identity, post_id: ID`                                          |
| `bookmark_post` | Creates a bookmark interaction | `identity: &Identity, post_id: ID`                                          |

### Governance Module

The Governance module manages platform governance through a DAO-like structure.

```move
module beaver::governance {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::transfer;
    use std::string::{Self, String};
    use beaver::identity::{Self, Identity};

    // Structs and functions...
}
```

## Using the Contracts

### Identity Creation

```move
// Create a new identity
public entry fun example_create_identity(ctx: &mut TxContext) {
    let username = b"blockchain_dev";
    beaver::identity::create_identity(username, ctx);
}
```

### Social Interactions

```move
// Follow another user
public entry fun example_follow_user(
    follower_identity: &Identity,
    following_address: address,
    ctx: &mut TxContext
) {
    beaver::social::follow_user(follower_identity, following_address, ctx);
}

// Create a post
public entry fun example_create_post(
    identity: &Identity,
    content_hash: vector<u8>,
    ctx: &mut TxContext
) {
    // Create a post without a parent (not a reply)
    let parent_id = option::none();
    beaver::content::create_post(identity, content_hash, parent_id, ctx);
}

// Like a post
public entry fun example_like_post(
    identity: &Identity,
    post_id: ID,
    ctx: &mut TxContext
) {
    beaver::content::like_post(identity, post_id, ctx);
}
```

## Integration with Beaver Backend

The Beaver backend interacts with these Move contracts through the Sui SDK. The backend provides:

1. A simplified interface for calling contract functions
2. Proper formatting of input data
3. Signature generation and verification
4. Transaction handling and status tracking
5. Event listening for on-chain activity

### Example: Creating a Post On-Chain

```typescript
// In the Beaver backend
async function createPostOnChain(userId: number, content: string) {
  try {
    // 1. Get user's identity
    const userIdentity = await getUserIdentity(userId);

    // 2. Generate content hash (IPFS CID or SHA-256)
    const contentHash = await generateContentHash(content);

    // 3. Create transaction payload
    const tx = {
      target: `${packageId}::content::create_post`,
      arguments: [
        userIdentity.address, // Identity object ID
        contentHash, // Content hash
        "null", // No parent post (not a reply)
      ],
      typeArguments: [],
    };

    // 4. Execute transaction
    const result = await suiClient.executeTransaction(tx);

    // 5. Update database with on-chain ID
    await updatePostWithOnChainId(postId, result.objectId);

    return {
      success: true,
      txDigest: result.digest,
      objectId: result.objectId,
    };
  } catch (error) {
    console.error("Error creating post on-chain:", error);
    throw error;
  }
}
```

## On-Chain Data Storage

The Beaver Social platform uses a hybrid approach for data storage:

1. Content metadata, social graph, and interactions are stored on-chain
2. Actual content (post text, images) is stored off-chain with hash verification
3. User profiles have essential data on-chain with extended profiles off-chain

This approach balances:

- Decentralization and censorship resistance
- Cost efficiency
- Performance and scalability
- Privacy considerations

## Contract Deployment

The Move contracts are deployed to the Sui network through a deployment process:

1. Compile the Move package

   ```bash
   sui move build
   ```

2. Publish the compiled package

   ```bash
   sui client publish --gas-budget 10000000
   ```

3. Record the newly created package object ID

   ```bash
   # Example output
   Created Objects:
     - ID: 0x123...789 , Owner: Immutable
   ```

4. Update the API configuration with the new package ID

## Security Considerations

The Move contracts implement several security measures:

### 1. Access Control

All state-changing functions verify the caller's identity using object capabilities:

```move
// Example of access control
let identity_owner = identity::get_owner(identity);
assert!(tx_context::sender(ctx) == identity_owner, EUnauthorizedAccess);
```

### 2. Input Validation

Inputs are validated before processing:

```move
// Example of input validation
assert!(vector::length(&username) <= 50, EUsernameTooLong);
assert!(vector::length(&username) >= 3, EUsernameTooShort);
```

### 3. State Verification

The contracts verify state before modifications:

```move
// Example of state verification
assert!(!is_following(follower, following), EAlreadyFollowing);
```

### 4. Safe Resource Management

The contracts follow Sui's ownership model for safe resource management:

```move
// Example of safe resource transfer
transfer::transfer(follow, tx_context::sender(ctx));
```

## Testing

The contracts include comprehensive test coverage:

```move
// Example test
#[test]
fun test_create_identity() {
    let ctx = test_scenario::begin(@0x1);

    let username = b"test_user";
    identity::create_identity(username, &mut ctx);

    test_scenario::next_tx(&mut ctx, @0x1);

    // Verify identity was created correctly
    let identity = test_scenario::take_from_sender<Identity>(&ctx);
    assert!(identity::get_owner(&identity) == @0x1, 1);
    assert!(identity::get_username(&identity) == string::utf8(username), 2);

    test_scenario::return_to_sender(&ctx, identity);
    test_scenario::end(ctx);
}
```

## Auditing

The contracts have undergone security audits to ensure they are free from common vulnerabilities such as:

1. Reentrancy attacks
2. Logic errors
3. Arithmetic overflows
4. Access control issues
5. Resource leaks

## Future Enhancements

Planned enhancements for the Move contracts include:

1. **Token Integration**: Adding support for token-gated content and communities
2. **Reputation System**: Implementing a decentralized reputation system
3. **Content Monetization**: Adding features for creator monetization
4. **Cross-Chain Bridges**: Enabling interoperability with other blockchain networks
5. **Advanced Governance**: Implementing more sophisticated governance mechanisms

## Resources

- [Sui Developer Documentation](https://docs.sui.io/)
- [Move Language Documentation](https://move-language.github.io/move/)
- [Beaver Social GitHub Repository](https://github.com/beaver-social/beaver)
