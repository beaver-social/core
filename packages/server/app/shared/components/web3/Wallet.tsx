import { Button } from "@/shared/components/ui/button"
import { ConnectModal, useCurrentAccount, useDisconnectWallet, useSuiClientContext } from '@mysten/dapp-kit';
import Icon from "../Icon";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { useState } from "react";
import { formatAddress } from "@mysten/sui/utils";
import { toast } from "sonner";

type Props = {}

export function NetworkSelector() {
    const ctx = useSuiClientContext();

    return (
        <>
            <Select>
                <SelectTrigger className="">
                    <SelectValue placeholder="Select a network" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>All Networks</SelectLabel>
                        {Object.keys(ctx.networks).map((network) => (
                            <SelectItem key={network} value={network}>
                                {network}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export function WalletButton() {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnectWallet } = useDisconnectWallet();
    const [open, setOpen] = useState(false);

    if (currentAccount?.address) {
        return (
            <Button variant="outline" className="w-full" onClick={() => {
                disconnectWallet();
                toast.success("Wallet disconnected");
            }}>
                <Icon name="LogOut" />
                {formatAddress(currentAccount?.address)}
            </Button>
        )
    }

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