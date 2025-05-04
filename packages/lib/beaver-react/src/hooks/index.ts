import { useBeaverContext } from "../context/beaver";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBeaver() {
  const { client } = useBeaverContext();

  const register = useRegister();

  return {
    client,
    register,
    login: client.user.login,
    logout: client.user.logout,
    connect: client.connector.connect,
    disconnect: client.connector.disconnect,
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

export function useUploadPost() {
  const { client } = useBeaverContext();
  return useMutation({
    mutationKey: ["uploadPost"],
    mutationFn: async (data: Parameters<typeof client.posts.upload>[0]) => {
      return await client.posts.upload(data);
    },
  });
}
