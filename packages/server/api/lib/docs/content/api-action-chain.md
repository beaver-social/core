## Action Chain Verification

The Beaver Social API implements a unique action-chain verification system to ensure the authenticity of user actions. This system uses cryptographic signatures to verify that actions are performed by the rightful users.

### How It Works

1. Each action requires a signature from the user's wallet
2. The signature is verified against the user's blockchain identity
3. Actions are linked in a chain to prevent replay attacks
4. The server maintains a sequence number for each user

### Signature Format

The signature format follows this pattern:

```
sign(keccak256(actionType + timestamp + userId + actionData + prevActionHash))
```

Where:

- `actionType`: The type of action (e.g., "post", "like", "follow")
- `timestamp`: The current timestamp in ISO format
- `userId`: The ID of the user performing the action
- `actionData`: JSON string of action-specific data
- `prevActionHash`: Hash of the previous action performed by the user
