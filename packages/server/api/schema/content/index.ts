import * as mediaSchema from "./media";
import * as postSchema from "./posts";
import * as shortSchema from "./shorts";
import * as topicSchema from "./topics";

// Convenience exports for common tables
export const { media } = mediaSchema;
export const { posts } = postSchema;
export const { shorts } = shortSchema;
export const { topics, contentTopics } = topicSchema;
