import Icon from "@/shared/components/Icon";
import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/ImageCarousel";
import { useZkAuthStore } from "@/shared/stores/zustand";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import zkLoginService from "@/shared/lib/zkLoginService";
import { Image } from "@/shared/components/Image";
import Reactions from "@/shared/components/Reactions";

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
  const zkAuthStore = useZkAuthStore();


  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        navigate(`/post/${id}`, { state: { postId: id } });
      }}
      className="block cursor-pointer"
    >
      <article className="flex gap-4 p-4 border-b hover:bg-secondary/50 transition-colors">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
            <Image
              src={avatarUrl}
              alt={username}
              className="w-12 h-12 mt-1 rounded-full"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col overflow-hidden px-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Link
              to={`/profile/${handle}`}
              className="font-semibold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {username}
            </Link>
            <span className="text-grey-500">@{handle}</span>
            <span className="text-grey-500">·</span>
            <time className="text-grey-500 hover:underline">{timestamp}</time>
          </div>

          {/* Post Content */}
          <div className="mt-2 text-md">{content}</div>

          {/* Images if present */}
          <div className="max-w-[32rem]">
            {images && images.length > 0 && (
              <div
                className="mt-4 cursor-default"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ImageCarousel images={images} aspectRatio={aspectRatio} />
              </div>
            )}
          </div>

          <Reactions postId={id} />
        </div>
      </article>
    </div>
  );
}

export default FeedPost;
