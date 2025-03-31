import * as post from "./post";
import * as like from "./post";
import * as user from "./user";
import * as reply from "./reply";

const schema = {
    ...user,
    ...post,
    ...like,
    ...reply
};

export default schema;

export type DBSchema = typeof schema;
export type DB = {
    [K in keyof DBSchema as K extends `${infer Base}s` ? Base : K]: DBSchema[K]["$inferSelect"];
};
