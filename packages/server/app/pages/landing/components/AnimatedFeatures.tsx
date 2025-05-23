import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wallet,
  Link,
  Shield,
  Code,
  Zap,
  Users,
} from "lucide-react";

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-zinc-900/50 p-6 border border-zinc-800/50 hover:border-zinc-700/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg ${gradient}`}
      >
        <Icon className="h-6 w-6 text-zinc-100" />
      </div>

      <h3 className={`mb-2 text-xl font-bold ${gradient}`}>{title}</h3>
      <p className="text-zinc-400 mb-6">{description}</p>

      <div className="mt-auto flex items-center">
        <span className="text-sm font-medium text-zinc-400">Learn more</span>
        <ArrowRight className="ml-2 h-4 w-4 text-zinc-400" />
      </div>
    </motion.div>
  );
};

export function AnimatedFeatures() {
  return (
    <section
      id="features"
      className="container relative mx-auto px-4 py-24 max-w-7xl"
    >
      {/* Section header */}
      <div className="mb-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Everything you need for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Web3 Social
            </span>{" "}
            Development
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            A complete headless social network layer built on Sui blockchain,
            providing developers with modular components for creating customized social experiences.
          </p>
        </motion.div>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Blockchain Authentication"
          description="Secure Web3 authentication using wallet connections with support for Sui wallets and zkLogin technology."
          icon={Wallet}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
          delay={0.1}
        />

        <FeatureCard
          title="Social Graph API"
          description="Complete social network functionality including profiles, follows, posts, likes, and real-time interactions."
          icon={Users}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
          delay={0.2}
        />

        <FeatureCard
          title="On-chain Verification"
          description="Critical data secured and verified by the Sui blockchain using Move smart contracts for permanence."
          icon={Shield}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          delay={0.3}
        />

        <FeatureCard
          title="Developer SDKs"
          description="React, TypeScript, and React Native SDKs with comprehensive hooks and components for rapid development."
          icon={Code}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"
          delay={0.4}
        />

        <FeatureCard
          title="Action Chain Security"
          description="Cryptographic signature verification system ensures authenticity of user actions and prevents replay attacks."
          icon={Link}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
          delay={0.5}
        />

        <FeatureCard
          title="Scalable Infrastructure"
          description="Built for millions of users with optimized APIs, efficient data structures, and edge distribution."
          icon={Zap}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400"
          delay={0.6}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/2 -left-24 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl"></div>
      <div className="absolute -z-10 bottom-24 right-12 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"></div>
    </section>
  );
}
