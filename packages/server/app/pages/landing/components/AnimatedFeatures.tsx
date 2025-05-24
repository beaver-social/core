import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  Wallet,
  Globe,
  Layers,
  Lock,
  Rocket,
} from "lucide-react";

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  delay = 0,
  badge,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  delay?: number;
  badge?: string;
}) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 p-8 border border-zinc-700/50 hover:border-blue-400/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.15)",
      }}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <div className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
            <span className="text-xs font-medium text-blue-300">{badge}</span>
          </div>
        </div>
      )}

      {/* Icon with Sui-style gradient background */}
      <div
        className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300`}
      >
        <Icon className="h-7 w-7 text-blue-300 group-hover:text-blue-200" />
      </div>

      <h3 className="mb-3 text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">
        {description}
      </p>

      <div className="mt-auto flex items-center group-hover:text-blue-300 transition-colors">
        <span className="text-sm font-medium text-zinc-500 group-hover:text-blue-400">
          Learn more
        </span>
        <ArrowRight className="ml-2 h-4 w-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );
};

export function AnimatedFeatures() {
  return (
    <section
      id="features"
      className="container relative mx-auto px-4 max-w-7xl py-20"
    >
      {/* Section header with Sui emphasis */}
      <div className="mb-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Sui ecosystem badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-blue-300 font-medium">Built for Sui Ecosystem</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              Sui delivers
            </span>{" "}
            the benefits of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Web3
            </span>
            <br />
            with the ease of{" "}
            <span className="text-zinc-100">Web2</span>
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Leverage Sui's revolutionary architecture to build social applications that feel familiar to users
            while providing the security, ownership, and innovation that only Web3 can offer.
          </p>
        </motion.div>
      </div>

      {/* Features grid with Sui-focused benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="zkLogin Authentication"
          description="Users can log in with their existing Web2 credentials (Google, Facebook, Apple) while maintaining full ownership of their blockchain identity. No seed phrases, no friction."
          icon={Lock}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
          delay={0.1}
          badge="Sui Native"
        />

        <FeatureCard
          title="Familiar User Experience"
          description="Using apps on Sui feels as easy as logging in with your web credentials. Users get Web3 benefits without the complexity of traditional blockchain interactions."
          icon={Globe}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
          delay={0.2}
          badge="UX First"
        />

        <FeatureCard
          title="Object-Centric Ownership"
          description="Assets are stored securely on-chain with Sui's unique object model, evolving with user needs while maintaining true ownership and composability."
          icon={Shield}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          delay={0.3}
          badge="Sui Exclusive"
        />

        <FeatureCard
          title="Parallel Execution"
          description="Sui's architecture enables parallel transaction processing, delivering lightning-fast performance that scales with your user base."
          icon={Zap}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"
          delay={0.4}
          badge="High Performance"
        />

        <FeatureCard
          title="Social Graph API"
          description="Complete social network functionality with cryptographically-verified profiles, follows, posts, and interactions. Built for the Sui ecosystem."
          icon={Users}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
          delay={0.5}
          badge="Social Layer"
        />

        <FeatureCard
          title="Developer Experience"
          description="Comprehensive SDKs and tools designed specifically for Sui. Move smart contracts, TypeScript support, and React hooks that just work."
          icon={Layers}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"
          delay={0.6}
          badge="Dev Friendly"
        />
      </div>

      {/* Call to action section */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
            Ready to build the future of social on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Sui
            </span>
            ?
          </h3>
          <p className="text-lg text-zinc-400 mb-8">
            Join the ecosystem of builders creating the next generation of decentralized social applications.
          </p>
          <motion.button
            className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Rocket className="w-5 h-5" />
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced decorative elements with Sui branding */}
      <div className="absolute -z-10 top-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"></div>
      <div className="absolute -z-10 bottom-32 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"></div>
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-3xl"></div>
    </section>
  );
}
