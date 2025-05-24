import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { CodeSnippet, type CodeSnippet as CodeSnippetType } from "../../../shared/components/CodeSnippet";
import { Image } from "@/shared/components/Image";

const codeSnippets: CodeSnippetType[] = [
  {
    title: "zkLogin Integration",
    language: "javascript",
    code: `import { BeaverProvider, useZkLogin } from '@beaver/react';

function App() {
  return (
    <BeaverProvider
      config={{
        network: "mainnet",
        suiRpcUrl: "https://fullnode.mainnet.sui.io",
        zkLogin: {
          enabled: true,
          providers: ["google", "facebook", "apple"]
        }
      }}
    >
      <SocialApp />
    </BeaverProvider>
  );
}`,
  },
  {
    title: "Sui-Powered Social",
    language: "javascript",
    code: `import { useSuiAccount, usePost } from "@beaver/react";

function SocialApp() {
  const { account, zkLogin } = useSuiAccount();
  const { createPost, posts } = usePost();

  const handleZkLogin = async () => {
    await zkLogin.authenticate("google");
  };

  return (
    <div className="sui-social-app">
      <button onClick={handleZkLogin}>
        Login with zkLogin ⚡
      </button>
      {account && (
        <PostCreator onPost={createPost} />
      )}
    </div>
  );
}`,
  },
];

export function EnhancedHero() {
  const navigate = useNavigate();

  return (
    <section className="container px-8 relative mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-32 max-w-7xl min-h-[90vh]">
      {/* Sui zkLogin Badge */}
      <motion.div
        className="absolute top-8 left-2/3 transform -translate-x-1/2 lg:left-8 lg:transform-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <span className="text-blue-300 text-sm font-medium">Powered by Sui zkLogin</span>
        </div>
      </motion.div>

      {/* Left side - Text content */}
      <div className="flex flex-col max-w-2xl mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Main heading with Sui emphasis */}
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-zinc-100">Headless Web3</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              Social Network
            </span>
            <br />
            <span className="text-zinc-200">on </span>
            <span className="text-sky-500 font-extrabold">
              Sui.
            </span>
          </h1>

          <p className="mt-8 text-xl text-zinc-300 leading-relaxed max-w-xl">
            Leverage <span className="text-blue-400 font-semibold">Sui's zkLogin</span> and
            lightning-fast blockchain to create the next generation of social applications.
            <span className="text-purple-400 font-medium"> Familiar UX, Web3 benefits.</span>
          </p>

          {/* Sui benefits highlights */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-blue-300 text-sm">zkLogin Authentication</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-purple-300 text-sm">Object-Centric Storage</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="text-cyan-300 text-sm">Parallel Execution</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate("/docs/getting-started");
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Icon name="Zap" className="w-5 h-5" />
              Start Building on Sui
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            className="flex items-center gap-3 rounded-xl px-6 py-4 text-lg font-medium text-zinc-300 border-2 border-zinc-700 hover:border-blue-400/50 hover:text-zinc-100 hover:bg-blue-500/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/app")}
          >
            <Icon name="Play" className="w-5 h-5" />             <span>See Live Demo</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Right side - Code snippet with Sui emphasis */}
      <div className="relative">
        <CodeSnippet snippets={codeSnippets} />

        {/* Floating Sui logo effect */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/25"
          animate={{
            y: [0, -10, 0],
            rotateY: [0, 15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image src="/icons/sui.png" alt="Sui Logo" className="w-10" />
        </motion.div>
      </div>

      {/* Enhanced floating graphic elements with Sui colors */}
      <motion.div
        className="absolute -top-32 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
        animate={{
          y: [0, 25, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-1/6 h-32 w-32 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-10 h-20 w-20 rounded-full bg-purple-500/20 blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
