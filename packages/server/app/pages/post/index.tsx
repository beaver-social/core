import { Link, useNavigate, useParams } from "react-router";
import Icon from "@/shared/components/Icon";
import Layout from "@/pages/layout";
import PostContent from "./PostContent";
import ReplyForm from "./ReplyForm";
import { useBeaver } from "@beaver/react";
import SecondaryPanel from "../explore/SecondaryPanel";
import Reply from "./Reply";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { useState, useEffect } from "react";

export default function Post() {
    const { id: postId } = useParams();
    const navigate = useNavigate();
    const beaver = useBeaver();
    const [loading, setLoading] = useState(true);
    const [replies, setReplies] = useState(sampleReplies);

    // Fetch post data
    const { data: post } = beaver.post.getPostById(postId || "1");
    const { data: author } = beaver.profile.getProfileById({
        id: post?.authorId || 1
    });

    console.log({ post, author });

    // Simulate loading state
    useEffect(() => {
        if (post?.id && author?.id) {
            setLoading(false);
        }
    }, [post, author]);

    return (
        <Layout main={
            <div className="flex-1 border-x max-w-2xl mx-auto">
                {/* Post Header */}
                <motion.div
                    className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-4 p-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(-1)}
                            className="hover:bg-primary/10"
                        >
                            <Icon name="ArrowLeft" className="size-5" />
                        </Button>
                        <div>
                            <h2 className="font-semibold text-lg">Post</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="p-4 space-y-4">
                        <div className="flex gap-3">
                            <div className="size-10 rounded-full bg-muted animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                                <div className="h-3 bg-muted rounded w-1/4 animate-pulse"></div>
                                <div className="h-24 bg-muted rounded mt-3 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Main Post */}
                        {(post && author) && <PostContent post={post} author={author} />}

                        {/* Reply Form */}
                        <ReplyForm postId={postId || "1"} userAvatar={author?.imageUrl || "/images/user.webp"} />

                        {/* Replies Section */}
                        <div className="pt-2">
                            <div className="px-4 py-2 border-b">
                                <h3 className="font-semibold text-lg">Replies</h3>
                            </div>
                            <div className="divide-y">
                                {replies.map((reply, index) => (
                                    <Reply key={index} reply={reply} />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* No Replies State */}
                {!loading && replies.length === 0 && (
                    <div className="py-8 text-center">
                        <Icon name="MessageCircle" className="size-12 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">No replies yet</h3>
                        <p className="text-sm text-muted-foreground">Be the first to reply to this post</p>
                    </div>
                )}

                {/* Load More Button */}
                {!loading && replies.length > 0 && (
                    <div className="p-4 flex justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                                // TODO: Implement load more replies logic
                                console.log("Load more replies");
                            }}
                        >
                            Load more replies
                        </Button>
                    </div>
                )}
            </div>
        } secondary={<SecondaryPanel />} />
    );
}

// Sample replies data - you can remove this when you have a real API
const sampleReplies = [
    {
        username: "Jane Smith",
        handle: "janesmith",
        timestamp: "1h",
        content: "This looks amazing! Can't wait to try it out! The visual design is really impressive, and the UX seems very intuitive. Great job on the implementation.",
        likes: 8,
        comments: 2,
        reposts: 1,
        shares: 0,
        avatarUrl: "/images/user.webp"
    },
    {
        username: "Mike Johnson",
        handle: "mikej",
        timestamp: "30m",
        content: "Great work! The UI looks clean and modern. Did you use a specific design system for this? Would love to know more about the tech stack.",
        likes: 5,
        comments: 1,
        reposts: 0,
        shares: 0,
        avatarUrl: "/images/user.webp"
    }
]; 