import ThemeSwitch from "@/shared/components/ThemeSwitch";
import { ZkLoginData } from "@/shared/lib/zkLoginService";
import { zkLogin } from "@/shared/lib/utils"
import { useEffect, useState } from 'react'
import { toast } from "sonner";

type Props = {}


export default function GoogleOAuth({ }: Props) {
    const [zkLoginData, setZkLoginData] = useState<ZkLoginData | null>(null);

    useEffect(() => {
        async function fetchZkLoginData() {
            const zkLoginData = await zkLogin.completeZkLoginFlow(window.location.href);
            console.log({ zkLoginData });

            setZkLoginData(zkLoginData);

            toast.success("Successfully generated zkLoginData");
        }

        fetchZkLoginData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <h1 className="text-4xl font-bold">Google OAuth</h1>

            <p className="text-sm text-muted-foreground mt-4">
                Wallet Address: {zkLoginData?.userAddress}
            </p>

            <div className="fixed bottom-0 right-0 p-4">
                <ThemeSwitch />
            </div>
        </div>
    )
}