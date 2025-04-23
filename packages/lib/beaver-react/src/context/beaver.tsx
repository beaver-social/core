import React, { createContext, useEffect, useState, useCallback } from 'react';
import { BeaverContextValue, BeaverProviderProps } from '../types';
import { BeaverClient } from '@beaver/client';

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

    const initialize = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const beaverClient = new BeaverClient(surface, config);
            await beaverClient.initialize();
            setClient(beaverClient);
            setIsInitialized(true);
            setIsLoading(false);
            return beaverClient;
        } catch (err) {
            const errorObj = err instanceof Error ? err : new Error('Failed to initialize Beaver Client');
            setError(errorObj);
            setIsLoading(false);
            throw errorObj;
        }
    }, [surface, config]);

    const destroy = useCallback(() => {
        if (client) {
            client.destroy();
            setClient(null);
            setIsInitialized(false);
        }
    }, [client]);

    useEffect(() => {
        initialize();

        return () => {
            destroy();
        };
    }, [initialize, destroy]);

    const contextValue: BeaverContextValue = {
        client,
        isInitialized,
        isLoading,
        error,
    };

    return (
        <BeaverContext.Provider value={contextValue}>
            {children}
        </BeaverContext.Provider>
    );
};