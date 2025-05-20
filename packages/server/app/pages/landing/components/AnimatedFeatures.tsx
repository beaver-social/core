import * as React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    BrainCircuit,
    Globe,
    CloudLightning,
    Shield,
    Users
} from "lucide-react";

const FeatureCard = ({
    title,
    description,
    icon: Icon,
    gradient,
    delay = 0
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
                boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.15)"
            }}
        >
            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg ${gradient}`}>
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
        <section id="features" className="container relative mx-auto px-4 py-24 max-w-7xl">
            {/* Section header */}
            <div className="mb-16 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
                        Powerful Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Web3 Social</span> Apps
                    </h2>
                    <p className="text-zinc-400 max-w-2xl">
                        Our platform provides all the tools needed to build engaging social experiences for your decentralized applications.
                    </p>
                </motion.div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                    title="AI-Enhanced Content"
                    description="Leverage our AI models to curate content, moderate discussions, and provide personalized recommendations."
                    icon={BrainCircuit}
                    gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                    delay={0.1}
                />

                <FeatureCard
                    title="Real-time Analytics"
                    description="Detailed analytics and insights about user engagement, content performance, and community growth."
                    icon={BarChart3}
                    gradient="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                    delay={0.2}
                />

                <FeatureCard
                    title="Global Distribution"
                    description="Content delivery across the globe with our edge-optimized infrastructure ensuring minimal latency."
                    icon={Globe}
                    gradient="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                    delay={0.3}
                />

                <FeatureCard
                    title="Community Building"
                    description="Tools designed for creating vibrant communities with roles, permissions, and governance features."
                    icon={Users}
                    gradient="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"
                    delay={0.4}
                />

                <FeatureCard
                    title="Enhanced Security"
                    description="Robust security features to protect user data and content with decentralized encryption techniques."
                    icon={Shield}
                    gradient="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
                    delay={0.5}
                />

                <FeatureCard
                    title="Performance Optimized"
                    description="Built for speed and efficiency, ensuring your applications remain responsive even at scale."
                    icon={CloudLightning}
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