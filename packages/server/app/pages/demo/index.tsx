import { ConnectButton, useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { BeaverProvider } from "@beaver/react";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl } from "@mysten/sui/client";
import { sign, signPersonalMessage, signTransaction, signWithIntent } from "@/shared/lib/surface";

export type Surface = {
    sign: Ed25519Keypair["sign"];
    signPersonalMessage: Ed25519Keypair["signPersonalMessage"];
    signTransaction: Ed25519Keypair["signTransaction"];
    signWithIntent?: Ed25519Keypair["signWithIntent"];
};

export type Config = {
    debug?: boolean;
    network?: Parameters<typeof getFullnodeUrl>[0];
    apiBaseUrl?: string;
};

export default function Demo() {
    const { currentWallet, connectionStatus } = useCurrentWallet();
    const currentAccount = useCurrentAccount();

    const config: Config = {
        debug: true,
        network: 'testnet',
        apiBaseUrl: 'http://localhost:5173/api',
    };

    const surface: Surface = {
        sign,
        signPersonalMessage,
        signTransaction,
        signWithIntent,
    }

    return (
        <BeaverProvider
            surface={surface}
            config={config}
        >
            <div className="flex flex-col gap-4 h-screen justify-center items-center">
                <ConnectButton />

                {connectionStatus === 'connected' ? (
                    <div>
                        <h2>Current wallet:</h2>
                        <div>Name: {currentWallet.name}</div>
                        <div className="flex flex-col gap-2">
                            <ul>
                                {currentWallet.accounts.map((account) => (
                                    <div key={account.address}>
                                        <p>name: {account.label}</p>
                                        <p>address: {account.address}</p>
                                        <p>icon: {account.icon}</p>
                                        <p>publicKey: {account.publicKey}</p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>Connection status: {connectionStatus}</div>
                )}
            </div>
        </BeaverProvider>
    )
}