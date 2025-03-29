import Layout from "@/pages/layout"
import SecondaryPanel from "../SecondaryPanel"
import MessagesFeed from "./Feed"
import PageTitle from "@/shared/components/PageTitle"

export default function Messages() {
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