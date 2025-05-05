import React from 'react'
import { AlertDialogComponent } from "./AlertDialog";
import { useBeaver } from "@beaver/react";
import Icon from "./Icon";
import { Button } from "./ui/button";

type Props = {}

export default function Disconnect({ }: Props) {
    const beaver = useBeaver();

    return (
        <AlertDialogComponent
            title="Disconnect Wallet"
            description="Are you sure you want to disconnect your wallet?"
            onConfirm={() => {
                beaver.wallet.disconnect();
                window.location.href = "/";
            }}>
            <Button variant="outline" className="rounded-sm px-[0.7rem] cursor-pointer">
                <Icon name="LogOut" className="size-5" />
            </Button>
        </ AlertDialogComponent >
    )
}