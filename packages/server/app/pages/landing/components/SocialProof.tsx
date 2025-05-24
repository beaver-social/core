import * as React from "react";
import { motion } from "framer-motion";
import { Star, Github, Users, Zap, Globe, TrendingUp } from "lucide-react";

const StatCard = ({
    icon: Icon,
    value,
    label,
    delay = 0,
    gradient
}: {
    icon: React.ElementType;
    value: string;
    label: string;
    delay?: number;
    gradient: string;
}) => (
    <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} border border-opacity-30 mb-4 backdrop-blur-sm`}>
            <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2">
            {value}
        </div>
        <div className="text-zinc-400 text-sm">
            {label}
        </div>
    </motion.div>
);

const TestimonialCard = ({
    quote,
    author,
    role,
    company,
    delay = 0
}: {
    quote: string;
    author: string;
    role: string;
    company: string;
    delay?: number;
}) => (
    <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 p-6 border border-zinc-700/50 hover:border-blue-400/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{
            y: -5,
            boxShadow: "0 15px 30px -12px rgba(59, 130, 246, 0.15)",
        }}
    >
        {/* Quote */}
        <div className="mb-4">
            <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm">
                "{quote}"
            </p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                <span className="text-blue-300 font-semibold text-sm">
                    {author.split(' ').map(n => n[0]).join('')}
                </span>
            </div>
            <div>
                <div className="text-zinc-100 font-semibold text-sm">{author}</div>
                <div className="text-zinc-500 text-xs">{role} at {company}</div>
            </div>
        </div>

        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
);

export function SocialProof() {
    const stats = [
        {
            icon: Github,
            value: "1.2k+",
            label: "GitHub Stars",
            gradient: "from-purple-500/20 to-pink-500/20 border-purple-400"
        },
        {
            icon: Users,
            value: "500+",
            label: "Developers",
            gradient: "from-blue-500/20 to-cyan-500/20 border-blue-400"
        },
        {
            icon: Zap,
            value: "99.9%",
            label: "Uptime",
            gradient: "from-green-500/20 to-emerald-500/20 border-green-400"
        },
        {
            icon: Globe,
            value: "10M+",
            label: "API Calls",
            gradient: "from-orange-500/20 to-red-500/20 border-orange-400"
        }
    ];

    const testimonials = [
        {
            quote: "Beaver Social saved us months of development time. The wallet authentication just works, and the social graph APIs are exactly what we needed for our NFT community platform.",
            author: "Sarah Chen",
            role: "CTO",
            company: "MetaVerse Studios"
        },
        {
            quote: "The developer experience is fantastic. TypeScript support, great docs, and the React hooks make building social features feel natural. We went from idea to MVP in just 2 weeks.",
            author: "Marcus Rodriguez",
            role: "Lead Developer",
            company: "SocialFi Labs"
        },
        {
            quote: "We needed a social layer for our gaming platform that could handle Web3 identities. Beaver Social's headless approach let us build exactly the UX we wanted while getting all the backend complexity handled.",
            author: "Alex Kim",
            role: "Product Manager",
            company: "GameChain"
        }
    ];

    return (
        <section
            id="social-proof"
            className="container relative mx-auto px-4 max-w-7xl py-24"
        >
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/5 via-purple-900/5 to-pink-900/5 rounded-3xl" />
            </div>

            {/* Stats section */}
            <div className="mb-20">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 backdrop-blur-sm">
                            <TrendingUp className="w-5 h-5 text-indigo-300" />
                            <span className="text-indigo-300 font-medium">Trusted by Developers</span>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                            Growing fast
                        </span>{" "}
                        with developers worldwide
                    </h2>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            gradient={stat.gradient}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>

            {/* Testimonials section */}
            <div>
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-2xl md:text-4xl font-bold text-zinc-100 mb-4">
                        What developers are saying
                    </h3>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Real feedback from developers building amazing social applications with Beaver Social.
                    </p>
                </motion.div>

                {/* Testimonials grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.author}
                            quote={testimonial.quote}
                            author={testimonial.author}
                            role={testimonial.role}
                            company={testimonial.company}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>

            {/* Community call to action */}
            <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-400/20">
                    <h3 className="text-xl font-bold text-zinc-100 mb-3">
                        Join our developer community
                    </h3>
                    <p className="text-zinc-400 mb-6">
                        Connect with other developers, share your projects, and get help from our team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div
                            className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium hover:from-indigo-300 hover:to-purple-300 transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Github className="w-5 h-5 text-indigo-400" />
                            <span>Star on GitHub</span>
                            <motion.span
                                className="text-indigo-400"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
} 