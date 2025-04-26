import Icon from "../shared/components/Icon";
import type { icons } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../shared/components/ui/tooltip";
import { Link, useLocation } from "react-router";
import { Image } from "@/shared/components/Image";
import { motion, Transition, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type sidebarItems = {
    name: string;
    to: string;
    iconName: keyof typeof icons;
};

export const sidebarItems: sidebarItems[] = [
    {
        name: "Home",
        iconName: "House",
        to: "/",
    },
    {
        name: "Explore",
        iconName: "Search",
        to: "/explore/search",
    },
    {
        name: "Shorts",
        iconName: "Clapperboard",
        to: "/shorts",
    },
    {
        name: "Alerts",
        iconName: "Heart",
        to: "/alerts",
    },
    {
        name: "Messages",
        iconName: "MessageSquare",
        to: "/messages",
    },
]

export default function SideNav() {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [isProfilePage, setIsProfilePage] = useState(false);
    const location = useLocation();

    // Set active index based on current URL
    useEffect(() => {
        const currentPath = location.pathname;

        // Check if on profile page
        const isOnProfilePage = currentPath.startsWith("/profile");
        setIsProfilePage(isOnProfilePage);

        // If on settings or profile page, no sidebar item should be active
        if (currentPath.startsWith("/settings") || isOnProfilePage) {
            setActiveIndex(null);
            return;
        }

        const index = sidebarItems.findIndex(item => {
            return item.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.to);
        });

        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [location.pathname]);

    return (
        <div className="fixed bg-background glass h-screen border-r flex-col items-center justify-between hidden sm:flex">
            <div className="flex flex-col w-[4.5rem] items-center ">
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Image src={
                            "/images/page2.png"
                        } alt="logo" className="p-5 object-contain w-[5.5rem]" />
                    </motion.div>
                </Link>
            </div>

            <div className="flex items-center justify-center w-full h-full">
                <ul className="flex flex-col items-center justify-center gap-6 text-grey-300 text-hover">
                    {sidebarItems.map((item, index) => (
                        <motion.li
                            key={index}
                            onHoverStart={() => setHoveredItem(index)}
                            onHoverEnd={() => setHoveredItem(null)}
                            animate={{
                                y: hoveredItem === index ? -1 : 0
                            }}
                        >
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link className="btn-icon relative" to={item.to}>
                                            <AnimatePresence>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-primary/5 rounded-md"
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{
                                                            scale: 1,
                                                            opacity: 1
                                                        }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                            <Icon name={item.iconName} className={activeIndex === index ? "text-primary" : ""} />
                                            <AnimatePresence>
                                                {activeIndex === index && (
                                                    <motion.div
                                                        className="absolute -right-0.5 top-0 bottom-0 w-1 h-full bg-primary rounded-l-sm"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "100%", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        layoutId="activeIndicator"
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {item.name}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </motion.li>
                    ))}

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to="/profile/ishtails">
                                    <motion.li
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 1 }}
                                    >
                                        <motion.div
                                            className="relative rounded-full"
                                            animate={isProfilePage ? {
                                                boxShadow: ["0 0 0px rgba(76, 165, 249, 0)", "0 0 12px rgba(76, 165, 249, 0.7)", "0 0 0px rgba(76, 165, 249, 0)"],
                                            } : {}}
                                            transition={isProfilePage ? {
                                                duration: 4,
                                                repeat: Infinity,
                                                repeatType: "mirror"
                                            } : {}}
                                        >
                                            {isProfilePage && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-primary"
                                                    animate={{
                                                        borderColor: ["rgba(76, 165, 249, 0.4)", "rgba(76, 165, 249, 1)", "rgba(76, 165, 249, 0.4)"],
                                                        rotate: [0, 360],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    }}
                                                />
                                            )}
                                            <Image src={
                                                "/images/user.webp"
                                            } alt="user" className={`w-[2rem] border rounded-full ${isProfilePage ? 'border-primary' : ''}`} />
                                        </motion.div>
                                    </motion.li>
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
                            <Link to="/settings">
                                <motion.div
                                    whileHover={{
                                        rotate: 30,
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <Icon name="Settings" className={location.pathname.startsWith("/settings") ? "text-primary" : "text-hover"} />
                                </motion.div>
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