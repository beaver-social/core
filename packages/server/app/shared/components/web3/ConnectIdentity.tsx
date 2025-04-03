import { useState, useEffect } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../ui/dialog"
import { WalletButton } from "./Wallet"
import { useTheme } from "@/shared/context/theme-provider";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { toast } from "sonner";
import { formatAddress } from "@mysten/sui/utils";
import Icon from "../Icon";
import { zkLogin } from "@/shared/lib/utils";
import { useZkAuthStore } from "@/shared/stores/zustand";
type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export default function ConnectIdentity({ open, onOpenChange, trigger }: Props) {
    const [isOpen, setIsOpen] = useState(open || false);
    const { theme } = useTheme();
    const currentAccount = useCurrentAccount();
    const { mutate: disconnectWallet } = useDisconnectWallet();
    const zkAuthStore = useZkAuthStore();

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    const handleDisconnect = () => {
        // Clear zkLogin data
        sessionStorage.removeItem('zkLoginData');
        sessionStorage.removeItem('zkLoginEphemeralKeyPair');

        toast.success("Identity disconnected");

        // Disconnect wallet if connected
        if (currentAccount) {
            disconnectWallet();
        }
    };

    async function handleGoogleLogin() {
        try {
            // Generate ephemeral keypair
            const ephemeralKeyPair = await zkLogin.generateEphemeralKeyPair();

            // Store only the necessary data in session storage
            const secretKey = ephemeralKeyPair.keypair.getSecretKey();
            sessionStorage.setItem(
                "zkLoginEphemeralKeyPair",
                JSON.stringify({
                    publicKey: ephemeralKeyPair.publicKey,
                    maxEpoch: ephemeralKeyPair.maxEpoch,
                    randomness: ephemeralKeyPair.randomness,
                    nonce: ephemeralKeyPair.nonce,
                    privateKeyBytes: secretKey
                })
            );

            // Generate OAuth URL and redirect
            const oauthUrl = zkLogin.generateGoogleOAuthUrl(ephemeralKeyPair);
            window.location.href = oauthUrl;
        } catch (error: any) {
            toast.error(`Error initiating login: ${error.message}`);
        }
    }

    if (zkAuthStore.zkLoginData?.userAddress) {
        return (
            <div>
                <Button variant="neon">
                    <Icon name="Wallet" className="size-4" />
                    <p>{formatAddress(zkAuthStore.zkLoginData.userAddress)}</p>
                </Button>
            </div>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="neon">
                    Connect Identity
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
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleGoogleLogin}
                            >
                                <img src="/icons/google_icon.png" alt="Google" className="size-6" />
                            </Button>
                            <Button variant="outline" className="w-full">
                                {
                                    theme === "dark" ? (
                                        <img src="/icons/x_icon_dark.png" alt="X" className="size-7 p-1" />
                                    ) : (
                                        <img src="/icons/x_icon_light.png" alt="X" className="size-7 p-1" />
                                    )
                                }
                            </Button>
                        </div>
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
                            <WalletButton />
                            {/* <NetworkSelector /> */}
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