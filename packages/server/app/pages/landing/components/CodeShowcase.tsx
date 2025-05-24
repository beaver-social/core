import * as React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Sparkles } from "lucide-react";
import { CodeSnippet, type CodeSnippet as CodeSnippetType } from "../../../shared/components/CodeSnippet";

const codeSnippets: CodeSnippetType[] = [
  {
    title: "SocialFeed.tsx",
    language: "typescript",
    code: `import { BeaverProvider, useBeaver, usePost } from '@beaver/react';
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
        <SocialFeed />
      </BeaverProvider>
    </QueryClientProvider>
  );
}

function SocialFeed() {
  const { user } = useBeaver();
  const { getPosts } = usePost();
  const { data } = getPosts({ perPage: 10 });

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      {data?.pages.map(page =>
        page.posts.map(post => (
          <div key={post.id}>{post.content}</div>
        ))
      )}
    </div>
  );
}`,
  },
  {
    title: "server.ts",
    language: "typescript",
    code: `import { BeaverClient } from '@beaver/typescript-sdk';

// Initialize Beaver SDK for server-side usage
const beaver = new BeaverClient({
  network: "testnet",
  apiBaseUrl: "https://testnet.api.beaver.social/v1",
  apiKey: process.env.BEAVER_API_KEY,
});

// Authenticate user with wallet signature
async function authenticateUser(walletAddress: string, signature: string) {
  const user = await beaver.auth.loginWithWallet({
    walletAddress,
    signature,
  });
  return user; // { userId, username, jwt }
}

// Create a social post
async function createPost(content: string, userId: string) {
  const post = await beaver.posts.create({
    content,
    userId,
    metadata: {
      platform: "web",
      timestamp: new Date().toISOString(),
    }
  });
  return post;
}

// Get social graph data
async function getUserFollowers(userId: string) {
  const followers = await beaver.social.getFollowers({
    userId,
    limit: 50,
  });
  return followers;
}`,
  },
  {
    title: "App.tsx",
    language: "typescript",
    code: `import React from 'react';
import { View, Text, Button } from 'react-native';
import { BeaverProvider, useBeaver, usePost } from '@beaver/react-native';
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
}

function SocialApp() {
  const { user, connect } = useBeaver();
  const { createPost } = usePost();

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user?.username}!</Text>
      <Button
        title="Connect Wallet"
        onPress={() => connect()}
      />
      <Button
        title="Create Post"
        onPress={() => createPost.mutate({
          content: "Hello from React Native!"
        })}
      />
    </View>
  );
}`,
  },
];

// Animated code tabs with examples
export function CodeShowcase() {
  return (
    <section id="code" className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center justify-center text-center mb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Developer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Experience
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Integrate Beaver Social into your React, TypeScript, or mobile app with our
            comprehensive SDKs and type-safe APIs.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Code examples using CodeSnippet component */}
        <CodeSnippet snippets={codeSnippets} />

        {/* Decorative elements */}
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-indigo-600/10 blur-xl" />
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-purple-600/10 blur-xl" />
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
          <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
            <Sparkles />
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
            AI-Powered
          </h3>
          <p className="text-zinc-400">
            Intelligent content curation and recommendation engine built right
            into the SDK.
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
          <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
            <Code />
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
            Multiplatform
          </h3>
          <p className="text-zinc-400">
            Build once, deploy anywhere with our cross-platform SDKs for web,
            mobile, and server.
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
          <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
            <Cpu />
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            Web3 Native
          </h3>
          <p className="text-zinc-400">
            Built for decentralized applications with full support for
            blockchain authentication and data.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
