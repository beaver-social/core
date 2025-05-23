import { Drawer } from "vaul";
import Icon from "@/shared/components/Icon";
import DocsSearch from "./DocsSearch";
import DocsTree from "./DocsTree";
import { useBeaver } from "@beaver/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

type MobileDocsDrawerProps = {
    className?: string;
};

export default function MobileDocsDrawer({
    className,
}: MobileDocsDrawerProps) {
    const { data: docsMetadata } = useBeaver().docs.getDocs();
    const navigate = useNavigate();

    return (
        <Drawer.Root direction="left">
            <Drawer.Trigger>
                <Icon name="Menu" className="size-6 text-zinc-400 hover:text-zinc-300" />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40" />
                <Drawer.Title className="sr-only">Documentation Menu</Drawer.Title>
                <Drawer.Content className="fixed inset-y-0 left-0 h-full w-3/4 max-w-md z-50 bg-zinc-950 border-r border-zinc-800 flex flex-col">
                    <Drawer.Description className="sr-only">
                        Documentation menu
                    </Drawer.Description>
                    <div className="p-4 border-b border-zinc-800">
                        <DocsSearch data={docsMetadata} />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <DocsTree data={docsMetadata} />
                    </div>

                    <motion.button
                        className="rounded-sm m-4 bg-zinc-800/20 px-6 py-2 text-md text-white hover:bg-zinc-800/40 border border-zinc-700/50 hover:border-purple-400/50 font-semibold flex gap-2 items-center transition-all"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/onboarding/appid")}
                    >
                        <Icon name="Zap" className="w-4 h-4 text-blue-400" />

                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Get Your AppID
                        </p>
                    </motion.button>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
} 