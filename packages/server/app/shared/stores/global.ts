import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { create } from "zustand";
import { MINUTE } from "../config/constants";
import apiClient from "../utils/apiClient";

interface IGlobalState {
    ready: boolean;
    actions: {
        initialize: () => void;
    };
}

const useGlobalStore = create<IGlobalState>()((set) => ({
    ready: false,

    actions: {
        initialize: () => set({ ready: true }),
    },
}));

export const useGlobalStoreActions = () =>
    useGlobalStore((state) => state.actions);

export const useServerConfig = () => {
    const globalStore = useGlobalStore();

    const serverStats = useQuery({
        queryKey: ["server-stats"],
        queryFn: async () => {
            const res = await apiClient.stats.$get();
            return res.json();
        },
        enabled: !globalStore.ready,
        staleTime: 10 * MINUTE,
    });

    useEffect(() => {
        if (serverStats.data) {
            // globalStore.actions.setPrivyAppId(serverStats.data.privyAppId);
            globalStore.actions.initialize();
        }
    }, [serverStats.data]);

    const { actions, ...values } = globalStore;

    return {
        ...values,
    };
};
