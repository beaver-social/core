import { Image } from "@/shared/components/Image";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Reactions from "@/shared/components/Reactions";
import ImageCarousel from "@/shared/components/ImageCarousel";
import { truncateText } from "@/shared/lib/utils";
import { useState } from "react";
import moment from "moment";
import { useBeaver } from "@beaver/react"

export default function PostContent({ post, author }: {
    post: ReturnType<ReturnType<typeof useBeaver>["post"]["getPostById"]>["data"],
    author: ReturnType<typeof useBeaver>["user"]
}) {
    const [showMore, setShowMore] = useState(false);
    const hasImages = post?.media && post.media.length > 0;

    const samplePost = {
        "id": 5,
        "authorId": 2,
        "content": "kartik is @ishtails",
        "nsfw": false,
        "suiAddress": null,
        "parentId": null,
        "reposting": null,
        "viewCount": 0,
        "likesCount": 0,
        "repliesCount": 0,
        "repostsCount": 0,
        "sharesCount": 0,
        "actionId": 6,
        "subscriberOnly": false,
        "createdAt": 1747239146753,
        "deletedAt": null,
        "mentions": {
            "data": [
                {
                    "userId": 2,
                    "username": "ishtails"
                }
            ],
            "error": null
        }
    }

    // Format post analytics
    const analytics = {
        likes: post?.likesCount || 0,
        comments: post?.repliesCount || 0,
        reposts: post?.repostsCount || 0,
        shares: post?.sharesCount || 0,
        viewCount: post?.viewCount || 0
    };

    // Format date in a more readable way
    const formattedDate = post?.createdAt ? moment(post.createdAt).format("MMM D") : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2"
        >
            <div className="flex gap-3 p-4 pb-2">
                <Link to={`/profile/${author?.username}`}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Image
                            src={author?.imageUrl || "/images/user.webp"}
                            alt={`${author?.fullName}'s avatar`}
                            className="size-10 rounded-full border-2 border-primary/20"
                        />
                    </motion.div>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-1 flex-wrap">
                        <Link
                            to={`/profile/${author?.username}`}
                            className="font-semibold hover:text-primary transition-colors"
                        >
                            {author?.fullName}
                        </Link>
                        <span className="text-muted-foreground text-sm">@{author?.username}</span>
                        <span className="text-muted-foreground mx-1">·</span>
                        <time className="text-muted-foreground text-sm hover:underline">
                            {formattedDate}
                        </time>
                    </div>

                    {author?.location && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-xs">{author.location}</span>
                        </div>
                    )}

                    <div className="mt-2">
                        <p className="text-sm">
                            {showMore ? post?.content : truncateText(post?.content || "", 280)}
                            {post?.content && post.content.length > 280 && (
                                <button
                                    className="text-primary text-sm ml-1 hover:underline"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? "See less" : "See more"}
                                </button>
                            )}
                        </p>
                    </div>

                    {/* Post Images */}
                    {hasImages && (
                        <div className="w-full mt-3 rounded-lg overflow-hidden">
                            <ImageCarousel
                                images={post.media}
                                aspectRatio={post.aspectRatio || "portrait"}
                            />
                        </div>
                    )}

                    {/* Single image fallback */}
                    {!hasImages && post?.imageUrl && (
                        <div className="mt-3">
                            <Image
                                src={post.imageUrl}
                                alt="Post image"
                                className="w-full rounded-lg max-h-[500px] object-cover"
                            />
                        </div>
                    )}

                    {/* Post Analytics */}
                    <div className="mt-4">
                        <Reactions analytics={analytics} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}