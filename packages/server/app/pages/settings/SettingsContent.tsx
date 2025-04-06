import { SettingId, settingsData } from "./SettingsTree";
import Icon from "@/shared/components/Icon";

// Import settings content components
import {
    UsernameSettingsContent,
    EmailSettingsContent,
    PhoneSettingsContent,
    ProfileSettingsContent,
    VerificationSettingsContent,
} from "./content/AccountSettings";

import {
    IdentityManagementContent,
    IdentityTransferContent,
    ZkLoginSetupContent,
    IdentityRecoveryContent,
    IdentityPermissionsContent,
} from "./content/Web3IdentitySettings";

import {
    ConnectedWalletsContent,
    SuiBalanceContent,
    NftGalleryContent,
    TransactionHistoryContent,
} from "./content/WalletSettings";

import {
    AudienceSettingsContent,
    VisibilitySettingsContent,
} from "./content/PrivacySettings";

import {
    NotificationPreferencesContent,
} from "./content/NotificationsSettings";

interface SettingsContentProps {
    selectedSetting: SettingId;
}

export default function SettingsContent({ selectedSetting }: SettingsContentProps) {
    // Parse the selected setting ID to get category and item
    const [categoryId, itemId] = selectedSetting.split('.');

    // Find the category and item
    const category = settingsData.find((cat) => cat.id === categoryId);
    const item = category?.items.find((it) => it.id === itemId);

    if (!category || !item) {
        return (
            <div className="h-full flex items-center justify-center p-8">
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
                {renderSettingContent(categoryId, itemId)}
            </div>
        </div>
    );
}

// Helper function to render different content based on the setting
function renderSettingContent(categoryId: string, itemId: string) {
    // Use a mapping of category+item IDs to determine what to render
    const settingKey = `${categoryId}.${itemId}`;

    // Account settings
    if (settingKey === "account.username") {
        return <UsernameSettingsContent />;
    }
    if (settingKey === "account.email") {
        return <EmailSettingsContent />;
    }
    if (settingKey === "account.phone") {
        return <PhoneSettingsContent />;
    }
    if (settingKey === "account.profile") {
        return <ProfileSettingsContent />;
    }
    if (settingKey === "account.verification") {
        return <VerificationSettingsContent />;
    }

    // Web3 Identity settings
    if (settingKey === "web3Identity.identity") {
        return <IdentityManagementContent />;
    }
    if (settingKey === "web3Identity.transfer") {
        return <IdentityTransferContent />;
    }
    if (settingKey === "web3Identity.zklogin") {
        return <ZkLoginSetupContent />;
    }
    if (settingKey === "web3Identity.recovery") {
        return <IdentityRecoveryContent />;
    }
    if (settingKey === "web3Identity.permissions") {
        return <IdentityPermissionsContent />;
    }

    // Wallet settings
    if (settingKey === "wallet.connected-wallets") {
        return <ConnectedWalletsContent />;
    }
    if (settingKey === "wallet.sui-balance") {
        return <SuiBalanceContent />;
    }
    if (settingKey === "wallet.nft-gallery") {
        return <NftGalleryContent />;
    }
    if (settingKey === "wallet.transactions") {
        return <TransactionHistoryContent />;
    }

    // Privacy settings
    if (settingKey === "privacy.audience") {
        return <AudienceSettingsContent />;
    }
    if (settingKey === "privacy.visibility") {
        return <VisibilitySettingsContent />;
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

