import * as React from "react";
import { motion } from "framer-motion";
import Icon from "@/shared/components/Icon";
import { icons } from "lucide-react";

// Enhanced Integration showcase for Sui ecosystem
const EcosystemCard = ({
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
        Explore integration
      </span>
      <Icon name="ArrowRight" className="ml-2 h-4 w-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
    </div>

    {/* Hover effect background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
  </motion.div>
);

const SuiShowcase = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 p-12 border border-blue-400/30 backdrop-blur-sm"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
    }}
  >
    {/* Background pattern */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"></div>

    {/* Sui logo and branding */}
    <div className="relative z-10 text-center">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <span className="text-4xl font-bold text-white">S</span>
        </div>
      </div>

      <h3 className="text-4xl font-bold text-zinc-100 mb-4">
        Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sui</span>
      </h3>

      <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        Built natively on Sui blockchain, leveraging zkLogin, object-centric storage,
        and parallel execution for unmatched performance and user experience.
      </p>

      {/* Key Sui features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Sparkles" className="w-6 h-6 text-blue-300" />
          </div>
          <h4 className="font-semibold text-zinc-100 mb-2">zkLogin</h4>
          <p className="text-sm text-zinc-400">Web2 login, Web3 security</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" className="w-6 h-6 text-purple-300" />
          </div>
          <h4 className="font-semibold text-zinc-100 mb-2">Social Layer</h4>
          <p className="text-sm text-zinc-400">Complete social graph API</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
            <Icon name="Trophy" className="w-6 h-6 text-cyan-300" />
          </div>
          <h4 className="font-semibold text-zinc-100 mb-2">Performance</h4>
          <p className="text-sm text-zinc-400">Lightning-fast execution</p>
        </div>
      </div>

      <motion.button
        className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Explore Sui Ecosystem</span>
        <Icon name="ArrowRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>

    {/* Floating elements */}
    <motion.div
      className="absolute top-8 right-8 w-20 h-20 rounded-full bg-blue-500/20 blur-xl"
      animate={{
        y: [0, -10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-purple-500/20 blur-lg"
      animate={{
        y: [0, 10, 0],
        opacity: [0.4, 0.7, 0.4],
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
      id="ecosystem"
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
          {/* Ecosystem badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm">
              <span className="text-blue-300 font-medium">Sui Ecosystem Integration</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              Native Sui
            </span>{" "}
            Integration
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Built from the ground up to leverage Sui's unique capabilities.
            Seamlessly integrate with zkLogin, SuiNS, and the entire Sui ecosystem.
          </p>
        </motion.div>
      </div>

      {/* Main Sui showcase */}
      <div className="mb-20">
        <SuiShowcase delay={0.2} />
      </div>

      {/* Ecosystem features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EcosystemCard
          title="zkLogin Integration"
          description="Enable users to authenticate with Google, Facebook, or Apple while maintaining complete blockchain identity ownership. No seed phrases required."
          icon="Lock"
          badge="Zero Friction"
          delay={0.3}
        />

        <EcosystemCard
          title="SuiNS Domains"
          description="Leverage Sui Name Service for human-readable addresses, profile resolution, and seamless social identity across the ecosystem."
          icon="ChartArea"
          badge="Human Readable"
          delay={0.4}
        />

        <EcosystemCard
          title="Object-Centric Architecture"
          description="Built on Sui's unique object model for efficient data storage, true ownership, and composable social interactions."
          icon="Box"
          badge="Sui Native"
          delay={0.5}
        />
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute -z-10 top-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"></div>
      <div className="absolute -z-10 bottom-32 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"></div>
    </section>
  );
}
