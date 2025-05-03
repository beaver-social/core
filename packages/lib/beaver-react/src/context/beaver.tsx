import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BeaverClient, BeaverClientConfig } from "@beaver/client";

type BeaverContext = {
  client: BeaverClient;
};

const BeaverContext = createContext<BeaverContext>({
  client: {} as any,
});

type BeaverConfig = {
  children: React.ReactNode;
  config: BeaverClientConfig;
};

export function BeaverProvider(props: BeaverConfig) {
  const { children, config } = props;
  const [client, setClient] = useState<BeaverClient>({} as any);
  const [ready, setReady] = useState<boolean>(false);

  const flag = useRef(false);

  function init() {
    const beaver = new BeaverClient(config);
    beaver.on("beaver:ready", () => setReady(true));
    setClient(beaver);
  }

  const value: BeaverContext = { client };

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
