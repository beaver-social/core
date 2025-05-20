import React from "react";
import { Drawer } from "vaul";
import Icon from "@/shared/components/Icon";
import DocsSearch from "./DocsSearch";
import DocsTree from "./DocsTree";

type MobileDocsDrawerProps = {
    selectedDoc: string;
    onSelectDoc: (docId: string) => void;
};

export default function MobileDocsDrawer({
    selectedDoc,
    onSelectDoc,
}: MobileDocsDrawerProps) {
    return (
        <Drawer.Root direction="left">
            <Drawer.Trigger>
                <Icon name="Menu" className="size-6" />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
                <Drawer.Title className="sr-only">Documentation Menu</Drawer.Title>
                <Drawer.Content className="fixed inset-y-0 left-0 h-full w-3/4 max-w-md z-50 bg-background border-r flex flex-col">
                    <Drawer.Description className="sr-only">
                        Documentation menu
                    </Drawer.Description>
                    <div className="p-4 border-b">
                        <DocsSearch onSelectDoc={onSelectDoc} />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <DocsTree
                            selectedDoc={selectedDoc}
                            onSelectDoc={(docId) => {
                                onSelectDoc(docId);
                                // Close drawer after selection on mobile
                                document.querySelector<HTMLButtonElement>('.vaul-drawer-close-button')?.click();
                            }}
                        />
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
} 