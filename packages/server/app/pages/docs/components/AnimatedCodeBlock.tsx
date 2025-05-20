import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";

type AnimatedCodeBlockProps = {
    code: string;
    language?: string;
    delay?: number;
};

export default function AnimatedCodeBlock({
    code,
    language = 'tsx',
    delay = 0
}: AnimatedCodeBlockProps) {
    return (
        <motion.div
            className="relative my-6 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="flex items-center justify-between bg-secondary/80 px-4 py-2 text-sm font-medium">
                <span>{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                        // Copy code to clipboard
                        navigator.clipboard.writeText(code.trim());
                        // Show toast or notification (you can implement this)
                    }}
                >
                    <Icon name="Copy" className="h-4 w-4" />
                </Button>
            </div>
            <pre className="overflow-auto p-4 text-sm bg-secondary/50">
                <code>{code.trim()}</code>
            </pre>
        </motion.div>
    );
} 