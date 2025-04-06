import { useEffect } from "react"
import Layout from "../layout"
import SecondaryPanel from "../SecondaryPanel"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import ShortsFeed from "./ShortsFeed"
import ShortsErrorBoundary from "./ShortsErrorBoundary"

export default function Shorts() {
    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("shorts");
    }, []);

    return (
        <Layout main={
            <div className="h-[calc(100vh-60px)] max-h-screen mb-10">
                <ShortsErrorBoundary>
                    <ShortsFeed />
                </ShortsErrorBoundary>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}