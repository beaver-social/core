import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/ImageCarousel";
import { useZkAuthStore } from "@/shared/stores/zustand";
import { Image } from "@/shared/components/Image";
import Reactions from "@/shared/components/Reactions";
import { motion } from "framer-motion";

type FeedPostProps = {
  id: string;
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  images?: string[];
  aspectRatio: "square" | "portrait";
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
  avatarUrl: string;
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
}: FeedPostProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-8"
    >
      <motion.article
        className="flex flex-col rounded-sm overflow-hidden bg-secondary shadow-sm hover:shadow-md transition-all duration-300 dark:border dark:border-border mx-6 sm:mx-0"
        whileTap={{ scale: 0.99 }}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/post/${id}`, { state: { postId: id } });
        }}
      >
        {/* Header with Avatar */}
        <div className="flex items-start gap-3 p-4 pb-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
              <Image
                src={avatarUrl}
                alt={username}
                className="w-10 h-10 rounded-full border-2 border-primary/20"
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
          <p className="text-md leading-relaxed">{content}</p>
        </div>

        {/* Images if present */}
        {images && images.length > 0 && (
          <div
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ImageCarousel images={images} aspectRatio={aspectRatio} />
          </div>
        )}

        {/* Post Actions */}
        <div className="px-4 py-3 border-t border-border bg-secondary">
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <Reactions postId={id} />
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default FeedPost;
