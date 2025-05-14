import { Image } from "@/shared/components/Image";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Reactions from "@/shared/components/Reactions";
import { truncateText } from "@/shared/lib/utils";
import { useState } from "react";

export default function Reply({ reply }: {
    reply: any
}) {
    const [showMore, setShowMore] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 hover:bg-secondary/40 transition-colors"
        >
            <div className="flex gap-3">
                <Link to={`/profile/${reply.handle}`}>
                    <Image
                        src={reply.avatarUrl}
                        alt={`${reply.username}'s avatar`}
                        className="size-8 rounded-full border-2 border-primary/20"
                    />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-1 flex-wrap">
                        <Link
                            to={`/profile/${reply.handle}`}
                            className="font-semibold hover:text-primary transition-colors"
                        >
                            {reply.username}
                        </Link>
                        <span className="text-muted-foreground text-sm">@{reply.handle}</span>
                        <span className="text-muted-foreground mx-1">·</span>
                        <time className="text-muted-foreground text-sm hover:underline">{reply.timestamp}</time>
                    </div>

                    <p className="text-sm mt-1">
                        {showMore ? reply.content : truncateText(reply.content, 150)}
                        {reply.content.length > 150 && (
                            <button
                                className="text-primary text-sm ml-1 hover:underline"
                                onClick={() => setShowMore(!showMore)}
                            >
                                {showMore ? "See less" : "See more"}
                            </button>
                        )}
                    </p>

                    <div className="mt-3">
                        <Reactions analytics={{
                            likes: reply.likes || 0,
                            comments: reply.comments || 0,
                            reposts: reply.reposts || 0,
                            shares: reply.shares || 0
                        }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}