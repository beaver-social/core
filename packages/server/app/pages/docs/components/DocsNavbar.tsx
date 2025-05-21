import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Icon from "@/shared/components/Icon";
import MobileDocsDrawer from "./MobileDocsDrawer";
import { useBeaver } from "@beaver/react";
import { useMemo } from "react";

export function DocsNavbar() {
    const navigate = useNavigate();
    const { data: docsMetadata } = useBeaver().docs.getDocs();
    const metadata = docsMetadata?.metadata || [];

    // Get main section docs for the nav links
    const navItems = useMemo(() => {
        // Only show top-level docs without parents or with specific IDs we want to highlight
        const topLevelDocs = metadata
            .filter(doc =>
                !doc.parentId ||
                ['api', 'typescript-sdk', 'react-sdk'].includes(doc.id)
            )
            .slice(0, 3); // Limit to 3 items

        return topLevelDocs.map(doc => ({
            name: doc.title,
            href: `/docs/${doc.id}`
        }));
    }, [metadata]);

    return (
        <motion.div
            className="sticky top-0 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center p-4 glass border-b justify-between w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Beaver</span>
                        <span className="text-sm text-zinc-400 -mt-1">Social</span>
                    </div>
                </Link>

                {/* Navigation */}
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
                <motion.button
                    className="hidden lg:flex rounded-sm px-6 py-2.5 text-sm font-medium text-zinc-400 border border-zinc-800 gap-2 items-center hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/app")}
                >
                    <Icon name="Github" className="w-4 h-4" />
                    <p>GitHub</p>
                </motion.button>

                <div className="lg:hidden">
                    <MobileDocsDrawer />
                </div>
            </div>
        </motion.div>
    );
} 