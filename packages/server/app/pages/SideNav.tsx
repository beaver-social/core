import Icon from "../shared/components/Icon";
import type { icons } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../shared/components/ui/tooltip";
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
        to: "/",
    },
    {
        name: "Explore",
        iconName: "Search",
        to: "/explore",
    },
    {
        name: "Shorts",
        iconName: "Video",
        to: "/shorts",
    },
    {
        name: "Messages",
        iconName: "MessageSquare",
        to: "/messages",
    },
    {
        name: "Alerts",
        iconName: "Heart",
        to: "/alerts",
    },
]

export default function SideNav() {
    return (
        <div className="fixed bg-background glass h-screen border-r flex-col items-center justify-between hidden sm:flex">
            <div className="flex flex-col w-[4.5rem] items-center ">
                <Link to="/">
                    <img src={
                        "/icons/logo_icon.png"
                    } alt="logo" className="py-4 px-4 w-[5.5rem]" />
                </Link>
            </div>

            <div className="flex items-center justify-center w-full h-full ">
                <ul className="flex flex-col items-center justify-center gap-6 text-grey-300 text-hover">
                    {sidebarItems.map((item, index) => (
                        <li key={index}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link className="btn-icon" to={item.to}>
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

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to="/profile/ishtails">
                                    <li>
                                        <img src={
                                            "/images/user.png"
                                        } alt="user" className="w-[2rem] border rounded-full bg-background" />
                                    </li>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                Profile
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </ul>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center w-full py-4 mb-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to="/dashboard/settings">
                                <Icon name="Settings" className="text-hover" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}