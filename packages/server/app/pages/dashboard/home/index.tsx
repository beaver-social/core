import Layout from "@/pages/dashboard/layout"
import Feed from "./Feed"

export default function Home() {
    return (
        <Layout>
            <div className="flex justify-between h-full items-center rounded-t-md bg-primary-300 p-10">
                <div className="text-7xl text-primary-900">
                    <p>beaver</p>
                    <p>social</p>
                </div>

                <div className="flex flex-col gap-4">
                    <img src="/icons/logo_icon.png" alt="logo" className="w-[9rem]" />
                </div>
            </div>

            <div className="w-full mb-10">
                <Feed />
            </div>
        </Layout>
    )
}