import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { CodeSnippet, type CodeSnippet as CodeSnippetType } from "../../../shared/components/CodeSnippet";
import { Image } from "@/shared/components/Image";

const codeSnippets: CodeSnippetType[] = [
  {
    title: "Simple Social Integration",
    language: "javascript",
    code: `import { BeaverProvider, useBeaver } from '@beaver/react';

function App() {
  return (
    <BeaverProvider
      config={{
        network: "mainnet",
        apiBaseUrl: "https://api.beaver.social/v1",
        appId: "your-app-id"
      }}
    >
      <SocialApp />
    </BeaverProvider>
  );
}`,
  },
  {
    title: "Social Features in Minutes",
    language: "javascript",
    code: `import { useWallets, usePost, useProfile } from "@beaver/react";

function SocialApp() {
  const { connect } = useWallets();
  const { createPost, getPosts } = usePost();
  const { getProfile } = useProfile();

  return (
    <div className="social-app">
      <button onClick={() => connect()}>
        Connect Wallet
      </button>
      <PostFeed posts={getPosts().data} />
      <PostComposer onPost={createPost} />
    </div>
  );
}`,
  },
];

export function EnhancedHero() {
  const navigate = useNavigate();

  return (
    <section className="container px-8 relative mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-32 max-w-7xl min-h-[90vh]">
      {/* Left side - Text content */}
      <div className="relative z-10 flex flex-col max-w-2xl mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Main heading focused on Beaver Social */}
          <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
            <span className="text-zinc-100">Headless Web3</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              Social Layer
            </span>
            <br />
            <span className="text-zinc-200">on Sui.</span>
          </h1>

          <p className="max-w-xl mt-4 text-lg text-zinc-500">
            Connectors, Authentication, Profiles, Posts, Shorts, Social Graph APIs, and much more.
          </p>

          {/* Key Beaver benefits highlights */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-1 border rounded-lg bg-blue-500/10 border-blue-500/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-blue-300">Simple</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border rounded-lg bg-purple-500/10 border-purple-500/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-purple-300">Secure</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border rounded-lg bg-cyan-500/10 border-cyan-500/20">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="text-sm text-cyan-300">Customizable</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button
            className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-transparent transition-all duration-300 border group bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300 hover:border-blue-400/50 rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate("/docs/getting-started");
            }}
          >
            <Icon name="Zap" className="w-5 h-5 text-blue-400 transition-colors group-hover:text-blue-300" />
            <span>Start Building</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-3 px-6 py-4 text-lg font-medium transition-all duration-300 border rounded-xl text-zinc-300 hover:text-zinc-100 hover:bg-blue-500/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/app")}
          >
            <Icon name="Play" className="w-5 h-5" />
            <span>Try Demo</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Right side - Code snippet */}
      <div className="relative">
        <CodeSnippet snippets={codeSnippets} />

        {/* Abstract floating element placeholder */}
        <motion.div
          className="absolute flex items-center justify-center w-16 h-16 border -bottom-20 -right-20 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-blue-400/30"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Placeholder for logo or abstract icon */}
          <Image src="/icons/sui.png" alt="Beaver Social" className="w-6" />
        </motion.div>
      </div>

      {/* Minimalistic floating graphic elements */}
      <motion.div
        className="absolute w-64 h-64 rounded-full -top-32 right-1/4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
        animate={{
          y: [0, 25, 0],
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full bottom-20 left-1/6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
