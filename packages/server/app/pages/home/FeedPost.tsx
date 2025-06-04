import { Link, useNavigate } from "react-router";
import { Image } from "@/shared/components/Image";
import Reactions from "@/pages/post/Reactions";
import { motion } from "framer-motion";
import { truncateText } from "@/shared/lib/utils";
import { useState, useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import moment from "moment";
import MediaCarousel from "@/shared/components/MediaCarousel";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { FeedPostMenu } from "./FeedPostMenu";
import { toast } from "sonner";

function FeedPost({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState("");

  const beaver = useBeaver();
  const {
    data: post,
    isLoading: postLoading,
  } = beaver.post.getPostById({ id: postId });
  const {
    data: author,
    isLoading: userLoading,
  } = beaver.profile.getProfile({
    value: post?.authorId.toString() || "",
    type: "id",
  });
  const { mutateAsync: replyToPost, isPending: isReplyPending } = beaver.post.createPost;
  const { mutate: followUser, isPending: isFollowPending, error: followError, isSuccess: followSuccess } = beaver.social.followUser;
  const { mutate: unfollowUser, isPending: isUnfollowPending, error: unfollowError, isSuccess: unfollowSuccess } = beaver.social.unfollowUser;
  const { data: isFollowingData } = beaver.social.isFollowing({ userId: post?.authorId });

  useEffect(() => {
    if (followError) {
      console.error(followError);
      toast.error("Failed to follow user.");
    }
  }, [followError]);

  const isLoading = postLoading || userLoading;

  // Skeleton loader
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col m-6 overflow-hidden transition-all duration-300 border rounded-sm shadow-sm bg-secondary sm:mx-0">
          {/* Header skeleton */}
          <div className="flex items-center gap-3 p-4 pb-2">
            <Skeleton className="rounded-full size-8" />
            <div className="flex flex-col w-full gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="w-16 h-3" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="px-4 pt-1 pb-3">
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </div>

          {/* Media skeleton */}
          <Skeleton className="w-full h-56 rounded-none" />

          {/* Actions skeleton */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-16 h-4" />
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
      className="transition-all cursor-pointer sm:hover:rounded-sm"
      onClick={() => {
        navigate(`/app/post/${postId}`, { state: { postId } });
      }}
    >
      {post?.media && post?.media.length > 0 ? (
        <motion.article
          className="flex flex-col p-6 transition-all duration-300 rounded-sm hover:bg-secondary/50 sm:px-4 sm:mx-0"
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
                    className="border-2 rounded-full size-8 border-primary/20"
                  />
                </Link>
              </motion.div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-1">
                  <Link
                    to={`/app/profile/${author?.username}`}
                    className="font-semibold transition-colors hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {author?.username}
                  </Link>
                  <span className="mx-1 text-muted-foreground">·</span>
                  <time className="text-sm text-muted-foreground hover:underline">
                    {moment(post?.createdAt).fromNow()}
                  </time>
                  <span className="mx-1 text-muted-foreground">·</span>
                  {/* Follow button */}
                  {post?.authorId !== beaver.user?.id && (
                    <Button
                      variant="link"
                      size="sm"
                      disabled={isFollowPending || isUnfollowPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        isFollowingData?.following ? unfollowUser({ userId: author?.id }) : followUser({ userId: author?.id })
                      }}
                      className="p-0"
                    >
                      {isFollowingData?.following ? "Following" : "Follow"}
                    </Button>
                  )}
                </div>
                {post?.location && (
                  <div className="flex items-center gap-1 text-muted-foreground ">
                    <span className="text-xs">{post?.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <FeedPostMenu post={post} author={author} />
            </div>
          </div>

          {/* Images if present */}
          <div
            className="w-full mt-4 overflow-hidden rounded-sm cursor-default"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MediaCarousel media={post?.media} />
          </div>

          {/* Post Actions */}
          <div className="mt-2">
            <div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
              <Reactions
                postId={postId}
                analytics={post?.analytics}
              />
            </div>
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
                    className="text-sm transition-colors text-muted-foreground hover:text-primary"
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
            <button
              onClick={() => {
                navigate(`/app/post/${postId}`, { state: { postId: postId } });
              }}
              className="text-sm transition-colors hover:text-primary text-muted-foreground"
            >
              View all {post?.analytics.comments} replies
            </button>

            {/* add a comment box */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await replyToPost({
                  content: reply,
                  parentId: postId,
                });
                toast.success("Reply sent!");
                setReply("");
              }}
              className="relative mt-2"
            >
              <Input
                placeholder="Reply to post"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button
                variant="ghost"
                className="absolute top-0 right-0 hover:bg-transparent hover:text-primary"
                disabled={reply.length === 0 || isReplyPending}
              >
                {isReplyPending ? (
                  <Icon name="LoaderCircle" className="size-4 animate-spin" />
                ) : (
                  <Icon name="SendHorizontal" className="size-4" />
                )}
              </Button>
            </form>
          </div>
        </motion.article>
      ) : (
        <motion.article
          className="relative flex flex-col m-6 overflow-hidden transition-all border rounded-sm shadow-sm bg-secondary hover:shadow-md hover:bg-grey-900 sm:mx-0"
          onClick={(e) => {
            navigate(`/app/post/${postId}`, { state: { postId } });
          }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Header with Avatar */}
          <div
            className="flex items-center justify-between p-4 pb-2"
          >
            <div className="flex items-center gap-3">
              <div
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
                    className="border-2 rounded-full size-8 border-primary/20"
                  />
                </Link>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-1">
                  <Link
                    to={`/app/profile/${author?.username}`}
                    className="font-semibold transition-colors hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {author?.username}
                  </Link>
                  <span className="mx-1 text-muted-foreground">·</span>
                  <time className="text-sm text-muted-foreground hover:underline">
                    {moment(post?.createdAt).fromNow()}
                  </time>
                  <span className="mx-1 text-muted-foreground">·</span>
                  {/* Follow button */}
                  {post?.authorId !== beaver.user?.id && (
                    <Button
                      variant="link"
                      size="sm"
                      disabled={isFollowPending || isUnfollowPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        isFollowingData?.following ? unfollowUser({ userId: author?.id }) : followUser({ userId: author?.id })
                      }}
                      className="p-0"
                    >
                      {isFollowingData?.following ? "Following" : "Follow"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <FeedPostMenu post={post} author={author} />
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pt-1 pb-3">
            <p className="text-sm">{post?.content}</p>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-border">
            <div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
              <Reactions
                postId={postId}
                analytics={post?.analytics}
              />
            </div>
          </div>
        </motion.article>
      )}
    </motion.div>
  );
}

export default FeedPost;
