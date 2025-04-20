import React, { createContext, useEffect, useState } from 'react';
import { BeaverContextValue, BeaverProviderProps } from '../types';
import { BeaverClient } from '../../../beaver-client/src';

export const BeaverContext = createContext<BeaverContextValue>({
    client: null,
    isInitialized: false,
    isLoading: false,
    error: null,
});

export const BeaverProvider: React.FC<BeaverProviderProps> = ({
    children,
    surface,
    config
}) => {
    const [client, setClient] = useState<BeaverClient | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const initializeClient = async () => {
            try {
                setIsLoading(true);

                const beaverClient = new BeaverClient(surface, config);
                await beaverClient.initialize();
                setClient(beaverClient);
                setIsInitialized(true);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to initialize Beaver Client'));
                setIsLoading(false);
            }
        };

        initializeClient();

        return () => {
            if (client) {
                client.destroy();
            }
        };
    }, [surface, config]);

    return (
        <BeaverContext.Provider value={{ client, isInitialized, isLoading, error }}>
            {children}
        </BeaverContext.Provider>
    );
};