import Layout from "@/pages/layout"
import SecondaryPanel from "../SecondaryPanel"
import PageTitle from "@/shared/components/PageTitle"
import Tabs from "@/shared/components/Tabs"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import { useEffect } from "react"

export default function Notifications() {
    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("alerts");
    }, []);

    return (
        <Layout main={
            <div>
                <PageTitle title="alerts" />

                <div className="w-full flex-1 border mx-auto">
                    <Tabs />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}