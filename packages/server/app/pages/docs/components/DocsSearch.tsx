import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/shared/components/ui/input";
import Icon from "@/shared/components/Icon";
import { docItems, docSections, DocItem } from "../data";

type DocsSearchProps = {
    onSelectDoc: (docId: string) => void;
    className?: string;
};

export default function DocsSearch({
    onSelectDoc,
    className = "",
}: DocsSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<DocItem[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            const filteredResults = docItems.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
            setShowResults(true);
        } else {
            setResults([]);
            setShowResults(false);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Input
                    placeholder="Search documentation..."
                    value={query}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4"
                />
                <Icon
                    name="Search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground"
                />
            </div>

            <AnimatePresence>
                {showResults && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 z-10 bg-card border rounded-md shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                    >
                        {results.map(item => (
                            <button
                                key={item.id}
                                className="w-full text-left p-3 hover:bg-secondary border-b last:border-0 flex items-center gap-2"
                                onClick={() => {
                                    onSelectDoc(item.id);
                                    setShowResults(false);
                                    setQuery("");
                                }}
                            >
                                <span>{item.title}</span>
                                <span className="text-xs text-muted-foreground">
                                    {docSections.find(section => section.id === item.parentId)?.title}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 