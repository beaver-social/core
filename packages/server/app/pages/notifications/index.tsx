import Layout from "@/pages/layout"
import NotificationFeed from "./Feed"
import SecondaryPanel from "../SecondaryPanel"
import PageTitle from "@/shared/components/PageTitle"

export default function Notifications() {
    return (
        <Layout main={
            <div>
                <PageTitle title="alerts" />

                <div className="w-full">
                    <NotificationFeed />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}