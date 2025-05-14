import { useState } from "react";
import { Image } from "@/shared/components/Image";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";

export default function ReplyForm({
    postId,
    authorId,
    userAvatar = "/images/user.webp"
}: {
    postId: string;
    authorId?: string;
    userAvatar?: string;
}) {
    const [reply, setReply] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim()) return;

        // TODO: Implement reply submission logic
        console.log({ postId, reply });

        // Reset form
        setReply("");
    };

    return (
        <div className="flex gap-3 p-4 border-t border-b">
            <Image
                src={userAvatar}
                alt="Your avatar"
                className="size-8 rounded-full border-2 border-primary/20"
            />
            <form onSubmit={handleSubmit} className="flex-1">
                <Input
                    placeholder="Post your reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="bg-transparent border-none focus-visible:ring-0 text-sm p-0 h-auto min-h-[40px]"
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
                            disabled={!reply.trim()}
                            className="rounded-full"
                        >
                            Reply
                        </Button>
                    </motion.div>
                </div>
            </form>
        </div>
    );
} 