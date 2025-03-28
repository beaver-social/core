import Icon from "../../shared/components/Icon";
import { Link } from "react-router";

type FeedPostProps = {
    username: string;
    handle: string;
    timestamp: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
    avatarUrl: string;
};

function FeedPost({
    username,
    handle,
    timestamp,
    content,
    imageUrl,
    likes,
    comments,
    reposts,
    shares,
    avatarUrl,
}: FeedPostProps) {
    return (
        <article className="flex gap-4 p-4 border-b hover:bg-secondary/50 transition-colors">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <Link to={`/profile/${handle}`}>
                    <img
                        src={avatarUrl}
                        alt={username}
                        className="w-12 h-12 rounded-full"
                    />
                </Link>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <Link to={`/profile/${handle}`} className="font-semibold hover:underline">
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

                {/* Image if present */}
                {imageUrl && (
                    <div className="mt-3 bg-primary-100 rounded-xl overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="Post content"
                            className="w-full object-cover"
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4 max-w-md">
                    <button className="flex items-center gap-2 text-hover group">
                        <Icon name="MessageCircle" className="w-5 h-5 group-hover:text-primary" />
                        <span className="text-sm">{comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-hover group">
                        <Icon name="Repeat" className="w-5 h-5 group-hover:text-green-500" />
                        <span className="text-sm">{reposts}</span>
                    </button>
                    <button className="flex items-center gap-2 text-hover group">
                        <Icon name="Heart" className="w-5 h-5 group-hover:text-red-500" />
                        <span className="text-sm">{likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-hover group">
                        <Icon name="Share2" className="w-5 h-5 group-hover:text-primary" />
                        <span className="text-sm">{shares}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default FeedPost; 