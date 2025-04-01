import { Button } from "@/shared/components/ui/button"
import { ConnectModal, useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit';
import Icon from "./Icon";
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

type Props = {}

function NetworkSelector() {
    const ctx = useSuiClientContext();

    return (
        <>
            <Select>
                <SelectTrigger className="w-[12rem]">
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

export default function ConnectWallet({ }: Props) {
    const currentAccount = useCurrentAccount();
    const [open, setOpen] = useState(false);

    if (currentAccount?.address) {
        return (
            <Button variant="neon" className="">
                <Icon name="Wallet" />
                {formatAddress(currentAccount?.address)}
            </Button>
        )
    }

    return (
        <ConnectModal
            trigger={
                <Button variant="neon" className="">
                    <Icon name="Wallet" />
                    Connect Wallet
                </Button>
            }
            open={open}
            onOpenChange={(isOpen: boolean) => setOpen(isOpen)}
        />
    )
}