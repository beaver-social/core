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
  const [copied, setCopied] = React.useState({ react: false, node: false, "react-native": false, }); const handleCopy = (code: string, type: "react" | "node" | "react-native") => { navigator.clipboard.writeText(code); setCopied({ ...copied, [type]: true }); setTimeout(() => setCopied({ ...copied, [type]: false }), 2000); };

  const reactCode = `import { BeaverProvider, useBeaver, usePost } from '@beaver/react';import { QueryClient, QueryClientProvider } from '@tanstack/react-query';const queryClient = new QueryClient();function App() {  return (    <QueryClientProvider client={queryClient}>      <BeaverProvider        config={{          network: "testnet",          apiBaseUrl: "https://testnet.api.beaver.social/v1",          zkLoginWallets: { enabled: true },          appId: "your-app-id"        }}      >        <SocialFeed />      </BeaverProvider>    </QueryClientProvider>  );}function SocialFeed() {  const { user } = useBeaver();  const { getPosts } = usePost();  const { data } = getPosts({ perPage: 10 });  return (    <div>      <h1>Welcome, {user?.username}!</h1>      {data?.pages.map(page =>         page.posts.map(post => (          <div key={post.id}>{post.content}</div>        ))      )}    </div>  );}`;

  const nodeCode = `// Direct API integration exampleimport fetch from 'node-fetch';const API_BASE = 'https://testnet.api.beaver.social/v1';// Authenticate user with wallet signatureasync function loginUser(walletAddress, signature) {  const response = await fetch(\`\${API_BASE}/users/login\`, {    method: 'POST',    headers: { 'Content-Type': 'application/json' },    body: JSON.stringify({      walletAddress,      signature    })  });    const { data } = await response.json();  return data; // { userId, username, jwt }}// Create a social postasync function createPost(content, jwt) {  const response = await fetch(\`\${API_BASE}/posts/create\`, {    method: 'POST',    headers: {       'Content-Type': 'application/json',      'Authorization': \`Bearer \${jwt}\`    },    body: JSON.stringify({ content })  });    return await response.json();}`;

  const reactNativeCode = `import { BeaverProvider, useBeaver, usePost } from '@beaver/react-native';import { QueryClient, QueryClientProvider } from '@tanstack/react-query';const queryClient = new QueryClient();function App() {  return (    <QueryClientProvider client={queryClient}>      <BeaverProvider        config={{          network: "testnet",          apiBaseUrl: "https://testnet.api.beaver.social/v1",          zkLoginWallets: { enabled: true },          appId: "your-app-id"        }}      >        <SocialApp />      </BeaverProvider>    </QueryClientProvider>  );}function SocialApp() {  const { user } = useBeaver();  const { createPost } = usePost();  return (    <View>      <Text>Welcome, {user?.username}!</Text>      <Button        title="Create Post"        onPress={() => createPost.mutate({          content: "Hello from React Native!"        })}      />    </View>  );}`;

  return (
    <section id="code" className="container mx-auto px-4 py-24">
      <div className="flex flex-col items-center justify-center text-center mb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">            Developer{" "}            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">              Experience            </span>          </h2>          <p className="text-zinc-400 max-w-2xl mx-auto">            Integrate Beaver Social into your React, Node.js, or mobile app with our             comprehensive SDKs and RESTful API.          </p>
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
            onValueChange={(value) => setActiveTab(value as "react" | "node" | "react-native")}
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
              <TabsTrigger value="react-native" className={`flex-1 px-4 py-3 text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-transparent data-[state=active]:bg-clip-text data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-blue-400 rounded-none`}              >                <Sparkles className="mr-2 h-4 w-4" /> React Native              </TabsTrigger>
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

            <TabsContent value="react-native" className="relative">              <div className="absolute top-2 right-2 z-10">                <button onClick={() => handleCopy(reactNativeCode, "react-native")} className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"                >                  {copied["react-native"] ? (<Check className="h-4 w-4 text-green-400" />) : (<Copy className="h-4 w-4" />)}                </button>              </div>              <pre className="p-4 text-sm md:text-md overflow-x-auto font-mono text-zinc-300">                {reactNativeCode}              </pre>            </TabsContent>
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
