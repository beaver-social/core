import Sidebar from "@/pages/Sidebar";
import BottomBar from "@/pages/BottomBar";
import ThemeSwitch from "@/shared/components/ThemeSwitch";
import TopNav from "./TopNav";


type LayoutProps = {
    main: React.ReactNode;
    secondary?: React.ReactNode;
};

export default function Layout({ main, secondary }: LayoutProps) {
    return (
        <div>
            {/* Desktop Layout */}
            <div className="hidden sm:block">
                <Sidebar />

                <section className="flex justify-center flex-col px-10 2xl:px-32 sm:ml-[4.5rem] lg:mr-[24rem] items-center">
                    <div className="mt-4 w-full">
                        <TopNav />
                    </div>

                    <div className="w-full mt-4">
                        {main}
                    </div>
                </section>

                <section className="hidden w-[24rem] lg:block fixed right-0 top-0 h-screen overflow-y-auto border-l p-4 bg-background">
                    {secondary}
                </section>

                <div className="fixed bottom-0 right-0 p-5">
                    <ThemeSwitch />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col min-h-screen pb-16 sm:hidden">
                <div className="fixed w-full p-4 bottom-16 z-50">
                    <TopNav />
                </div>
                <section className="flex-1">
                    <div className="flex flex-col w-full mx-auto">
                        {main}
                    </div>
                </section>
                <BottomBar />
            </div>
        </div>
    );
} 