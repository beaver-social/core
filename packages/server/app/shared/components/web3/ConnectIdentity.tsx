import { useState, useEffect } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../ui/dialog"
import { WalletButton } from "./Wallet"
import { toast } from "sonner";
import Icon from "../Icon";
import { useZkAuthStore } from "@/shared/stores/zustand";
import { Image } from "../Image";
import { useAuth } from "@beaver/react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import LoginSuccessAnimation from "../animations/LoginSuccess";

type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}


export default function ConnectIdentity({ open, onOpenChange }: Props) {
    const [isOpen, setIsOpen] = useState(open || false);
    const [showWelcomeSplash, setShowWelcomeSplash] = useState(false);
    const [showDisconnectButton, setShowDisconnectButton] = useState(false);
    const [isLoadingGoogleOAuthScreen, setIsLoadingGoogleOAuthScreen] = useState(false);
    const zkAuthStore = useZkAuthStore();
    const { zkLogin, logout } = useAuth();
    const currentAccount = useCurrentAccount();

    useEffect(() => {
        if (zkAuthStore.zkLoginData?.userAddress || currentAccount?.address) {
            setShowDisconnectButton(true);
        }
    }, [zkAuthStore.zkLoginData?.userAddress, currentAccount?.address]);

    useEffect(() => {
        if (currentAccount?.address && !showWelcomeSplash && !showDisconnectButton) {
            setShowWelcomeSplash(true);
            handleOpenChange(false);
        }
    }, [currentAccount?.address, showWelcomeSplash, showDisconnectButton]);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    const handleDisconnect = async (type: "wallet" | "social") => {
        try {
            await logout(type);
            setShowDisconnectButton(false);
        } catch (error) {
            toast.error(`Error disconnecting identity: ${error}`);
        }
    };

    if (showWelcomeSplash) {
        return <LoginSuccessAnimation onComplete={() => {
            setShowWelcomeSplash(false);
            setShowDisconnectButton(true);
        }} />;
    }

    if (showDisconnectButton) {
        return (
            <div>
                <Button variant="neon" onClick={() => handleDisconnect(
                    zkAuthStore.zkLoginData?.userAddress ? "social" : "wallet"
                )}>
                    <Icon name="LogOut" className="size-4" />
                    <p>Disconnect</p>
                </Button>
            </div>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="neon">
                    <Icon name="LogIn" className="size-4" />
                    <p>Connect Identity</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Connect to Beaver Social</DialogTitle>
                    <DialogDescription className="text-center">
                        Choose your preferred way to connect
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Social Login Section */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Continue with</h3>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={async () => {
                                setIsLoadingGoogleOAuthScreen(true);
                                await zkLogin();
                            }}
                        >
                            {isLoadingGoogleOAuthScreen ? (
                                <Icon name="LoaderCircle" className="size-4 animate-spin" />
                            ) : (
                                <Image src="/icons/google_icon.png" alt="Google" className="size-6" />
                            )}
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    {/* Wallet Connect Section */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Connect Wallet</h3>
                        <div className="space-y-2 w-full">
                            <WalletButton onConnected={() => {
                                handleOpenChange(false);
                                setShowWelcomeSplash(true);
                            }} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <p className="text-xs text-muted-foreground">
                        By connecting, you agree to our <a className="underline" href="/terms-of-service">Terms of Service</a> and <a className="underline" href="/privacy-policy">Privacy Policy</a>
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}