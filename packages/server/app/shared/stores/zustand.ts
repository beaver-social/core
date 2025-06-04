import { create } from "zustand";
import { persist } from "zustand/middleware";
import { partialZkLoginSignature, StoredZkLoginData } from "../types/zk";
import { Screen } from "../types/globalUI";
interface ZkAuthStore {
  zkEphemeralKeyPair: string | null;
  setZkEphemeralKeyPair: (zkEphemeralKeyPair: string | null) => void;
  partialZkLoginSignature: partialZkLoginSignature | null;
  setPartialZkLoginSignature: (
    partialZkLoginSignature: partialZkLoginSignature | null
  ) => void;
  zkLoginData: StoredZkLoginData | null;
  setZkLoginData: (zkLoginData: StoredZkLoginData | null) => void;
}

export const useZkAuthStore = create<ZkAuthStore>()(
  persist(
    (set) => ({
      zkEphemeralKeyPair: null,
      setZkEphemeralKeyPair: (zkEphemeralKeyPair) =>
        set({ zkEphemeralKeyPair }),
      partialZkLoginSignature: null,
      setPartialZkLoginSignature: (partialZkLoginSignature) =>
        set({ partialZkLoginSignature }),
      zkLoginData: null,
      setZkLoginData: (zkLoginData) => set({ zkLoginData }),
    }),
    { name: "zk-auth-store" }
  )
);

interface OnboardingProgress {
  currentStep: number;
  completed: number[];
  lastUpdated: string;
  checkpoint?: string;
}

interface OnboardingData {
  username: string | null;
  fullName: string | null;
  about: string | null;
  imageUrl: string | null;
}

interface GlobalUIStore {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  activeTabsByScreen: Record<Screen, string>;
  setActiveTab: (tab: string) => void;
  isMuted: boolean;
  toggleMute: () => void;
  selectedSetting: string;
  setSelectedSetting: (setting: string) => void;
  onboardingProgress: OnboardingProgress | null;
  setOnboardingProgress: (progress: OnboardingProgress | null) => void;
  onboardingData: OnboardingData | null;
  setOnboardingData: (data: OnboardingData | null) => void;
  demoTab: string;
  setDemoTab: (tab: string) => void;
}

export const useScreenStore = create<GlobalUIStore>()(
  persist(
    (set, get) => ({
      screen: "home",
      setScreen: (screen) => set({ screen }),
      activeTabsByScreen: {
        home: "default",
        profile: "default",
        alerts: "default",
        messages: "default",
        settings: "default",
        swipes: "default",
        onboarding: "default",
        create: "default",
      },
      setActiveTab: (tab) =>
        set((state) => ({
          activeTabsByScreen: {
            ...state.activeTabsByScreen,
            [state.screen]: tab,
          },
        })),
      isMuted: true,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      selectedSetting: "account.username",
      setSelectedSetting: (setting) => set({ selectedSetting: setting }),
      onboardingProgress: null,
      setOnboardingProgress: (progress) =>
        set({ onboardingProgress: progress }),
      onboardingData: null,
      setOnboardingData: (data) => set({ onboardingData: data }),
      demoTab: "wallet",
      setDemoTab: (tab) => set({ demoTab: tab }),
    }),
    { name: "global-ui-store" }
  )
);
