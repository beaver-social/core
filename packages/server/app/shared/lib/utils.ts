import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { zkLoginService } from "./zkLoginService";

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
