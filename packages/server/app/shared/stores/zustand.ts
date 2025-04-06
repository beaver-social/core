import { create } from "zustand";
import { persist } from "zustand/middleware";
import { partialZkLoginSignature, StoredZkLoginData } from "../types/zk";
import { Tab, Screen } from "../types/globalUI";
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

interface GlobalUIStore {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  isMuted: boolean;
  toggleMute: () => void;
  selectedSetting: string;
  setSelectedSetting: (setting: string) => void;
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
    }),
    { name: "global-ui-store" }
  )
);
