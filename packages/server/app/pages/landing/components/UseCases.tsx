import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Trophy, Gamepad2, Briefcase, Heart } from "lucide-react";

const UseCase = ({
    title,
    description,
    features,
    icon: Icon,
    gradient,
    delay = 0,
}: {
    title: string;
    description: string;
    features: string[];
    icon: React.ElementType;
    gradient: string;
    delay?: number;
}) => (
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
        {/* Icon */}
        <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} border border-opacity-30 group-hover:scale-110 transition-all duration-300`}>
            <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="mb-3 text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">
            {title}
        </h3>
        <p className="text-zinc-400 mb-6 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {description}
        </p>

        {/* Features list */}
        <ul className="space-y-2">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-70"></div>
                    {feature}
                </li>
            ))}
        </ul>

        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
);

export function UseCases() {
    const useCases = [
        {
            title: "Social Networks",
            description: "Build the next Twitter, Instagram, or TikTok with decentralized ownership and Web3 benefits.",
            features: ["User profiles & authentication", "Posts, likes, comments", "Follow relationships", "Real-time feeds"],
            icon: MessageSquare,
            gradient: "from-blue-500/20 to-cyan-500/20 border-blue-400",
        },
        {
            title: "Creator Communities",
            description: "Platforms for creators to engage with fans, share content, and monetize their work through tokens.",
            features: ["Creator profiles", "Subscriber management", "Content gating", "Token integration"],
            icon: Users,
            gradient: "from-purple-500/20 to-pink-500/20 border-purple-400",
        },
        {
            title: "NFT Communities",
            description: "Build exclusive communities around NFT collections with token-gated access and social features.",
            features: ["Token-gated access", "Collection showcasing", "Community discussions", "Marketplace integration"],
            icon: Trophy,
            gradient: "from-yellow-500/20 to-orange-500/20 border-yellow-400",
        },
        {
            title: "Gaming Platforms",
            description: "Social features for games including player profiles, leaderboards, and community interaction.",
            features: ["Player profiles", "Achievement sharing", "Guild systems", "Game-specific feeds"],
            icon: Gamepad2,
            gradient: "from-green-500/20 to-emerald-500/20 border-green-400",
        },
        {
            title: "Professional Networks",
            description: "LinkedIn-style platforms for professionals with Web3 identity and verifiable credentials.",
            features: ["Professional profiles", "Skill verification", "Career networking", "Industry discussions"],
            icon: Briefcase,
            gradient: "from-indigo-500/20 to-blue-500/20 border-indigo-400",
        },
        {
            title: "Dating & Social",
            description: "Next-generation dating and friendship apps with privacy-first blockchain identity.",
            features: ["Private messaging", "Interest matching", "Social verification", "Location-based features"],
            icon: Heart,
            gradient: "from-rose-500/20 to-red-500/20 border-rose-400",
        },
    ];

    return (
        <section
            id="use-cases"
            className="container relative mx-auto px-4 max-w-7xl py-24"
        >
            {/* Background placeholder */}
            <div className="absolute inset-0 -z-10">
                <div className="w-full h-full bg-gradient-to-br from-purple-900/5 via-pink-900/5 to-orange-900/5 rounded-3xl" />
                {/* TODO: Add use case themed background */}
                {/* <img src="/images/wallpapers/social-apps.jpg" alt="" className="w-full h-full object-cover opacity-5" /> */}
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
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 backdrop-blur-sm">
                            <Trophy className="w-5 h-5 text-purple-300" />
                            <span className="text-purple-300 font-medium">Build Anything</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500">
                            Endless possibilities
                        </span>{" "}
                        for social apps
                    </h2>
                    <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                        From social networks to gaming platforms, Beaver Social provides the foundation
                        for any type of social application you can imagine.
                    </p>
                </motion.div>
            </div>

            {/* Use cases grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {useCases.map((useCase, index) => (
                    <UseCase
                        key={useCase.title}
                        title={useCase.title}
                        description={useCase.description}
                        features={useCase.features}
                        icon={useCase.icon}
                        gradient={useCase.gradient}
                        delay={index * 0.1}
                    />
                ))}
            </div>

            {/* Call to action */}
            <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-400/20">
                    <h3 className="text-2xl font-bold text-zinc-100 mb-3">
                        Have a different idea?
                    </h3>
                    <p className="text-zinc-400 mb-6">
                        Beaver Social is flexible enough to power any social application.
                        Our headless architecture adapts to your unique vision.
                    </p>
                    <motion.div
                        className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium hover:from-purple-300 hover:to-pink-300 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span>Let's discuss your project</span>
                        <motion.span
                            className="text-purple-400"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
} 