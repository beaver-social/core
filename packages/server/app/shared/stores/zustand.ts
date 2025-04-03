import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JwtPayload, PartialZkLoginSignature } from "../lib/zkLoginService";

interface ZkLoginData {
  userAddress: string;
  ephemeralKeyPair: string;
  jwt: string;
  decodedJwt: JwtPayload;
  partialZkLoginSignature: PartialZkLoginSignature;
  userSalt: string;
}
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
    { name: "zk-auth-store" }
  )
);
