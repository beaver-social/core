import * as mediaSchema from "./media";
import * as postSchema from "./posts";
import * as swipeSchema from "./swipes";
import * as topicSchema from "./topics";

// Convenience exports for common tables
export const { media } = mediaSchema;
export const { posts } = postSchema;
export const { swipes } = swipeSchema;
export const { topics, contentTopics } = topicSchema;
