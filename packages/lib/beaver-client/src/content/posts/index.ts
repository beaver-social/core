import Post from "./Post";
import * as retrievalMethods from "./retrieval";
import * as managementMethods from "./management";
import * as interactionMethods from "./interactions";
import * as moderationMethods from "./moderation";

// Add retrieval methods to Post prototype
Object.assign(Post.prototype, retrievalMethods);

// Add management methods to Post prototype
Object.assign(Post.prototype, managementMethods);

// Add interaction methods to Post prototype
Object.assign(Post.prototype, interactionMethods);

// Add moderation methods to Post prototype
Object.assign(Post.prototype, moderationMethods);

// Rename deletePost to delete to match original API
Object.defineProperty(Post.prototype, "delete", {
  value: managementMethods.deletePost,
});

export default Post;
