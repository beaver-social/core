import { Link, useNavigate } from "react-router";
import { Image } from "@/shared/components/Image";
import Reactions from "@/pages/post/Reactions";
import { motion } from "framer-motion";
import { truncateText } from "@/shared/lib/utils";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import moment from "moment";
import MediaCarousel from "@/shared/components/MediaCarousel";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { FeedPostMenu } from "./FeedPostMenu";

function FeedPost({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState("");

  const beaver = useBeaver();
  const {
    mutate: upgradePost,
    isPending: isUpgrading,
    isSuccess: isUpgraded,
  } = beaver.post.upgradePost;
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
    isSuccess: postSuccess,
    refetch: refetchPost,
  } = beaver.post.getPostById({ id: postId });
  const {
    data: author,
    isLoading: userLoading,
    isError: userError,
    isSuccess: userSuccess,
  } = beaver.profile.getProfile({
    value: post?.authorId.toString() || "",
    type: "id",
  });

  const isLoading = postLoading || userLoading;

  // Skeleton loader
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mb-6 pb-6"
      >
        <div className="flex flex-col rounded-sm overflow-hidden bg-secondary shadow-sm transition-all duration-300 border mx-6 sm:mx-0">
          {/* Header skeleton */}
          <div className="flex items-center gap-3 p-4 pb-2">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="px-4 pt-1 pb-3">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Media skeleton */}
          <Skeleton className="w-full h-56 rounded-none" />

          {/* Actions skeleton */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-6 pb-6"
    >
      {post?.media && post?.media.length > 0 ? (
        <motion.article
          className="flex flex-col rounded-sm transition-all duration-300 mx-6 sm:mx-0"
          whileTap={{ scale: 0.99 }}
        >
          {/* Header with Avatar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Link
                  to={`/app/profile/${author?.username}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={author?.imageUrl}
                    alt={author?.username}
                    className="size-8 rounded-full border-2 border-primary/20"
                  />
                </Link>
              </motion.div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 flex-wrap">
                  <Link
                    to={`/app/profile/${author?.username}`}
                    className="font-semibold hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {author?.username}
                  </Link>
                  <span className="text-muted-foreground text-sm">
                    @{author?.username}
                  </span>
                  <span className="text-muted-foreground mx-1">·</span>
                  <time className="text-muted-foreground text-sm hover:underline">
                    {moment(post?.createdAt).fromNow()}
                  </time>
                </div>
                {post?.location && (
                  <div className="flex items-center gap-1 text-muted-foreground ">
                    <span className="text-xs">{post?.location}</span>
                  </div>
                )}
              </div>
            </div>

            <FeedPostMenu post={post} author={author} />
          </div>

          {/* Images if present */}
          {post?.media && post?.media.length > 0 && (
            <div
              className="w-full rounded-sm overflow-hidden mt-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MediaCarousel media={post?.media} />
            </div>
          )}

          {/* Post Actions */}
          <div className="mt-2">
            <motion.div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
              <Reactions
                postId={postId}
                analytics={post?.analytics}
                refetchPost={refetchPost}
              />
            </motion.div>
          </div>

          {/* Post Content */}
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-semibold">{author?.username} </span>
              <span>
                {showMore ? post?.content : truncateText(post?.content, 50)}{" "}
              </span>
              {post?.content.length > 50 && (
                <span>
                  <button
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "See less" : "more"}
                  </button>
                </span>
              )}
            </p>
          </div>

          {/* View / Post Comments */}
          <div className="mt-3">
            {/* {topReply && (
              <button onClick={() => {
                navigate(`/app/post/${postId}/replies/${topReply.id}`, { state: { postId: postId } });
              }} className="text-sm text-muted-foreground">
                <span className="font-semibold">{topReply.handle}</span> {truncateText(topReply.content, 50)}
              </button>
            )} */}
            <button
              onClick={() => {
                navigate(`/app/post/${postId}`, { state: { postId: postId } });
              }}
              className="text-sm hover:text-primary transition-colors text-muted-foreground"
            >
              View all {post?.analytics.comments} replies
            </button>

            {/* add a comment box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-2 relative"
            >
              <Input
                placeholder="Reply to post"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 hover:bg-transparent hover:text-primary"
                disabled={reply.length === 0}
              >
                <Icon name="SendHorizontal" className="size-4" />
              </Button>
            </form>
          </div>
        </motion.article>
      ) : (
        <motion.article
          className="flex flex-col rounded-sm overflow-hidden bg-secondary shadow-sm hover:shadow-md transition-all duration-300 border mx-6 sm:mx-0 relative"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/app/post/${postId}`, { state: { postId } });
          }}
        >
          {/* Header with Avatar */}
          <div
            className="flex items-center justify-between p-4 pb-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Link
                  to={`/app/profile/${author?.username}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={author?.imageUrl}
                    alt={author?.username}
                    className="size-8 rounded-full border-2 border-primary/20"
                  />
                </Link>
              </motion.div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 flex-wrap">
                  <Link
                    to={`/app/profile/${author?.username}`}
                    className="font-semibold hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {author?.username}
                  </Link>
                  <span className="text-muted-foreground text-sm">
                    @{author?.username}
                  </span>
                  <span className="text-muted-foreground mx-1">·</span>
                  <time className="text-muted-foreground text-sm hover:underline">
                    {moment(post?.createdAt).fromNow()}
                  </time>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {beaver.user?.id === author?.id && (
                <motion.button
                  className="rounded-sm bg-zinc-800/20 p-2 text-md text-white hover:bg-zinc-800/40 border border-zinc-700/50 hover:border-purple-400/50 font-semibold flex gap-2 items-center transition-all"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    upgradePost({ id: postId });
                  }}
                  disabled={isUpgrading}
                >
                  {isUpgraded ? (
                    <Icon name="Check" className="size-4 text-blue-400" />
                  ) : (
                    <p className="text-transparent text-sm bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {isUpgrading ? (
                        <Icon
                          name="LoaderCircle"
                          className="size-4 animate-spin"
                        />
                      ) : (
                        "Upgrade"
                      )}
                    </p>
                  )}
                </motion.button>
              )}
              <FeedPostMenu post={post} author={author} />
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pt-1 pb-3">
            <p className="text-sm">{post?.content}</p>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-border">
            <motion.div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
              <Reactions
                postId={postId}
                analytics={post?.analytics}
                refetchPost={refetchPost}
              />
            </motion.div>
          </div>
        </motion.article>
      )}
    </motion.div>
  );
}

export default FeedPost;
