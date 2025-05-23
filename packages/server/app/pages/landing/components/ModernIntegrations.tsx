import * as React from "react";
import { motion } from "framer-motion";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";

// SVG logos of various integrations
const IntegrationLogo = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    className="flex items-center justify-center rounded-lg bg-zinc-900/60 p-4 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      y: -5,
      boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.15)",
    }}
  >
    {children}
  </motion.div>
);

export function ModernIntegrations() {
  return (
    <section
      id="integrations"
      className="container mx-auto px-4 py-24 max-w-7xl"
    >
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Seamless{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Integrations
            </span>
          </h2>
          <p className="text-zinc-400">
            Connect with the platforms and technologies you already use. Our SDK
            integrates with leading blockchain networks and web3 tools.
          </p>
        </motion.div>
      </div>

      {/* Integration logos grid */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <IntegrationLogo delay={0.1}>
          <Image src="/icons/sui.png" alt="Sui" className="w-20" />
        </IntegrationLogo>
        <IntegrationLogo delay={0.1}>
          <Image src="/icons/suins.png" alt="Suins" className="w-28" />
        </IntegrationLogo>
      </div>

      {/* Integration features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <Icon name="Blocks" className="size-5 text-purple-400" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Built on Sui
            </h3>
          </div>
          <p className="text-zinc-400">
            Native integration with Sui Blockchain, SuiNS, Sui ZKLogin & Sui
            Wallets providing rich on-chain experiences.
          </p>
        </motion.div>

        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Icon name="Package" className="size-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Rich Ecosystem
            </h3>
          </div>
          <p className="text-zinc-400">
            Integrated with SuiNS, Sui ZKLogin & Sui Wallets for frictionless & rich user
            experiences.
          </p>
        </motion.div>

        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Icon name="FolderCode" className="size-5 text-blue-400" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Developer Tools
            </h3>
          </div>
          <p className="text-zinc-400">
            SDKs for Vanilla JS, React and React Native with detailed
            documentation.
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 left-1/4 w-32 h-32 rounded-full bg-indigo-600/10 blur-2xl"></div>
    </section>
  );
}
