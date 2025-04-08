import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { users } from "../user/users";

export const spaces = table(
  "spaces",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    name: t.text().notNull(),
    description: t.text(),
    avatarUrl: t.text("avatar_url"),
    bannerUrl: t.text("banner_url"),
    ownerId: t
      .int("owner_id")
      .notNull()
      .references(() => users.id),
    isPrivate: t.int("is_private", { mode: "boolean" }).default(false),
    requiresApproval: t
      .int("requires_approval", { mode: "boolean" })
      .default(false),
    tags: t.text(), // JSON string array of tags
    memberCount: t.int("member_count").default(0),
    isDeleted: t.int("is_deleted", { mode: "boolean" }).default(false),
    ...timestamps,
  },
  (table) => [
    t.index("owner_idx").on(table.ownerId),
    t.index("space_name_idx").on(table.name),
  ]
);

export const spaceMembers = table(
  "space_members",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    spaceId: t
      .int("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: t.text().notNull().default("member"), // member, moderator, admin
    joinedAt: t
      .int("joined_at")
      .notNull()
      .$default(() => Date.now()),
    isMuted: t.int("is_muted", { mode: "boolean" }).default(false),
    isBanned: t.int("is_banned", { mode: "boolean" }).default(false),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("space_user_idx").on(table.spaceId, table.userId),
    t.index("space_member_idx").on(table.spaceId),
    t.index("user_member_idx").on(table.userId),
  ]
);

export const spaceRules = table(
  "space_rules",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    spaceId: t
      .int("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    title: t.text().notNull(),
    description: t.text(),
    ...timestamps,
  },
  (table) => [t.index("space_rules_idx").on(table.spaceId)]
);

export const joinRequests = table(
  "join_requests",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    spaceId: t
      .int("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: t.text().notNull().default("pending"), // pending, approved, rejected
    requestedAt: t
      .int("requested_at")
      .notNull()
      .$default(() => Date.now()),
    responseAt: t.int("response_at"),
    responderId: t.int("responder_id").references(() => users.id),
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("space_user_request_idx").on(table.spaceId, table.userId),
    t.index("space_request_idx").on(table.spaceId),
  ]
);

export const spaceEvents = table(
  "space_events",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    spaceId: t
      .int("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    creatorId: t
      .int("creator_id")
      .notNull()
      .references(() => users.id),
    title: t.text().notNull(),
    description: t.text(),
    startTime: t.int("start_time").notNull(),
    endTime: t.int("end_time"),
    location: t.text(), // Can be online or physical
    isDeleted: t.int("is_deleted", { mode: "boolean" }).default(false),
    ...timestamps,
  },
  (table) => [
    t.index("space_events_idx").on(table.spaceId),
    t.index("creator_events_idx").on(table.creatorId),
  ]
);

export const eventRsvps = table(
  "event_rsvps",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    eventId: t
      .int("event_id")
      .notNull()
      .references(() => spaceEvents.id, { onDelete: "cascade" }),
    userId: t
      .int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: t.text().notNull().default("going"), // going, interested, not going
    ...timestamps,
  },
  (table) => [
    t.uniqueIndex("event_user_idx").on(table.eventId, table.userId),
    t.index("event_rsvp_idx").on(table.eventId),
    t.index("user_rsvp_idx").on(table.userId),
  ]
);
