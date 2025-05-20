import { icons } from "lucide-react";

// Types for documentation structure
export type DocSection = {
  id: string;
  title: string;
  description?: string;
  icon: keyof typeof icons;
};

export type DocItem = {
  id: string;
  title: string;
  parentId: string;
};

// Documentation structure
export const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up and start building with Beaver Social",
    icon: "BookOpen",
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    description: "Learn the fundamental concepts of the platform",
    icon: "Lightbulb",
  },
  {
    id: "sdk-reference",
    title: "SDK Reference",
    description: "API documentation for the Beaver SDK",
    icon: "Code",
  },
  {
    id: "examples",
    title: "Examples",
    description: "Example projects and code snippets",
    icon: "FileCode",
  },
  {
    id: "tutorials",
    title: "Tutorials",
    description: "Step-by-step guides for common tasks",
    icon: "GraduationCap",
  },
];

export const docItems: DocItem[] = [
  { id: "installation", parentId: "getting-started", title: "Installation" },
  { id: "quick-start", parentId: "getting-started", title: "Quick Start" },
  {
    id: "authentication",
    parentId: "getting-started",
    title: "Authentication",
  },

  { id: "social-graph", parentId: "core-concepts", title: "Social Graph" },
  { id: "content-model", parentId: "core-concepts", title: "Content Model" },
  {
    id: "web3-integration",
    parentId: "core-concepts",
    title: "Web3 Integration",
  },

  { id: "client-api", parentId: "sdk-reference", title: "Client API" },
  { id: "hooks", parentId: "sdk-reference", title: "React Hooks" },
  { id: "utilities", parentId: "sdk-reference", title: "Utilities" },

  { id: "social-feed", parentId: "examples", title: "Social Feed" },
  { id: "user-profiles", parentId: "examples", title: "User Profiles" },
  { id: "wallet-connect", parentId: "examples", title: "Wallet Connect" },

  {
    id: "build-profile",
    parentId: "tutorials",
    title: "Building a Profile Page",
  },
  { id: "create-post", parentId: "tutorials", title: "Creating Posts" },
  { id: "follow-users", parentId: "tutorials", title: "Following Users" },
];
