import Layout from "@/pages/layout"
import PageTitle from "@/shared/components/PageTitle"
import MessagesFeed from "../MessageFeed"
import UserDetails from "./UserDetails"
import ReplyBarContent from "./ReplyBarContent"

export default function Message() {
    return (
        <Layout main={
            <div>
                <div className="w-full border">
                    <UserDetails />

                    <div className="hidden sm:block">
                        <ReplyBarContent />
                    </div>
                </div>
            </div>
        } secondary={
            <div>
                <h1 className="text-2xl mb-4">Messages</h1>
                <MessagesFeed />
            </div>
        } />
    )
}