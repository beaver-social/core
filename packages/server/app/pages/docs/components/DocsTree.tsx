import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/shared/components/Icon";
import { docSections, docItems } from "../data";

type DocsTreeProps = {
    selectedDoc: string;
    onSelectDoc: (docId: string) => void;
    className?: string;
};

export default function DocsTree({
    selectedDoc,
    onSelectDoc,
    className = "",
}: DocsTreeProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    return (
        <div className={`overflow-auto px-4 ${className}`}>
            {docSections.map((section) => (
                <div key={section.id} className="mb-4">
                    <button
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center justify-between w-full text-left p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                                <Icon name={section.icon} className="size-4 text-primary" />
                            </div>
                            <span className="font-medium">{section.title}</span>
                        </div>
                        <Icon
                            name="ChevronDown"
                            className={`size-4 transition-transform ${expandedSections.includes(section.id) ? "rotate-180" : ""
                                }`}
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
                                <div className="pl-10 pr-2 py-2 space-y-1">
                                    {docItems
                                        .filter((item) => item.parentId === section.id)
                                        .map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => onSelectDoc(item.id)}
                                                className={`w-full text-left p-2 rounded-md ${selectedDoc === item.id
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "hover:bg-secondary/50"
                                                    }`}
                                            >
                                                {item.title}
                                            </button>
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