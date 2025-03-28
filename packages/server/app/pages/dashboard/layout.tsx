import Sidebar from "../../shared/components/Sidebar";
import ThemeSwitch from "../../shared/components/ThemeSwitch";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Sidebar />
            <section className="flex flex-col sm:ml-[4.5rem] items-center">
                <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mt-8 flex flex-col mx-8 sm:mx-0">
                    {children}
                </div>
            </section>
            <div className="fixed bottom-0 right-0 p-5">
                <ThemeSwitch />
            </div>
        </>
    );
} 