import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/ImageCarousel";
import { Image } from "@/shared/components/Image";
import Reactions from "@/shared/components/Reactions";
import { motion } from "framer-motion";
import { truncateText } from "@/shared/lib/utils";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";

type FeedPostProps = {
  id: string;
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  location?: string;
  images?: string[];
  aspectRatio: "square" | "portrait";
  avatarUrl: string;
  topReply?: {
    id: string;
    handle: string;
    content: string;
    timestamp: string;
    username: string;
    avatarUrl: string;
  };
  analytics: {
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
  };
};

function FeedPost({
  id,
  username,
  handle,
  timestamp,
  content,
  images,
  aspectRatio,
  avatarUrl,
  location,
  topReply,
  analytics,
}: FeedPostProps) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-6 pb-6"
    >
      {images && images.length > 0 ? (
        <motion.article
          className="flex flex-col rounded-sm transition-all duration-300 mx-6 sm:mx-0"
          whileTap={{ scale: 0.99 }}
        >
          {/* Header with Avatar */}
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
                <Image
                  src={avatarUrl}
                  alt={username}
                  className="size-8 rounded-full border-2 border-primary/20"
                />
              </Link>
            </motion.div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 flex-wrap">
                <Link
                  to={`/profile/${handle}`}
                  className="font-semibold hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {username}
                </Link>
                <span className="text-muted-foreground text-sm">@{handle}</span>
                <span className="text-muted-foreground mx-1">·</span>
                <time className="text-muted-foreground text-sm hover:underline">{timestamp}</time>
              </div>
              {location && (
                <div className="flex items-center gap-1 text-muted-foreground ">
                  <span className="text-xs">{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Images if present */}
          {images && images.length > 0 && (
            <div
              className="w-full rounded-sm overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ImageCarousel images={images} aspectRatio={aspectRatio} />
            </div>
          )}

          {/* Post Actions */}
          <div className="mt-2">
            <motion.div
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <Reactions analytics={analytics} />
            </motion.div>
          </div>

          {/* Post Content */}
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-semibold">{handle} </span>
              <span>{showMore ? content : truncateText(content, 50)} </span>
              {content.length > 50 && (
                <span>
                  <button className="text-muted-foreground text-sm hover:text-primary transition-colors" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "See less" : "more"}
                  </button>
                </span>
              )}
            </p>
          </div>

          {/* View / Post Comments */}
          <div className="mt-3">
            {topReply && (
              <button onClick={() => {
                navigate(`/post/${id}/replies/${topReply.id}`, { state: { postId: id } });
              }} className="text-sm text-muted-foreground">
                <span className="font-semibold">{topReply.handle}</span> {truncateText(topReply.content, 50)}
              </button>
            )}
            <br />
            <button onClick={() => {
              navigate(`/post/${id}`, { state: { postId: id } });
            }
            } className="text-sm hover:text-primary transition-colors text-muted-foreground">
              View all {analytics.comments} replies
            </button>

            {/* add a comment box */}
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log({ reply });
            }} className="mt-2 relative">
              <Input placeholder="Reply to post" value={reply} onChange={(e) => setReply(e.target.value)} />
              {reply.length > 0 && (
                <Button variant="ghost" className="absolute right-0 top-0 hover:bg-transparent hover:text-primary">
                  <Icon name="SendHorizontal" className="size-4" />
                </Button>
              )}
            </form>

          </div>
        </motion.article>
      ) : (
        <motion.article
          className="flex flex-col rounded-sm overflow-hidden bg-secondary shadow-sm hover:shadow-md transition-all duration-300 border mx-6 sm:mx-0"
          whileTap={{ scale: 0.99 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/post/${id}`, { state: { postId: id } });
          }}
        >
          {/* Header with Avatar */}
          <div className="flex items-center gap-3 p-4 pb-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
                <Image
                  src={avatarUrl}
                  alt={username}
                  className="size-8 rounded-full border-2 border-primary/20"
                />
              </Link>
            </motion.div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 flex-wrap">
                <Link
                  to={`/profile/${handle}`}
                  className="font-semibold hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {username}
                </Link>
                <span className="text-muted-foreground text-sm">@{handle}</span>
                <span className="text-muted-foreground mx-1">·</span>
                <time className="text-muted-foreground text-sm hover:underline">{timestamp}</time>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pt-1 pb-3">
            <p className="text-sm">{content}</p>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-border">
            <motion.div
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <Reactions analytics={analytics} />
            </motion.div>
          </div>
        </motion.article>
      )
      }
    </motion.div >
  );
}

export default FeedPost;
