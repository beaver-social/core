import User from "./User";
import * as retrievalMethods from "./retrieval";
import * as managementMethods from "./management";

// Add retrieval methods to User prototype
Object.assign(User.prototype, retrievalMethods);

// Add management methods to User prototype
Object.assign(User.prototype, managementMethods);

export default User;
