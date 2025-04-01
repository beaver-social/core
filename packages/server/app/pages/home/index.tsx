import Layout from "@/pages/layout"
import Feed from "./Feed"
import SecondaryPanel from "../SecondaryPanel"
import PageTitle from "@/shared/components/PageTitle"

export default function Home() {
    return (
        <Layout main={
            <div>
                <PageTitle title="beaver social" />

                <div className="w-full">
                    <Feed />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}