import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import { icons } from "lucide-react";

type DocsTreeProps = {
    className?: string;
    data: ReturnType<ReturnType<typeof useBeaver>["docs"]["getDocs"]>["data"],
};

export default function DocsTree({
    className = "",
    data
}: DocsTreeProps) {
    const metadata = data?.metadata || [];
    const location = useLocation();
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Extract the current doc ID from the URL path
    const currentPath = location.pathname;
    const selectedDoc = currentPath.split("/").pop() || "";

    // Get all unique groups from metadata
    const groups = useMemo(() => {
        const uniqueGroups = new Set<string>();
        metadata?.forEach(doc => {
            if (doc.group) {
                uniqueGroups.add(doc.group);
            }
        });
        return Array.from(uniqueGroups);
    }, [metadata]);

    // Group docs by their group
    const docsByGroup = useMemo(() => {
        const grouped = new Map<string, typeof metadata>();

        // Group docs by their group property
        metadata?.forEach(doc => {
            if (doc.group) {
                const groupDocs = grouped.get(doc.group) || [];
                grouped.set(doc.group, [...groupDocs, doc]);
            }
        });

        return grouped;
    }, [metadata]);

    // Find the current document's group
    const currentGroup = useMemo(() => {
        const currentDoc = metadata?.find(doc => doc.id === selectedDoc);
        return currentDoc?.group || "";
    }, [selectedDoc, metadata]);

    // Expand the group containing the current doc
    useEffect(() => {
        const currentDoc = metadata?.find(doc => doc.id === selectedDoc);
        if (currentDoc && currentDoc.group && !expandedSections.includes(currentDoc.group)) {
            setExpandedSections(prev => [...prev, currentDoc.group]);
        }
    }, [selectedDoc, metadata]);

    const toggleSection = (groupName: string) => {
        setExpandedSections(prev =>
            prev.includes(groupName)
                ? prev.filter(name => name !== groupName)
                : [...prev, groupName]
        );
    };

    if (!metadata || metadata.length === 0) {
        return <div className="p-4 text-zinc-400">Loading documentation...</div>;
    }

    return (
        <div className={`overflow-auto px-2 py-4 ${className}`}>
            {groups.map((groupName) => {
                const isActive = groupName === currentGroup;
                const groupDocs = docsByGroup.get(groupName) || [];

                // Find an icon for the group (use the first doc with an icon, or default to "Book")
                const groupIcon = groupDocs.find(doc => doc.icon)?.icon || "Book";

                return (
                    <div key={groupName} className="mb-4">
                        <motion.button
                            onClick={() => toggleSection(groupName)}
                            className={`flex items-center justify-between w-full text-left p-2 hover:bg-zinc-800/50 rounded-lg transition-colors ${isActive ? "bg-zinc-800/30" : ""
                                }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-md ${isActive ? "bg-blue-500/20" : "bg-zinc-800/50"}`}>
                                    <Icon
                                        name={groupIcon}
                                        className={`size-4 ${isActive ? "text-blue-400" : "text-zinc-400"}`}
                                    />
                                </div>
                                <span className={`font-medium ${isActive ? "text-blue-300" : "text-zinc-300"}`}>
                                    {groupName}
                                </span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedSections.includes(groupName) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icon
                                    name="ChevronDown"
                                    className={`size-4 ${isActive ? "text-blue-400" : "text-zinc-400"}`}
                                />
                            </motion.div>
                        </motion.button>

                        <AnimatePresence>
                            {expandedSections.includes(groupName) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-8 pr-2 py-2 space-y-1">
                                        {groupDocs.map((doc) => {
                                            const isSelected = selectedDoc === doc.id;

                                            return (
                                                <Link
                                                    key={doc.id}
                                                    to={`/docs/${doc.id}`}
                                                    className={`block w-full text-left p-2 rounded-md transition-all relative
                                                        ${isSelected
                                                            ? "bg-blue-500/10 text-blue-400 font-medium"
                                                            : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                                                        }`}
                                                    onMouseEnter={() => setHoveredItem(doc.id)}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    {hoveredItem === doc.id && !isSelected && (
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

                                                    {doc.title}
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