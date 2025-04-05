import { create } from "zustand";
import { persist } from "zustand/middleware";
import { partialZkLoginSignature, StoredZkLoginData } from "../types/zk";
import { Tab } from "../components/Tabs";

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
  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;
}

export const useGlobalUIStore = create<GlobalUIStore>()(
  persist(
    (set) => ({
      tabs: [],
      setTabs: (tabs) => set({ tabs }),
    }),
    { name: "global-ui-store" }
  )
);
