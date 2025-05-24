import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  Code,
  Globe,
  Layers,
  Package,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router";
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

      {/* Icon with gradient background */}
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
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
  const navigate = useNavigate();
  return (
    <section
      id="features"
      className="container relative mx-auto px-4 max-w-7xl py-20"
    >
      {/* Abstract wallpaper placeholder */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-cyan-900/5 rounded-3xl" />
        {/* TODO: Replace with actual abstract wallpaper */}
        {/* <img src="/images/wallpapers/abstract-nodes.jpg" alt="" className="w-full h-full object-cover opacity-5" /> */}
      </div>

      {/* Section header focused on Beaver Social */}
      <div className="mb-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Developer-focused badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm">
              <Code className="w-5 h-5 text-blue-300" />
              <span className="text-blue-300 font-medium">Developer-First Social Infrastructure</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              Everything you need
            </span>{" "}
            to build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              social apps
            </span>
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            From authentication to social graphs, Beaver Social provides the complete toolkit
            for building modern social applications with Web3 benefits.
          </p>
        </motion.div>
      </div>

      {/* Features grid focused on developer experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Wallet Authentication"
          description="Seamless wallet connection with support for major wallets. Users authenticate with their crypto wallet while you handle the rest through our APIs."
          icon={Shield}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
          delay={0.1}
          badge="Ready to Use"
        />

        <FeatureCard
          title="Social Graph API"
          description="Complete social network functionality including user profiles, following relationships, posts, likes, and comments. All accessible through simple REST APIs."
          icon={Users}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
          delay={0.2}
          badge="Complete"
        />

        <FeatureCard
          title="Blockchain Verification"
          description="Critical social interactions are verified on-chain for authenticity and permanence, while maintaining fast performance for everyday usage."
          icon={Zap}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          delay={0.3}
          badge="Web3 Native"
        />

        <FeatureCard
          title="TypeScript SDK"
          description="Fully typed client SDK with comprehensive documentation. Get autocomplete, type safety, and excellent developer experience out of the box."
          icon={Package}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"
          delay={0.4}
          badge="Type Safe"
        />

        <FeatureCard
          title="React Components"
          description="Pre-built React hooks and components for common social features. Build your UI faster with battle-tested components and patterns."
          icon={Layers}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
          delay={0.5}
          badge="React Ready"
        />

        <FeatureCard
          title="Headless Architecture"
          description="Build any UI you want while leveraging our robust backend. From mobile apps to web platforms, customize the experience for your users."
          icon={Globe}
          gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"
          delay={0.6}
          badge="Flexible"
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
            Ready to ship your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              social app
            </span>
            ?
          </h3>
          <p className="text-lg text-zinc-400 mb-8">
            Join developers building the next generation of social applications with Beaver Social.
          </p>
          <motion.button
            className="group inline-flex items-center gap-3 px-6 py-3 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300 border border-transparent hover:border-blue-400/50 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              navigate("/docs/getting-started");
            }}
          >
            <Rocket className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
