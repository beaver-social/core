import Feed from "@/pages/home/Feed"
import Sidebar from "@/shared/components/Sidebar"
import ThemeSwitch from "@/shared/components/ThemeSwitch"
import { Button } from "@/shared/components/ui/button"

type Props = {}

export default function Home({ }: Props) {
    return (
        <>
            <Sidebar />

            <section className="flex flex-col sm:ml-[4.5rem] items-center">
                <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mt-8 flex flex-col mx-8 sm:mx-0">
                    <div className="flex justify-between h-full items-center rounded-t-md bg-primary-300 p-10">
                        <div className="text-7xl text-primary-900">
                            <p>beaver</p>
                            <p>social</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <img src={
                                "/icons/logo_icon.png"
                            } alt="logo" className="w-[9rem]" />
                        </div>
                    </div>

                    <div className="w-full mb-10">
                        <Feed />
                    </div>
                </div>

            </section>

            <div className="fixed bottom-0 right-0 p-5">
                <ThemeSwitch />
            </div>
        </>
    )
}