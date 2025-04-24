import useBeaverClient from "./useBeaverClient";

/**
 * Hook to access the user module of the Beaver client
 */
export default function useUser() {
  const client = useBeaverClient();
}
