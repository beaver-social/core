import Icon from "../shared/components/Icon";
import type { icons } from "lucide-react";
import { Link } from "react-router";

type bottomBarItems = {
    name: string;
    to: string;
    iconName: keyof typeof icons;
};

const bottomBarItems: bottomBarItems[] = [
    {
        name: "Home",
        iconName: "House",
        to: "/",
    },
    {
        name: "Explore",
        iconName: "Search",
        to: "/dashboard/explore",
    },
    {
        name: "Create",
        iconName: "SquarePlus",
        to: "/dashboard/create",
    },
    {
        name: "Messages",
        iconName: "MessageCircle",
        to: "/dashboard/messages",
    },
];

function BottomBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background glass border-t sm:hidden">
            <nav className="flex items-center justify-around h-16">
                {bottomBarItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className="flex flex-col items-center justify-center text-xs text-grey-300 hover:text-grey-500 transition-all"
                    >
                        <Icon name={item.iconName} className="w-6 h-6" />
                    </Link>
                ))}

                <Link to={"/dashboard/profile"} className="flex flex-col items-center justify-center text-xs text-grey-300 hover:text-primary bg-grey-900 rounded-full p-1 hover:bg-grey-800 transition-all">
                    <img src="/images/user.png" alt="logo" className="w-6 h-6" />
                </Link>
            </nav>
        </div>
    );
}

export default BottomBar; 