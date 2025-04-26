import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  // partialZkLoginSignature,
  StoredZkLoginData,
} from "@beaver/client";

export interface ZkAuthStore {
  zkLoginData: StoredZkLoginData | null;
  setZkLoginData: (zkLoginData: StoredZkLoginData | null) => void;
}

export const useZkAuthStore = create<ZkAuthStore>()(
  persist(
    (set) => ({
      zkLoginData: null,
      setZkLoginData: (zkLoginData) => set({ zkLoginData }),
    }),
    { name: "zk-auth-store" }
  )
);
