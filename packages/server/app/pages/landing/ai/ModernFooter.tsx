import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
    Github,
    Twitter,
    Linkedin,
    Youtube,
    MessageCircle,
    ArrowUpRight
} from "lucide-react";

export function ModernFooter() {
    const currentYear = new Date().getFullYear();

    // Footer sections with links
    const footerSections = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Integrations", href: "#integrations" },
                { label: "Demo", href: "#" },
                { label: "Changelog", href: "#" }
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "Documentation", href: "#" },
                { label: "API Reference", href: "#" },
                { label: "Tutorials", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Community", href: "#" }
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "#" },
                { label: "Team", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Press", href: "#" },
                { label: "Contact", href: "#" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Security", href: "#" },
                { label: "Cookies", href: "#" }
            ]
        }
    ];

    // Social links
    const socialLinks = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Youtube, href: "#", label: "YouTube" },
        { icon: MessageCircle, href: "#", label: "Discord" }
    ];

    return (
        <footer className="border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-md">
            <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
                {/* Top section with logo and navigation */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-12">
                    {/* Logo and company info */}
                    <div className="md:col-span-2 lg:col-span-4">
                        <Link to="/" className="flex items-center gap-2">
                            <motion.div
                                className="relative h-8 w-8 overflow-hidden rounded-lg"
                                whileHover={{ rotate: 5, scale: 1.05 }}
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
                                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Beaver</span>
                                <span className="text-xs text-zinc-400 -mt-1">Social</span>
                            </div>
                        </Link>

                        <p className="mt-4 text-sm text-zinc-400 max-w-xs">
                            Build powerful decentralized social experiences with our AI-driven SDK designed for web3 developers.
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex items-center space-x-4">
                            {socialLinks.map((social, i) => {
                                const SocialIcon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:text-zinc-300"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.1 + (i * 0.05) }}
                                    >
                                        <SocialIcon className="h-4 w-4" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer navigation sections */}
                    <div className="md:col-span-4 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {footerSections.map((section, sectionIndex) => (
                            <div key={section.title} className="flex flex-col space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-100">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <motion.li
                                            key={link.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: 0.2 + (sectionIndex * 0.1) + (linkIndex * 0.05)
                                            }}
                                        >
                                            <Link
                                                to={link.href}
                                                className="group text-sm text-zinc-400 transition-colors hover:text-zinc-300 flex items-center"
                                            >
                                                {link.label}
                                                <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter section */}
                <div className="mt-16 border-t border-zinc-800/50 pt-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-semibold text-zinc-100">Subscribe to our newsletter</h3>
                            <p className="mt-2 text-sm text-zinc-400">
                                Get the latest news and updates from our team.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                            />
                            <motion.button
                                className="inline-flex items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700/50 px-4 py-2 text-sm font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Subscribe
                                </span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Copyright and bottom links */}
                <div className="mt-8 border-t border-zinc-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-xs text-zinc-500">
                        © {currentYear} Beaver Social. All rights reserved.
                    </p>

                    <div className="mt-4 sm:mt-0 flex items-center space-x-6">
                        <Link to="#" className="text-xs text-zinc-500 hover:text-zinc-400">
                            Privacy Policy
                        </Link>
                        <Link to="#" className="text-xs text-zinc-500 hover:text-zinc-400">
                            Terms of Service
                        </Link>
                        <Link to="#" className="text-xs text-zinc-500 hover:text-zinc-400">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
} 