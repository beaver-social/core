import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { X, Menu } from "lucide-react";

const navItems = [
    { name: "Features", href: "#features" },
    { name: "Code", href: "#code" },
    { name: "Integrations", href: "#integrations" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
];

export function ModernNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <motion.header
            className="sticky top-0 z-50 w-full py-4 backdrop-blur-lg bg-zinc-950/80 border-b border-zinc-800/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <motion.div
                        className="relative h-10 w-10 rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full p-1.5 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400">
                            <path
                                fill="currentColor"
                                d="M12 2c-.7 0-1.3.5-1.5 1.2l-1 4c-.1.5-.5.8-1 .8H5c-.8 0-1.5.5-1.8 1.2-.3.7-.1 1.5.4 2l3.1 2.8c.3.3.5.8.3 1.2l-1.2 3.9c-.2.7.1 1.5.7 1.9.6.4 1.4.4 2 0l3.5-2.5c.4-.3 1-.3 1.4 0l3.5 2.5c.6.4 1.4.4 2 0 .6-.4.9-1.2.7-1.9l-1.2-3.9c-.1-.4 0-.9.3-1.2l3.1-2.8c.5-.5.7-1.3.4-2-.3-.7-1-1.2-1.8-1.2h-3.5c-.5 0-.9-.3-1-.8l-1-4C13.3 2.5 12.7 2 12 2z"
                            />
                        </svg>
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Beaver</span>
                        <span className="text-sm text-zinc-400 -mt-1">Social</span>
                    </div>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to={item.href}
                                className="relative rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <motion.button
                        className="rounded-full bg-zinc-800 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 border border-zinc-700/50"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Get Started
                        </span>
                    </motion.button>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="container mx-auto mt-2 rounded-xl bg-zinc-900/90 backdrop-blur-lg p-4 md:hidden border border-zinc-800/30"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <nav className="flex flex-col space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            className="mt-2 w-full rounded-lg bg-zinc-800 px-4 py-2 text-center font-medium border border-zinc-700/50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Get Started
                            </span>
                        </button>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
} 