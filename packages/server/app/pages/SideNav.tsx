import Icon from "../shared/components/Icon";
import type { icons } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Image } from "@/shared/components/Image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type sidebarItems = {
    name: string;
    to?: string;
    iconName: keyof typeof icons;
    onClick?: () => void;
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
        name: "Create",
        iconName: "SquarePlus",
        to: "/create",
    },
    {
        name: "Swipes",
        iconName: "Clapperboard",
        to: "/swipes",
    },
    {
        name: "Alerts",
        iconName: "Bell",
        to: "/alerts",
    },
    {
        name: "Messages",
        iconName: "Mail",
        to: "/messages",
    },
    {
        name: "Settings",
        iconName: "Settings",
        to: "/settings",
    }
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
                : currentPath.startsWith(item.to || "/");
        });

        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [location.pathname]);

    return (
        <div className="fixed bg-background glass h-screen border-r flex-col justify-between hidden sm:flex w-[14rem]">
            <div className="flex flex-col w-full justify-center-safe h-full px-3">
                <ul className="flex flex-col w-full gap-3 text-grey-300 text-hover">
                    {sidebarItems.map((item, index) => (
                        <motion.li
                            key={index}
                            onHoverStart={() => setHoveredItem(index)}
                            onHoverEnd={() => setHoveredItem(null)}
                            animate={{
                                y: hoveredItem === index ? -1 : 0
                            }}
                            className="w-full"
                        >
                            {item.to ? (
                                <Link
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeIndex === index ? 'bg-primary/5' : 'hover:bg-muted'}`}
                                    to={item.to}
                                >
                                    <Icon name={item.iconName} className={activeIndex === index ? "text-primary" : ""} />
                                    <span className={activeIndex === index ? "text-primary font-medium" : ""}>{item.name}</span>
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 w-1 h-full bg-primary rounded-r-sm"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "100%", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                layoutId="activeIndicator"
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </Link>) : (
                                <button
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${activeIndex === index ? 'bg-primary/5' : 'hover:bg-muted'}`}
                                    onClick={item.onClick}
                                >
                                    <Icon name={item.iconName} className={activeIndex === index ? "text-primary" : ""} />
                                    <span className={activeIndex === index ? "text-primary font-medium" : ""}>{item.name}</span>
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 w-1 h-full bg-primary rounded-r-sm"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "100%", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                layoutId="activeIndicator"
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </button>
                            )}
                        </motion.li>
                    ))}


                </ul>
            </div>

            <div className="my-4 mx-3">
                <Link
                    to="/profile/ishtails"
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors mt-3 ${isProfilePage ? 'bg-primary/5' : 'hover:bg-muted'}`}
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
                    <span className={isProfilePage ? "text-primary font-medium" : ""}>Profile</span>
                    {isProfilePage && (
                        <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 h-full bg-primary rounded-r-sm"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "100%", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            layoutId="profileIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    )}
                </Link>
            </div>
        </div>
    )
}