import Layout from "@/pages/layout"
import SecondaryPanel from "../explore/SecondaryPanel"
import Tabs from "@/shared/components/Tabs"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import { useEffect } from "react"

export default function Home() {
    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("home");
    }, []);

    return (
        <Layout main={
            <div>
                <div className="flex-1 mx-auto w-full">
                    <Tabs />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}