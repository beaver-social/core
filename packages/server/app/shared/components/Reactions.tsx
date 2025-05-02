import Icon from "@/shared/components/Icon";
// import { useAuth } from "@beaver/react";
import { motion } from "framer-motion";

type Props = {
    analytics: {
        likes: number;
        comments: number;
        reposts: number;
        shares: number;
    }
}

export default function Reactions(props: Props) {
    return (
        <div className="flex items-center justify-between">
            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-like"
                >
                    <Icon
                        name="Heart"
                        className="size-5 group-hover:text-like transition-colors"
                    />
                </motion.div>
                <span className="text-sm font-medium group-hover:text-like transition-colors">{props.analytics.likes}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-comment"
                >
                    <Icon
                        name="BotMessageSquare"
                        className="size-5 group-hover:text-comment transition-colors"
                    />
                </motion.div>
                <span className="text-sm font-medium group-hover:text-comment transition-colors">{props.analytics.comments}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                <span className="text-sm font-medium group-hover:text-repost transition-colors">{props.analytics.reposts}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-muted-foreground group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                <span className="text-sm font-medium group-hover:text-share transition-colors">{props.analytics.shares}</span>
            </motion.button>
        </div>
    )
}