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

    // Extract the current doc ID from the URL path
    const currentPath = location.pathname;
    const selectedDoc = currentPath.split("/").pop() || "installation";

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
            {docSections.map((section) => (
                <div key={section.id} className="mb-4">
                    <button
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center justify-between w-full text-left p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-zinc-800/50 rounded-md">
                                <Icon name={section.icon} className="size-4 text-blue-400" />
                            </div>
                            <span className="font-medium text-zinc-300">{section.title}</span>
                        </div>
                        <Icon
                            name="ChevronDown"
                            className={`size-4 text-zinc-400 transition-transform ${expandedSections.includes(section.id) ? "rotate-180" : ""}`}
                        />
                    </button>

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
                                        .map((item) => (
                                            <Link
                                                key={item.id}
                                                to={`/docs/${item.id}`}
                                                className={`block w-full text-left p-2 rounded-md ${selectedDoc === item.id
                                                    ? "bg-blue-500/10 text-blue-400 font-medium"
                                                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                                                    }`}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
} 