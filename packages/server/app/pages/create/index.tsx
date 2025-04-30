import Layout from "@/pages/layout"
import SecondaryPanel from "../explore/SecondaryPanel"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import { useEffect } from "react"
import CreatePage from "./CreatePage"

export default function Home() {
    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("create");
    }, []);

    return (
        <Layout main={
            <div>
                <div className="flex-1 mx-auto w-full">
                    <CreatePage />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}