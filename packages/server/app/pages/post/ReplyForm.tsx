import { useEffect, useState } from "react";
import { Image } from "@/shared/components/Image";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { Textarea } from "@/shared/components/ui/textarea";
import { useBeaver } from "@beaver/react";
import { toast } from "sonner";

export default function ReplyForm({
  postId,
  refetchReplies,
}: {
  postId: string | undefined;
  refetchReplies: () => void;
}) {
  const [content, setContent] = useState("");
  const beaver = useBeaver();
  const user = beaver.user;
  const {
    mutate: createPost,
    isSuccess,
    isError,
    isPending,
  } = beaver.post.createPost;

  useEffect(() => {
    if (isSuccess) {
      refetchReplies();
      setContent("");
    }

    if (isError) {
      toast.error("Failed to post reply..");
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    if (!postId) {
      toast.error("Parent not found");
      return;
    }

    createPost({
      content,
      parentId: parseInt(postId),
      media: [],
    });
  };

  return (
    <div className="flex gap-3 p-4 border-t border-b">
      <Image
        src={user?.imageUrl || "/images/user.webp"}
        alt="Your avatar"
        className="size-8 rounded-full border-2 border-primary/20"
      />
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        className="flex-1"
      >
        <Textarea
          placeholder="Post your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm p-4"
          rows={2}
        />
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10"
            >
              <Icon name="Image" className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10"
            >
              <Icon name="Smile" className="size-4" />
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              size="sm"
              disabled={!content.trim()}
              className="rounded-sm"
            >
              {isPending ? (
                <Icon name="LoaderCircle" className="size-4 animate-spin" />
              ) : (
                "Post"
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
