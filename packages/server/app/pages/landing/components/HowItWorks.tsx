import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Code, Zap, Rocket } from "lucide-react";

const Step = ({
    number,
    title,
    description,
    icon: Icon,
    delay = 0,
}: {
    number: string;
    title: string;
    description: string;
    icon: React.ElementType;
    delay?: number;
}) => (
    <motion.div
        className="relative flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        {/* Step number and icon */}
        <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-10 h-10 text-blue-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{number}</span>
            </div>
        </div>

        <h3 className="text-xl font-bold text-zinc-100 mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed max-w-sm">{description}</p>
    </motion.div>
);

const CodeStep = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay }}
    >
        <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-xs text-zinc-500 ml-2">terminal</span>
            </div>

            <div className="font-mono text-sm space-y-2">
                <div className="text-zinc-400">
                    <span className="text-green-400">$</span> npm install @beaver/react
                </div>
                <div className="text-zinc-400">
                    <span className="text-green-400">$</span> npm run dev
                </div>
                <div className="text-blue-300">
                    ✓ Social features ready in 2 minutes!
                </div>
            </div>
        </div>
    </motion.div>
);

export function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="container relative mx-auto px-4 max-w-7xl py-24"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="w-full h-full bg-gradient-to-br from-zinc-900/5 via-blue-900/5 to-purple-900/5 rounded-3xl" />
            </div>

            {/* Section header */}
            <div className="mb-20 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-sm">
                            <CheckCircle className="w-5 h-5 text-green-300" />
                            <span className="text-green-300 font-medium">Simple Process</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500">
                            Get started
                        </span>{" "}
                        in minutes
                    </h2>
                    <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                        No complex setup, no blockchain knowledge required. Just install our SDK and start building social features.
                    </p>
                </motion.div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <Step
                    number="1"
                    title="Install SDK"
                    description="Add Beaver Social to your project with a single npm install command."
                    icon={Code}
                    delay={0.1}
                />

                <Step
                    number="2"
                    title="Configure Provider"
                    description="Wrap your app with BeaverProvider and add your API configuration."
                    icon={Zap}
                    delay={0.2}
                />

                <Step
                    number="3"
                    title="Build Features"
                    description="Use our hooks and components to add profiles, posts, follows, and more."
                    icon={Rocket}
                    delay={0.3}
                />
            </div>

            {/* Code example */}
            <div className="max-w-2xl mx-auto">
                <CodeStep delay={0.4} />
            </div>

            {/* Arrow connections for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex items-center gap-8">
                    <ArrowRight className="w-6 h-6 text-zinc-600 transform -translate-x-24" />
                    <ArrowRight className="w-6 h-6 text-zinc-600 transform translate-x-24" />
                </div>
            </div>
        </section>
    );
} 