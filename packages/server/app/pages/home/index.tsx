import Layout from "@/pages/layout"
import Feed from "./Feed"
import SecondaryPanel from "./SecondaryPanel"

export default function Home() {
    return (
        <Layout main={
            <div>
                <div className="flex items-center justify-between h-full gap-4 px-10 py-5 sm:rounded-t-md bg-primary-100 dark:bg-primary-950 border sm:py-10">
                    <div className="text-5xl font-bold sm:text-7xl sm:font-medium text-primary-900 dark:text-primary-100">
                        <p>beaver</p>
                        <p>social</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <img src="/icons/logo_icon.png" alt="logo" className="w-[8rem] sm:w-[9rem]" />
                    </div>
                </div>

                <div className="w-full">
                    <Feed />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}