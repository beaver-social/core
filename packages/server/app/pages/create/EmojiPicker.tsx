import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import Icon from "@/shared/components/Icon";

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
    disabled?: boolean;
}

// Emoji categories and emojis
const emojiCategories = [
    {
        category: "smileys",
        icon: "Smile",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳"]
    },
    {
        category: "people",
        icon: "User",
        emojis: ["👋", "🤚", "✋", "🖐️", "👌", "👍", "👎", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✌️", "🤘", "🤟", "👨", "👩", "👧", "👦", "👶", "🧒", "👱", "👴", "👵", "🧓", "🧔", "👮", "👷", "💂", "🕵️"]
    },
    {
        category: "animals",
        icon: "Cat",
        emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦄", "🐴", "🦉", "🦇", "🐺", "🐗", "🐛", "🐝", "🦋", "🐌"]
    },
    {
        category: "food",
        icon: "Apple",
        emojis: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🌽", "🥕", "🥔", "🍠", "🥐", "🥯", "🍞"]
    },
    {
        category: "travel",
        icon: "Plane",
        emojis: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️", "🚂", "✈️", "🚀", "🛸", "🚁", "🛶", "⛵", "🚤", "🚢", "⚓", "🏖️", "🗿"]
    },
    {
        category: "symbols",
        icon: "Heart",
        emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️"]
    }
];

// Animation variants
const containerAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 }
    }
};

const itemAnimation = {
    hover: { scale: 1.2, transition: { duration: 0.1 } }
};

export default function EmojiPicker({ onEmojiSelect, disabled = false }: EmojiPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("smileys");
    const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

    // Load recent emojis from local storage
    useEffect(() => {
        const saved = localStorage.getItem('recentEmojis');
        if (saved) {
            try {
                setRecentEmojis(JSON.parse(saved).slice(0, 15));
            } catch (e) {
                console.error('Failed to parse recent emojis', e);
            }
        }
    }, []);

    const handleEmojiSelect = (emoji: string) => {
        onEmojiSelect(emoji);

        // Update recent emojis
        setRecentEmojis(prev => {
            const updated = [emoji, ...prev.filter(e => e !== emoji)].slice(0, 15);
            localStorage.setItem('recentEmojis', JSON.stringify(updated));
            return updated;
        });

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
                                <Icon name="SmilePlus" className="size-5" />
                            </Button>
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-[320px] p-0" sideOffset={10}>
                        <motion.div
                            variants={containerAnimation}
                            initial="hidden"
                            animate="visible"
                            className="emoji-picker"
                        >
                            <Tabs
                                defaultValue="smileys"
                                value={activeCategory}
                                onValueChange={setActiveCategory}
                                className="w-full"
                            >
                                <div className="border-b sticky top-0 bg-background z-10">
                                    <TabsList className="grid grid-cols-7 bg-transparent h-auto p-2">
                                        <TabsTrigger
                                            value="recent"
                                            className="rounded-md data-[state=active]:bg-secondary"
                                        >
                                            <Icon name="Clock" className="size-5" />
                                        </TabsTrigger>
                                        {emojiCategories.map((cat) => (
                                            <TabsTrigger
                                                key={cat.category}
                                                value={cat.category}
                                                className="rounded-md data-[state=active]:bg-secondary"
                                            >
                                                <Icon name={cat.icon} className="size-5" />
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>

                                <div className="h-[200px] overflow-y-auto py-2 px-3">
                                    {/* Recent Emojis */}
                                    <TabsContent value="recent" className="m-0 p-0">
                                        <div className="grid grid-cols-8 gap-1">
                                            {recentEmojis.length > 0 ? (
                                                recentEmojis.map((emoji, idx) => (
                                                    <motion.button
                                                        key={`recent-${idx}-${emoji}`}
                                                        whileHover={itemAnimation.hover}
                                                        className="p-2 text-xl rounded-md hover:bg-secondary"
                                                        onClick={() => handleEmojiSelect(emoji)}
                                                    >
                                                        {emoji}
                                                    </motion.button>
                                                ))
                                            ) : (
                                                <div className="col-span-8 py-6 text-center text-muted-foreground">
                                                    <p>No recent emojis</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    {/* Emoji Categories */}
                                    {emojiCategories.map((cat) => (
                                        <TabsContent key={cat.category} value={cat.category} className="m-0 p-0">
                                            <div className="grid grid-cols-8 gap-1">
                                                <AnimatePresence>
                                                    {cat.emojis.map((emoji, idx) => (
                                                        <motion.button
                                                            key={`${cat.category}-${idx}-${emoji}`}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            whileHover={itemAnimation.hover}
                                                            className="p-2 text-xl rounded-md hover:bg-secondary"
                                                            onClick={() => handleEmojiSelect(emoji)}
                                                        >
                                                            {emoji}
                                                        </motion.button>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>
                        </motion.div>
                    </PopoverContent>
                </Popover>
                <TooltipContent>Add Emoji</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
