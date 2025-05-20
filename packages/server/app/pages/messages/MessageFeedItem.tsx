import Icon from "@/shared/components/Icon";
import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/MediaCarousel";
import { Image } from "@/shared/components/Image";

export default function FeedItem({
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
                navigate(`/app/messages/${handle}-ishtails`, { state: { postId: id } });
            }
        } className="block cursor-pointer">
            <article className="flex gap-4 p-4 border-b hover:bg-secondary/50 transition-colors">
                {/* Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center">
                        <Image
                            src={avatarUrl}
                            alt={username}
                            className="size-12 rounded-full"
                        />
                        <div className="ml-3 flex-1 text-sm">
                            <div className="flex items-center gap-2">
                                <Link to={`/profile/${handle}`} className="font-semibold hover:underline text-base" onClick={(e) => e.stopPropagation()}>
                                    {username}
                                </Link>
                                <span className="text-grey-500">@{handle}</span>
                                <span className="text-grey-500">·</span>
                                <time className="text-grey-500 hover:underline">{timestamp}</time>
                            </div>
                            <div className="text-grey-400">
                                {content}
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}


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