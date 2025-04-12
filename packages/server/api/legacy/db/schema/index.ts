import * as user from "./user";
import * as post from "./post";
import * as like from "./like";
import * as reply from "./reply";
import * as action from "./action";

const schema = {
  ...user,
  ...post,
  ...like,
  ...reply,
  ...action,
};

export default schema;

export type DBSchema = typeof schema;
export type DB = {
  [K in keyof DBSchema as K extends `${infer Base}s`
    ? Base
    : K]: DBSchema[K]["$inferSelect"];
};
