import * as React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { X, Menu } from "lucide-react";
import Icon from "@/shared/components/Icon";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Code", href: "#code" },
  { name: "Integrations", href: "#integrations" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "/docs" },
];

export function ModernNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      className="sticky top-0 px-4 z-50 w-full py-4 backdrop-blur-sm bg-transparent border-b border-zinc-800/20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/icons/logo_dark.png"
            alt="logo"
            className="size-12"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-zinc-200">
              Beaver
            </span>
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
        <motion.button
          className="hidden md:flex rounded-sm px-6 py-2.5 text-sm font-medium text-zinc-400 border border-zinc-800 gap-2 items-center hover:text-zinc-200 hover:border-zinc-700"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/docs")}
        >
          <Icon name="Book" className="w-4 h-4" />
          <p>View Docs</p>
        </motion.button>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="container absolute mx-auto mt-4 rounded-xl bg-background **:p-4 md:hidden border border-zinc-800/30"
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
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
