import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AnimatedCTA() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
            <motion.div
                className="relative overflow-hidden rounded-3xl bg-zinc-900/80 border border-zinc-800/50 p-8 md:p-16 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Animated background elements */}
                <motion.div
                    className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute top-1/2 right-1/3 h-32 w-32 -translate-y-1/2 rounded-full bg-blue-600/10 blur-xl"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Main content */}
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Ready to transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">web3 social experience</span>?
                        </motion.h2>

                        <motion.p
                            className="text-lg text-zinc-400 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Join thousands of developers building the future of decentralized social networks with our powerful SDK.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <motion.button
                                className="inline-flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700/50 px-6 py-3 text-sm font-medium hover:border-zinc-600/50"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Get Started</span> <ArrowRight className="ml-2 h-4 w-4 text-blue-400" />
                            </motion.button>

                            <motion.button
                                className="inline-flex items-center justify-center rounded-full border border-zinc-800/80 bg-transparent px-6 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-300 hover:border-zinc-700/50"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View Documentation
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Animated SVG */}
                    <motion.div
                        className="flex h-64 w-64 items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <svg viewBox="0 0 200 200" className="h-full w-full text-zinc-600/50">
                            <defs>
                                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
                                    <stop offset="50%" stopColor="#818CF8" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>

                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                                fill="none"
                                stroke="url(#circleGradient)"
                                strokeWidth="1.5"
                                d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
                            />

                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 0.8,
                                }}
                                fill="none"
                                stroke="url(#circleGradient)"
                                strokeWidth="1.5"
                                d="M100,40 C130,40 160,70 160,100 C160,130 130,160 100,160 C70,160 40,130 40,100 C40,70 70,40 100,40 Z"
                            />

                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 1.1,
                                }}
                                fill="none"
                                stroke="url(#circleGradient)"
                                strokeWidth="1.5"
                                d="M100,60 C120,60 140,80 140,100 C140,120 120,140 100,140 C80,140 60,120 60,100 C60,80 80,60 100,60 Z"
                            />

                            <motion.circle
                                cx="100"
                                cy="100"
                                r="8"
                                fill="#818CF8"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                    delay: 1.4,
                                }}
                            />

                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.5 }}
                                fill="#60A5FA"
                                d="M160,95 L180,100 L160,105 Z"
                            />

                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.5 }}
                                fill="#60A5FA"
                                d="M40,95 L20,100 L40,105 Z"
                            />

                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.5 }}
                                fill="#A78BFA"
                                d="M95,40 L100,20 L105,40 Z"
                            />

                            <motion.path
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.5 }}
                                fill="#A78BFA"
                                d="M95,160 L100,180 L105,160 Z"
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
} 