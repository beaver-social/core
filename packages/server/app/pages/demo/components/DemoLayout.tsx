import { ReactNode, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";

interface DemoLayoutProps {
    title: string;
    children: ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = [
    { id: 'wallet', label: 'Wallet Connection' },
    { id: 'auth', label: 'Authentication' },
    { id: 'profile', label: 'User Profile' },
    { id: 'posts', label: 'Posts' },
];

export default function DemoLayout({ title, children, activeTab, setActiveTab }: DemoLayoutProps) {
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile size on mount and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024); // 768px is a common breakpoint for md
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <div className="self-center bg-background/80 glass z-10 border rounded-sm p-4 md:p-8 m-4 md:m-10 w-full max-w-7xl mx-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground">This demo showcases the Beaver React SDK capabilities.</p>
            </motion.div>

            <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
                className="w-full"
            >
                {/* Mobile navigation (dropdown) */}
                {isMobile && (
                    <div className="mb-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    <div className="flex items-center">
                                        <Icon name="Menu" className="mr-2 h-4 w-4" />
                                        {tabs.find(tab => tab.id === activeTab)?.label || 'Select Section'}
                                    </div>
                                    <Icon name="ChevronDown" className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full min-w-[200px]">
                                {tabs.map((tab) => (
                                    <DropdownMenuItem
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={activeTab === tab.id ? "bg-accent" : ""}
                                    >
                                        {tab.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Desktop navigation (tabs) */}
                {!isMobile && (
                    <TabsList className="grid grid-cols-4 mb-8">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="text-base"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                )}

                <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </TabsContent>
            </Tabs>

            <div className="mt-8 text-sm text-muted-foreground text-center">
                <p>
                    Beaver React SDK Demo - <a href="https://github.com/yourusername/beaver-social" className="text-primary hover:underline">View Source</a>
                </p>
            </div>
        </div>
    );
} 