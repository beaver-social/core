import Layout from "@/pages/layout"
import SecondaryPanel from "../SecondaryPanel"
import PageTitle from "@/shared/components/PageTitle"
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
                <PageTitle title="beaver social" />

                <div className="flex-1 border-x mx-auto w-full">
                    <Tabs />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}