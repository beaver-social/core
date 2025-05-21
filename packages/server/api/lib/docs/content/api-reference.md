## Error Handling

The API returns standard HTTP status codes along with JSON responses for errors:

**Example Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SIGNATURE",
    "message": "The signature provided is invalid or has expired",
    "details": {
      "field": "signature"
    }
  }
}
```

Common error codes:

| Code                  | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `INVALID_CREDENTIALS` | Authentication credentials are invalid                  |
| `INVALID_SIGNATURE`   | The signature is invalid or has expired                 |
| `USER_NOT_FOUND`      | The specified user does not exist                       |
| `POST_NOT_FOUND`      | The specified post does not exist                       |
| `RATE_LIMIT_EXCEEDED` | You have exceeded the rate limit for this endpoint      |
| `VALIDATION_ERROR`    | The request data failed validation                      |
| `BLOCKCHAIN_ERROR`    | An error occurred while interacting with the blockchain |

## Pagination

Most endpoints that return lists support pagination using the following query parameters:

- `page`: Page number (starting from 1)
- `perPage`: Number of items per page (default and max values vary by endpoint)

Pagination responses include these standard fields:

- `total`: Total number of items available
- `page`: Current page number
- `perPage`: Number of items per page
- `totalPages`: Total number of pages
- `hasMore`: Boolean indicating if there are more pages

## Further Resources

- [API Reference (OpenAPI Specification)](https://api.beaver.social/docs)
- [SDK Documentation](./typescript-sdk.md)
- [Server API Architecture](./architecture.md)
