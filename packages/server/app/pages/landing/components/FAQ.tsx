import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router";
import Icon from "@/shared/components/Icon";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQAccordion = ({
    question,
    answer,
    isOpen,
    onToggle,
    delay = 0
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    delay?: number;
}) => (
    <motion.div
        className="transition-all duration-300 border group border-zinc-700/50 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 backdrop-blur-sm hover:border-blue-400/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        <button
            className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
            onClick={onToggle}
        >
            <h3 className="pr-4 text-lg font-semibold transition-colors text-zinc-100 group-hover:text-white">
                {question}
            </h3>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
            >
                <ChevronDown className="w-5 h-5 transition-colors text-zinc-400 group-hover:text-blue-400" />
            </motion.div>
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="px-6 pt-0 pb-6">
                        <p className="leading-relaxed whitespace-pre-line text-zinc-400">
                            {answer}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

export function FAQ() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);
    const navigate = useNavigate();

    const faqData: FAQItem[] = [
        {
            question: "What makes Beaver Social different from other social APIs?",
            answer: "Beaver Social is built specifically for Web3 developers with blockchain-native features like wallet authentication, verifiable social interactions, and decentralized identity. Unlike traditional social APIs, we provide both the social infrastructure and Web3 primitives you need to build modern social applications."
        },
        {
            question: "Do I need blockchain knowledge to use Beaver Social?",
            answer: "Not at all! Our SDKs abstract away the blockchain complexity. You can build social features using familiar React patterns and REST APIs. The blockchain benefits (like verifiable identities and decentralized ownership) work behind the scenes without requiring blockchain expertise."
        },
        {
            question: "What pricing model do you use?",
            answer: "We offer a generous free tier for developers getting started, with usage-based pricing for production applications. Our pricing scales with your success - you only pay as your user base grows."
        },
        {
            question: "How can I get started with development?",
            answer: "You will need to create an account with us and then get an AppId (Check Docs). You can then use the AppId to initialize the SDKs and start building."
        },
        {
            question: "What about performance and scalability?",
            answer: "Beaver Social is designed for production scale. We use a hybrid approach where common operations are handled off-chain for speed, while critical social interactions are verified on-chain for authenticity. This gives you both performance and Web3 benefits."
        },
    ];

    return (
        <div id="faq" className="flex flex-col items-center justify-center gap-20">
            <div
                className="container relative max-w-5xl px-4 py-24 mx-auto"
            >
                {/* Background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-900/5 via-blue-900/5 to-indigo-900/5 rounded-3xl" />
                </div>

                {/* Section header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-3 px-6 py-3 border rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-400/20 backdrop-blur-sm">
                                <HelpCircle className="w-5 h-5 text-cyan-300" />
                                <span className="font-medium text-cyan-300">Questions & Answers</span>
                            </div>
                        </div>

                        <h2 className="mb-6 text-4xl font-bold leading-tight md:text-6xl text-zinc-100">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                                Frequently asked
                            </span>{" "}
                            questions
                        </h2>
                        <p className="max-w-2xl mx-auto text-xl leading-relaxed text-zinc-300">
                            Get answers to common questions about integrating Beaver Social into your applications.
                        </p>
                    </motion.div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FAQAccordion
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Additional help section */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <div className="max-w-2xl p-8 mx-auto border rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-cyan-400/20">
                        <h3 className="mb-3 text-xl font-bold text-zinc-100">
                            Still have questions?
                        </h3>
                        <p className="mb-6 text-zinc-400">
                            Join our developer community or reach out to our team directly.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <motion.div
                                className="inline-flex items-center gap-2 font-medium text-transparent transition-all duration-300 cursor-pointer bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-300 hover:to-indigo-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span>Contact Us</span>
                                <motion.span
                                    className="text-blue-400"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                >
                                    →
                                </motion.span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
                className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-transparent transition-all duration-300 hover:border group bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300 hover:border-blue-400/50 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                    navigate("/docs/getting-started");
                }}
            >
                <span>Start Building</span>
                <Icon name="ArrowRight" className="w-5 h-5 text-blue-400 transition-colors group-hover:text-blue-300" />
            </motion.button>
        </div>
    );
} 