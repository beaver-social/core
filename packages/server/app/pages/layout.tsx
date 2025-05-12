import SideNav from "@/pages/SideNav";
import BottomBar from "@/pages/BottomBar";
import ThemeSwitch from "@/shared/components/ThemeSwitch";
import GlobalSearch from "@/shared/components/GlobalSearch";
import Disconnect from "@/shared/components/Disconnect";

type LayoutProps = {
    main: React.ReactNode;
    secondary?: React.ReactNode;
};

export default function Layout({ main, secondary }: LayoutProps) {
    return (
        <div className="">
            {/* CTRL+K functionality */}
            <GlobalSearch />

            {/* Desktop Layout */}
            <div className="hidden sm:block">
                <SideNav />

                <section className="flex justify-center flex-col px-10 ml-[14rem] xl:mr-[28rem] lg:mr-[24rem] items-center bg-background">
                    <div className="w-full max-w-xl mt-8 rounded-xl">
                        {main}
                    </div>
                </section>

                <section className="hidden w-[24rem] xl:w-[28rem] lg:block fixed right-0 top-0 h-screen overflow-y-auto border-l p-4 bg-background hide-scrollbar">
                    {secondary}
                </section>

                <div className="fixed bottom-0 right-0 z-50 flex gap-4 p-5">
                    <Disconnect />
                    <ThemeSwitch />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col min-h-screen pb-16 sm:hidden">
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