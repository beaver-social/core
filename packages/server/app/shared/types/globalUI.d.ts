export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export type Screen =
  | "home"
  | "profile"
  | "alerts"
  | "messages"
  | "settings"
  | "swipes"
  | "onboarding";
