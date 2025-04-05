export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export type Screen =
  | "home"
  | "profile"
  | "search"
  | "notifications"
  | "messages"
  | "settings";
