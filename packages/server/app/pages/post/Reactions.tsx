import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    postId: number;
    analytics?: {
        likes: number | null;
        comments: number | null;
        reposts: number | null;
        shares: number | null;
    }
    refetchPost: () => void;
}

export default function Reactions(props: Props) {
    const { postId, refetchPost } = props;
    const beaver = useBeaver();
    const user = beaver.user;
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);

    // like post 
    const { data: userPostInteraction, status: userPostInteractionStatus, refetch: refetchUserPostInteraction } = beaver.post.getUserPostInteraction({ id: postId });
    const { mutate: likePost, isPending: isLikePending, isSuccess: isLikeSuccess, isError: isLikeError } = beaver.post.likePost;
    const { mutate: unlikePost, isSuccess: isUnlikeSuccess, isError: isUnlikeError } = beaver.post.unlikePost;

    useEffect(() => {
        if (isLikeSuccess || isUnlikeSuccess) {
            refetchPost();
            refetchUserPostInteraction();
        }

        if (isLikeError || isUnlikeError) {
        }

    }, [isLikeSuccess, isUnlikeSuccess, isLikeError, isUnlikeError]);

    return (
        <div className="flex items-center justify-between">
            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                onClick={(e) => {
                    if (isLikePending) return;

                    if (!user) {
                        toast.error("You must be logged in to like a post");
                        return;
                    }

                    if (userPostInteraction?.hasLiked) {
                        unlikePost({ postId });
                    } else {
                        likePost({ postId });
                    }
                }}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className={`p-1.5 rounded-full group-hover:bg-like ${userPostInteraction?.hasLiked ? "text-like" : ""}`}

                >
                    {isLikePending ? <Icon
                        name="LoaderCircle"
                        className="size-5 animate-spin"
                    /> : <Icon
                        name="Heart"
                        className="size-5 group-hover:text-like transition-colors"
                        fill={userPostInteraction?.hasLiked ? "#ff2681" : "none"}
                    />}
                </motion.div>
                <span className={`text-sm font-medium ${userPostInteraction?.hasLiked ? "text-like" : "text-muted-foreground"} transition-colors`}>{props.analytics?.likes}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-comment"
                    onClick={() => setCommentDialogOpen(true)}
                >
                    <Icon
                        name="MessageSquare"
                        className="size-5 group-hover:text-comment transition-colors"
                    />
                </motion.div>
                <span className="text-sm font-medium group-hover:text-comment transition-colors">{props.analytics?.comments}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-repost"
                >
                    <Icon
                        name="Repeat"
                        className="size-5 group-hover:text-repost transition-colors"
                    />
                </motion.div>
                <span className="text-sm font-medium group-hover:text-repost transition-colors">{props.analytics?.reposts}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-share"
                >
                    <Icon
                        name="Share2"
                        className="size-5 group-hover:text-share transition-colors"
                    />
                </motion.div>
                <span className="text-sm font-medium group-hover:text-share transition-colors">{props.analytics?.shares}</span>
            </motion.button>
        </div >
    )
}
