import Icon from "@/shared/components/Icon";
import { useAuth } from "@beaver/react";
import { motion } from "framer-motion";

type Props = {
    postId: string;
}

const samplePostAnalytics = {
    id: "1",
    likes: 10,
    comments: 5,
    reposts: 2,
    shares: 1,
}

export default function Reactions(props: Props) {
    return (
        <div className="flex items-center justify-between mt-2">
            <motion.button
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-rose-100 dark:group-hover:bg-rose-950/30"
                >
                    <Icon
                        name="Heart"
                        className="w-4 h-4 group-hover:text-rose-500 transition-colors"
                    />
                </motion.div>
                <span className="text-xs font-medium group-hover:text-rose-500 transition-colors">{samplePostAnalytics.likes}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/30"
                >
                    <Icon
                        name="BotMessageSquare"
                        className="w-4 h-4 group-hover:text-emerald-500 transition-colors"
                    />
                </motion.div>
                <span className="text-xs font-medium group-hover:text-emerald-500 transition-colors">{samplePostAnalytics.comments}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-sky-100 dark:group-hover:bg-sky-950/30"
                >
                    <Icon
                        name="Repeat"
                        className="w-4 h-4 group-hover:text-sky-500 transition-colors"
                    />
                </motion.div>
                <span className="text-xs font-medium group-hover:text-sky-500 transition-colors">{samplePostAnalytics.reposts}</span>
            </motion.button>

            <motion.button
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    className="p-1.5 rounded-full group-hover:bg-amber-100 dark:group-hover:bg-amber-950/30"
                >
                    <Icon
                        name="Share2"
                        className="w-4 h-4 group-hover:text-amber-500 transition-colors"
                    />
                </motion.div>
                <span className="text-xs font-medium group-hover:text-amber-500 transition-colors">{samplePostAnalytics.shares}</span>
            </motion.button>
        </div>
    )
}