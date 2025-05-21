import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles, Bot, Loader2, Search, BookOpen, FileCode } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { SparklesText } from "@/pages/landing/ui/text/sparkles";
import { TextShimmer } from "@/pages/landing/ui/text/shimmer";
import { useNavigate } from "react-router";
import { docItems, docSections } from "../data";
import { useBeaver } from "@beaver/react";

type Message = {
    id: string;
    content: string;
    role: "user" | "ai";
    timestamp: Date;
    relatedLinks?: Array<{
        title: string;
        url: string;
        description?: string;
    }>;
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const { data: docsMetadata } = useBeaver().docs.getDocs();

    // Welcome message when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: `ai-welcome`,
                    content: "Hi there! I'm Beaver AI, your documentation assistant. Ask me anything about Beaver Social, our SDKs, or how to integrate our platform.",
                    role: "ai",
                    timestamp: new Date(),
                    relatedLinks: [
                        {
                            title: "Quick Start Guide",
                            url: "/docs/quick-start",
                            description: "Get started with Beaver Social quickly"
                        },
                        {
                            title: "SDK Reference",
                            url: "/docs/client-api",
                            description: "Comprehensive API documentation"
                        }
                    ]
                }
            ]);
        }
    }, [isOpen, messages.length]);

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

    // Simple search function to find related documentation
    const findRelatedDocumentation = (query: string) => {
        const searchTerms = query.toLowerCase().split(' ');
        const metadata = docsMetadata?.metadata || [];

        // Search docs for relevant items
        const relevantDocs = metadata
            .map(item => {
                // Calculate relevance score
                const score = searchTerms.reduce((acc, term) => {
                    if (item.title.toLowerCase().includes(term)) acc += 3;
                    if (item.description.toLowerCase().includes(term)) acc += 2;
                    if (item.tags.some(tag => tag.toLowerCase().includes(term))) acc += 1;
                    return acc;
                }, 0);

                return { item, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        return relevantDocs.map(({ item }) => {
            return {
                title: item.title,
                url: `/docs/${item.id}`,
                description: item.group || item.description.substring(0, 50)
            };
        });
    };

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
            // Find related documentation links
            const relatedLinks = findRelatedDocumentation(inputValue);

            // Simulate response generation
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate a response based on the query
            let responseContent = "";

            if (inputValue.toLowerCase().includes("how to install") || inputValue.toLowerCase().includes("installation")) {
                responseContent = "You can install Beaver Social SDK using npm or yarn:\n\n```\nnpm install @beaver/client @beaver/react\n```\n\nFor more details, check out our installation guide.";
            } else if (inputValue.toLowerCase().includes("react") || inputValue.toLowerCase().includes("hooks")) {
                responseContent = "The Beaver React SDK provides hooks for easy integration with React applications. The main hooks include useBeaver(), usePost(), useProfile(), and useWallets(). Check the React SDK documentation for more details.";
            } else if (inputValue.toLowerCase().includes("authentication") || inputValue.toLowerCase().includes("login")) {
                responseContent = "Beaver Social uses blockchain wallet authentication. You can authenticate users with:\n\n```jsx\nconst { login } = useLogin();\n// Then call login() when needed\n```";
            } else {
                responseContent = `I'll help you find information about "${inputValue}". I've provided some related documentation links that might answer your question. Feel free to ask more specific questions!`;
            }

            // Add AI response
            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                content: responseContent,
                role: "ai",
                timestamp: new Date(),
                relatedLinks: relatedLinks
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            // Handle error - add error message to chat
            setMessages(prev => [...prev, {
                id: `ai-error-${Date.now()}`,
                content: "I'm sorry, I encountered an error processing your request. Please try again.",
                role: "ai",
                timestamp: new Date()
            }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleNavigateToLink = (url: string) => {
        navigate(url);
        setIsOpen(false);
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
                    className={`relative max-w-[90%] md:max-w-[80%] p-4 rounded-2xl ${isAI
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

                        <div className="flex-1">
                            {isAI ? (
                                <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-900/90 prose-pre:text-xs prose-pre:border prose-pre:border-zinc-800">
                                    {/* Simple markdown-like rendering */}
                                    {message.content.split('\n').map((line, i) => {
                                        if (line.startsWith('```') && line.endsWith('```')) {
                                            return <pre key={i} className="p-2 rounded my-2 overflow-x-auto">{line.slice(3, -3)}</pre>;
                                        } else if (line.startsWith('```')) {
                                            // Start of code block
                                            return <pre key={i} className="p-2 rounded my-2 overflow-x-auto">{line.slice(3)}</pre>;
                                        } else if (line.endsWith('```')) {
                                            // End of code block
                                            return <pre key={i} className="p-2 rounded my-2 overflow-x-auto">{line.slice(0, -3)}</pre>;
                                        } else {
                                            return <p key={i}>{line}</p>;
                                        }
                                    })}
                                </div>
                            ) : (
                                <span className="text-foreground">{message.content}</span>
                            )}

                            {isAI && message.relatedLinks && message.relatedLinks.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-blue-500/10">
                                    <div className="text-xs text-blue-400 mb-2 flex items-center gap-1">
                                        <BookOpen size={12} />
                                        <span>Related Documentation</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {message.relatedLinks.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleNavigateToLink(link.url)}
                                                className="text-left text-sm p-2 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors flex items-start gap-2"
                                            >
                                                <FileCode size={14} className="mt-0.5 text-blue-400" />
                                                <div>
                                                    <div className="font-medium text-blue-300">{link.title}</div>
                                                    {link.description && (
                                                        <div className="text-xs text-zinc-400">{link.description}</div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="text-xs text-muted-foreground mt-2">
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

            <DialogContent className="max-w-[800px] glass bg-background/50 w-[90vw] md:w-[85vw] h-[80vh] md:h-[70vh] p-0 overflow-y-scroll no-scrollbar">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 sticky top-0 border-b flex items-center justify-between backdrop-blur-sm bg-background/80 z-10">
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
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                                    Ask me anything about Beaver Social, our SDKs, or how to use our platform.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 w-full max-w-md">
                                    {["How do I install Beaver SDK?", "How to authenticate users?", "What hooks are available?"].map((question, i) => (
                                        <button
                                            key={i}
                                            className="text-sm p-2 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors text-left flex items-center gap-2"
                                            onClick={() => {
                                                setInputValue(question);
                                                setTimeout(() => {
                                                    if (inputRef.current) {
                                                        inputRef.current.focus();
                                                    }
                                                }, 100);
                                            }}
                                        >
                                            <Search className="h-3 w-3" />
                                            {question}
                                        </button>
                                    ))}
                                </div>
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
                    <form onSubmit={handleSubmit} className="p-4 border-t sticky bottom-0 backdrop-blur-sm bg-background/80">
                        <div className="relative">
                            <Textarea
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask me anything about Beaver Social..."
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