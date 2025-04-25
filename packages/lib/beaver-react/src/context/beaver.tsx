import { createContext, useEffect, useRef, useState } from 'react';
import { BeaverClient, BeaverClientConfig } from "@beaver/client";
import { surface } from "../lib/surface";

type BeaverContext = {
    ready: false;
    client: null;
} | {
    ready: true;
    client: BeaverClient;
}

export const BeaverContext = createContext<BeaverContext>({
    client: null,
    ready: false
});

export type BeaverConfig = {
    children: React.ReactNode;
    config: BeaverClientConfig;
}

export function BeaverProvider(props: BeaverConfig) {
    const { children, config } = props;
    const [client, setClient] = useState<BeaverClient | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    const flag = useRef(false)

    function init() {
        const beaverClient = new BeaverClient(surface, config);
        beaverClient.initialize(() => setReady(true));
        setClient(beaverClient);
    }

    const value: BeaverContext = !!client?.ready ? {
        client: client,
        ready: ready as true
    } : {
        client: null,
        ready: ready as false
    }

    useEffect(() => {
        if (!flag.current) {
            flag.current = true
            init();
        }
    }, [config]);


    return (
        <BeaverContext.Provider value={value}>
            {ready && children}
        </BeaverContext.Provider>
    );
};
