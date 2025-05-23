import { SettingId, settingsData } from "./SettingsTree";
import Icon from "@/shared/components/Icon";

import {
  AccountSettingsContent,
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
  AudienceAndTaggingContent,
  PostVisibilityContent,
  MuteAndBlockContent,
  DirectMessagesContent,
  LocationInformationContent,
  DataSharingContent,
  OffChainPrivacyContent,
} from "./content/PrivacySettings";

import {
  FiltersContent,
  PreferencesContent,
  EmailAlertsContent,
  PushAlertsContent,
  OnChainAlertsContent,
} from "./content/AlertsSettings";

import {
  PasswordContent,
  TwoFactorContent,
  DevicesContent,
  AccountRecoveryContent,
  SecurityKeysContent,
  BackupCodesContent,
  ConnectedAppsContent,
} from "./content/SecuritySettings";

import {
  LanguagesContent,
  SensitiveContentContent,
  InterestsContent,
  DataUsageContent,
  FeedPreferencesContent,
  AutoplayContent,
} from "./content/ContentSettings";

import {
  DisplayContent,
  MotionContent,
  KeyboardContent,
  ScreenReaderContent,
  CaptionsContent,
} from "./content/AccessibilitySettings";

import {
  TokensContent,
  CreatorFundContent,
  NFTsContent,
  TipsContent,
  SubscriptionsContent,
} from "./content/MonetizationSettings";

import {
  DataControlContent,
  DataExportContent,
  PrivacyPolicyContent,
  DataDeletionContent,
  ThirdPartyContent,
} from "./content/DataSettings";

interface SettingsContentProps {
  selectedSetting: SettingId;
}

export default function SettingsContent({
  selectedSetting,
}: SettingsContentProps) {
  // Parse the selected setting ID to get category and item
  const [categoryId, itemId] = selectedSetting.split(".");

  // Find the category and item
  const category = settingsData.find((cat) => cat.id === categoryId);
  const item = category?.items.find((it) => it.id === itemId);

  if (!category || !item) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-8">
        <div className="text-center">
          <Icon
            name="Settings"
            className="mx-auto h-12 w-12 text-muted-foreground"
          />
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
        <p className="text-muted-foreground mt-1">{category.label} settings</p>
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

  // Web3 Identity settings
  if (settingKey === "web3Identity.account") {
    return <AccountSettingsContent />;
  }
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
    return <AudienceAndTaggingContent />;
  }
  if (settingKey === "privacy.visibility") {
    return <PostVisibilityContent />;
  }
  if (settingKey === "privacy.blocking") {
    return <MuteAndBlockContent />;
  }
  if (settingKey === "privacy.direct-messages") {
    return <DirectMessagesContent />;
  }
  if (settingKey === "privacy.location") {
    return <LocationInformationContent />;
  }
  if (settingKey === "privacy.data-sharing") {
    return <DataSharingContent />;
  }
  if (settingKey === "privacy.off-chain") {
    return <OffChainPrivacyContent />;
  }

  // Alerts settings
  if (settingKey === "alerts.filters") {
    return <FiltersContent />;
  }
  if (settingKey === "alerts.preferences") {
    return <PreferencesContent />;
  }
  if (settingKey === "alerts.email-alerts") {
    return <EmailAlertsContent />;
  }
  if (settingKey === "alerts.push-alerts") {
    return <PushAlertsContent />;
  }
  if (settingKey === "alerts.on-chain-alerts") {
    return <OnChainAlertsContent />;
  }

  // Security settings
  if (settingKey === "security.password") {
    return <PasswordContent />;
  }
  if (settingKey === "security.two-factor") {
    return <TwoFactorContent />;
  }
  if (settingKey === "security.devices") {
    return <DevicesContent />;
  }
  if (settingKey === "security.recovery") {
    return <AccountRecoveryContent />;
  }
  if (settingKey === "security.keys") {
    return <SecurityKeysContent />;
  }
  if (settingKey === "security.backup-codes") {
    return <BackupCodesContent />;
  }
  if (settingKey === "security.connected-apps") {
    return <ConnectedAppsContent />;
  }

  // Content Preferences settings
  if (settingKey === "content.languages") {
    return <LanguagesContent />;
  }
  if (settingKey === "content.sensitive-content") {
    return <SensitiveContentContent />;
  }
  if (settingKey === "content.interests") {
    return <InterestsContent />;
  }
  if (settingKey === "content.data-usage") {
    return <DataUsageContent />;
  }
  if (settingKey === "content.feed-preferences") {
    return <FeedPreferencesContent />;
  }
  if (settingKey === "content.autoplay") {
    return <AutoplayContent />;
  }

  // Accessibility settings
  if (settingKey === "accessibility.display") {
    return <DisplayContent />;
  }
  if (settingKey === "accessibility.motion") {
    return <MotionContent />;
  }
  if (settingKey === "accessibility.keyboard") {
    return <KeyboardContent />;
  }
  if (settingKey === "accessibility.screen-reader") {
    return <ScreenReaderContent />;
  }
  if (settingKey === "accessibility.captions") {
    return <CaptionsContent />;
  }

  // Monetization settings
  if (settingKey === "monetization.tokens") {
    return <TokensContent />;
  }
  if (settingKey === "monetization.creator-fund") {
    return <CreatorFundContent />;
  }
  if (settingKey === "monetization.nfts") {
    return <NFTsContent />;
  }
  if (settingKey === "monetization.tips") {
    return <TipsContent />;
  }
  if (settingKey === "monetization.subscriptions") {
    return <SubscriptionsContent />;
  }

  // Data settings
  if (settingKey === "data.control") {
    return <DataControlContent />;
  }
  if (settingKey === "data.export") {
    return <DataExportContent />;
  }
  if (settingKey === "data.privacy-policy") {
    return <PrivacyPolicyContent />;
  }
  if (settingKey === "data.deletion") {
    return <DataDeletionContent />;
  }
  if (settingKey === "data.third-party") {
    return <ThirdPartyContent />;
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
