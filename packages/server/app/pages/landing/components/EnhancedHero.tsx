import Icon from "@/shared/components/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";

const AnimatedCodeSnippet = () => {
  const [copied, setCopied] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState(0);

  const codeSnippets = [
    {
      title: "main.jsx",
      code: `import { BeaverProvider } from '@beaver/react';

const App = () => {
  return (
    <BeaverProvider 
      config={{
        debug: false
        network: "mainnet"
        apiBaseUrl: "https://api.beaver.social"
        zkLoginWallets: {
          enabled: true
        }
      }}>
      <YourApp />
    </BeaverProvider>
  );
};`,
    },
    {
      title: "YourSocialApp.jsx",
      code: `import { useBeaver } from "@beaver/react"

function YourSocialApp () {
  const beaver = useBeaver();
  const user = beaver.user;
  const login = beaver.auth.login;

  // implement login button
}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextSnippet = () => {
    setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
  };

  const prevSnippet = () => {
    setActiveSnippet(
      (prev) => (prev - 1 + codeSnippets.length) % codeSnippets.length,
    );
  };

  const renderCodeContent = (index: number) => {
    if (index === 0) {
      return (
        <code className="language-javascript text-zinc-300">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="block"
          >
            <span className="text-rose-400">import</span>{" "}
            <span className="text-teal-300">{"{"}</span>{" "}
            <span className="text-amber-300">BeaverProvider</span>{" "}
            <span className="text-teal-300">{"}"}</span>{" "}
            <span className="text-rose-400">from</span>{" "}
            <span className="text-green-300">'@beaver/react'</span>;
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="block mt-4"
          >
            <span className="text-rose-400">const</span>{" "}
            <span className="text-blue-300">App</span>{" "}
            <span className="text-zinc-300">=</span>{" "}
            <span className="text-amber-300">()</span>{" "}
            <span className="text-zinc-300">=&gt;</span>{" "}
            <span className="text-teal-300">{"{"}</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="block ml-4"
          >
            <span className="text-rose-400">return</span>{" "}
            <span className="text-teal-300">(</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="block ml-8"
          >
            <span className="text-blue-400">&lt;</span>
            <span className="text-amber-300">BeaverProvider</span> <br />
            <span className="text-rose-400">config</span>
            <span className="text-zinc-300">=</span>
            <span className="text-teal-300">{"{"}</span>
            <span className="text-orange-300">{"{"}</span>
            <br />
            <span className="text-orange-300"> debug: false</span>
            <br />
            <span className="text-orange-300"> network: "mainnet"</span>
            <br />
            <span className="text-orange-300">
              {" "}
              apiBaseUrl: "https://api.beaver.social"
            </span>
            <br />
            <span className="text-orange-300"> zkLoginWallets: </span>
            <span className="text-purple-500">{"{"}</span>
            <br />
            <span className="text-orange-300"> enabled: true</span>
            <br />
            <span className="text-purple-500">{"  }"}</span>
            <br />
            <span className="text-orange-300">{"}"}</span>
            <span className="text-teal-300">{"}"}</span>
            <span className="text-blue-400">&gt;</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="block ml-12"
          >
            <span className="text-blue-400">&lt;</span>
            <span className="text-amber-300">YourSocialApp</span>
            <span className="text-blue-400"> /&gt;</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="block ml-8"
          >
            <span className="text-blue-400">&lt;/</span>
            <span className="text-amber-300">BeaverProvider</span>
            <span className="text-blue-400">&gt;</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="block ml-4"
          >
            <span className="text-teal-300">)</span>;
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="block"
          >
            <span className="text-teal-300">{"}"}</span>;
          </motion.span>
        </code>
      );
    } else {
      return (
        <code className="language-javascript text-zinc-300">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="block"
          >
            <span className="text-rose-400">import</span>{" "}
            <span className="text-teal-300">{"{"}</span>{" "}
            <span className="text-amber-300">useBeaver</span>{" "}
            <span className="text-teal-300">{"}"}</span>{" "}
            <span className="text-rose-400">from</span>{" "}
            <span className="text-green-300">"@beaver/react"</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="block mt-4"
          >
            <span className="text-rose-400">function</span>{" "}
            <span className="text-blue-300">YourSocialApp</span>{" "}
            <span className="text-amber-300">()</span>{" "}
            <span className="text-teal-300">{"{"}</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="block ml-2"
          >
            <span className="text-rose-400">const</span>{" "}
            <span className="text-blue-300">beaver</span>{" "}
            <span className="text-zinc-300">=</span>{" "}
            <span className="text-amber-300">useBeaver</span>
            <span className="text-teal-300">()</span>;
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="block ml-2"
          >
            <span className="text-rose-400">const</span>{" "}
            <span className="text-blue-300">user</span>{" "}
            <span className="text-zinc-300">=</span>{" "}
            <span className="text-blue-300">beaver</span>
            <span className="text-zinc-300">.</span>
            <span className="text-amber-300">user</span>;
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="block ml-2"
          >
            <span className="text-rose-400">const</span>{" "}
            <span className="text-blue-300">login</span>{" "}
            <span className="text-zinc-300">=</span>{" "}
            <span className="text-blue-300">beaver</span>
            <span className="text-zinc-300">.</span>
            <span className="text-amber-300">auth</span>
            <span className="text-zinc-300">.</span>
            <span className="text-amber-300">login</span>;
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="block ml-2 mt-4"
          >
            <span className="text-zinc-500">// implement login button</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="block"
          >
            <span className="text-teal-300">{"}"}</span>
          </motion.span>
        </code>
      );
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto lg:mx-0 rounded-xl bg-zinc-900/50 p-4 font-mono text-sm shadow-xl backdrop-blur-md border border-zinc-800/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      layout
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <div className="ml-2 text-xs text-zinc-500">
            {codeSnippets[activeSnippet].title}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors font-sans"
        >
          {copied ? "Copied" : <Icon name="Clipboard" className="w-4 h-4" />}
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.pre
          key={activeSnippet}
          className="text-xs sm:text-sm overflow-x-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderCodeContent(activeSnippet)}
        </motion.pre>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="mt-4 flex justify-center items-center gap-3">
        <button
          onClick={prevSnippet}
          className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
          disabled={activeSnippet === 0}
        >
          <Icon name="ChevronLeft" className="w-4 h-4" />
        </button>

        {codeSnippets.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSnippet(index)}
            className={`w-2 h-2 rounded-full ${activeSnippet === index ? "bg-blue-400" : "bg-zinc-600"}`}
          />
        ))}

        <button
          onClick={nextSnippet}
          className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
          disabled={activeSnippet === codeSnippets.length - 1}
        >
          <Icon name="ChevronRight" className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export function EnhancedHero() {
  const navigate = useNavigate();

  return (
    <section className="container px-8 relative mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-16 lg:py-28 max-w-7xl h-[90vh]">
      {/* Left side - Text content */}
      <div className="flex flex-col max-w-xl mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            <span className="text-zinc-100">Build your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              web3
            </span>
            <span className="text-zinc-100"> social experience.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Build, connect, and scale — all with just a few lines of code.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.button
            className="rounded-sm bg-zinc-800/20 px-6 py-2.5 text-md text-white hover:bg-zinc-800/40 border border-zinc-700/50 hover:border-purple-400/50 font-semibold flex gap-2 items-center transition-all"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              navigate("/docs/getting-started");
            }}
          >
            <Icon name="Activity" className="w-4 h-4 text-blue-400" />

            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Get Started
            </p>
          </motion.button>
        </motion.div>

        {/* Stats */}
        {/* <motion.div
                    className="mt-12 grid grid-cols-3 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">99%</span>
                        <span className="text-sm text-zinc-500">Performance</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">10x</span>
                        <span className="text-sm text-zinc-500">Faster Dev</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">24/7</span>
                        <span className="text-sm text-zinc-500">Support</span>
                    </div>
                </motion.div> */}
      </div>

      {/* Right side - Code snippet */}
      <AnimatedCodeSnippet />

      {/* Floating graphic elements */}
      <motion.div
        className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-purple-700/10 blur-3xl"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 left-1/4 h-20 w-20 rounded-full bg-indigo-700/20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
