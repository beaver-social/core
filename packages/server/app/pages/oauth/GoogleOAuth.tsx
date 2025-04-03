import ThemeSwitch from "@/shared/components/ThemeSwitch";
import { useEffect, useState } from 'react'
import { toast } from "sonner";
import { useZkAuthStore } from "@/shared/stores/zustand";
import Icon from "@/shared/components/Icon";
import zkLoginService from "@/shared/lib/zkLoginService";

type Props = {}

export default function GoogleOAuth({ }: Props) {
    const zkAuthStore = useZkAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleOAuthRedirect = async () => {
            if (window.location.hash.includes('id_token')) {
                setIsLoading(true);
                try {
                    // Get ephemeral keypair from session storage
                    const storedKeyPair = sessionStorage.getItem('zkLoginEphemeralKeyPair');
                    if (!storedKeyPair) {
                        throw new Error("No ephemeral keypair found. Please try again.");
                    }

                    // Complete the zkLogin flow
                    const zkLoginData = await zkLoginService.completeZkLoginFlow(window.location.href);
                    setIsLoading(false);

                    // set zkAuthStore
                    zkAuthStore.setZkEphemeralKeyPair(storedKeyPair);
                    zkAuthStore.setPartialZkLoginSignature(zkLoginData.partialZkLoginSignature); zkAuthStore.setZkLoginData({
                        jwt: zkLoginData.jwt,
                        decodedJwt: zkLoginData.decodedJwt,
                        userAddress: zkLoginData.userAddress,
                        userSalt: zkLoginData.userSalt.toString(),
                    });

                    // clear session storage
                    sessionStorage.removeItem('zkLoginEphemeralKeyPair');
                    window.location.href = '/';
                } catch (error: any) {
                    toast.error(`Login failed: ${error.message}`);
                }
            }
        };

        handleOAuthRedirect();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-10 h-10 bg-grey-200 rounded-full animate-pulse" />
                </div>
            ) : (
                <div className="text-4xl flex gap-4 items-center font-bold text-center">
                    <p>Success!</p>
                    <Icon name="Check" className="text-green-500 size-12" />
                </div>
            )}

            <div className="fixed bottom-0 right-0 p-4">
                <ThemeSwitch />
            </div>
        </div>
    )
}