import { useBeaverClient } from "./client";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook to access the identity module of the Beaver client
 * @returns The identity module and client state
 */
export function useMint() {
  const client = useBeaverClient();

  return useMutation({
    mutationFn: async (options: Parameters<typeof client.identity.mint>[0]) => {
      return client.identity.mint(options);
    },
  });
}

export function useUpdate() {
  const client = useBeaverClient();

  return useMutation({
    mutationFn: async (
      options: Parameters<typeof client.identity.setAbout>[0]
    ) => {
      return client.identity.setAbout(options);
    },
  });
}
