import { useBeaverClient } from ".";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook to access the post module of the Beaver client
 */
export default function usePost() {
  const client = useBeaverClient();
  const result = useMutation({
    mutationFn: async (options: Parameters<typeof client.post.getByID>[0]) => {
      return client.post.getByID(options);
    },
  });

  return result;
}
