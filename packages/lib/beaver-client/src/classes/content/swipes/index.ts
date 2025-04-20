import Swipe from "./Swipe";
import * as retrievalMethods from "./retrieval";
import * as managementMethods from "./management";
import * as interactionMethods from "./interactions";
import * as moderationMethods from "./moderation";

// Add retrieval methods to Swipe prototype
Object.assign(Swipe.prototype, retrievalMethods);

// Add management methods to Swipe prototype
Object.assign(Swipe.prototype, managementMethods);

// Add interaction methods to Swipe prototype
Object.assign(Swipe.prototype, interactionMethods);

// Add moderation methods to Swipe prototype
Object.assign(Swipe.prototype, moderationMethods);

// Rename delete_ to delete to match original API
Object.defineProperty(Swipe.prototype, "delete", {
  value: managementMethods.delete_,
});

export default Swipe;
