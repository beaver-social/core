/**
 * Checks if a user is authorized to modify a post based on their ID.
 * @param userId The ID of the user attempting to modify the post.
 * @param authorId The ID of the post's author.
 * @returns A boolean indicating whether the user can modify the post.
 */
export function canUserModifyPost(userId: number, authorId: number): boolean {
  return userId === authorId;
}

/**
 * Generates pagination parameters based on the provided page and limit.
 * @param page The page number to paginate from.
 * @param limit The number of items per page.
 * @returns An object containing the offset for pagination.
 */
export function getPaginationParams(page: number, limit: number) {
  return {
    offset: (page - 1) * limit,
  };
}

/**
 * Extracts hashtags from the given content string.
 * @param content The string content to extract hashtags from.
 * @returns An array of extracted hashtags without the '#' symbol.
 */
export function extractHashtags(content: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const matches = content.match(hashtagRegex);

  if (!matches) return [];

  return matches.map((tag) => tag.slice(1)); // Remove the # symbol
}

/**
 * Extracts mentions from the given content string.
 * @param content The string content to extract mentions from.
 * @returns An array of extracted mentions without the '@' symbol.
 */
export function extractMentions(content: string): string[] {
  const mentionRegex = /@(\w+)/g;
  const matches = content.match(mentionRegex);

  if (!matches) return [];

  return matches.map((mention) => mention.slice(1)); // Remove the @ symbol
}

/**
 * Validates the provided post content for emptiness and length.
 * @param content The string content to validate.
 * @returns An object indicating if the content is valid and an optional error message.
 */
export function validatePostContent(content: string): {
  valid: boolean;
  message?: string;
} {
  if (!content || content.trim().length === 0) {
    return { valid: false, message: "Post content cannot be empty" };
  }

  if (content.length > 5000) {
    return {
      valid: false,
      message: "Post content exceeds maximum length of 5000 characters",
    };
  }

  return { valid: true };
}

/**
 * Sanitizes the provided post content by removing harmful elements and normalizing it.
 * @param content The string content to sanitize.
 * @returns The sanitized string content.
 */
export function sanitizePostContent(content: string): string {
  // Remove any potentially harmful HTML if not using markdown
  const sanitized = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

  // Normalize line breaks
  const normalized = sanitized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Trim whitespace and limit length (e.g., 5000 chars max)
  return normalized.trim().slice(0, 5000);
}
