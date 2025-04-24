import { createNetworkConfig, SuiClientProvider, useSuiClientContext, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { useState } from "react";
import { ThemeVars } from '@mysten/dapp-kit';
import { useTheme } from "./theme-provider";
import { Network } from "../types/sui";

const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl('localnet') },
    devnet: { url: getFullnodeUrl('devnet') },
    testnet: { url: getFullnodeUrl('testnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const [activeNetwork, setActiveNetwork] = useState<Network>(import.meta.env.VITE_SUI_NETWORK as Network);
    const { theme } = useTheme();

    return (
        <SuiClientProvider
            networks={networkConfig}
            network={activeNetwork}
            onNetworkChange={(network) => {
                setActiveNetwork(network);
            }}>
            <WalletProvider
                key={theme}
                theme={theme === 'dark' ? darkTheme : lightTheme}
            >
                {children}
            </WalletProvider>
        </SuiClientProvider>
    );
};


// Light theme copied from dapp-kit
const lightTheme: ThemeVars = {
    blurs: {
        modalOverlay: 'blur(0)',
    },
    backgroundColors: {
        primaryButton: '#F6F7F9',
        primaryButtonHover: '#F0F2F5',
        outlineButtonHover: '#F4F4F5',
        modalOverlay: 'rgba(24 36 53 / 20%)',
        modalPrimary: 'white',
        modalSecondary: '#F7F8F8',
        iconButton: 'transparent',
        iconButtonHover: '#F0F1F2',
        dropdownMenu: '#FFFFFF',
        dropdownMenuSeparator: '#F3F6F8',
        walletItemSelected: 'white',
        walletItemHover: '#3C424226',
    },
    borderColors: {
        outlineButton: '#E4E4E7',
    },
    colors: {
        primaryButton: '#373737',
        outlineButton: '#373737',
        iconButton: '#000000',
        body: '#182435',
        bodyMuted: '#767A81',
        bodyDanger: '#FF794B',
    },
    radii: {
        small: '6px',
        medium: '8px',
        large: '12px',
        xlarge: '16px',
    },
    shadows: {
        primaryButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    },
    fontWeights: {
        normal: '400',
        medium: '500',
        bold: '600',
    },
    fontSizes: {
        small: '14px',
        medium: '16px',
        large: '18px',
        xlarge: '20px',
    },
    typography: {
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontStyle: 'normal',
        lineHeight: '1.3',
        letterSpacing: '1',
    },
};

// Dark theme
const darkTheme: ThemeVars = {
    blurs: {
        modalOverlay: 'blur(100)',
    },
    backgroundColors: {
        primaryButton: '#1E293B',
        primaryButtonHover: '#334155',
        outlineButtonHover: '#1E293B',
        modalOverlay: 'rgba(2 12 25 / 80%)',
        modalPrimary: '#020C19',
        modalSecondary: '#011828',
        iconButton: 'transparent',
        iconButtonHover: '#1E293B',
        dropdownMenu: '#020C19',
        dropdownMenuSeparator: '#1E293B',
        walletItemSelected: '#1E293B',
        walletItemHover: '#334155',
    },
    borderColors: {
        outlineButton: '#1E293B',
    },
    colors: {
        primaryButton: '#F8FAFC',
        outlineButton: '#F8FAFC',
        iconButton: '#F8FAFC',
        body: '#F8FAFC',
        bodyMuted: '#94A3B8',
        bodyDanger: '#FF794B',
    },
    radii: {
        small: '6px',
        medium: '8px',
        large: '12px',
        xlarge: '16px',
    },
    shadows: {
        primaryButton: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    },
    fontWeights: {
        normal: '400',
        medium: '500',
        bold: '600',
    },
    fontSizes: {
        small: '14px',
        medium: '16px',
        large: '18px',
        xlarge: '20px',
    },
    typography: {
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontStyle: 'normal',
        lineHeight: '1.3',
        letterSpacing: '1',
    },
};