import { useMutation } from "@tanstack/react-query";
import useBeaverClient from "./useBeaverClient";

export default function useAuth() {
  const client = useBeaverClient();
  const { mutateAsync } = useMutation({});

  async function login(loginMethod: "wallet" | "google") {
    if (loginMethod === "wallet") {
    } else if (loginMethod === "google") {
      client.zk.
    } else {
      throw new Error("Invalid login method");
    }
  }
}
