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

interface GlobalUIStore {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  isMuted: boolean;
  toggleMute: () => void;
  selectedSetting: string;
  setSelectedSetting: (setting: string) => void;
  onboardingProgress: OnboardingProgress | null;
  setOnboardingProgress: (progress: OnboardingProgress | null) => void;
}

export const useGlobalUIStore = create<GlobalUIStore>()(
  persist(
    (set) => ({
      screen: "home",
      setScreen: (screen) => set({ screen }),
      activeTab: "for-you",
      setActiveTab: (tab) => set({ activeTab: tab }),
      isMuted: true,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      selectedSetting: "account.username",
      setSelectedSetting: (setting) => set({ selectedSetting: setting }),
      onboardingProgress: null,
      setOnboardingProgress: (progress) =>
        set({ onboardingProgress: progress }),
    }),
    { name: "global-ui-store" }
  )
);

interface User {
  id: number;
  identity: string;
  address: string;
  suinsDomainName: string;
  username: string;
  fullName: string;
  about: string;
  imageUrl: string;
  bannerUrl: string;
  loginType: string;
  email: string;
  isVerified: boolean;
  timezone: number;
  pinnedPost: number;
  pinnedShort: number;
  createdAt: string;
  deletedAt: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
