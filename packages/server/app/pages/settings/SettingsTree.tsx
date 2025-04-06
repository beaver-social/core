import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/lib/utils";

// Define the settings categories and items
export const settingsData = [
    {
        id: "account",
        label: "Account",
        icon: "User",
        items: [
            { id: "profile", label: "Profile Information" },
            { id: "username", label: "Username" },
            { id: "email", label: "Email" },
            { id: "phone", label: "Phone" },
            { id: "verification", label: "Verification" },
            { id: "account-status", label: "Account Status" },
            { id: "deactivate", label: "Deactivate Account" },
        ],
    },
    {
        id: "web3Identity",
        label: "Web3 Identity",
        icon: "Key",
        items: [
            { id: "identity", label: "Identity Management" },
            { id: "transfer", label: "Identity Transfer" },
            { id: "zklogin", label: "zkLogin Setup" },
            { id: "recovery", label: "Identity Recovery" },
            { id: "permissions", label: "Identity Permissions" },
        ],
    },
    {
        id: "wallet",
        label: "Wallet & Assets",
        icon: "Wallet",
        items: [
            { id: "connected-wallets", label: "Connected Wallets" },
            { id: "sui-balance", label: "SUI Balance" },
            { id: "nft-gallery", label: "NFT Gallery" },
            { id: "transactions", label: "Transaction History" },
            { id: "nft-display", label: "NFT Display Settings" },
            { id: "token-preferences", label: "Token Preferences" },
            { id: "rewards", label: "Rewards & Airdrops" },
        ],
    },
    {
        id: "privacy",
        label: "Privacy",
        icon: "Lock",
        items: [
            { id: "audience", label: "Audience and Tagging" },
            { id: "visibility", label: "Post Visibility" },
            { id: "blocking", label: "Mute and Block" },
            { id: "direct-messages", label: "Direct Messages" },
            { id: "location", label: "Location Information" },
            { id: "data-sharing", label: "Data Sharing" },
            { id: "off-chain", label: "Off-Chain Privacy" },
        ],
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: "Bell",
        items: [
            { id: "filters", label: "Filters" },
            { id: "preferences", label: "Preferences" },
            { id: "email-notifications", label: "Email Notifications" },
            { id: "push-notifications", label: "Push Notifications" },
            { id: "web3-alerts", label: "Web3 Alerts" },
            { id: "on-chain", label: "On-Chain Notifications" },
        ],
    },
    {
        id: "security",
        label: "Security",
        icon: "Shield",
        items: [
            { id: "password", label: "Password" },
            { id: "two-factor", label: "Two-Factor Authentication" },
            { id: "devices", label: "Devices and Sessions" },
            { id: "recovery", label: "Account Recovery" },
            { id: "keys", label: "Security Keys" },
            { id: "backup-codes", label: "Backup Codes" },
            { id: "connected-apps", label: "Connected Apps" },
        ],
    },
    {
        id: "content",
        label: "Content Preferences",
        icon: "Layers",
        items: [
            { id: "languages", label: "Languages" },
            { id: "sensitive-content", label: "Sensitive Content" },
            { id: "interests", label: "Interests" },
            { id: "data-usage", label: "Data Usage" },
            { id: "feed-preferences", label: "Feed Preferences" },
            { id: "autoplay", label: "Autoplay" },
        ],
    },
    {
        id: "accessibility",
        label: "Accessibility",
        icon: "Accessibility",
        items: [
            { id: "display", label: "Display" },
            { id: "motion", label: "Motion" },
            { id: "font-size", label: "Font Size" },
            { id: "color-contrast", label: "Color Contrast" },
            { id: "keyboard", label: "Keyboard Shortcuts" },
        ],
    },
    {
        id: "monetization",
        label: "Monetization",
        icon: "DollarSign",
        items: [
            { id: "creator-earnings", label: "Creator Earnings" },
            { id: "subscriptions", label: "Subscriptions" },
            { id: "tips", label: "Tips and Donations" },
            { id: "token-gating", label: "Token Gating" },
            { id: "nft-rewards", label: "NFT Rewards" },
            { id: "payment-methods", label: "Payment Methods" },
        ],
    },
    {
        id: "data",
        label: "Your Data",
        icon: "Database",
        items: [
            { id: "download", label: "Download Your Data" },
            { id: "advertisers", label: "Connected Advertisers" },
            { id: "activity", label: "Account Activity" },
            { id: "data-storage", label: "Data Storage Options" },
            { id: "off-platform", label: "Off-Platform Activity" },
        ],
    },
];

export type SettingId = string;

interface SettingsTreeProps {
    selectedSetting: SettingId;
    onSelectSetting: (settingId: SettingId) => void;
    className?: string;
}

export default function SettingsTree({
    selectedSetting,
    onSelectSetting,
    className,
}: SettingsTreeProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        settingsData.map((category) => category.id) // Start with all categories expanded
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((current) =>
            current.includes(categoryId)
                ? current.filter((id) => id !== categoryId)
                : [...current, categoryId]
        );
    };

    return (
        <div className={cn("h-full overflow-auto", className)}>
            <div className="space-y-1 py-2">
                <h2 className="px-4 text-lg font-semibold mb-2">Settings</h2>
                {settingsData.map((category) => (
                    <div key={category.id} className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-between px-4 py-2 h-auto text-left font-medium"
                            onClick={() => toggleCategory(category.id)}
                        >
                            <div className="flex items-center">
                                <Icon name={category.icon as any} className="mr-2 h-4 w-4" />
                                <span>{category.label}</span>
                            </div>
                            <Icon
                                name={expandedCategories.includes(category.id) ? "ChevronDown" : "ChevronRight"}
                                className="h-4 w-4 shrink-0 transition-transform"
                            />
                        </Button>
                        {expandedCategories.includes(category.id) && (
                            <div className="pl-6 pr-2">
                                {category.items.map((item) => {
                                    const itemId = `${category.id}.${item.id}`;
                                    return (
                                        <Button
                                            key={itemId}
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start px-2 py-1.5 h-auto text-left text-sm",
                                                selectedSetting === itemId
                                                    ? "bg-accent text-accent-foreground"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                            onClick={() => onSelectSetting(itemId)}
                                        >
                                            {item.label}
                                        </Button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 