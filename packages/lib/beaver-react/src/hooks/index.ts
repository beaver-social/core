import { useBeaverContext } from "../context/beaver";
import { useMutation } from "@tanstack/react-query";

export function useBeaver() {
  const { client, user } = useBeaverContext();
  const register = useRegister();
  const wallet = useWallets();

  return {
    user,
    client,
    wallet,
    register,
    login: client.user.login.bind(client.user),
    logout: client.user.logout.bind(client.user),
    connect: client.connector.connect.bind(client.connector),
    disconnect: client.connector.disconnect.bind(client.connector),
  };
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
    connect: client.connector.connect,
    disconnect: client.connector.disconnect,
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
