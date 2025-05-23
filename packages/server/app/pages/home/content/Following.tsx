import ConnectIdentity from "@/shared/components/ConnectIdentity";
import FeedPost from "../FeedPost";
import { useBeaver } from "@beaver/react";
import { motion } from "framer-motion";

type Props = {};

export default function Following({}: Props) {
  const beaver = useBeaver();
  const { data: followingPosts, isLoading } = beaver.post.getFollowingPosts({
    page: 1,
    perPage: 10,
  });

  return (
    <div className="divide-y">
      {beaver.user ? (
        followingPosts?.posts && followingPosts.posts.length > 0 ? (
          followingPosts.posts.map((post, index) => (
            <FeedPost key={index} postId={post.id} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 border items-center text-grey-500 justify-center p-10 rounded-sm"
          >
            <p className="text-sm">Follow more users to see their posts..</p>
          </motion.div>
        )
      ) : (
        <div className="flex flex-col gap-2 border items-center text-grey-500 justify-center p-10 rounded-sm">
          <p className="text-sm">Connect identity to continue..</p>
          <ConnectIdentity />
        </div>
      )}
    </div>
  );
}
