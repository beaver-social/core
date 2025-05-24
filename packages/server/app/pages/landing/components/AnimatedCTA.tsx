import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Icon from "@/shared/components/Icon";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Users,
  Globe,
  Code,
  Rocket,
  BookOpen
} from "lucide-react";

const DeveloperFeature = ({
  icon: IconComponent,
  title,
  description,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    className="group text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
      <IconComponent className="w-8 h-8 text-blue-300 group-hover:text-blue-200" />
    </div>
    <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">
      {title}
    </h3>
    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
      {description}
    </p>
  </motion.div>
);

export function AnimatedCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-32">
      {/* Minimalistic floating background elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Developer-focused showcase header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Developer badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400/30 to-purple-400/30 border border-blue-400/40 flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-300" />
              </div>
              <span className="text-blue-300 font-semibold text-lg">Developer Platform</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 mb-8 leading-tight">
            <span className="text-zinc-200">Build Apps</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              Faster Than Ever.
            </span>
          </h2>

          <p className="text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Focus on creating amazing <span className="text-blue-400 font-semibold">user experiences</span> while
            Beaver handles the <span className="text-purple-400 font-medium">complex infrastructure.</span>
          </p>

          {/* Main value proposition */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Left side - Developer Benefits */}
              <div className="space-y-8">
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-zinc-100 mb-4">
                    Ship features, not infrastructure
                  </h3>
                  <p className="text-xl text-zinc-300 leading-relaxed">
                    Get authentication, profiles, posts, and social graphs out of the box.
                    Build what makes your app unique.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DeveloperFeature
                    icon={Rocket}
                    title="Quick Setup"
                    description="Get started in minutes with our SDKs"
                    delay={0.3}
                  />
                  <DeveloperFeature
                    icon={Shield}
                    title="Secure by Default"
                    description="Blockchain-verified social interactions"
                    delay={0.4}
                  />
                  <DeveloperFeature
                    icon={Zap}
                    title="High Performance"
                    description="Built for scale and speed"
                    delay={0.5}
                  />
                  <DeveloperFeature
                    icon={Users}
                    title="Complete Social Stack"
                    description="Everything from auth to social graphs"
                    delay={0.6}
                  />
                </div>
              </div>

              {/* Right side - Code showcase placeholder */}
              <div className="relative">
                <motion.div
                  className="relative rounded-3xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 p-12 border border-blue-400/20 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Code preview mockup */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <span className="text-2xl font-bold text-blue-300">B</span>
                    </div>

                    <h4 className="text-2xl font-bold text-zinc-100 mb-6">Get Started with Beaver</h4>

                    {/* Mock code snippet */}
                    <div className="text-left bg-zinc-900/50 rounded-xl p-4 mb-6 border border-zinc-700/50">
                      <div className="text-sm text-zinc-400 mb-2">// Add social features to your app</div>
                      <div className="text-sm font-mono text-zinc-300">
                        <div className="text-blue-400">import</div> {`{ BeaverProvider }`} <div className="text-blue-400">from</div> <div className="text-green-400">'@beaver/react'</div>
                      </div>
                      <br />
                      <div className="text-sm font-mono text-zinc-300">
                        <div className="text-purple-400">const</div> app = <div className="text-blue-400">new</div> <div className="text-yellow-400">BeaverApp</div>()
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400">
                      ⚡ Powered by Web3 technology
                    </p>
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -right-4 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-xs font-medium text-green-300">Type Safe</span>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-xs font-medium text-purple-300">Scalable</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="group flex items-center gap-3 px-8 py-4 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300 border border-transparent hover:border-blue-400/50 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/docs/getting-started")}
            >
              <Rocket className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span>Start Building Today</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-3 px-8 py-4 text-xl font-medium text-zinc-400 hover:text-zinc-300 border border-zinc-700 hover:border-zinc-600 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/docs")}
            >
              <BookOpen className="w-6 h-6" />
              <span>Read Documentation</span>
            </motion.button>
          </div>

          <p className="text-zinc-400 text-lg">
            Join developers building the future of <span className="text-blue-400 font-semibold">social applications</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
