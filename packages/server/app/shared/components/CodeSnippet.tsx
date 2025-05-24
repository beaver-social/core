import Icon from "@/shared/components/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface CodeSnippet {
    title: string;
    language: string;
    code: string;
}

interface CodeSnippetProps {
    snippets: CodeSnippet[];
    className?: string;
    showNavigation?: boolean;
    showCopyButton?: boolean;
    animated?: boolean;
}

export function CodeSnippet({
    snippets,
    className = "",
    showNavigation = true,
    showCopyButton = true,
    animated = true,
}: CodeSnippetProps) {
    const [copied, setCopied] = useState(false);
    const [activeSnippet, setActiveSnippet] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeSnippet].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const nextSnippet = () => {
        setActiveSnippet((prev) => (prev + 1) % snippets.length);
    };

    const prevSnippet = () => {
        setActiveSnippet(
            (prev) => (prev - 1 + snippets.length) % snippets.length,
        );
    };

    const customStyle = {
        ...oneDark,
        'pre[class*="language-"]': {
            ...oneDark['pre[class*="language-"]'],
            background: 'transparent',
            margin: 0,
            padding: 0,
        },
        'code[class*="language-"]': {
            ...oneDark['code[class*="language-"]'],
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.5',
        },
    };

    const MotionWrapper = animated ? motion.div : "div";
    const motionProps = animated
        ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.5, duration: 0.5 },
            layout: true,
        }
        : {};

    return (
        <MotionWrapper
            className={`relative w-full mx-auto lg:mx-0 rounded-xl bg-zinc-900/50 p-4 font-mono text-sm shadow-xl backdrop-blur-md border border-zinc-800/50 ${className}`}
            {...motionProps}
        >
            {/* Terminal header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-zinc-500">
                        {snippets[activeSnippet].title}
                    </div>
                </div>

                {showCopyButton && (
                    <button
                        onClick={handleCopy}
                        className="text-xs p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors font-sans group"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-green-400 text-xs"
                            >
                                Copied!
                            </motion.span>
                        ) : (
                            <Icon
                                name="Clipboard"
                                className="w-4 h-4 group-hover:text-zinc-200 transition-colors"
                            />
                        )}
                    </button>
                )}
            </div>

            {/* Code content */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSnippet}
                        initial={animated ? { opacity: 0, y: 10 } : {}}
                        animate={animated ? { opacity: 1, y: 0 } : {}}
                        exit={animated ? { opacity: 0, y: -10 } : {}}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-lg"
                    >
                        <SyntaxHighlighter
                            language={snippets[activeSnippet].language}
                            style={customStyle}
                            customStyle={{
                                background: 'transparent',
                                padding: '1rem',
                                margin: 0,
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                lineHeight: '1.5',
                            }}
                            wrapLines={true}
                            wrapLongLines={true}
                            showLineNumbers={false}
                        >
                            {snippets[activeSnippet].code}
                        </SyntaxHighlighter>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation controls */}
            {showNavigation && snippets.length > 1 && (
                <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                        onClick={prevSnippet}
                        className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={activeSnippet === 0}
                    >
                        <Icon name="ChevronLeft" className="w-4 h-4" />
                    </button>

                    <div className="flex gap-1">
                        {snippets.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSnippet(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${activeSnippet === index
                                    ? "bg-blue-400"
                                    : "bg-zinc-600 hover:bg-zinc-500"
                                    }`}
                                title={`View ${snippets[index].title}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSnippet}
                        className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={activeSnippet === snippets.length - 1}
                    >
                        <Icon name="ChevronRight" className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Single snippet indicator */}
            {!showNavigation && snippets.length === 1 && (
                <div className="mt-4 flex justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
            )}
        </MotionWrapper>
    );
}

// Convenience component for a single code snippet
interface SingleCodeSnippetProps {
    title: string;
    language: string;
    code: string;
    className?: string;
    showCopyButton?: boolean;
    animated?: boolean;
}

export function SingleCodeSnippet({
    title,
    language,
    code,
    className,
    showCopyButton = true,
    animated = true,
}: SingleCodeSnippetProps) {
    return (
        <CodeSnippet
            snippets={[{ title, language, code }]}
            className={className}
            showNavigation={false}
            showCopyButton={showCopyButton}
            animated={animated}
        />
    );
} 