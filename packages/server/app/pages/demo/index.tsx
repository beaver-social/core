import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit";
import { BeaverProvider } from "@beaver/react";

export default function Demo() {
    const { currentWallet, connectionStatus } = useCurrentWallet();

    return (
        <div className="flex flex-col gap-4 h-screen justify-center items-center">
            <ConnectButton />

            {connectionStatus === 'connected' ? (
                <div>
                    <div>Wallet: {currentWallet.name}</div>
                    <div className="flex flex-col gap-2">
                        <ul>
                            {currentWallet.accounts.map((account) => (
                                <div key={account.address}>
                                    <p>Name: {account.label}</p>
                                    <p>Address: {account.address}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div>Connection status: {connectionStatus}</div>
            )}
        </div>
    )
}