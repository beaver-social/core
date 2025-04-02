import ThemeSwitch from "@/shared/components/ThemeSwitch";
import { zkLogin } from "@/shared/lib/utils"
import { useEffect } from 'react'
import { toast } from "sonner";
import { useZkAuthStore } from "@/shared/stores/zustand";

type Props = {}

export default function GoogleOAuth({ }: Props) {
    const zkAuthStore = useZkAuthStore();

    useEffect(() => {
        const handleOAuthRedirect = async () => {
            if (window.location.hash.includes('id_token')) {
                try {
                    // Get ephemeral keypair from session storage
                    const storedKeyPair = sessionStorage.getItem('zkLoginEphemeralKeyPair');
                    if (!storedKeyPair) {
                        throw new Error("No ephemeral keypair found. Please try again.");
                    }

                    // Complete the zkLogin flow
                    const zkLoginData = await zkLogin.completeZkLoginFlow(window.location.href);

                    zkAuthStore.setZkLoginData(zkLoginData);
                } catch (error: any) {
                    toast.error(`Login failed: ${error.message}`);
                }
            }
        };

        handleOAuthRedirect();
    }, [])

    useEffect(() => {
        if (zkAuthStore.zkLoginData) {
            sessionStorage.removeItem('zkLoginEphemeralKeyPair');
            window.location.href = '/';
        }
    }, [zkAuthStore.zkLoginData]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <h1 className="text-4xl font-bold">Google OAuth</h1>

            <p className="text-sm text-muted-foreground mt-4">
                Wallet Address: {zkAuthStore.zkLoginData?.userAddress}
            </p>

            <div className="fixed bottom-0 right-0 p-4">
                <ThemeSwitch />
            </div>
        </div>
    )
}