import { useState } from "react";
import { useEffect } from "react";
import useBeaverClient from "./useClient";

export default function useUser() {
  const client = useBeaverClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await client.user.getCurrentUser();
      setUser(user);
    };
    fetchUser();
  }, [client]);
}
