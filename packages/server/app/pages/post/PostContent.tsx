import { Image } from "@/shared/components/Image";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Reactions from "@/pages/post/Reactions";
import ImageCarousel from "@/shared/components/MediaCarousel";
import { useState } from "react";
import { useBeaver } from "@beaver/react";
import React from "react";
import moment from "moment";

export default function PostContent({
  post,
  author,
}: {
  post: ReturnType<ReturnType<typeof useBeaver>["post"]["getPostById"]>["data"];
  author: ReturnType<typeof useBeaver>["user"];
}) {
  const [showMore, setShowMore] = useState(false);

  // Format post analytics
  const analytics = {
    likes: post?.likesCount || 0,
    comments: post?.repliesCount || 0,
    reposts: post?.repostsCount || 0,
    shares: post?.sharesCount || 0,
    viewCount: post?.viewCount || 0,
  };

  // Format date in a more readable way
  const formattedDate = post?.createdAt ? moment(post.createdAt).fromNow() : "";
  const mentionedUsers = post?.mentions || [];

  // Create formatted content with clickable mentions
  const formatContentWithMentions = (content: string) => {
    if (!content || !mentionedUsers.length) return content;

    // Split content by spaces to identify words
    const words = content.split(/(\s+)/);

    return words.map((word, index) => {
      // Check if the word starts with @ symbol
      if (word.startsWith("@")) {
        const username = word.substring(1); // Remove the @ symbol
        const mentionedUser = mentionedUsers.find(
          (user) => user.username === username,
        );

        if (mentionedUser) {
          return (
            <React.Fragment key={index}>
              <Link
                to={`/app/profile/${mentionedUser.username}`}
                className="text-sky-500 font-medium hover:underline"
              >
                {word}
              </Link>
            </React.Fragment>
          );
        }
      }

      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-2"
    >
      <div className="flex gap-3 p-4 pb-2">
        <Link to={`/app/profile/${author?.username}`}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
              src={author?.imageUrl || "/images/user.webp"}
              alt={`${author?.fullName}'s avatar`}
              className="size-10 rounded-full border-2 border-primary/20"
            />
          </motion.div>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-1 flex-wrap">
            <Link
              to={`/app/profile/${author?.username}`}
              className="font-semibold hover:text-primary transition-colors"
            >
              {author?.fullName}
            </Link>
            <span className="text-muted-foreground text-sm">
              @{author?.username}
            </span>
            <span className="text-muted-foreground mx-1">·</span>
            <time className="text-muted-foreground text-sm hover:underline">
              {formattedDate}
            </time>
          </div>

          {author?.location && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">{author.location}</span>
            </div>
          )}

          <div className="mt-2">
            <p className="text-sm">
              {post?.content ? formatContentWithMentions(post.content) : null}
            </p>
          </div>

          {/* Post Images */}
          {post?.media && post.media.length > 0 && (
            <div className="w-full mt-3 rounded-lg overflow-hidden">
              <ImageCarousel
                media={post.media || []}
              />
            </div>
          )}

          {/* Post Analytics */}
          <div className="mt-4">
            <Reactions
              analytics={analytics}
              postId={post?.id || 0}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
