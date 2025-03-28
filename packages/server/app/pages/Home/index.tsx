import Sidebar from "@/shared/components/Sidebar"
import ThemeSwitch from "@/shared/components/ThemeSwitch"
import { Button } from "@/shared/components/ui/button"

type Props = {}

export default function Home({ }: Props) {
    return (
        <>
            <Sidebar />

            <section className="flex sm:ml-[4.5rem] h-screen items-center justify-center">
                <div className="flex gap-4 flex-col bg-primary-300 p-10 rounded-sm">
                    <h1 className="text-7xl text-primary-900 text-center">
                        beaver social
                    </h1>

                    <Button variant="secondary" className="w-max">Get Started</Button>

                </div>
            </section>

            <div className="fixed bottom-0 right-0 p-5">
                <ThemeSwitch />
            </div>
        </>
    )
}