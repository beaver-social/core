import { createContext, useEffect, useState } from 'react';
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

    function init() {
        const beaverClient = new BeaverClient(surface, config);
        beaverClient.initialize();
        setClient(beaverClient);
    }

    const value: BeaverContext = !!client?.ready ? {
        client: client,
        ready: true
    } : {
        client: null,
        ready: false
    }

    useEffect(() => {
        init();
    }, [config]);

    return (
        <BeaverContext.Provider value={value}>
            {children}
        </BeaverContext.Provider>
    );
};
