import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { useNavigate } from "react-router";

interface CreatePostSuccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    type: "post" | "swipe";
}

export default function CreatePostSuccessDialog({
    isOpen,
    onClose,
    type
}: CreatePostSuccessDialogProps) {
    const navigate = useNavigate();
    const [animationComplete, setAnimationComplete] = useState(false);

    // Reset animation state when dialog closes
    useEffect(() => {
        if (!isOpen) {
            setAnimationComplete(false);
        }
    }, [isOpen]);

    // Animation logic
    useEffect(() => {
        if (isOpen) {
            // Start animation sequence
            const timer = setTimeout(() => {
                setAnimationComplete(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleViewPost = () => {
        onClose();
        // Navigate to the home page or post detail
        navigate("/");
    };

    const handleCreateAnother = () => {
        onClose();
        // The dialog will close, keeping user on the create page
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
                <div className="p-6 text-center">
                    <AnimatePresence mode="wait">
                        {!animationComplete ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-6"
                            >
                                <Icon name="LoaderCircle" className="size-12 animate-spin" />
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                    className="mt-4 text-lg font-medium"
                                >
                                    {type === "post" ? "Publishing your post" : "Publishing your short"}
                                </motion.p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center py-6"
                            >
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1.2, 1],
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                            times: [0, 0.6, 1]
                                        }
                                    }}
                                    className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4"
                                >
                                    <Icon name="CircleCheck" className="size-10" />
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                    className="text-xl font-bold mb-2"
                                >
                                    Published Successfully
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                                    className="text-muted-foreground mb-6"
                                >
                                    {type === "post"
                                        ? "Your post has been successfully published"
                                        : "Your short has been successfully published"}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                    className="flex flex-col sm:flex-row gap-3 w-full"
                                >
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={handleCreateAnother}
                                    >
                                        Create Another
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={handleViewPost}
                                    >
                                        View Post
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
