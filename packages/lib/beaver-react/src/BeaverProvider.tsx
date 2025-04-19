import React, { createContext, useEffect, useState } from 'react';
import { BeaverClient } from '@beaver/client';
import { BeaverContextValue, BeaverProviderProps } from './types';

export const BeaverContext = createContext<BeaverContextValue>({
    client: null,
    isInitialized: false,
    isInitializing: false,
    error: null,
});

export const BeaverProvider: React.FC<BeaverProviderProps> = ({
    children,
    surface,
    config
}) => {
    const [client, setClient] = useState<BeaverClient | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const initializeClient = async () => {
            try {
                setIsInitializing(true);

                // Types should now be compatible
                const beaverClient = new BeaverClient(surface, config);
                await beaverClient.initialize();
                setClient(beaverClient);
                setIsInitialized(true);
                setIsInitializing(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to initialize Beaver Client'));
                setIsInitializing(false);
            }
        };

        initializeClient();

        return () => {
            // Cleanup if needed
            if (client) {
                // Any cleanup logic for the client if needed
            }
        };
    }, [surface, config]);

    return (
        <BeaverContext.Provider value={{ client, isInitialized, isInitializing, error }}>
            {children}
        </BeaverContext.Provider>
    );
}; 