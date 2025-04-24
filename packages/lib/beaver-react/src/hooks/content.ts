import { useBeaverClient } from "./client";

/**
 * Hook to access the post module of the Beaver client
 */
export const usePost = () => {
  const client = useBeaverClient();

  return useMutation({
    mutationFn: async (options: Parameters<typeof client.post.getByID>[0]) => {
      return client.post.getByID(options);
    },
  });
};
