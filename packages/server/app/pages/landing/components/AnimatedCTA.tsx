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
  Lock,
  Smartphone
} from "lucide-react";

const ZkLoginFeature = ({
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
      {/* Background with Sui-style gradients */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-blue-950/20 to-purple-950/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-purple-600/5"></div> */}

      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* zkLogin showcase header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* zkLogin badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-blue-300 font-semibold text-lg">Sui zkLogin</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              zkLogin
            </span>
            <br />
            <span className="text-zinc-200">Ownership as you</span>
            <br />
            <span className="text-zinc-200">expect it</span>
          </h2>

          <p className="text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Users can log in with their existing <span className="text-blue-400 font-semibold">Web2 credentials</span> while
            maintaining complete blockchain identity ownership. <span className="text-purple-400 font-medium">No seed phrases, no friction.</span>
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
              {/* Left side - Benefits */}
              <div className="space-y-8">
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-zinc-100 mb-4">
                    Familiar user experience
                  </h3>
                  <p className="text-xl text-zinc-300 leading-relaxed">
                    Using apps on Sui can be as easy as logging in with your web credentials.
                    Users get Web3 benefits without the complexity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ZkLoginFeature
                    icon={Smartphone}
                    title="Web2 Login"
                    description="Google, Facebook, Apple authentication"
                    delay={0.3}
                  />
                  <ZkLoginFeature
                    icon={Shield}
                    title="Web3 Security"
                    description="Full blockchain ownership & control"
                    delay={0.4}
                  />
                  <ZkLoginFeature
                    icon={Zap}
                    title="Zero Friction"
                    description="No seed phrases or complex setup"
                    delay={0.5}
                  />
                  <ZkLoginFeature
                    icon={Globe}
                    title="Universal"
                    description="Works across the entire Sui ecosystem"
                    delay={0.6}
                  />
                </div>
              </div>

              {/* Right side - Visual showcase */}
              <div className="relative">
                <motion.div
                  className="relative rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 p-12 border border-blue-400/30 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* zkLogin UI mockup */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                      <span className="text-3xl font-bold text-white">S</span>
                    </div>

                    <h4 className="text-2xl font-bold text-zinc-100 mb-6">Welcome to Beaver Social</h4>

                    {/* Mock login buttons */}
                    <div className="space-y-3 mb-6">
                      <button className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-white/10 border border-white/20 text-zinc-200 hover:bg-white/15 transition-colors">
                        <div className="w-5 h-5 rounded bg-blue-500"></div>
                        <span>Continue with Google</span>
                      </button>
                      <button className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-white/10 border border-white/20 text-zinc-200 hover:bg-white/15 transition-colors">
                        <div className="w-5 h-5 rounded bg-indigo-600"></div>
                        <span>Continue with Facebook</span>
                      </button>
                      <button className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-white/10 border border-white/20 text-zinc-200 hover:bg-white/15 transition-colors">
                        <div className="w-5 h-5 rounded bg-zinc-800"></div>
                        <span>Continue with Apple</span>
                      </button>
                    </div>

                    <p className="text-sm text-zinc-400">
                      ⚡ Powered by Sui zkLogin
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
                    <span className="text-xs font-medium text-green-300">Secure</span>
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
                    <span className="text-xs font-medium text-purple-300">Decentralized</span>
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
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 px-10 py-5 text-xl font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/docs/getting-started")}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Experience zkLogin Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="flex items-center gap-3 rounded-xl px-8 py-5 text-xl font-medium text-zinc-300 border-2 border-zinc-600 hover:border-blue-400/50 hover:text-zinc-100 hover:bg-blue-500/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/app")}
            >
              <Icon name="Play" className="w-6 h-6" />
              <span>View Demo</span>
            </motion.button>
          </div>

          <p className="text-zinc-400 text-lg">
            Join the future of social applications on <span className="text-blue-400 font-semibold">Sui blockchain</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
