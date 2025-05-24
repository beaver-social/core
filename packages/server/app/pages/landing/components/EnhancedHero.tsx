import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { CodeSnippet, type CodeSnippet as CodeSnippetType } from "../../../shared/components/CodeSnippet";

const codeSnippets: CodeSnippetType[] = [
  {
    title: "App.jsx",
    language: "javascript",
    code: `import { BeaverProvider } from '@beaver/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BeaverProvider
        config={{
          network: "testnet",
          apiBaseUrl: "https://testnet.api.beaver.social/v1",
          zkLoginWallets: { enabled: true },
          appId: "your-app-id"
        }}
      >
        <SocialApp />
      </BeaverProvider>
    </QueryClientProvider>
  );
}`,
  },
  {
    title: "SocialApp.jsx",
    language: "javascript",
    code: `import { useBeaver, usePost, useWallets } from "@beaver/react";

function SocialApp() {
  const beaver = useBeaver();
  const { createPost } = usePost();

  return (
      <div>
        {beaver.wallet.wallets.map((wallet, index) => (
          <button key={index} onClick={() => beaver.wallet.connect(index)}>
          Connect {wallet}
          </button>
        ))}
      </div>
    );
}`,
  },
];

export function EnhancedHero() {
  const navigate = useNavigate();

  return (
    <section className="container px-8 relative mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-16 lg:py-28 max-w-7xl min-h-[90vh]">
      {/* Left side - Text content */}
      <div className="flex flex-col max-w-xl mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            <span className="text-zinc-100">Web3 </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Social Network
            </span>
            <span className="text-zinc-100"> Layer</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
            Build decentralized social applications with blockchain authentication,
            on-chain verification, and powerful SDKs. Deploy on Sui with just a few lines of code.
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

          <motion.button
            className="hidden md:flex rounded-sm px-6 py-2.5 text-sm font-medium text-zinc-400 border border-zinc-800 gap-2 items-center hover:text-zinc-200 hover:border-zinc-700"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/app")}
          >
            <Icon name="AppWindowMac" className="w-4 h-4" />
            <p>See Example App</p>
          </motion.button>
        </motion.div>
      </div>

      {/* Right side - Code snippet */}
      <CodeSnippet snippets={codeSnippets} />

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
