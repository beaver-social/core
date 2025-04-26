import { useTheme } from "@/shared/context/theme-provider";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function WelcomeSplash({ onComplete }: { onComplete: () => void }) {
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 15 }}
            >
                <motion.div
                    className="relative mb-4"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M60 10C32.4 10 10 32.4 10 60C10 87.6 32.4 110 60 110C87.6 110 110 87.6 110 60C110 32.4 87.6 10 60 10ZM60 95C40.7 95 25 79.3 25 60C25 40.7 40.7 25 60 25C79.3 25 95 40.7 95 60C95 79.3 79.3 95 60 95Z"
                            fill={theme === 'dark' ? '#ffffff' : '#000000'}
                            fillOpacity="0.1"
                        />
                        <motion.path
                            d="M65 40L80 65L60 80L40 65L55 40H65Z"
                            fill={theme === 'dark' ? '#4ca5f9' : '#4ca5f9'}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: 1,
                                fill: [
                                    theme === 'dark' ? '#4ca5f9' : '#4ca5f9',
                                    theme === 'dark' ? '#3f85d3' : '#b9daff',
                                    theme === 'dark' ? '#4ca5f9' : '#4ca5f9'
                                ]
                            }}
                            transition={{
                                pathLength: { duration: 1.5 },
                                opacity: { duration: 0.5 },
                                fill: { duration: 2, repeat: Infinity }
                            }}
                        />
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="45"
                            stroke={theme === 'dark' ? '#ffffff' : '#000000'}
                            strokeWidth="2"
                            strokeOpacity="0.3"
                            strokeDasharray="283"
                            initial={{ strokeDashoffset: 283 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            fill="none"
                        />
                    </svg>
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M20 6L9 17L4 12"
                                stroke={theme === 'dark' ? '#4ca5f9' : '#4ca5f9'}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
                            />
                        </svg>
                    </motion.div>
                </motion.div>

                <motion.h2
                    className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Welcome to Beaver Social!
                </motion.h2>

                <motion.p
                    className="text-muted-foreground text-center max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    Your identity is now connected. Ready to explore the decentralized social experience.
                </motion.p>
            </motion.div>
        </motion.div>
    );
};