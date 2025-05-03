import { useState } from "react";
import { useBeaverContext } from "../context/beaver";
import { BeaverUser } from "@beaver/client";

export default function useBeaver() {
  const { client } = useBeaverContext();
  const [user, setUser] = useState<BeaverUser>();

  client.on("user:login", (user) => {
    setUser(user);
  });
  client.on("user:logout", () => {
    setUser(null);
  });

  const authenticated = !!user;

  return {
    client,
    user,
    authenticated,
    login: client.user.login,
    logout: client.user.logout,
    connect: client.connector.connect,
    disconnect: client.connector.disconnect,
  };
}
