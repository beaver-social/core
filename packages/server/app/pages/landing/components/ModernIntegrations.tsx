import * as React from "react";
import { motion } from "framer-motion";
import Icon from "@/shared/components/Icon";
import { icons } from "lucide-react";
import { Image } from "@/shared/components/Image";

// Developer-focused Integration showcase
const IntegrationCard = ({
  title,
  description,
  icon,
  badge,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: keyof typeof icons;
  badge: string;
  delay?: number;
}) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/60 p-8 border border-zinc-700/50 hover:border-blue-400/50 backdrop-blur-sm"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{
      y: -8,
      boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.2)",
    }}
  >
    {/* Badge */}
    <div className="absolute top-4 right-4">
      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
        <span className="text-xs font-medium text-blue-300">{badge}</span>
      </div>
    </div>

    {/* Icon */}
    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
      <Icon name={icon} className="h-8 w-8 text-blue-300 group-hover:text-blue-200" />
    </div>

    <h3 className="mb-3 text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">
      {title}
    </h3>
    <p className="text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">
      {description}
    </p>

    <div className="mt-auto flex items-center group-hover:text-blue-300 transition-colors">
      <span className="text-sm font-medium text-zinc-500 group-hover:text-blue-400">
        Learn more
      </span>
      <Icon name="ArrowRight" className="ml-2 h-4 w-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
    </div>

    {/* Hover effect background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
  </motion.div>
);

const TechStackShowcase = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 p-12 border border-blue-400/20 backdrop-blur-sm"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
    }}
  >
    {/* Background pattern placeholder */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50"></div>
    {/* TODO: Add actual background pattern/wallpaper */}
    {/* <img src="/images/wallpapers/dev-stack.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" /> */}

    {/* Tech stack showcase */}
    <div className="relative z-10 text-center">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
          <Icon name="Code" className="w-12 h-12 text-blue-300" />
        </div>
      </div>

      <h3 className="text-4xl font-bold text-zinc-100 mb-4">
        Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Developers</span>
      </h3>

      <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        Integrate Beaver Social with your favorite tools and frameworks.
        From React to Next.js, from TypeScript to mobile development.
      </p>

      {/* Development stack features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Smartphone" className="w-6 h-6 text-blue-300" />
          </div>
          <h4 className="font-semibold text-zinc-100 mb-2">React & React Native</h4>
          <p className="text-sm text-zinc-400">Cross-platform SDKs</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="FileCode" className="w-6 h-6 text-purple-300" />
          </div>
          <h4 className="font-semibold text-zinc-100 mb-2">TypeScript</h4>
          <p className="text-sm text-zinc-400">Full type safety</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" className="w-6 h-6 text-cyan-300" />
          </div>
          <h4 className="font-semibold text-zinc-100 mb-2">REST API</h4>
          <p className="text-sm text-zinc-400">Language agnostic</p>
        </div>
      </div>

      <motion.button
        className="group inline-flex items-center gap-3 px-6 py-3 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300 border border-transparent hover:border-blue-400/50 rounded-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>View Documentation</span>
        <Icon name="ArrowRight" className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
      </motion.button>
    </div>

    {/* Floating elements */}
    <motion.div
      className="absolute top-8 right-8 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
      animate={{
        y: [0, -10, 0],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-purple-500/10 blur-lg"
      animate={{
        y: [0, 10, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

export function ModernIntegrations() {
  return (
    <section
      id="integrations"
      className="container mx-auto px-4 py-24 max-w-7xl relative"
    >
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          {/* Integration badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm">
              <Icon name="Layers" className="w-5 h-5 text-blue-300" />
              <span className="text-blue-300 font-medium">Framework Integrations</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 leading-tight">
            <span className="text-zinc-200">Works with </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              your stack.
            </span>
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Beaver Social integrates seamlessly with popular development tools and frameworks.
            Use the tools you love while getting powerful social features.
          </p>
        </motion.div>
      </div>

      {/* Main tech stack showcase */}
      <div className="mb-20">
        <TechStackShowcase delay={0.2} />
      </div>

      {/* Integration features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <IntegrationCard
          title="React SDK"
          description="Pre-built hooks and components for React applications. Get social features running in minutes with familiar patterns."
          icon="Globe"
          badge="React"
          delay={0.1}
        />

        <IntegrationCard
          title="TypeScript SDK"
          description="Fully typed SDK with excellent IntelliSense support. Catch errors at compile time and build with confidence."
          icon="FileCode"
          badge="TypeScript"
          delay={0.2}
        />

        <IntegrationCard
          title="Mobile Ready"
          description="React Native SDK for building mobile social apps. Shared codebase with platform-specific optimizations."
          icon="Smartphone"
          badge="Mobile"
          delay={0.4}
        />
      </div>


      {/* Blockchain mention - subtle */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-400/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <span className="text-sm font-bold text-white">⚡</span>
            </div>
            <span className="text-zinc-300 font-medium">Powered by Sui blockchain</span>
          </div>
          <p className="text-zinc-400 text-sm">
            Built on Sui for fast, secure, and cost-effective social interactions with Web3 benefits.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
