import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Input } from "@/shared/components/ui/input";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";

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

    // Create a lookup of parent docs for section information
    const parentDocs = useMemo(() => {
        const parents = new Map<string, typeof metadata[0]>();
        metadata?.forEach(doc => {
            if (!doc.parentId) {
                parents.set(doc.id, doc);
            }
        });
        return parents;
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

    const getParentForDoc = (doc: typeof metadata[0]) => {
        if (!doc.parentId) return null;
        return parentDocs.get(doc.parentId);
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Input
                    placeholder="Search documentation..."
                    value={query}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 bg-zinc-900/50 border-zinc-800 focus-visible:ring-blue-500"
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
                        className="absolute top-full left-0 right-0 mt-1 z-10 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg overflow-hidden max-h-80 overflow-y-auto"
                    >
                        {results.length > 0 ? (
                            results.map(doc => {
                                const parent = getParentForDoc(doc);
                                return (
                                    <button
                                        key={doc.id}
                                        className="w-full text-left p-3 hover:bg-zinc-800 border-b border-zinc-800 last:border-0 flex flex-col gap-1"
                                        onClick={() => handleSelectDoc(doc.id)}
                                    >
                                        <span className="text-zinc-200 font-medium">{doc.title}</span>
                                        <div className="flex items-center gap-2 text-xs">
                                            {parent && (
                                                <>
                                                    <Icon
                                                        name={parent.icon || "Book"}
                                                        className="h-3 w-3 text-blue-400"
                                                    />
                                                    <span className="text-zinc-400">
                                                        {parent.title}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        {doc.description && (
                                            <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                                                {doc.description}
                                            </p>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="p-4 text-center text-zinc-400">
                                <p>No results found for "{query}"</p>
                                <p className="text-xs mt-1">Try a different search term</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 