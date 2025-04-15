import { z } from "zod";
import { zSwipeMedia } from "../../lib/zod/helpers";
import { verifyChallenge } from "../auth/helpers";
import db from "../../schema/db";
import * as contentSchema from "../../schema/content";
import { processAndUploadVideo } from "./helpers";

export async function createSwipe(
  data: {
    caption: string;
    hashtags: string[];
    mentions: string[];
    media: z.infer<typeof zSwipeMedia>;
    parentId?: number;
    flags: {
      nsfw: boolean;
      subscriberOnly?: boolean;
    };
  },
  options: {
    userId: number;
    signature: string;
  }
): Promise<number> {
  // verify challenge
  await verifyChallenge(
    JSON.stringify(data),
    options.userId,
    options.signature
  );

  // create swipe
  const swipe = await db
    .insert(contentSchema.swipes)
    .values({
      authorId: options.userId,
      caption: data.caption,
      tags: data.hashtags.join(","),
      mentions: data.mentions.join(","),
      parentId: data.parentId,
      nsfw: data.flags.nsfw,
      subscriberOnly: data.flags.subscriberOnly,
    })
    .returning({ id: contentSchema.swipes.id });

  const { videoUrl, thumbnailUrl } = await processAndUploadVideo(
    data.media.buffer
  );

  // create media
  await db.insert(contentSchema.media).values({
    contentId: swipe[0].id, // swipe id
    contentTypeId: 1, // swipe
    url: videoUrl, // media url
    type: "video", // media type
    thumbnailUrl: data.media.thumbnailUrl || thumbnailUrl, // thumbnail url
    duration: data.media.duration, // duration
    width: data.media.width, // width
    height: data.media.height, // height
    altText: data.media.altText, // alt text
  });

  return swipe[0].id;
}
