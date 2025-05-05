import { useBeaverContext } from "../context/beaver";
import { useMutation } from "@tanstack/react-query";

export function useBeaver() {
  const { client, user } = useBeaverContext();
  const wallet = useWallets();

  return {
    user,
    client,
    wallet,
    register: client.user.register.bind(client.user),
    login: client.user.login.bind(client.user),
    logout: client.user.logout.bind(client.user),
  };
}

export function useLogin() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      return await client.user.login();
    },
  });
}

export function useRegister() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: Parameters<typeof client.user.register>[0]) => {
      return await client.user.register(data);
    },
  });
}

export function useWallets() {
  const { client, isConnected, hasIdentity } = useBeaverContext();
  const wallets = client.connector.getWallets();

  return {
    wallets,
    isConnected,
    hasIdentity,
    connect: client.connector.connect.bind(client.connector),
    disconnect: client.connector.disconnect.bind(client.connector),
  };
}

export function useUploadPost() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["uploadPost"],
    mutationFn: async (data: Parameters<typeof client.posts.upload>[0]) => {
      return await client.posts.upload(data);
    },
  });
}
