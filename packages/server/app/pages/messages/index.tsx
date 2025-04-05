import Layout from "@/pages/layout"
import SecondaryPanel from "../SecondaryPanel"
import MessagesFeed from "./Feed"
import PageTitle from "@/shared/components/PageTitle"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import { useEffect } from "react"

export default function Messages() {
    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("messages");
    }, []);

    return (
        <Layout main={
            <div>
                <PageTitle title="messages" />

                <div className="w-full">
                    <MessagesFeed />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}