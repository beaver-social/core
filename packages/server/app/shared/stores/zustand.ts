import { create } from "zustand";
import { persist } from "zustand/middleware";
import { partialZkLoginSignature, StoredZkLoginData } from "../types/zk";

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
