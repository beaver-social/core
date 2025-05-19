import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles, Bot, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { SparklesText } from "@/pages/landing/ui/text/sparkles";
import { TextShimmer } from "@/pages/landing/ui/text/shimmer";

type Message = {
    id: string;
    content: string;
    role: "user" | "ai";
    timestamp: Date;
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when dialog opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isProcessing) return;

        // Add user message
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            content: inputValue,
            role: "user",
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsProcessing(true);

        try {
            // Placeholder for API call
            // const response = await fetchAIResponse(inputValue);

            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Add AI response
            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                content: `This is a sample response to "${inputValue}"`,
                role: "ai",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            // Handle error - add error message to chat
        } finally {
            setIsProcessing(false);
        }
    };

    const MorphingBubble = () => (
        <svg
            className="absolute top-0 left-0 w-full h-full -z-10"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                fill="rgba(110, 120, 250, 0.07)"
                d="M45.7,-58.3C58.9,-48.1,69.2,-32.9,73.4,-15.9C77.5,1.1,75.6,20,67.7,36.1C59.8,52.3,45.9,65.7,29.3,73C12.7,80.3,-6.7,81.5,-23.5,75.4C-40.3,69.2,-54.5,55.8,-66,39.4C-77.5,23,-86.3,3.7,-83.5,-14.2C-80.7,-32.1,-66.2,-48.6,-50,-58.6C-33.8,-68.5,-16.9,-71.9,-0.1,-71.7C16.6,-71.6,32.4,-68,45.7,-58.3Z"
                animate={{
                    d: [
                        "M45.7,-58.3C58.9,-48.1,69.2,-32.9,73.4,-15.9C77.5,1.1,75.6,20,67.7,36.1C59.8,52.3,45.9,65.7,29.3,73C12.7,80.3,-6.7,81.5,-23.5,75.4C-40.3,69.2,-54.5,55.8,-66,39.4C-77.5,23,-86.3,3.7,-83.5,-14.2C-80.7,-32.1,-66.2,-48.6,-50,-58.6C-33.8,-68.5,-16.9,-71.9,-0.1,-71.7C16.6,-71.6,32.4,-68,45.7,-58.3Z",
                        "M38.1,-45.1C49.6,-35.3,59.2,-22.7,62.9,-8C66.5,6.7,64.1,23.3,56.4,37.9C48.6,52.4,35.5,64.9,19.9,69.9C4.4,75,-13.5,72.6,-29.9,65.9C-46.3,59.3,-61.2,48.5,-70.2,33.3C-79.2,18.2,-82.3,-1.2,-77.1,-17.9C-71.9,-34.5,-58.5,-48.3,-43.5,-57.2C-28.5,-66.1,-11.9,-70.1,1.5,-71.9C14.9,-73.7,26.7,-54.9,38.1,-45.1Z",
                        "M45.4,-57.4C59.7,-48.1,72.9,-35.1,76.4,-19.9C79.9,-4.8,73.7,12.5,66.5,29.6C59.3,46.8,51,63.9,37.4,72.4C23.9,80.9,5.1,80.9,-14.5,78.2C-34.1,75.4,-54.5,70,-69.3,56.5C-84.1,43,-93.4,21.5,-93,0.2C-92.7,-21,-82.8,-41.9,-67.9,-51.6C-53.1,-61.3,-33.3,-59.7,-17.1,-67.7C-0.9,-75.7,11.8,-93.3,18.9,-88.2C26,-83.1,31.1,-66.7,45.4,-57.4Z",
                        "M45.7,-58.3C58.9,-48.1,69.2,-32.9,73.4,-15.9C77.5,1.1,75.6,20,67.7,36.1C59.8,52.3,45.9,65.7,29.3,73C12.7,80.3,-6.7,81.5,-23.5,75.4C-40.3,69.2,-54.5,55.8,-66,39.4C-77.5,23,-86.3,3.7,-83.5,-14.2C-80.7,-32.1,-66.2,-48.6,-50,-58.6C-33.8,-68.5,-16.9,-71.9,-0.1,-71.7C16.6,-71.6,32.4,-68,45.7,-58.3Z"
                    ],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 20,
                    ease: "easeInOut",
                }}
            />
        </svg>
    );

    const MessageItem = ({ message }: { message: Message }) => {
        const isAI = message.role === "ai";

        return (
            <motion.div
                className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div
                    className={`relative max-w-[80%] p-4 rounded-2xl ${isAI
                        ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                        : "bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-right border border-indigo-500/20"
                        }`}
                >
                    {isAI && <MorphingBubble />}

                    <div className="flex items-start gap-2">
                        {isAI && (
                            <div className="bg-blue-500/20 p-1.5 rounded-full">
                                <Bot size={16} className="text-blue-500" />
                            </div>
                        )}

                        <div>
                            {isAI ? (
                                <p>{message.content}</p>
                            ) : (
                                <span className="text-foreground">{message.content}</span>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="neon"
                    className="group relative overflow-hidden px-6 py-3 font-semibold transition-all duration-300"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 transition-all duration-300 group-hover:text-blue-500" />
                        <span className="group-hover:text-blue-400 transition-colors duration-300">Ask AI</span>
                    </span>
                    <motion.div
                        className="absolute inset-0 -z-10 bg-blue-500/5 rounded-full"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[800px] h-[600px] p-0 overflow-y-scroll no-scrollbar">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 sticky top-0 border-b flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-500/20 p-1.5 rounded-full">
                                <Bot size={18} className="text-blue-500" />
                            </div>
                            <TextShimmer className="text-xl font-medium" duration={5}>
                                Beaver AI
                            </TextShimmer>

                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-background/50">
                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center flex-col gap-4 text-center p-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center"
                                >
                                    <Sparkles className="h-8 w-8 text-blue-500" />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-blue-500/20"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [1, 0, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                                <TextShimmer className="text-xl font-medium" duration={5}>
                                    How can I help you today?
                                </TextShimmer>
                                <p className="text-muted-foreground text-sm max-w-xs">
                                    Ask me anything about Drizzle ORM, code examples, or documentation help.
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <MessageItem key={message.id} message={message} />
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
                        <div className="relative">
                            <Textarea
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask me anything..."
                                className="pr-12 min-h-[60px] max-h-[120px] resize-none bg-background/50 border-blue-500/20 focus-visible:ring-blue-500/30"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isProcessing || !inputValue.trim()}
                                className="absolute right-2 bottom-2 h-8 w-8 bg-blue-500/80 hover:bg-blue-500 transition-colors"
                            >
                                {isProcessing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}