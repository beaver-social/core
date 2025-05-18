import { useBeaver } from "@beaver/react";
import FeedPost from "@/pages/home/FeedPost";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import { motion } from "framer-motion";
import { useParams } from "react-router";

export default function PostData() {
    const beaver = useBeaver();
    const { username } = useParams();

    const { data: user, isError: userError } = beaver.profile.getProfile({ value: username || "", type: "username" });
    const { data: postArray, fetchNextPage, hasNextPage } = beaver.post.getPosts({ perPage: 10, authorId: user?.id, repliesOnly: true });

    const { infiniteScrollRef } = useInfiniteScroll({
        fetchNextPage,
        hasNextPage,
    });

    return (
        <>
            <div className="divide-y mx-4">
                {postArray?.pages && postArray?.pages.length > 0 ? postArray?.pages.map((page) => page.posts.map((postId, index) => (
                    <FeedPost key={index} postId={postId.id} />
                ))) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-2 border items-center text-grey-500 justify-center p-10 rounded-sm"
                    >
                        <p className="text-sm">No posts found..</p>
                    </motion.div>
                )}

                {hasNextPage && (
                    <div ref={infiniteScrollRef} className="h-1" />
                )}
            </div >
        </>
    )
}