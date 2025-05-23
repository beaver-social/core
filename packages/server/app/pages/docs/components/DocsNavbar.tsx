import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Icon from "@/shared/components/Icon";
import MobileDocsDrawer from "./MobileDocsDrawer";
import DocsSearch from "./DocsSearch";
import { useBeaver } from "@beaver/react";

interface Props {
  data: ReturnType<ReturnType<typeof useBeaver>["docs"]["getDocs"]>["data"];
}

export function DocsNavbar({ data }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="sticky top-0 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center py-4 px-8 glass border-b justify-between w-full">
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

        {/* Searchbar */}
        <div className="flex items-center justify-center gap-2">
          <DocsSearch data={data} />
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-2">
          <motion.button
            className="rounded-sm bg-zinc-800/20 px-6 py-2 text-md text-white hover:bg-zinc-800/40 border border-zinc-700/50 hover:border-purple-400/50 font-semibold flex gap-2 items-center transition-all"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dev/appid")}
          >
            <Icon name="Zap" className="w-4 h-4 text-blue-400" />

            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Get AppID
            </p>
          </motion.button>

          <motion.button
            className="flex rounded-sm px-6 py-2.5 text-sm font-medium text-zinc-400 border border-zinc-800 gap-2 items-center hover:text-zinc-200 hover:border-zinc-700 transition-colors"
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              window.open("https://github.com/beaver-social", "_blank")
            }
          >
            <Icon name="Github" className="w-4 h-4" />
            <p>GitHub</p>
          </motion.button>
        </div>

        <div className="lg:hidden">
          <MobileDocsDrawer />
        </div>
      </div>
    </motion.div>
  );
}
