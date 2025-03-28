import Icon from "../../shared/components/Icon";
import type { icons } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { Link } from "react-router";

type sidebarItems = {
    name: string;
    to: string;
    iconName: keyof typeof icons;
};

const sidebarItems: sidebarItems[] = [
    {
        name: "Home",
        iconName: "House",
        to: "/dashboard/home",
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
    {
        name: "Notifications",
        iconName: "Heart",
        to: "/dashboard/notification",
    },
]

function Sidebar() {
    return (
        <div className="fixed bg-background glass h-screen border-r flex-col items-center justify-between hidden sm:flex">
            <section className="flex flex-col w-[4.5rem] items-center ">
                <Link to="/">
                    <img src={
                        "/icons/logo_icon.png"
                    } alt="logo" className="py-4 px-4 w-[5.5rem]" />
                </Link>
            </section>

            <section className="flex items-center justify-center w-full h-full ">
                <ul className="flex flex-col items-center justify-center gap-6 text-grey-300 text-hover">
                    {sidebarItems.map((item, index) => (
                        <li className="btn-icon" key={index}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link to={item.to}>
                                            <Icon name={item.iconName} className="" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {item.name}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                    ))}

                    <li>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link to="/dashboard/profile">
                                        <img src={
                                            "/images/user.png"
                                        } alt="user" className="w-[2rem] border rounded-full bg-background" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Profile
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                </ul>
            </section>

            <section className="flex flex-col gap-4 items-center justify-center w-full py-4 mb-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/dashboard/support">
                                <Icon name="Settings" className="text-hover" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Notifications
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </section>
        </div>
    )
}

export default Sidebar;