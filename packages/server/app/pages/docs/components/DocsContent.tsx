import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import Icon from "@/shared/components/Icon";
import { docItems, docSections } from "../data";
import AnimatedCodeBlock from "./AnimatedCodeBlock";
import { generateDocContent } from "../utils";
import { useBeaver } from "@beaver/react";

export default function DocsContent() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the current doc ID from the URL path
    const currentPath = location.pathname;
    const selectedDoc = currentPath.split("/").pop() || "installation";

    // Find the current document and section
    const currentItem = docItems.find(item => item.id === selectedDoc);
    const currentSection = docSections.find(section => section.id === currentItem?.parentId);

    // Track scroll progress for a progress indicator
    const [scrollProgress, setScrollProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    // State for storing the loaded HTML content
    const [content, setContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const beaver = useBeaver();
    const { data } = beaver.docs({
        title: "5_server_api.md",
    });

    // Load documentation content when the selected doc changes
    useEffect(() => {
        setIsLoading(true);

        if (!data) {
            setIsLoading(false);
            return;
        }

        // Load the documentation
        generateDocContent(selectedDoc, data?.content)
            .then(htmlContent => {
                setContent(htmlContent);
            })
            .catch(error => {
                console.error("Error loading documentation:", error);
                setContent(`
                    <h2>Documentation Error</h2>
                    <p>We're sorry, but there was an error loading the documentation for "${selectedDoc}".</p>
                    <p>Please try another topic from the navigation menu.</p>
                `);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedDoc, data]);

    // Find related documents in the same section
    const relatedDocs = docItems
        .filter(item =>
            item.id !== selectedDoc &&
            item.parentId === currentItem?.parentId
        )
        .slice(0, 2);

    // Find next and previous documents for navigation
    const allDocsFlattened = docSections.flatMap(section =>
        docItems
            .filter(item => item.parentId === section.id)
            .map(item => ({ ...item, sectionTitle: section.title }))
    );

    const currentIndex = allDocsFlattened.findIndex(item => item.id === selectedDoc);
    const prevDoc = currentIndex > 0 ? allDocsFlattened[currentIndex - 1] : null;
    const nextDoc = currentIndex < allDocsFlattened.length - 1 ? allDocsFlattened[currentIndex + 1] : null;

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

    // Scroll to top when changing documents
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedDoc]);

    return (
        <div className="py-8" ref={contentRef}>
            {/* Progress indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-500/50 z-50"
                style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
            />

            <div className="mb-8">
                {currentItem && currentSection && (
                    <>
                        <div className="flex flex-wrap gap-2 text-sm text-zinc-500 mb-4">
                            <button
                                onClick={() => navigate('/docs')}
                                className="hover:text-zinc-300 transition-colors"
                            >
                                Documentation
                            </button>
                            <span>/</span>
                            <span className="text-zinc-400">{currentSection.title}</span>
                            <span>/</span>
                            <span className="text-zinc-300">{currentItem.title}</span>
                        </div>

                        <motion.h1
                            className="text-3xl sm:text-4xl font-bold mb-4 text-zinc-100"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentItem.title}
                        </motion.h1>
                        <motion.div
                            className="text-zinc-400 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Icon name={currentSection.icon} className="h-4 w-4 text-blue-400" />
                            {currentSection.description}
                        </motion.div>
                    </>
                )}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <motion.div
                    className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-a:text-blue-400 prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-code:text-amber-400 prose-strong:text-zinc-200 prose-em:text-zinc-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    key={selectedDoc} // Remount on doc change
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )}

            {/* Next/Previous Navigation */}
            <motion.div
                className="mt-16 border-t border-zinc-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                {prevDoc && (
                    <motion.button
                        className="p-4 border border-zinc-800 hover:border-zinc-700 rounded-lg flex items-start gap-3 text-left group"
                        whileHover={{ y: -2, borderColor: 'rgb(59, 130, 246, 0.5)' }}
                        onClick={() => navigate(`/docs/${prevDoc.id}`)}
                    >
                        <Icon name="ArrowLeft" className="h-5 w-5 mt-0.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                        <div>
                            <div className="text-sm text-zinc-500 mb-1">Previous</div>
                            <div className="font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">{prevDoc.title}</div>
                            <div className="text-xs text-zinc-500 mt-1">{prevDoc.sectionTitle}</div>
                        </div>
                    </motion.button>
                )}

                {nextDoc && (
                    <motion.button
                        className="p-4 border border-zinc-800 hover:border-zinc-700 rounded-lg flex items-start gap-3 text-left md:ml-auto group"
                        whileHover={{ y: -2, borderColor: 'rgb(59, 130, 246, 0.5)' }}
                        onClick={() => navigate(`/docs/${nextDoc.id}`)}
                    >
                        <div className="flex-1">
                            <div className="text-sm text-zinc-500 mb-1">Next</div>
                            <div className="font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">{nextDoc.title}</div>
                            <div className="text-xs text-zinc-500 mt-1">{nextDoc.sectionTitle}</div>
                        </div>
                        <Icon name="ArrowRight" className="h-5 w-5 mt-0.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                    </motion.button>
                )}
            </motion.div>

            {/* Related docs section */}
            {relatedDocs.length > 0 && (
                <motion.div
                    className="mt-12 border-t border-zinc-800 pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <h3 className="text-xl font-bold mb-4 text-zinc-100">Related Documentation</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {relatedDocs.map((item, i) => (
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
            )}

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