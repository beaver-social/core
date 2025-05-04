import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";
import { Input } from "@/shared/components/ui/input";
import Icon from "@/shared/components/Icon";

interface GifPickerProps {
    onGifSelect: (gifUrl: string) => void;
    disabled?: boolean;
}

// Animation variants
const containerAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 }
    }
};

// Sample GIFs - in a real app, these would come from Giphy/Tenor API
const sampleGifs = [
    { id: '1', url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTFhOGY3ZDQxNTQyODQ3ZTRhN2NiYzJmZGYyY2VlNDUwZGE0NmY5MCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oEjHAUOqG3lSS0f1C/giphy.gif' },
    { id: '2', url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjM4NmNmYTQ1MzVjNTQ2YzJkMzJkMWMwMTJhNzc5NGMzYzVmYTA5YyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/yoJC2GnSClbPOkV0eA/giphy.gif' },
    { id: '3', url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWVlMDAwYjAzYzU0NjkwMTUzMDQ5ZTllOWQzZTNiYmZiOWI2ZGI1ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/12NUbkX6p4xOO4/giphy.gif' },
    { id: '4', url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjI1NWI0MzlhNGZlMWNlYjU4NDEwMmM2NmE2NjBhYWViOTQ3NDI3ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/dXcmD4vrHiCPUObBy2/giphy.gif' },
    { id: '5', url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTBhNjdlN2ZkZDAyMjFkYjc3ZGI3MzBkZmI1YWIyYzVjZDYyMTA3OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l0MYt5jPR6QX5pnqM/giphy.gif' },
    { id: '6', url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTMyNjU2Nzg3NDI4NzVhMTk1OWYxZTlkYmMxODRhMWIxODRkZjlhMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/tXL4FHPSnVJ0A/giphy.gif' }
];

const trendingCategories = [
    "Reactions", "Trending", "Love", "Sports", "Memes", "Animals", "Anime", "TV", "Gaming"
];

export default function GifPicker({ onGifSelect, disabled = false }: GifPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [gifs, setGifs] = useState(sampleGifs);

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // For demo, just showing the same GIFs regardless of search
            setIsLoading(false);
        }, 500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleGifSelect = (url: string) => {
        onGifSelect(url);
        setIsOpen(false);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="rounded-full hover:bg-secondary transition-colors"
                                disabled={disabled}
                            >
                                <Icon name="Gift" className="size-5" />
                            </Button>
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-[320px] p-3" sideOffset={10}>
                        <motion.div
                            variants={containerAnimation}
                            initial="hidden"
                            animate="visible"
                            className="gif-picker space-y-3"
                        >
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search GIFs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1"
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSearch}
                                    disabled={!searchQuery.trim() || isLoading}
                                >
                                    <Icon name={isLoading ? "Loader" : "Search"} className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
                                </Button>
                            </div>

                            {/* Categories */}
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                {trendingCategories.map((category) => (
                                    <Button
                                        key={category}
                                        variant="outline"
                                        size="sm"
                                        className="whitespace-nowrap"
                                        onClick={() => setSearchQuery(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>

                            {/* GIF Grid */}
                            <div className="h-[250px] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-2">
                                    {isLoading ? (
                                        Array(4).fill(0).map((_, idx) => (
                                            <div
                                                key={`skeleton-${idx}`}
                                                className="aspect-video bg-secondary animate-pulse rounded-md"
                                            />
                                        ))
                                    ) : (
                                        gifs.map((gif) => (
                                            <motion.div
                                                key={gif.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="cursor-pointer aspect-video bg-secondary rounded-md overflow-hidden relative"
                                                onClick={() => handleGifSelect(gif.url)}
                                            >
                                                <img
                                                    src={gif.url}
                                                    alt="GIF"
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                <div className="text-center text-xs text-muted-foreground mt-3">
                                    <p>Powered by GIPHY</p>
                                </div>
                            </div>
                        </motion.div>
                    </PopoverContent>
                </Popover>
                <TooltipContent>Add GIF</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
