import { Image } from "@/shared/components/Image";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Reactions from "@/shared/components/Reactions";
import { truncateText } from "@/shared/lib/utils";
import { useState } from "react";
import { useBeaver } from "@beaver/react";
import moment from "moment";

export default function Reply({ id }: {
    id: number
}) {
    const [showMore, setShowMore] = useState(false);
    const beaver = useBeaver();
    const { data: reply, refetch: refetchReply } = beaver.post.getPostById({ id: id.toString() });
    const { data: author } = beaver.profile.getProfile({
        value: reply?.authorId.toString() || "",
        type: "id"
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 hover:bg-secondary/40 transition-colors"
        >
            <div className="flex gap-3">
                <Link to={`/profile/${author?.username}`}>
                    <Image
                        src={author?.imageUrl}
                        alt={`${author?.username}'s avatar`}
                        className="size-8 rounded-full border-2 border-primary/20"
                    />
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
                        <span className="text-muted-foreground text-sm hover:underline">{moment(reply?.createdAt).fromNow()}</span>
                    </div>

                    <p className="text-sm mt-1">
                        {showMore ? reply?.content : truncateText(reply?.content || "", 150)}
                        {reply?.content && reply?.content.length > 150 && (
                            <button
                                className="text-primary text-sm ml-1 hover:underline"
                                onClick={() => setShowMore(!showMore)}
                            >
                                {showMore ? "See less" : "See more"}
                            </button>
                        )}
                    </p>

                    <div className="mt-3">
                        <Reactions postId={id} analytics={reply?.analytics} refetchPost={refetchReply} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}