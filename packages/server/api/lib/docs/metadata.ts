import { icons } from "lucide-react";

interface DocMetadata {
  id: string;
  title: string;
  description: string;
  tags: string[];
  related: string[];
  contentId: string;
  icon?: keyof typeof icons;
  group: string;
}

export const docsMetadata: DocMetadata[] = [
  {
    id: "introduction",
    title: "Introduction",
    description: "Learn how to get started with Beaver Social",
    tags: ["introduction", "getting-started", "introduction"],
    related: ["architecture", "react-sdk"],
    contentId: "introduction",
    group: "Introduction",
    icon: "Zap",
  },

  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn how to get started with Beaver Social",
    tags: ["getting-started", "getting-started"],
    related: ["introduction", "architecture"],
    contentId: "getting-started",
    group: "Introduction",
    icon: "Zap",
  },

  {
    id: "architecture",
    title: "Architecture",
    description: "Learn about the architecture of Beaver Social",
    tags: ["architecture", "getting-started", "architecture"],
    related: ["introduction", "react-sdk"],
    contentId: "architecture",
    group: "Introduction",
    icon: "Zap",
  },

  {
    id: "typescript-sdk",
    title: "TypeScript SDK",
    description:
      "Learn how to use the TypeScript SDK to build your own Beaver Social client",
    tags: ["typescript-sdk", "getting-started", "typescript-sdk"],
    related: ["introduction", "architecture"],
    contentId: "typescript-sdk",
    group: "SDK",
    icon: "Package",
  },

  {
    id: "react-sdk",
    title: "React SDK",
    description:
      "Learn how to use the React SDK to build your own Beaver Social client",
    tags: ["react-sdk", "getting-started", "react-sdk"],
    related: ["introduction", "architecture", "react-native-sdk"],
    contentId: "react-sdk",
    group: "SDK",
    icon: "Package",
  },
  {
    id: "react-native-sdk",
    title: "React Native SDK",
    description:
      "Learn how to use the React Native SDK to build mobile clients for Beaver Social",
    tags: ["react-native-sdk", "mobile", "sdk"],
    related: ["introduction", "react-sdk", "typescript-sdk"],
    contentId: "react-native-sdk",
    group: "SDK",
    icon: "Smartphone",
  },

  {
    id: "api-overview",
    title: "API Overview",
    description: "Overview of the Beaver Social API",
    tags: ["api", "overview", "authentication", "rate-limiting"],
    related: ["api-endpoints", "api-reference"],
    contentId: "api-overview",
    group: "API",
    icon: "Webhook",
  },

  {
    id: "api-endpoints",
    title: "API Endpoints",
    description: "Detailed documentation of all API endpoints",
    tags: ["api", "endpoints", "rest"],
    related: ["api-overview", "api-reference"],
    contentId: "api-endpoints",
    group: "API",
    icon: "Webhook",
  },

  {
    id: "api-action-chain",
    title: "Action Chain Verification",
    description:
      "How the API verifies user actions using cryptographic signatures",
    tags: ["api", "security", "crypto", "verification"],
    related: ["api-endpoints", "api-reference"],
    contentId: "api-action-chain",
    group: "API",
    icon: "Webhook",
  },

  {
    id: "api-database",
    title: "Database Schema",
    description: "Database schema used by the API",
    tags: ["api", "database", "schema"],
    related: ["api-endpoints", "api-development"],
    contentId: "api-database",
    group: "API",
    icon: "Webhook",
  },

  {
    id: "api-reference",
    title: "API Reference",
    description: "Reference documentation for error handling and pagination",
    tags: ["api", "reference", "errors", "pagination"],
    related: ["api-overview", "api-endpoints"],
    contentId: "api-reference",
    group: "API",
    icon: "Webhook",
  },

  {
    id: "contracts",
    title: "Move",
    description: "Learn about the Move contracts of Beaver Social",
    tags: ["move-contracts", "getting-started", "move-contracts"],
    related: ["introduction", "architecture"],
    contentId: "contracts",
    group: "Contracts",
    icon: "FileCode2",
  },
];
