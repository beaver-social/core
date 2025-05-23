import * as React from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Check, Code, Cpu, Copy, Sparkles } from "lucide-react";

// Animated code tabs with examples
export function CodeShowcase() {
  const [activeTab, setActiveTab] = React.useState("react");
  const [copied, setCopied] = React.useState({
    react: false,
    node: false,
    flutter: false,
  });

  const handleCopy = (code: string, type: "react" | "node" | "flutter") => {
    navigator.clipboard.writeText(code);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const reactCode = `import { BeaverSocial, useWeb3Profile } from '@beaver/react';

// Initialize the Beaver Social SDK
function SocialApp() {
  const { profile, isLoading } = useWeb3Profile();

  return (
    <BeaverSocial
      theme="dark"
      aiEnhanced={true}
      wallet={profile}
    >
      {/* Ready-to-use components */}
      <Timeline 
        filter="trending" 
        layout="masonry" 
      />
      <ProfileCard showNFTs={true} />
    </BeaverSocial>
  );
}`;

  const nodeCode = `import { BeaverNode } from '@beaver/node';
import { SuiChain } from '@mysten/sui';

// Server-side implementation
const beaver = new BeaverNode({
  chain: SuiChain,
  apiKey: process.env.BEAVER_API_KEY,
});

// Create a new social post with AI moderation
async function createPost(userId, content) {
  const result = await beaver.posts.create({
    author: userId,
    content,
    enableAIModeration: true,
    visibility: 'public',
  });
  
  return result;
}`;

  const flutterCode = `import 'package:beaver_social/beaver_social.dart';

class BeaverSocialApp extends StatefulWidget {
  @override
  _BeaverSocialAppState createState() => _BeaverSocialAppState();
}

class _BeaverSocialAppState extends State<BeaverSocialApp> {
  final _beaverClient = BeaverClient(
    apiKey: 'YOUR_API_KEY',
    config: BeaverConfig(
      theme: BeaverTheme.dark,
      aiFeatures: true,
    ),
  );

  @override
  Widget build(BuildContext context) {
    return BeaverSocialProvider(
      client: _beaverClient,
      child: MaterialApp(
        home: SocialFeed(),
      ),
    );
  }
}`;

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
            Simple{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Implementation
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A few lines of code is all it takes to add powerful social features
            to your decentralized application.
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
        {/* Code examples with tabs */}
        <div className="relative z-10 rounded-xl bg-zinc-900/80 backdrop-blur-sm shadow-xl overflow-hidden border border-zinc-800/50">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="px-3 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Beaver
              </span>
              Social SDK
            </div>
          </div>

          <Tabs
            defaultValue="react"
            className="w-full"
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "react" | "node" | "flutter")
            }
          >
            <TabsList className="flex w-full bg-zinc-900 border-b border-zinc-800/50 p-0">
              <TabsTrigger
                value="react"
                className={`flex-1 px-4 py-3 text-sm border-r border-zinc-800/50 data-[state=active]:bg-zinc-800 data-[state=active]:text-transparent data-[state=active]:bg-clip-text data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-indigo-400 rounded-none`}
              >
                <Code className="mr-2 h-4 w-4" /> React
              </TabsTrigger>
              <TabsTrigger
                value="node"
                className={`flex-1 px-4 py-3 text-sm border-r border-zinc-800/50 data-[state=active]:bg-zinc-800 data-[state=active]:text-transparent data-[state=active]:bg-clip-text data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-400 data-[state=active]:to-purple-400 rounded-none`}
              >
                <Cpu className="mr-2 h-4 w-4" /> Node.js
              </TabsTrigger>
              <TabsTrigger
                value="flutter"
                className={`flex-1 px-4 py-3 text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-transparent data-[state=active]:bg-clip-text data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-blue-400 rounded-none`}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Flutter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="react" className="relative">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleCopy(reactCode, "react")}
                  className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {copied.react ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <pre className="p-4 text-sm md:text-md overflow-x-auto font-mono text-zinc-300">
                {reactCode}
              </pre>
            </TabsContent>

            <TabsContent value="node" className="relative">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleCopy(nodeCode, "node")}
                  className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {copied.node ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <pre className="p-4 text-sm md:text-md overflow-x-auto font-mono text-zinc-300">
                {nodeCode}
              </pre>
            </TabsContent>

            <TabsContent value="flutter" className="relative">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleCopy(flutterCode, "flutter")}
                  className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {copied.flutter ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <pre className="p-4 text-sm md:text-md overflow-x-auto font-mono text-zinc-300">
                {flutterCode}
              </pre>
            </TabsContent>
          </Tabs>
        </div>

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
