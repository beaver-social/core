import Post from "./Post";
import { tryCatch } from "../../utils/tryCatch";

/**
 * Creates a new post.
 * @returns A promise that resolves to the created post.
 */
export async function create(
  this: Post,
  options: {
    content: string;
    media?: Array<any>;
    parentId?: number;
    flags: {
      nsfw: boolean;
      subscriberOnly?: boolean;
    };
  }
) {
  const { apiClient, surface } = this.defaults;
  const { content, media, parentId, flags } = options;

  const payload = JSON.stringify({
    content,
    media: media || [],
    parentId,
    flags,
  });

  const messageBytes = new TextEncoder().encode(payload);

  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`${Post.CREATE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${Post.CREATE_ERROR}: ${signatureResult.error}`);
  }

  return apiClient.content.posts.create.$post({
    json: {
      content,
      media: media || [],
      parentId,
      flags,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Deletes a post.
 * @returns A promise that resolves when the post is deleted.
 */
export async function deletePost(this: Post, options: { id: number }) {
  const { apiClient, surface } = this.defaults;
  const { id } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`${Post.DELETE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${Post.DELETE_ERROR}: ${signatureResult.error}`);
  }

  return apiClient.content.posts.delete[":id"].$post({
    param: { id },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}

/**
 * Updates a post.
 * @returns A promise that resolves to the updated post.
 */
export async function update(
  this: Post,
  options: {
    id: number;
    content: string;
    media: Array<any>;
  }
) {
  const { apiClient, surface } = this.defaults;
  const { id, content, media } = options;

  // Create payload string to sign
  const payload = JSON.stringify({ id, content, media });

  // Convert string to Uint8Array
  const messageBytes = new TextEncoder().encode(payload);

  // Sign the payload using tryCatch
  const signatureResult = await tryCatch(
    surface.signPersonalMessage(messageBytes)
  );

  if (signatureResult.error) {
    this.logger.error(`${Post.UPDATE_ERROR}: ${signatureResult.error}`);
    throw new Error(`${Post.UPDATE_ERROR}: ${signatureResult.error}`);
  }

  return apiClient.content.posts.update[":id"].$post({
    param: { id },
    json: {
      content,
      media,
    },
    query: {
      signature: signatureResult.data.signature,
    },
  });
}
