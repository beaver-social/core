import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Input } from "@/shared/components/ui/input";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import { icons } from "lucide-react";

type DocsSearchProps = {
    className?: string;
    data: ReturnType<ReturnType<typeof useBeaver>["docs"]["getDocs"]>["data"],
};

export default function DocsSearch({
    className = "",
    data
}: DocsSearchProps) {
    const metadata = data?.metadata || [];
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Array<typeof metadata[0]>>([]);
    const [showResults, setShowResults] = useState(false);

    // Get information about groups for display
    const groupIcons = useMemo(() => {
        const iconMap = new Map<string, string>();

        // For each group, find the first document with an icon
        const groups = new Set(metadata.map(doc => doc.group));
        groups.forEach(group => {
            if (!group) return;

            const docsInGroup = metadata.filter(doc => doc.group === group);
            const docWithIcon = docsInGroup.find(doc => doc.icon);

            if (docWithIcon?.icon) {
                iconMap.set(group, docWithIcon.icon);
            } else {
                iconMap.set(group, "Book"); // Default icon
            }
        });

        return iconMap;
    }, [metadata]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            const filteredResults = metadata?.filter(doc =>
                doc.title.toLowerCase().includes(value.toLowerCase()) ||
                doc.description.toLowerCase().includes(value.toLowerCase()) ||
                doc.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
            ) || [];

            setResults(filteredResults);
            setShowResults(true);
        } else {
            setResults([]);
            setShowResults(false);
        }
    };

    const handleSelectDoc = (docId: string) => {
        navigate(`/docs/${docId}`);
        setShowResults(false);
        setQuery("");
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Input
                    placeholder="Search documentation..."
                    value={query}
                    onChange={handleSearch}
                    className="pl-10 pr-4 sm:w-80 bg-zinc-900/50 border-zinc-800 focus-visible:ring-blue-500"
                />
                <Icon
                    name="Search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-zinc-500"
                />
            </div>

            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-4 z-10 border border-zinc-800 rounded-md shadow-lg overflow-hidden max-h-80 overflow-y-auto bg-background"
                    >
                        {results.length > 0 ? (
                            results.map(doc => (
                                <button
                                    key={doc.id}
                                    className="w-full text-left p-3 hover:bg-zinc-800 border-b border-zinc-800 last:border-0 flex flex-col gap-1"
                                    onClick={() => handleSelectDoc(doc.id)}
                                >
                                    <span className="text-zinc-200 font-medium">{doc.title}</span>
                                    {doc.group && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <Icon
                                                name={groupIcons.get(doc.group) as keyof typeof icons || "Book"}
                                                className="h-3 w-3 text-blue-400"
                                            />
                                            <span className="text-zinc-400">
                                                {doc.group}
                                            </span>
                                        </div>
                                    )}
                                    {doc.description && (
                                        <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                                            {doc.description}
                                        </p>
                                    )}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-zinc-400">
                                <p className="font-semibold">No results found for "{query}"</p>
                                <p className="text-xs mt-1">Try a different search term</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 