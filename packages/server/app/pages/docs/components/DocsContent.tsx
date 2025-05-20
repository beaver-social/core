import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import Icon from "@/shared/components/Icon";
import { docItems, docSections } from "../data";
import AnimatedCodeBlock from "./AnimatedCodeBlock";
import { generateDocContent } from "../utils";

export default function DocsContent() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the current doc ID from the URL path
    const currentPath = location.pathname;
    const selectedDoc = currentPath.split("/").pop() || "installation";

    // Generate sample markdown content based on selected doc
    const content = generateDocContent(selectedDoc);

    // Track scroll progress for a progress indicator
    const [scrollProgress, setScrollProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;

            const scrollTop = window.scrollY;
            const scrollHeight = contentRef.current.scrollHeight;
            const clientHeight = window.innerHeight;

            const progress = scrollTop / (scrollHeight - clientHeight);
            setScrollProgress(Math.min(Math.max(progress, 0), 1));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="container py-8 max-w-none" ref={contentRef}>
            {/* Progress indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-500/50 z-50"
                style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
            />

            <div className="mb-8">
                {docItems.find(item => item.id === selectedDoc) && (
                    <>
                        <motion.h1
                            className="text-3xl sm:text-4xl font-bold mb-4 text-zinc-100"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {docItems.find(item => item.id === selectedDoc)?.title}
                        </motion.h1>
                        <motion.div
                            className="text-zinc-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {docSections.find(
                                section => section.id === docItems.find(item => item.id === selectedDoc)?.parentId
                            )?.description}
                        </motion.div>
                    </>
                )}
            </div>

            <motion.div
                className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-a:text-blue-400 prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-code:text-amber-400 prose-strong:text-zinc-200 prose-em:text-zinc-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={selectedDoc} // Remount on doc change
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Interactive demo section */}
            {selectedDoc === "quick-start" && (
                <motion.div
                    className="mt-12 border border-zinc-800 rounded-lg p-6 bg-zinc-900/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <h3 className="text-xl font-bold mb-4 text-zinc-100">Interactive Demo</h3>
                    <p className="mb-6 text-zinc-300">Try out the Beaver Social SDK with this interactive example:</p>

                    <AnimatedCodeBlock
                        language="tsx"
                        delay={0.3}
                        code={`import { useBeaver } from '@beaver/react';
import { useState } from 'react';

function UserDemo() {
    const beaver = useBeaver();
    const [userId, setUserId] = useState("");
    const { data: user, isLoading, error } = beaver.useUser(userId);
    
    return (
        <div className="p-4 border rounded">
            <input 
                type="text" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
            />
            
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {user && (
                <div>
                    <h2>{user.name}</h2>
                    <p>@{user.username}</p>
                    <p>{user.bio}</p>
                </div>
            )}
        </div>
    );
}`}
                    />

                    <div className="flex gap-4 mt-6">
                        <motion.button
                            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-md font-medium text-blue-400"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Run Demo
                        </motion.button>

                        <motion.button
                            className="px-4 py-2 border border-zinc-800 hover:border-zinc-700 rounded-md font-medium text-zinc-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Full Code
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Related docs section */}
            <motion.div
                className="mt-12 border-t border-zinc-800 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <h3 className="text-xl font-bold mb-4 text-zinc-100">Related Documentation</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {docItems
                        .filter(item =>
                            item.id !== selectedDoc &&
                            item.parentId === docItems.find(i => i.id === selectedDoc)?.parentId
                        )
                        .slice(0, 2)
                        .map((item, i) => (
                            <motion.div
                                key={item.id}
                                className="p-4 border border-zinc-800 hover:border-zinc-700 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer"
                                whileHover={{ y: -2 }}
                                onClick={() => navigate(`/docs/${item.id}`)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                            >
                                <h4 className="font-bold text-zinc-100">{item.title}</h4>
                                <p className="text-sm text-zinc-400">
                                    Continue your learning journey
                                </p>
                            </motion.div>
                        ))}
                </div>
            </motion.div>

            {/* Feedback section */}
            <motion.div
                className="mt-12 border-t border-zinc-800 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                <h3 className="text-xl font-bold mb-4 text-zinc-100">Was this helpful?</h3>
                <div className="flex gap-3">
                    <motion.button
                        className="px-4 py-2 border border-zinc-800 hover:border-zinc-700 rounded-md flex items-center gap-2 text-zinc-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon name="ThumbsUp" className="h-4 w-4" />
                        Yes
                    </motion.button>
                    <motion.button
                        className="px-4 py-2 border border-zinc-800 hover:border-zinc-700 rounded-md flex items-center gap-2 text-zinc-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon name="ThumbsDown" className="h-4 w-4" />
                        No
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
} 