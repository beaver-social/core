import { Button } from "@/shared/components/ui/button"
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import Icon from "../Icon";
import { useState, useEffect } from "react";

type Props = {}

export function WalletButton({ onConnected }: { onConnected?: () => void }) {
    const [open, setOpen] = useState(false);
    const currentAccount = useCurrentAccount();
    const [previousConnectionState, setPreviousConnectionState] = useState(!!currentAccount?.address);

    // Monitor for successful wallet connections
    useEffect(() => {
        if (!previousConnectionState && currentAccount?.address) {
            // Connection just happened
            onConnected?.();
        }
        setPreviousConnectionState(!!currentAccount?.address);
    }, [currentAccount?.address, previousConnectionState, onConnected]);

    return (
        <ConnectModal
            trigger={
                <Button variant="outline" className="w-full">
                    <Icon name="Wallet" />
                    Connect Wallet
                </Button>
            }
            open={open}
            onOpenChange={(isOpen: boolean) => setOpen(isOpen)}
        />
    )
}