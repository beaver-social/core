import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { Progress } from "@/shared/components/ui/progress";
import { useBeaver } from "@beaver/react";
import moment from "moment";

export default function PostsDemo() {
  const beaver = useBeaver();
  const isAuthenticated = beaver.wallet.isAuthenticated;
  const {
    data: postArray,
    fetchNextPage,
    hasNextPage,
    refetch: refetchPosts,
  } = beaver.post.getPosts({ perPage: 2 });
  const {
    mutateAsync: createPost,
    isPending: isCreating,
    isSuccess: isCreatedPost,
  } = beaver.post.createPost;

  const [newPostContent, setNewPostContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      await createPost({
        content: newPostContent,
        media: [],
        location: "",
        parentId: null,
        reposting: null,
        nsfw: false,
        subscriberOnly: false,
      });

      refetchPosts();

      // Reset form
      setTimeout(() => {
        setNewPostContent("");
      }, 500);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">Posts</h2>
        <p className="text-muted-foreground mt-1">
          Create and interact with posts
        </p>
      </div>

      {isAuthenticated ? (
        <div className="space-y-4 border border-gray-200 rounded-lg p-3 md:p-4">
          <h3 className="text-lg font-medium">Create a New Post</h3>
          <div className="relative">
            <Textarea
              placeholder="What's happening?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full resize-none min-h-[80px] md:min-h-[100px]"
              disabled={isCreating}
              ref={textareaRef}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {newPostContent.length} / 280
            </div>
          </div>

          <div className="flex justify-end items-center">
            <Button
              variant="outline"
              onClick={handleCreatePost}
              disabled={isCreating || !newPostContent.trim()}
              className="rounded-full px-3 md:px-6 font-medium text-sm md:text-base"
            >
              {isCreating ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-center border text-grey-600 border-grey-800 rounded-sm p-4">
          <Icon name="Lock" className="size-6" />
          <h3 className="text-sm text-center font-medium">
            Login to create a post
          </h3>
        </div>
      )}

      <div className="space-y-4">
        {postArray?.pages && postArray?.pages.length > 0 ? (
          postArray.pages.map((page) =>
            page.posts.map((post) => (
              <PostCard key={post.id} postId={post.id} />
            )),
          )
        ) : (
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
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

function PostCard({ postId }: { postId: number }) {
  const beaver = useBeaver();
  const {
    data: post,
    isLoading: postLoading,
    refetch: refetchPost,
  } = beaver.post.getPostById({ id: postId.toString() });
  const { data: author, isLoading: authorLoading } = beaver.profile.getProfile({
    type: "id",
    value: post?.authorId.toString() || "",
  });
  const {
    data: interaction,
    isLoading: interactionLoading,
    refetch: refetchInteraction,
  } = beaver.post.getUserPostInteraction({ id: postId });
  const { mutate: likePost, isSuccess: likeSuccess } = beaver.post.likePost;
  const { mutate: unlikePost, isSuccess: unlikeSuccess } =
    beaver.post.unlikePost;

  const handleLikeToggle = (postId: number) => {
    if (interaction?.hasLiked) {
      unlikePost({ postId });
    } else {
      likePost({ postId });
    }
  };

  useEffect(() => {
    refetchInteraction();
    refetchPost();
  }, [likeSuccess, unlikeSuccess]);

  return (
    <motion.div
      key={post?.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2 md:mr-3">
            <Icon name="User" className="size-4 md:size-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base">
              @{author?.username || "user"}
            </h3>
            <span className="text-muted-foreground text-xs">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>

      <p className="mb-3 text-sm md:text-base">{post?.content}</p>

      <Button
        variant="secondary"
        size="sm"
        className={`flex items-center gap-1 md:gap-2 ${interaction?.hasLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-muted-foreground"}`}
        onClick={() => handleLikeToggle(post?.id || 0)}
      >
        <Icon
          name={interaction?.hasLiked ? "Heart" : "HeartHandshake"}
          className="size-3.5 md:size-4"
        />
        <span className="text-xs">{post?.likesCount || 0}</span>
      </Button>
    </motion.div>
  );
}
