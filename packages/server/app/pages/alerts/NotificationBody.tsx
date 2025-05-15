import Icon from "@/shared/components/Icon";
import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/MediaCarousel";
import { Image } from "@/shared/components/Image";

export default function NotificationBody({
    id,
    username,
    handle,
    timestamp,
    content,
    images,
    aspectRatio,
    avatarUrl,
    type,
}: any) {
    const navigate = useNavigate();

    return (
        <div onClick={
            (e) => {
                e.preventDefault();
                navigate(`/post/${id}`, { state: { postId: id } });
            }
        } className="block cursor-pointer">
            <article className="flex gap-4 p-4 border-b hover:bg-secondary/50 transition-colors">
                {/* Avatar */}
                <div className="flex-shrink-0 mt-3">
                    <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
                        {type === "reply" ? (
                            <Icon name="Reply" className="text-primary-500" />
                        ) : type === "like" ? (
                            <Icon name="Heart" className="text-primary-500" />
                        ) : type === "repost" ? (
                            <Icon name="Repeat2" className="text-primary-500" />
                        ) : type === "mention" ? (
                            <Icon name="AtSign" className="text-primary-500" />
                        ) : type === "message" ? (
                            <Icon name="MessageSquare" className="text-primary-500" />
                        ) : (
                            <Icon name="Sparkle" className="text-primary-500" />
                        )
                        }
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                src={avatarUrl}
                                alt={username}
                                className="size-12 rounded-full"
                            />
                            <Link to={`/profile/${handle}`} className="font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                                {username}
                            </Link>
                            <span className="text-grey-500">·</span>
                            <time className="text-grey-500 hover:underline">{timestamp}</time>
                        </div>

                        <Icon name="Ellipsis" className="text-grey-500" />
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
                </div>
            </article>
        </div>
    );
}