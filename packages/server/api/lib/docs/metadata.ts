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
    icon: "Book",
    group: "Getting Started",
  },

  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn how to get started with Beaver Social",
    tags: ["getting-started", "getting-started"],
    related: ["introduction", "architecture"],
    contentId: "getting_started.md",
    group: "Getting Started",
  },

  {
    id: "architecture",
    title: "Architecture",
    description: "Learn about the architecture of Beaver Social",
    tags: ["architecture", "getting-started", "architecture"],
    related: ["introduction", "react-sdk"],
    contentId: "architecture",
    group: "Getting Started",
  },

  {
    id: "react-sdk",
    title: "React SDK",
    description:
      "Learn how to use the React SDK to build your own Beaver Social client",
    tags: ["react-sdk", "getting-started", "react-sdk"],
    related: ["introduction", "architecture"],
    contentId: "react_sdk",
    group: "Integration",
  },

  {
    id: "typescript-sdk",
    title: "TypeScript SDK",
    description:
      "Learn how to use the TypeScript SDK to build your own Beaver Social client",
    tags: ["typescript-sdk", "getting-started", "typescript-sdk"],
    related: ["introduction", "architecture"],
    contentId: "typescript_sdk",
    group: "Integration",
  },

  {
    id: "api",
    title: "API",
    description:
      "Learn how to use the API to build your own Beaver Social client",
    tags: ["api", "getting-started", "api"],
    related: ["react-sdk", "typescript-sdk"],
    contentId: "api",
    group: "Integration",
  },

  {
    id: "contracts",
    title: "Move Contracts",
    description: "Learn about the Move contracts of Beaver Social",
    tags: ["move-contracts", "getting-started", "move-contracts"],
    related: ["introduction", "architecture"],
    contentId: "move_contracts",
    group: "Integration",
  },
];
