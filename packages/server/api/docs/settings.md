# Settings API

## Overview

This document outlines the API endpoints for user settings, preferences, and customization options in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Display & Accessibility Settings

### Base Path: `/settings/display`

| Endpoint         | Method | Description                   | Request Body                            | Response            |
| ---------------- | ------ | ----------------------------- | --------------------------------------- | ------------------- |
| `/`              | GET    | Get all display settings      | -                                       | `{ settings }`      |
| `/`              | PATCH  | Update display settings       | `{ theme, fontSize, fontFamily, etc }`  | `{ settings }`      |
| `/theme`         | GET    | Get theme settings            | -                                       | `{ theme }`         |
| `/theme`         | PATCH  | Update theme settings         | `{ mode, color, contrast }`             | `{ theme }`         |
| `/accessibility` | GET    | Get accessibility settings    | -                                       | `{ accessibility }` |
| `/accessibility` | PATCH  | Update accessibility settings | `{ colorBlind, screenReader, motion }`  | `{ accessibility }` |
| `/motion`        | GET    | Get motion settings           | -                                       | `{ motion }`        |
| `/motion`        | PATCH  | Update motion settings        | `{ reduceMotion, transitionSpeed }`     | `{ motion }`        |
| `/text`          | GET    | Get text display settings     | -                                       | `{ text }`          |
| `/text`          | PATCH  | Update text display settings  | `{ fontSize, fontFamily }`              | `{ text }`          |
| `/colors`        | GET    | Get color settings            | -                                       | `{ colors }`        |
| `/colors`        | PATCH  | Update color settings         | `{ contrast, colorMode }`               | `{ colors }`        |
| `/screen-reader` | GET    | Get screen reader settings    | -                                       | `{ screenReader }`  |
| `/screen-reader` | PATCH  | Update screen reader settings | `{ descriptions, priority }`            | `{ screenReader }`  |
| `/keyboard`      | GET    | Get keyboard settings         | -                                       | `{ keyboard }`      |
| `/keyboard`      | PATCH  | Update keyboard settings      | `{ shortcuts, stickyKeys, filterKeys }` | `{ keyboard }`      |
| `/captions`      | GET    | Get caption settings          | -                                       | `{ captions }`      |
| `/captions`      | PATCH  | Update caption settings       | `{ enabled, fontSize, background }`     | `{ captions }`      |

## 2. Content Preferences

### Base Path: `/settings/content`

| Endpoint             | Method | Description                       | Request Body                                            | Response               |
| -------------------- | ------ | --------------------------------- | ------------------------------------------------------- | ---------------------- |
| `/languages`         | GET    | Get language preferences          | -                                                       | `{ languages }`        |
| `/languages`         | PATCH  | Update language preferences       | `{ display, content, preferred: [], autoTranslate }`    | `{ languages }`        |
| `/sensitive-content` | GET    | Get sensitive content settings    | -                                                       | `{ sensitiveContent }` |
| `/sensitive-content` | PATCH  | Update sensitive content settings | `{ violence, adult, disturbing }`                       | `{ sensitiveContent }` |
| `/interests`         | GET    | Get interest settings             | -                                                       | `{ interests }`        |
| `/interests`         | PATCH  | Update interest settings          | `{ autoInterests, suggestions, excludedTopics }`        | `{ interests }`        |
| `/interests/topics`  | GET    | Get interest topics               | -                                                       | `{ topics }`           |
| `/interests/exclude` | POST   | Add excluded topic                | `{ topicId }`                                           | `{ success }`          |
| `/interests/exclude` | DELETE | Remove excluded topic             | `?topicId=x`                                            | `{ success }`          |
| `/data-usage`        | GET    | Get data usage settings           | -                                                       | `{ dataUsage }`        |
| `/data-usage`        | PATCH  | Update data usage settings        | `{ imageQuality, videoQuality, autoplayWifi, preload }` | `{ dataUsage }`        |
| `/feed-preferences`  | GET    | Get feed layout preferences       | -                                                       | `{ feedPreferences }`  |
| `/feed-preferences`  | PATCH  | Update feed layout preferences    | `{ layout, sortOrder, contentTypes, tokenGated }`       | `{ feedPreferences }`  |
| `/autoplay`          | GET    | Get autoplay settings             | -                                                       | `{ autoplay }`         |
| `/autoplay`          | PATCH  | Update autoplay settings          | `{ videos, gifs, reducedMotion }`                       | `{ autoplay }`         |

## 3. Security & Privacy Settings

### Base Path: `/settings/security`

| Endpoint                   | Method | Description                    | Query Params       | Request Body                          | Response                      |
| -------------------------- | ------ | ------------------------------ | ------------------ | ------------------------------------- | ----------------------------- |
| `/password`                | PATCH  | Update password                | -                  | `{ currentPassword, newPassword }`    | `{ success }`                 |
| `/two-factor`              | GET    | Get 2FA settings               | -                  | -                                     | `{ twoFactor }`               |
| `/two-factor`              | PATCH  | Update 2FA settings            | -                  | `{ enabled, method, phone? }`         | `{ twoFactor }`               |
| `/two-factor/setup`        | POST   | Setup 2FA                      | -                  | `{ method }`                          | `{ secret, qrCode? }`         |
| `/two-factor/verify`       | POST   | Verify 2FA setup               | -                  | `{ code, secret }`                    | `{ success }`                 |
| `/two-factor/backup-codes` | GET    | Get backup codes               | -                  | -                                     | `{ backupCodes: [] }`         |
| `/two-factor/backup-codes` | POST   | Generate new backup codes      | -                  | -                                     | `{ backupCodes: [] }`         |
| `/devices`                 | GET    | Get connected devices          | `?page=1&limit=20` | -                                     | `{ devices: [], pagination }` |
| `/devices/:id`             | DELETE | Remove device                  | -                  | -                                     | `{ success }`                 |
| `/sessions`                | GET    | Get active sessions            | -                  | -                                     | `{ sessions: [] }`            |
| `/sessions`                | DELETE | End all other sessions         | -                  | -                                     | `{ success }`                 |
| `/sessions/:id`            | DELETE | End specific session           | -                  | -                                     | `{ success }`                 |
| `/security-keys`           | GET    | Get security keys              | -                  | -                                     | `{ securityKeys: [] }`        |
| `/security-keys`           | POST   | Register new security key      | -                  | `{ name }`                            | `{ success, keyId }`          |
| `/security-keys/:id`       | PATCH  | Update security key            | -                  | `{ name }`                            | `{ success }`                 |
| `/security-keys/:id`       | DELETE | Remove security key            | -                  | -                                     | `{ success }`                 |
| `/connected-apps`          | GET    | Get connected applications     | -                  | -                                     | `{ apps: [] }`                |
| `/connected-apps/:id`      | DELETE | Disconnect application         | -                  | -                                     | `{ success }`                 |
| `/connected-apps/settings` | PATCH  | Update connected apps settings | -                  | `{ autoReview, transactionApproval }` | `{ settings }`                |

## 4. Wallet Settings

### Base Path: `/settings/wallet`

| Endpoint                 | Method | Description                      | Query Params | Request Body                   | Response          |
| ------------------------ | ------ | -------------------------------- | ------------ | ------------------------------ | ----------------- |
| `/connected-wallets`     | GET    | Get connected wallets            | -            | -                              | `{ wallets: [] }` |
| `/connected-wallets`     | POST   | Connect new wallet               | -            | `{ address, type, signature }` | `{ wallet }`      |
| `/connected-wallets/:id` | DELETE | Disconnect wallet                | -            | -                              | `{ success }`     |
| `/primary`               | GET    | Get primary wallet               | -            | -                              | `{ wallet }`      |
| `/primary`               | PATCH  | Set primary wallet               | -            | `{ walletId }`                 | `{ wallet }`      |
| `/transactions`          | GET    | Get transaction history settings | -            | -                              | `{ settings }`    |
| `/transactions`          | PATCH  | Update transaction settings      | -            | `{ privacy, notifications }`   | `{ settings }`    |
| `/transactions/filter`   | GET    | Get transaction filters          | -            | -                              | `{ filters }`     |
| `/transactions/filter`   | PATCH  | Update transaction filters       | -            | `{ types, visibility }`        | `{ filters }`     |

## 5. Data Management Settings

### Base Path: `/settings/data`

| Endpoint                  | Method | Description                       | Request Body                               | Response                 |
| ------------------------- | ------ | --------------------------------- | ------------------------------------------ | ------------------------ |
| `/control`                | GET    | Get data control settings         | -                                          | `{ control }`            |
| `/control`                | PATCH  | Update data control settings      | `{ personalization, history, interests }`  | `{ control }`            |
| `/control/activity`       | DELETE | Clear activity data               | -                                          | `{ success }`            |
| `/off-platform`           | GET    | Get off-platform settings         | -                                          | `{ offPlatform }`        |
| `/off-platform`           | PATCH  | Update off-platform settings      | `{ dataCollection, crossAppTracking }`     | `{ offPlatform }`        |
| `/export`                 | POST   | Request data export               | `{ format, dataTypes: [] }`                | `{ requestId, expires }` |
| `/export/:id/status`      | GET    | Check export request status       | -                                          | `{ status, url? }`       |
| `/export/types`           | GET    | Get available export data types   | -                                          | `{ types: [] }`          |
| `/third-party`            | GET    | Get third-party connections       | -                                          | `{ connections: [] }`    |
| `/third-party/:id`        | DELETE | Remove third-party connection     | -                                          | `{ success }`            |
| `/deletion`               | POST   | Request account deletion          | `{ password, reason?, feedback? }`         | `{ requestId, expires }` |
| `/deletion/:id/cancel`    | POST   | Cancel deletion request           | -                                          | `{ success }`            |
| `/deletion/:id/status`    | GET    | Check deletion request status     | -                                          | `{ status, timeLeft? }`  |
| `/privacy-policy`         | GET    | Get privacy policy settings       | -                                          | `{ preferences }`        |
| `/privacy-policy`         | PATCH  | Update privacy policy preferences | `{ dataProcessing, analytics, marketing }` | `{ preferences }`        |
| `/privacy-policy/consent` | POST   | Provide specific consent          | `{ key, value }`                           | `{ success }`            |

## Data Models

### DisplaySettings

```typescript
interface DisplaySettings {
  id: string;
  userId: string;
  theme: {
    mode: "light" | "dark" | "system";
    color: string;
    contrast: "default" | "high";
  };
  fontSize: "small" | "medium" | "large" | "x-large";
  fontFamily: string;
  updatedAt: string;
}
```

### AccessibilitySettings

```typescript
interface AccessibilitySettings {
  id: string;
  userId: string;
  colorBlind: {
    enabled: boolean;
    type: "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia" | null;
  };
  screenReader: {
    enabled: boolean;
    announcementPriority: "high" | "medium" | "low";
    ariaLabels: boolean;
  };
  motion: {
    reduceMotion: boolean;
    disableAnimations: boolean;
    transitionSpeed: number; // 0-100
    pauseAnimations: boolean;
  };
  keyboard: {
    shortcuts: boolean;
    stickyKeys: boolean;
    filterKeys: boolean;
  };
  captions: {
    enabled: boolean;
    fontSize: number;
    background: boolean;
    position: "bottom" | "top";
  };
  updatedAt: string;
}
```

### ContentPreferences

```typescript
interface ContentPreferences {
  id: string;
  userId: string;
  languages: {
    display: string;
    content: string[];
    autoTranslate: boolean;
    showTranslateButton: boolean;
  };
  sensitiveContent: {
    hideNsfw: boolean;
    violence: "always-warn" | "hide-completely" | "show-without-warning";
    adult: "always-warn" | "hide-completely" | "show-without-warning";
    disturbing: "always-warn" | "hide-completely" | "show-without-warning";
  };
  interests: {
    autoInterests: boolean;
    interestSuggestions: boolean;
    excludedTopics: string[];
  };
  dataUsage: {
    imageQuality: "high" | "standard" | "low" | "auto";
    videoQuality: "high" | "standard" | "low" | "auto";
    autoplayWifi: boolean;
    autoplayMobile: boolean;
    preloadImages: boolean;
    saveForOffline: boolean;
  };
  feedPreferences: {
    layout: "default" | "compact";
    sortOrder: "latest" | "relevance" | "trending";
    following: boolean;
    recommended: boolean;
    trending: boolean;
    tokenGated: boolean;
  };
  autoplay: {
    videos: boolean;
    gifs: boolean;
    reducedMotion: boolean;
  };
  updatedAt: string;
}
```

### SecuritySettings

```typescript
interface SecuritySettings {
  id: string;
  userId: string;
  twoFactor: {
    enabled: boolean;
    method: "app" | "sms" | "email";
    phone?: string;
    lastVerified?: string;
  };
  sessions: {
    currentSessionId: string;
    maxConcurrentSessions: number;
    inactiveDaysBeforeExpiry: number;
  };
  connectedApps: {
    autoReview: boolean;
    transactionApproval: boolean;
  };
  updatedAt: string;
}
```

### WalletSettings

```typescript
interface WalletSettings {
  id: string;
  userId: string;
  primaryWalletId: string | null;
  transactions: {
    privacy: "public" | "private";
    notifications: boolean;
    filters: {
      types: string[];
      visibility: string[];
    };
  };
  updatedAt: string;
}
```

### DataControlSettings

```typescript
interface DataControlSettings {
  id: string;
  userId: string;
  personalization: boolean;
  browsingHistory: boolean;
  searchHistory: boolean;
  interestTracking: boolean;
  offPlatformData: boolean;
  crossAppTracking: boolean;
  privacyPreferences: {
    dataProcessing: boolean;
    analytics: boolean;
    marketing: boolean;
    thirdPartySharing: boolean;
  };
  updatedAt: string;
}
```

## Implementation Considerations

1. **User-specific Settings**

   - Persist settings across sessions
   - Initialize with sensible defaults
   - Cache frequently accessed settings client-side
   - Support settings sync across devices

2. **Accessibility Focus**

   - Apply accessibility settings server-side when possible
   - Ensure consistency across platforms
   - Support multiple accessibility needs simultaneously
   - Consider device capability detection

3. **Performance**

   - Group related settings to reduce API calls
   - Use ETags for efficient settings validation
   - Implement change tracking for important settings
   - Optimize for mobile networks

4. **Security**

   - Require authentication for all settings endpoints
   - Consider additional verification for sensitive settings changes
   - Encrypt sensitive settings data
   - Implement proper change auditing

5. **Web3 Integration**

   - Require cryptographic verification for wallet operations
   - Support multiple networks and wallet types
   - Clear separation between custodial and non-custodial features
   - Transaction approval workflows

6. **Extensibility**
   - Design for future settings needs
   - Versioning strategy for settings schema changes
   - Support for feature flags and experimental settings
   - Graceful handling of unknown settings properties
