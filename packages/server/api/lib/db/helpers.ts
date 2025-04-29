import { customType, integer } from "drizzle-orm/sqlite-core";
import { isValidSuiAddress, normalizeSuiAddress } from "@mysten/sui/utils";
import { eq } from "drizzle-orm";
import schema from "./schema";
import dbClient from "./client";

export const timestamps = {
  createdAt: integer()
    .notNull()
    .$default(() => Date.now()),
  deletedAt: integer(),
};

export const suiAddressType = customType<{
  data: string;
  driverData: string;
}>({
  dataType() {
    return "text";
  },
  toDriver(value) {
    if (!isValidSuiAddress(value)) {
      throw new Error(`Invalid Sui address: ${value}`);
    }
    return normalizeSuiAddress(value);
  },
  fromDriver(value) {
    return value;
  },
});

export const dbExtensionHelpers = {
  async getUserById(id: number) {
    const [user] = await dbClient
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return user;
  },

  async getUserByAddress(address: string) {
    const [user] = await dbClient
      .select()
      .from(schema.users)
      .where(eq(schema.users.address, address))
      .limit(1);

    return user;
  },

  async getUserByUsername(username: string) {
    const [user] = await dbClient
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);

    return user;
  },

  async getPostById(id: number) {
    const [post] = await dbClient
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);

    return post;
  },

  async ensureTopicId(tag: string) {
    const [topic] = await dbClient
      .select()
      .from(schema.topics)
      .where(eq(schema.topics.tag, tag))
      .limit(1);

    if (!topic) {
      let [newTopic] = await dbClient
        .insert(schema.topics)
        .values({ tag })
        .returning();
      return newTopic.id;
    }

    return topic.id;
  },
};
