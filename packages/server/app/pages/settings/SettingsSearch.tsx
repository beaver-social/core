import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { settingsData, SettingId } from "./SettingsTree";
import { cn } from "@/shared/lib/utils";

interface SettingsSearchProps {
    onSelectSetting: (settingId: SettingId) => void;
    className?: string;
}

export default function SettingsSearch({ onSelectSetting, className }: SettingsSearchProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<{ categoryId: string; categoryLabel: string; itemId: string; itemLabel: string }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim().length > 0) {
            setIsOpen(true);

            // Search through all settings
            const searchResults = [];
            const lowerQuery = query.toLowerCase();

            for (const category of settingsData) {
                for (const item of category.items) {
                    if (
                        item.label.toLowerCase().includes(lowerQuery) ||
                        category.label.toLowerCase().includes(lowerQuery)
                    ) {
                        searchResults.push({
                            categoryId: category.id,
                            categoryLabel: category.label,
                            itemId: item.id,
                            itemLabel: item.label,
                        });
                    }
                }
            }

            setResults(searchResults);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                resultsRef.current &&
                !resultsRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectResult = (categoryId: string, itemId: string) => {
        onSelectSetting(`${categoryId}.${itemId}`);
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search settings"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim().length > 0) setIsOpen(true);
                    }}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
            </div>

            {isOpen && results.length > 0 && (
                <div
                    ref={resultsRef}
                    className="absolute mt-3 z-10 w-full bg-popover rounded-md shadow-md border border-border py-1 max-h-[28rem] overflow-y-auto"
                >
                    {results.map((result, index) => (
                        <button
                            key={index}
                            className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm flex flex-col"
                            onClick={() => handleSelectResult(result.categoryId, result.itemId)}
                        >
                            <span className="font-medium">{result.itemLabel}</span>
                            <span className="text-xs text-muted-foreground">{result.categoryLabel}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
} 