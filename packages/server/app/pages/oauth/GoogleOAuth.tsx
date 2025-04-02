import { zkLogin } from "@/shared/lib/utils"
import { useEffect } from 'react'

type Props = {}


export default function GoogleOAuth({ }: Props) {
    useEffect(() => {
        async function fetchZkLoginData() {
            const zkLoginData = await zkLogin.completeZkLoginFlow(window.location.href);
            console.log(zkLoginData);
        }

        fetchZkLoginData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Google OAuth</h1>
        </div>
    )
}