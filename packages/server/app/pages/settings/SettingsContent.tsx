import { useState } from "react";
import { settingsData } from "./SettingsTree";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Icon from "@/shared/components/Icon";

// Temporarily using textarea instead of Input and custom switch markup
// until we add the missing components

interface SettingsContentProps {
    selectedSetting: string;
}

export default function SettingsContent({ selectedSetting }: SettingsContentProps) {
    // Parse the selected setting ID to get category and item
    const [categoryId, itemId] = selectedSetting.split('.');

    // Find the category and item
    const category = settingsData.find((cat) => cat.id === categoryId);
    const item = category?.items.find((it) => it.id === itemId);

    if (!category || !item) {
        return (
            <div className="h-[90vh] flex items-center justify-center px-8">
                <div className="text-center">
                    <Icon name="Settings" className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Select a setting</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Choose a setting from the sidebar to view and edit its details
                    </p>
                </div>
            </div>
        );
    }

    // Render the appropriate content based on the selected setting
    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{item.label}</h1>
                <p className="text-muted-foreground mt-1">
                    {category.label} settings
                </p>
            </div>

            <div className="space-y-6">
                {renderSettingContent(category.id, item.id)}
            </div>
        </div>
    );
}

// Helper function to render different content based on the setting
function renderSettingContent(categoryId: string, itemId: string) {
    // Use a mapping of category+item IDs to determine what to render
    const settingKey = `${categoryId}.${itemId}`;

    if (settingKey === "account.username") {
        return <UsernameSettingsContent />;
    }
    if (settingKey === "account.verification") {
        return <VerificationSettingsContent />;
    }
    if (settingKey === "account.email") {
        return <EmailSettingsContent />;
    }
    if (settingKey === "account.phone") {
        return <PhoneSettingsContent />;
    }

    // Privacy settings
    if (settingKey === "privacy.audience") {
        return <AudienceSettingsContent />;
    }
    if (settingKey === "privacy.visibility") {
        return <VisibilitySettingsContent />;
    }

    // Wallet settings
    if (settingKey === "wallet.connected-wallets") {
        return <WalletConnectionContent />;
    }

    // Notifications settings
    if (settingKey === "notifications.preferences") {
        return <NotificationPreferencesContent />;
    }

    // Default content for other settings
    return (
        <div className="bg-card rounded-lg p-6 border">
            <p className="text-muted-foreground text-sm">
                This setting is not fully implemented yet. Check back later!
            </p>
        </div>
    );
}

function UsernameSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <h3 className="text-lg font-medium">Username</h3>
            <p className="text-sm text-muted-foreground">
                Your username is unique and appears in your profile URL. It can contain only letters, numbers, and underscores, with no spaces.
            </p>
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <input
                    id="username"
                    placeholder="@username"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button className="mt-4">Update Username</Button>
        </div>
    );
}

function EmailSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">
                Your email is used for authentication and notifications.
            </p>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <input
                    id="email"
                    placeholder="yourname@example.com"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button className="mt-4">Update Email</Button>
        </div>
    );
}

function PhoneSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <h3 className="text-lg font-medium">Phone</h3>
            <p className="text-sm text-muted-foreground">
                Your phone number is used for authentication and notifications. You can add multiple phone numbers.
            </p>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <input
                    id="phone"
                    placeholder="123-456-7890"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button className="mt-4">Add Phone Number</Button>
        </div>
    );
}

function VerificationSettingsContent() {
    return (
        <div className="bg-card rounded-lg p-6 border space-y-4">
            <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-full bg-blue-500/10">
                    <Icon name="BadgeCheck" className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-lg font-medium">Account Verification</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Verification helps users know they're interacting with authentic accounts.
                    </p>
                </div>
            </div>

            <div className="pl-12 space-y-4 mt-4">
                <div className="space-y-2">
                    <h4 className="font-medium">Verification Status</h4>
                    <p className="text-sm bg-secondary p-3 rounded-md inline-block">
                        Not verified
                    </p>
                </div>

                <Button>Request Verification</Button>
            </div>
        </div>
    );
}

function AudienceSettingsContent() {
    const [publicProfile, setPublicProfile] = useState(true);
    const [allowMentions, setAllowMentions] = useState(true);

    return (
        <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Profile Visibility</h3>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">
                            Allow anyone to view your profile
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setPublicProfile(!publicProfile)}
                            className={`${publicProfile ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border space-y-4">
                <h3 className="text-lg font-medium">Mentions & Tags</h3>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="allow-mentions">Allow Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                            Allow others to mention you in their posts
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setAllowMentions(!allowMentions)}
                            className={`${allowMentions ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function VisibilitySettingsContent() {
    const [hideReadReceipts, setHideReadReceipts] = useState(false);
    const [privateMode, setPrivateMode] = useState(false);

    return (
        <div className="bg-card rounded-lg p-6 border space-y-6">
            <h3 className="text-lg font-medium">Post Visibility</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="hide-read">Hide Read Receipts</Label>
                        <p className="text-sm text-muted-foreground">
                            Prevent others from seeing when you've viewed their posts
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setHideReadReceipts(!hideReadReceipts)}
                            className={`${hideReadReceipts ? 'translate-x-5 bg-primary' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="private-mode">Private Mode</Label>
                        <p className="text-sm text-muted-foreground">
                            Only show your posts to followers
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setPrivateMode(!privateMode)}
                            className={`${privateMode ? 'translate-x-5 bg-primary' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <Button className="mt-2">Save Changes</Button>
        </div>
    );
}

function WalletConnectionContent() {
    return (
        <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-medium">Connected Wallets</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Connect and manage your Web3 wallets for seamless interactions
                </p>

                <div className="mt-6 space-y-4">
                    <div className="p-4 rounded-lg border flex items-center justify-between bg-secondary/50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon name="Wallet" className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">MetaMask</p>
                                <p className="text-sm text-muted-foreground">0x71C...93E4</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>

                    <Button className="w-full" variant="outline">
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Connect a Wallet
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-medium">Default Wallet</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Choose which wallet to use for transactions by default
                </p>

                <div className="mt-4 space-y-2">
                    <Label htmlFor="default-wallet">Default Wallet</Label>
                    <select
                        id="default-wallet"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="metamask">MetaMask (0x71C...93E4)</option>
                        <option value="other">Add another wallet</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function NotificationPreferencesContent() {
    const [push, setPush] = useState(true);
    const [email, setEmail] = useState(true);
    const [newFollowers, setNewFollowers] = useState(true);
    const [mentions, setMentions] = useState(true);

    return (
        <div className="bg-card rounded-lg p-6 border space-y-6">
            <h3 className="text-lg font-medium">Notification Channels</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive notifications on your device
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setPush(!push)}
                            className={`${push ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setEmail(!email)}
                            className={`${email ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-medium pt-4">Notification Types</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="new-followers">New Followers</Label>
                        <p className="text-sm text-muted-foreground">
                            When someone follows your account
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setNewFollowers(!newFollowers)}
                            className={`${newFollowers ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="mentions">Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                            When someone mentions you in a post
                        </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none">
                        <span
                            onClick={() => setMentions(!mentions)}
                            className={`${mentions ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out`}
                        />
                    </div>
                </div>
            </div>

            <Button className="mt-2">Save Preferences</Button>
        </div>
    );
} 