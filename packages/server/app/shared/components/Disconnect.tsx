import React from "react";
import { AlertDialogComponent } from "./AlertDialog";
import { useBeaver } from "@beaver/react";
import Icon from "./Icon";
import { Button } from "./ui/button";
import { useGlobalUIStore } from "../stores/zustand";

type Props = {};

export default function Disconnect({}: Props) {
  const beaver = useBeaver();
  const { setOnboardingData, setOnboardingProgress } = useGlobalUIStore();

  return (
    <AlertDialogComponent
      title="Disconnect Wallet"
      description="Are you sure you want to disconnect your wallet?"
      onConfirm={() => {
        beaver.wallet.disconnect();
        setOnboardingData(null);
        setOnboardingProgress(null);
        window.location.href = "/app";
      }}
    >
      <Button
        variant="outline"
        className="rounded-sm px-[0.7rem] cursor-pointer"
      >
        <Icon name="LogOut" className="size-5" />
      </Button>
    </AlertDialogComponent>
  );
}
