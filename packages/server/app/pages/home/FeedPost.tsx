import Icon from "@/shared/components/Icon";
import { Link } from "react-router";
import ImageCarousel from "@/shared/components/ImageCarousel";

type FeedPostProps = {
    id: string;
    username: string;
    handle: string;
    timestamp: string;
    content: string;
    images?: string[];
    aspectRatio: 'square' | 'portrait';
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
    likes,
    comments,
    reposts,
    shares,
    avatarUrl,
}: FeedPostProps) {
    return (
        <Link to={`/post/${id}`} className="block">
            <article className="flex gap-4 p-4 border-b hover:bg-secondary/50 transition-colors">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={avatarUrl}
                            alt={username}
                            className="w-12 h-12 rounded-full"
                        />
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                        <Link to={`/profile/${handle}`} className="font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                            {username}
                        </Link>
                        <span className="text-grey-500">@{handle}</span>
                        <span className="text-grey-500">·</span>
                        <time className="text-grey-500 hover:underline">{timestamp}</time>
                    </div>

                    {/* Post Content */}
                    <div className="mt-2 text-sm">
                        {content}
                    </div>

                    {/* Images if present */}
                    {images && images.length > 0 && (
                        <div className="mt-3 cursor-default" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}>
                            <ImageCarousel images={images} aspectRatio={aspectRatio} />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-6 mt-4">
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
                            <Icon name="MessageCircle" className="w-5 h-5 group-hover:text-primary" />
                            <span className="text-sm">{comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
                            <Icon name="Repeat" className="w-5 h-5 group-hover:text-green-500" />
                            <span className="text-sm">{reposts}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
                            <Icon name="Heart" className="w-5 h-5 group-hover:text-red-500" />
                            <span className="text-sm">{likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
                            <Icon name="Share2" className="w-5 h-5 group-hover:text-primary" />
                            <span className="text-sm">{shares}</span>
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default FeedPost; 