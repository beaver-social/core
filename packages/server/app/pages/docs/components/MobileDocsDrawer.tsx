import React from "react";
import { Drawer } from "vaul";
import Icon from "@/shared/components/Icon";
import DocsSearch from "./DocsSearch";
import DocsTree from "./DocsTree";

type MobileDocsDrawerProps = {
    className?: string;
};

export default function MobileDocsDrawer({
    className,
}: MobileDocsDrawerProps) {
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
                        <DocsSearch />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <DocsTree />
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
} 