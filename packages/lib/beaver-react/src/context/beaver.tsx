import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  BeaverClient,
  BeaverClientConfig,
  BeaverUser,
  Connection,
} from "@beaver/client";

type BeaverContext = {
  client: BeaverClient;
  user: BeaverUser | null;
  isAuthenticated: boolean;
  isConnected: boolean;
  hasIdentity: boolean;
};

const BeaverContext = createContext<BeaverContext>({
  client: {} as any,
  user: null,
  isAuthenticated: false,
  isConnected: false,
  hasIdentity: false,
});

type BeaverConfig = {
  children: React.ReactNode;
  config: BeaverClientConfig;
};

export function BeaverProvider(props: BeaverConfig) {
  const { children, config } = props;
  const [client, setClient] = useState<BeaverClient>({} as any);
  const [ready, setReady] = useState<boolean>(false);
  const [user, setUser] = useState<BeaverUser | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [hasIdentity, setHasIdentity] = useState<boolean>(false);

  const isAuthenticated = !!user;
  const isConnected = !!connection;
  const flag = useRef(false);

  function init() {
    const beaver = new BeaverClient(config);
    beaver.on("beaver:ready", () => setReady(true));

    beaver.on("user:login", ({ user }) => {
      setUser(user);
    });
    beaver.on("user:logout", () => {
      setUser(null);
    });
    beaver.on("connection:change", ({ connection, hasIdentity }) => {
      setConnection(connection);
      setHasIdentity(hasIdentity);
    });

    setClient(beaver);
  }

  const value: BeaverContext = {
    client,
    user,
    isAuthenticated,
    isConnected,
    hasIdentity,
  };

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      init();
    }
  }, [config]);

  return (
    <BeaverContext.Provider value={value}>
      {ready ? <>{children}</> : null}
    </BeaverContext.Provider>
  );
}

export function useBeaverContext() {
  return useContext(BeaverContext);
}
