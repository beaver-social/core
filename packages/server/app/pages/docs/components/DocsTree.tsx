import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import Icon from "@/shared/components/Icon";
import { docSections, docItems } from "../data";

type DocsTreeProps = {
    className?: string;
};

export default function DocsTree({
    className = "",
}: DocsTreeProps) {
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Extract the current doc ID from the URL path
    const currentPath = location.pathname;
    const selectedDoc = currentPath.split("/").pop() || "installation";

    // Find the current section for better highlighting
    const currentSection = docItems.find(item => item.id === selectedDoc)?.parentId || "";

    // Expand the section containing the current doc
    useEffect(() => {
        const currentItem = docItems.find(item => item.id === selectedDoc);
        if (currentItem && !expandedSections.includes(currentItem.parentId)) {
            setExpandedSections(prev => [...prev, currentItem.parentId]);
        }
    }, [selectedDoc]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    return (
        <div className={`overflow-auto px-2 py-4 ${className}`}>
            {docSections.map((section) => {
                const isActive = section.id === currentSection;

                return (
                    <div key={section.id} className="mb-4">
                        <motion.button
                            onClick={() => toggleSection(section.id)}
                            className={`flex items-center justify-between w-full text-left p-2 hover:bg-zinc-800/50 rounded-lg transition-colors ${isActive ? "bg-zinc-800/30" : ""
                                }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-md ${isActive ? "bg-blue-500/20" : "bg-zinc-800/50"}`}>
                                    <Icon
                                        name={section.icon}
                                        className={`size-4 ${isActive ? "text-blue-400" : "text-zinc-400"}`}
                                    />
                                </div>
                                <span className={`font-medium ${isActive ? "text-blue-300" : "text-zinc-300"}`}>
                                    {section.title}
                                </span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icon
                                    name="ChevronDown"
                                    className={`size-4 ${isActive ? "text-blue-400" : "text-zinc-400"}`}
                                />
                            </motion.div>
                        </motion.button>

                        <AnimatePresence>
                            {expandedSections.includes(section.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-8 pr-2 py-2 space-y-1">
                                        {docItems
                                            .filter((item) => item.parentId === section.id)
                                            .map((item) => {
                                                const isSelected = selectedDoc === item.id;

                                                return (
                                                    <Link
                                                        key={item.id}
                                                        to={`/docs/${item.id}`}
                                                        className={`block w-full text-left p-2 rounded-md transition-all relative
                                                            ${isSelected
                                                                ? "bg-blue-500/10 text-blue-400 font-medium"
                                                                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                                                            }`}
                                                        onMouseEnter={() => setHoveredItem(item.id)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        {hoveredItem === item.id && !isSelected && (
                                                            <motion.div
                                                                layoutId="hover-highlight"
                                                                className="absolute inset-0 bg-zinc-800/30 rounded-md -z-10"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.15 }}
                                                            />
                                                        )}

                                                        {isSelected && (
                                                            <motion.div
                                                                layoutId="active-highlight"
                                                                className="absolute inset-0 bg-blue-500/10 rounded-md -z-10"
                                                                transition={{ duration: 0.2 }}
                                                            />
                                                        )}

                                                        {item.title}
                                                    </Link>
                                                );
                                            })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
} 