import { useEffect, useState } from "react"
import Layout from "../layout"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import SettingsTree from "./SettingsTree"
import SettingsSearch from "./SettingsSearch"
import SettingsContent from "./SettingsContent"
import { Drawer } from "vaul"
import Icon from "@/shared/components/Icon"
import { useGlobalUIStore } from "@/shared/stores/zustand"

export default function Settings() {
    const { setScreen } = useGlobalUI();
    const { selectedSetting, setSelectedSetting } = useGlobalUIStore();

    useEffect(() => {
        setScreen("settings");
    }, []);

    return (
        <Layout main={
            <div>
                {/* Desktop & Tablet View */}
                <div className="hidden sm:block">
                    <SettingsContent selectedSetting={selectedSetting} />
                </div>

                {/* Mobile View */}
                <div className="sm:hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h1 className="text-xl font-bold">Settings</h1>
                        <MobileSettingsDrawer
                            selectedSetting={selectedSetting}
                            onSelectSetting={setSelectedSetting}
                        />
                    </div>
                    <SettingsContent selectedSetting={selectedSetting} />
                </div>
            </div>
        } secondary={
            <div className="h-full flex flex-col">
                <div className="p-4">
                    <SettingsSearch onSelectSetting={setSelectedSetting} />
                </div>
                <SettingsTree
                    selectedSetting={selectedSetting}
                    onSelectSetting={setSelectedSetting}
                    className="flex-1 mt-2"
                />
            </div>
        } />
    )
}

// Mobile drawer with settings tree for small screens
function MobileSettingsDrawer({
    selectedSetting,
    onSelectSetting
}: {
    selectedSetting: string;
    onSelectSetting: (settingId: string) => void;
}) {
    return (
        <Drawer.Root direction="left">
            <Drawer.Trigger>
                <Icon name="Menu" className="size-6" />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
                <Drawer.Title className="sr-only">Settings Menu</Drawer.Title>
                <Drawer.Content className="fixed inset-y-0 left-0 h-full w-3/4 max-w-md z-50 bg-background border-r flex flex-col">
                    <Drawer.Description className="sr-only">
                        Settings menu
                    </Drawer.Description>
                    <div className="p-4 border-b">
                        <SettingsSearch onSelectSetting={onSelectSetting} />
                    </div>
                    <div className="flex-1 overflow-auto">
                        <SettingsTree
                            selectedSetting={selectedSetting}
                            onSelectSetting={(settingId) => {
                                onSelectSetting(settingId);
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