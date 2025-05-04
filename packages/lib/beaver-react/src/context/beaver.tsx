import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BeaverClient, BeaverClientConfig, BeaverUser } from "@beaver/client";

type BeaverContext = {
  client: BeaverClient;
  user: BeaverUser | null,
  authenticated: boolean;
};

const BeaverContext = createContext<BeaverContext>({
  client: {} as any,
  user: null,
  authenticated: false,
});

type BeaverConfig = {
  children: React.ReactNode;
  config: BeaverClientConfig;
};

export function BeaverProvider(props: BeaverConfig) {
  const { children, config } = props;
  const [client, setClient] = useState<BeaverClient>({} as any);
  const [ready, setReady] = useState<boolean>(false);
  const [user, setUser] = useState<BeaverUser>(null);

  const authenticated = !!user;
  const flag = useRef(false);

  function init() {
    const beaver = new BeaverClient(config);
    beaver.on("beaver:ready", () => setReady(true));

    beaver.on("user:login", (user) => {
      setUser(user);
    });
    beaver.on("user:logout", () => {
      setUser(null);
    });

    setClient(beaver);
  }

  const value: BeaverContext = { client, user, authenticated };

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      init();
    }
  }, [config]);

  return (
    <BeaverContext.Provider value={value}>
      {ready && children}
    </BeaverContext.Provider>
  );
}

export function useBeaverContext() {
  return useContext(BeaverContext);
}
