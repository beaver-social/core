import * as post from "./post";
import * as like from "./post";
import * as user from "./user";
import * as action from "./action";
import * as award from "./award";
import * as topic from "./topic";

const schema = {
  ...action,
  ...award,
  ...like,
  ...post,
  ...topic,
  ...user,
};

export default schema;

export type DBSchema = typeof schema;
export type DB = {
  [K in keyof DBSchema as K extends `${infer Base}s`
    ? Base
    : K]: DBSchema[K]["$inferSelect"];
};
