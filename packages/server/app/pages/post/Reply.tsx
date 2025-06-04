import { Image } from "@/shared/components/Image";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Reactions from "@/pages/post/Reactions";
import { truncateText } from "@/shared/lib/utils";
import { useState, useEffect } from "react";
import { useBeaver } from "@beaver/react";
import moment from "moment";
import { useNavigate } from "react-router";
import MediaCarousel from "@/shared/components/MediaCarousel";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";

export default function Reply({ id }: { id: number }) {
  const [showMore, setShowMore] = useState(false);
  const beaver = useBeaver();
  const navigate = useNavigate();

  const { data: reply, refetch: refetchReply } = beaver.post.getPostById({
    id: id.toString(),
  });
  const { data: author } = beaver.profile.getProfile({
    value: reply?.authorId?.toString() || "",
    type: "id",
  });

  // Follow functionality
  const { mutate: followUser, isPending: isFollowPending, error: followError } = beaver.social.followUser;
  const { mutate: unfollowUser, isPending: isUnfollowPending, error: unfollowError } = beaver.social.unfollowUser;
  const { data: isFollowingData } = beaver.social.isFollowing({ userId: reply?.authorId });

  // Handle follow errors
  useEffect(() => {
    if (followError) {
      console.error(followError);
      toast.error("Failed to follow user.");
    }
    if (unfollowError) {
      console.error(unfollowError);
      toast.error("Failed to unfollow user.");
    }
  }, [followError, unfollowError]);

  return (
    <motion.div
      onClick={(e) => {
        e.preventDefault();
        navigate(`/app/post/${id}`);
      }}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <Link
          to={`/app/profile/${author?.username}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={author?.imageUrl}
            alt={`${author?.username}'s avatar`}
            className="size-8 rounded-full border-2 border-primary/20"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <Link
              to={`/app/profile/${author?.username}`}
              className="font-semibold hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {author?.fullName}
            </Link>
            <span className="text-muted-foreground text-sm">
              @{author?.username}
            </span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className="text-muted-foreground text-sm hover:underline">
              {moment(reply?.createdAt).fromNow()}
            </span>
            <span className="text-muted-foreground mx-1">·</span>
            {/* Follow button - only show if not the current user */}
            {reply?.authorId !== beaver.user?.id && (
              <Button
                variant="link"
                size="sm"
                disabled={isFollowPending || isUnfollowPending}
                onClick={(e) => {
                  e.stopPropagation();
                  isFollowingData?.following
                    ? unfollowUser({ userId: author?.id })
                    : followUser({ userId: author?.id });
                }}
                className="p-0"
              >
                {isFollowingData?.following ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          <p className="text-sm mt-1">
            {showMore
              ? reply?.content
              : truncateText(reply?.content || "", 150)}
            {reply?.content && reply?.content.length > 150 && (
              <button
                className="text-primary text-sm ml-1 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "See less" : "See more"}
              </button>
            )}
          </p>

          {reply?.media && reply?.media.length > 0 && (
            <div className="w-full max-w-full mt-2 rounded-lg overflow-hidden">
              <div className="relative w-full max-w-sm">
                <MediaCarousel media={reply.media} />
              </div>
            </div>
          )}

          <div className="mt-3">
            <Reactions
              postId={id}
              analytics={reply?.analytics}
              refetchPost={refetchReply}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
