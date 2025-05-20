import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "@/shared/components/Icon";
import { docItems, docSections } from "../data";
import AnimatedCodeBlock from "./AnimatedCodeBlock";
import { generateDocContent } from "../utils";

type DocsContentProps = {
    selectedDoc: string;
};

export default function DocsContent({ selectedDoc }: DocsContentProps) {
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
        <div className="container py-6 max-w-4xl" ref={contentRef}>
            {/* Progress indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary/50 z-50"
                style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
            />

            <div className="mb-8">
                {docItems.find(item => item.id === selectedDoc) && (
                    <>
                        <motion.h1
                            className="text-3xl sm:text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {docItems.find(item => item.id === selectedDoc)?.title}
                        </motion.h1>
                        <motion.div
                            className="text-muted-foreground"
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
                className="prose prose-neutral dark:prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={selectedDoc} // Remount on doc change
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Interactive demo section */}
            {selectedDoc === "quick-start" && (
                <motion.div
                    className="mt-12 border rounded-lg p-6 bg-secondary/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
                    <p className="mb-6">Try out the Beaver Social SDK with this interactive example:</p>

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
                            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-md font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Run Demo
                        </motion.button>

                        <motion.button
                            className="px-4 py-2 border rounded-md font-medium"
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
                className="mt-12 border-t pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <h3 className="text-xl font-bold mb-4">Related Documentation</h3>
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
                                className="p-4 border rounded-lg hover:bg-secondary/10 cursor-pointer"
                                whileHover={{ y: -2 }}
                                onClick={() => window.location.hash = `#${item.id}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                            >
                                <h4 className="font-bold">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    Continue your learning journey
                                </p>
                            </motion.div>
                        ))}
                </div>
            </motion.div>

            {/* Feedback section */}
            <motion.div
                className="mt-12 border-t pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                <h3 className="text-xl font-bold mb-4">Was this helpful?</h3>
                <div className="flex gap-3">
                    <motion.button
                        className="px-4 py-2 border rounded-md flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon name="ThumbsUp" className="h-4 w-4" />
                        Yes
                    </motion.button>
                    <motion.button
                        className="px-4 py-2 border rounded-md flex items-center gap-2"
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