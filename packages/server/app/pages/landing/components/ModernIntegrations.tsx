import * as React from "react";
import { motion } from "framer-motion";

// SVG logos of various integrations
const IntegrationLogo = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        className="flex h-16 items-center justify-center rounded-lg bg-zinc-900/60 p-4 backdrop-blur-sm border border-zinc-800/50 hover:border-zinc-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{
            y: -5,
            boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.15)"
        }}
    >
        {children}
    </motion.div>
);

export function ModernIntegrations() {
    return (
        <section id="integrations" className="container mx-auto px-4 py-24">
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
                        Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Integrations</span>
                    </h2>
                    <p className="text-zinc-400">
                        Connect with the platforms and technologies you already use. Our SDK integrates with leading blockchain networks and web3 tools.
                    </p>
                </motion.div>
            </div>

            {/* Integration logos grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <IntegrationLogo delay={0.1}>
                    <svg viewBox="0 0 32 32" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm1.922-18.207c-.276.42-.817 1.159-1.1 1.582-.143-.302-.708-1.42-1.027-2.119-.319.7-.884 1.817-1.027 2.12-.276-.43-.817-1.16-1.1-1.583-.708-.7-1.543-.183-1.225.845.234.795 1.225 2.603 2.235 2.603.94 0.845-.67 1.66.033 1.66.701 0 .917-.845.843-1.66.059 0 .059 0 .118 0 1.01 0 2-1.808 2.236-2.603.318-1.028-.517-1.545-1.226-.845h-.01zM17.929 20.915c-.05 0-.117-.042-.167-.042-.092 0-.184.042-.276.042-.184 0-.367-.084-.467-.3-.117.216-.317.3-.5.3-.084 0-.184-.042-.276-.042-.05 0-.117.042-.167.042-.234 0-.417-.175-.434-.425 0-.042.017-.084.017-.125 0-.3-.084-.592-.15-.886-.193.425-.15.927.176 1.22.1.082.15.2.15.3 0 .258-.217.466-.484.466-.15 0-.3-.084-.384-.217-.7-.886-.743-2.152-.393-3.163l.067-.184c.117-.3.334-.55.618-.67.276-.133.567-.133.843 0 .218.108.402.316.535.57.183-.41.518-.762.976-.67.443.084.593.57.618.97.05-.234.192-.402.384-.47.15-.5.31-.33.467-.33.176.033.343.117.467.26.217.25.15.669-.15.844-.117.091-.276.116-.45.091 0 0-.26-.033-.243.075.8.367.159.736.2 1.095.017-.95.017-.2.025-.251.026-.92.026-.183.034-.275 0-.283.168-.51.418-.51.184 0 .35.125.392.3.1.317.151.635.151.953.084-.317.193-.635.31-.944.042-.108.142-.175.242-.175.118 0 .21.075.26.175.092.175.159.35.193.543.75.476.05.953-.084 1.42-.066.2-.275.333-.476.333zm5.548-2.345c-.276-.418-.817-1.16-1.1-1.582-.71-.702-1.544-.183-1.225.845.234.794 1.225 2.603 2.235 2.603.943.845-.668 1.66.034 1.66.7 0 .917-.845.842-1.66.059 0 .059 0 .117 0 1.01 0 2.001-1.809 2.235-2.603.318-1.028-.517-1.545-1.225-.845-.276.423-.817 1.164-1.1 1.582-.15-.302-.71-1.42-1.027-2.119-.319.7-.885 1.817-1.027 2.12l.241-.001zM15.745 22.8c-.067.167-.192.3-.35.384-.243.108-.517.2-.784.25-.368 0-.743-.091-1.077-.258a.607.607 0 01-.31-.518c0-.308.217-.56.518-.601.025 0 .058 0 .083 0 .084 0 .167.025.242.042.168.041.334.083.502.083.025 0 .058 0 .083-.008.034-.8.05-.25.05-.059 0-.125-.092-.191-.176-.258-.117-.083-.242-.133-.367-.191-.284-.134-.568-.302-.752-.56-.159-.226-.159-.56 0-.787.159-.225.435-.316.693-.35.409-.5.827.084 1.168.334.167.116.276.3.276.5 0 .317-.259.577-.577.577-.1 0-.192-.025-.276-.067-.15-.083-.292-.175-.442-.25-.05-.025-.108-.042-.167-.042-.05 0-.1.017-.142.059-.5.058-.33.108-.8.158.34.042.092.075.134.108.176.109.36.2.534.317.284.158.485.45.46.778-.1.1-.1.2-.042.31zm.826-6.074c-.176 0-.31-.142-.31-.317V16.4c0-.175.142-.316.318-.316h.367c.125 0 .25.066.334.166.283-.27.75-.45 1.168-.375.283.05.45.3.542.56.176-.375.534-.7.968-.608.443.083.601.568.618.97.042-.235.176-.402.367-.47.159-.5.318-.25.476-.33.176.034.334.117.468.26.217.25.15.67-.15.846-.117.091-.276.116-.45.091 0 0-.26-.033-.243.074.8.368.159.736.2 1.096.017-.95.017-.2.025-.251.025-.92.025-.184.034-.276 0-.283.168-.51.417-.51.184 0 .35.126.393.3.092.318.15.636.15.953.084-.317.192-.635.31-.943.042-.108.15-.175.242-.175.117 0 .209.075.259.175.092.175.159.35.192.543.584.476.05.953-.083 1.42-.067.2-.276.333-.476.333-.05 0-.117-.042-.167-.042-.092 0-.184.042-.276.042-.184 0-.367-.084-.467-.3-.118.216-.318.3-.502.3-.083 0-.183-.042-.276-.042-.05 0-.117.042-.167.042-.234 0-.417-.175-.434-.425 0-.042.017-.084.017-.125 0-.3-.083-.593-.15-.886-.192.425-.15.928.176 1.22.1.084.15.2.15.3 0 .26-.217.467-.483.467-.15 0-.301-.083-.384-.217-.284-.351-.468-.77-.56-1.194-.117.292-.125.626 0 .92.25.075.042.158.042.241 0 .334-.276.611-.618.611-.2 0-.393-.108-.509-.276-.142-.208-.225-.459-.266-.72-.51.209-.26.452-.6.62.392.117.6.484.5.86-.108.167-.226.3-.392.384-.243.108-.518.2-.785.25-.368 0-.743-.091-1.076-.258a.607.607 0 01-.31-.518c0-.309.218-.56.518-.602.025 0 .058 0 .083 0 .084 0 .167.025.243.042.167.042.334.083.5.083.026 0 .06 0 .085-.008.033-.8.05-.25.05-.058 0-.108-.1-.183-.176-.25-.117-.084-.242-.134-.367-.192-.284-.133-.568-.3-.752-.56-.16-.225-.16-.56 0-.786.159-.225.435-.317.694-.35.408-.51.818.083 1.168.334.167.116.276.3.276.5 0 .317-.26.577-.577.577-.1 0-.192-.025-.276-.067-.15-.083-.292-.175-.443-.25-.05-.025-.108-.042-.167-.042-.05 0-.1.017-.142.058-.5.06-.34.11-.8.16.33.041.092.074.134.108.175.108.359.2.534.317.234.133.417.36.443.618-.9.059-.9.118-.25.176-.42.109-.117.2-.226.233h6.18c.15-.33.292-.133.393-.258a.81.81 0 00.133-.45c-.025-.3-.192-.56-.443-.703a5.021 5.021 0 00-.484-.258h-.008c-.017 0-.025 0-.025-.009 0-.008 0-.008.008-.008.025-.8.058-.033.084-.058l.083-.1c.1-.142.234-.25.384-.3.234-.1.492-.134.743-.1.25.032.483.14.668.315a.756.756 0 01.067.944c-.159.225-.417.325-.677.325-.134 0-.26-.025-.384-.075-.126-.05-.243-.1-.368-.133-.058-.017-.125-.025-.193-.025-.067 0-.133.025-.175.075-.017.017-.034.033-.034.067 0 .025.017.033.034.05.092.058.2.1.317.158.126.067.251.117.368.192.275.158.468.443.468.744a.874.874 0 01-.167.518.713.713 0 01-.435.342.777.777 0 01-.266.05 1.466 1.466 0 01-.568-.108c-.218-.084-.418-.21-.543-.4-.142-.217-.125-.518.1-.685.1-.75.226-.108.35-.108.117 0 .225.033.326.083.8.42.158.83.242.125.05.025.117.033.176.33.067 0 .125-.33.175-.083a.171.171 0 000-.259c-.059-.05-.126-.091-.193-.133a2.835 2.835 0 00-.25-.125c-.351-.158-.619-.401-.71-.786-.034-.2.008-.376.058-.56.017-.066-.008-.133-.075-.15a.127.127 0 00-.05 0c-.1 0-.175.083-.217.166a1.675 1.675 0 00-.1.426c0 .025 0 .042-.008.067-.017.075-.084.125-.15.125H16.57z"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.2}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75M5.75 13.5L12 22.25l6.25-8.75L12 17.25L5.75 13.5z"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.3}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.4}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M16.95 8.464l1.128-1.127a.4.4 0 000-.566l-2.06-2.06a.4.4 0 00-.566 0l-1.127 1.128 2.625 2.625zm-3.096 1.044l2.625 2.625-5.451 5.45a.4.4 0 01-.283.118h-2.06a.4.4 0 01-.4-.4v-2.06a.4.4 0 01.118-.284l5.45-5.45z"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.5}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M6 5h12v2H6zm0 6h12v2H6zm0 6h12v2H6z"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.6}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm2-10a2 2 0 01-4 0 2 2 0 14 0zm4 4a6 6 0 01-12 0h12z"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.7}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        />
                    </svg>
                </IntegrationLogo>

                <IntegrationLogo delay={0.8}>
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-zinc-300">
                        <path
                            fill="currentColor"
                            d="M3 1h18v2H3zm0 10h18v2H3zm0 10h18v2H3zm3-5h12v2H6zm0-10h12v2H6z"
                        />
                    </svg>
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
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">Blockchain Support</h3>
                    <p className="text-zinc-400">
                        Native integration with Sui, Ethereum, Solana, and other popular blockchain networks.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Developer Tools</h3>
                    <p className="text-zinc-400">
                        Comprehensive SDKs for React, Node.js, Flutter, and more with detailed documentation.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800/50 hover:border-zinc-700/50 transition-all"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">API Connectivity</h3>
                    <p className="text-zinc-400">
                        RESTful and GraphQL APIs for seamless integration with your existing infrastructure.
                    </p>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 left-1/4 w-32 h-32 rounded-full bg-indigo-600/10 blur-2xl"></div>
        </section>
    );
} 