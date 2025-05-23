import React, { useState } from "react";
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
  language = "tsx",
  delay = 0,
}: AnimatedCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="relative my-6 overflow-hidden rounded-lg border border-zinc-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <span className="ml-2 text-zinc-400">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300"
          onClick={handleCopy}
        >
          {copied ? (
            <Icon name="Check" className="h-4 w-4 text-green-400" />
          ) : (
            <Icon name="Copy" className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="overflow-auto p-4 text-sm bg-zinc-900/80 text-zinc-300">
        <code>{code.trim()}</code>
      </pre>
    </motion.div>
  );
}
