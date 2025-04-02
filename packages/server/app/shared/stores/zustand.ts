import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ZkLoginData } from "../lib/zkLoginService";

interface ZkAuthStore {
  zkLoginData: ZkLoginData | null;
  setZkLoginData: (zkLoginData: ZkLoginData | null) => void;
}

export const useZkAuthStore = create<ZkAuthStore>()(
  persist(
    (set) => ({
      zkLoginData: null,
      setZkLoginData: (zkLoginData) => set({ zkLoginData }),
    }),
    {
      name: "zk-login-data",
    }
  )
);
