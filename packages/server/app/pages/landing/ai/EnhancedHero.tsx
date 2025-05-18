import * as React from "react";
import { motion } from "framer-motion";

// Animated code snippet component
const AnimatedCodeSnippet = () => {
    return (
        <motion.div
            className="relative hidden md:block w-full max-w-lg rounded-xl bg-zinc-900/70 p-4 font-mono text-sm shadow-xl backdrop-blur-md border border-zinc-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            <div className="mb-2 flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-zinc-500">BeaverSDK.jsx</div>
            </div>
            <pre className="text-xs sm:text-sm overflow-x-auto">
                <code className="language-javascript text-zinc-300">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                        className="block"
                    >
                        <span className="text-rose-400">import</span>{" "}
                        <span className="text-teal-300">{"{"}</span>{" "}
                        <span className="text-amber-300">BeaverSocial</span>{" "}
                        <span className="text-teal-300">{"}"}</span>{" "}
                        <span className="text-rose-400">from</span>{" "}
                        <span className="text-green-300">'@beaver/react'</span>;
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.3 }}
                        className="block mt-4"
                    >
                        <span className="text-rose-400">const</span>{" "}
                        <span className="text-blue-300">App</span>{" "}
                        <span className="text-zinc-300">=</span>{" "}
                        <span className="text-amber-300">()</span>{" "}
                        <span className="text-zinc-300">=&gt;</span>{" "}
                        <span className="text-teal-300">{"{"}</span>
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.3 }}
                        className="block ml-4"
                    >
                        <span className="text-rose-400">return</span>{" "}
                        <span className="text-teal-300">(</span>
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.3 }}
                        className="block ml-8"
                    >
                        <span className="text-blue-400">&lt;</span>
                        <span className="text-amber-300">BeaverSocial</span>{" "}
                        <span className="text-rose-400">config</span>
                        <span className="text-zinc-300">=</span>
                        <span className="text-teal-300">{"{"}</span>{" "}
                        <span className="text-orange-300">...</span>
                        <span className="text-teal-300">{"}"}</span>{" "}
                        <span className="text-blue-400">&gt;</span>
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.0, duration: 0.3 }}
                        className="block ml-12"
                    >
                        <span className="text-blue-400">&lt;</span>
                        <span className="text-amber-300">Feed</span>{" "}
                        <span className="text-rose-400">aiEnhanced</span>
                        <span className="text-zinc-300">=</span>
                        <span className="text-green-300">{"{true}"}</span>
                        <span className="text-blue-400"> /&gt;</span>
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.3, duration: 0.3 }}
                        className="block ml-8"
                    >
                        <span className="text-blue-400">&lt;/</span>
                        <span className="text-amber-300">BeaverSocial</span>
                        <span className="text-blue-400">&gt;</span>
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.6, duration: 0.3 }}
                        className="block ml-4"
                    >
                        <span className="text-teal-300">)</span>;
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.9, duration: 0.3 }}
                        className="block"
                    >
                        <span className="text-teal-300">{"}"}</span>;
                    </motion.span>
                </code>
            </pre>
        </motion.div>
    );
};

export function EnhancedHero() {
    return (
        <section className="container relative mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4 py-16 md:py-28">
            {/* Left side - Text content */}
            <div className="flex flex-col max-w-xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="text-zinc-100">Simplify your </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            web3
                        </span>
                        <span className="text-zinc-100"> social experience</span>
                    </h1>
                    <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
                        AI-driven SDK that streamlines your decentralized social applications.
                        Build, connect, and scale — all with just a few lines of code.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="mt-8 flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <motion.button
                        className="rounded-full bg-zinc-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 border border-zinc-700/50"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Get Started
                        </span>
                    </motion.button>

                    <motion.button
                        className="rounded-full px-6 py-2.5 text-sm font-medium text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        View Demo
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="mt-12 grid grid-cols-3 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">99%</span>
                        <span className="text-sm text-zinc-500">Performance</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">10x</span>
                        <span className="text-sm text-zinc-500">Faster Dev</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">24/7</span>
                        <span className="text-sm text-zinc-500">Support</span>
                    </div>
                </motion.div>
            </div>

            {/* Right side - Code snippet */}
            <AnimatedCodeSnippet />

            {/* Floating graphic elements */}
            <motion.div
                className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-purple-700/10 blur-3xl"
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-10 left-1/4 h-20 w-20 rounded-full bg-indigo-700/20 blur-2xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </section>
    );
} 