import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EphemeralKeyPair, zkLoginService } from "./zkLoginService";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateSuiAddress(
  address: string,
  length: number = 4
): string {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error("Invalid address");
  }
  return `${address.slice(0, 6)}...${address.slice(-length)}`;
}

export const zkLogin = new zkLoginService();

export const isZkAuthenticated = (): boolean => {
  const zkLoginData = sessionStorage.getItem("zkLoginData");
  if (!zkLoginData) {
    return false;
  }

  const { userAddress, jwt } = JSON.parse(zkLoginData);
  if (!userAddress || !jwt) {
    return false;
  }

  return true;
};

export const getEphemeralKeyPair = (): EphemeralKeyPair | null => {
  const ephemeralKeyPair = sessionStorage.getItem("zkLoginEphemeralKeyPair");
  if (!ephemeralKeyPair) {
    return null;
  }
  return JSON.parse(ephemeralKeyPair);
};

export const getZkAddress = (): string | null => {
  const zkLoginData = sessionStorage.getItem("zkLoginData");
  if (!zkLoginData) {
    return null;
  }
  return JSON.parse(zkLoginData).userAddress;
};
