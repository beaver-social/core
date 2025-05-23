import { Image } from "@/shared/components/Image";
import Icon from "../shared/components/Icon";
import { Link, useLocation } from "react-router";
import { sidebarItems } from "./SideNav";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const bottomBarItems = sidebarItems.slice(0, 4);

function BottomBar() {
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

        const index = bottomBarItems.findIndex(item => {
            return item.to === "/app"
                ? currentPath === "/app"
                : currentPath.startsWith(item?.to || "/app");
        });

        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [location.pathname]);

    return (
        <div className="fixed z-50 bottom-0 left-0 right-0 bg-background/50 glass border-t sm:hidden">
            <nav className="flex items-center justify-around h-16">
                {bottomBarItems.map((item, index) => (
                    <motion.div
                        key={index}
                        onHoverStart={() => setHoveredItem(index)}
                        onHoverEnd={() => setHoveredItem(null)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }}
                    >
                        <Link
                            to={item.to}
                            className="flex flex-col items-center justify-center text-xs relative"
                        >
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        className="absolute inset-0 bg-primary/5 rounded-lg -inset-x-2 -inset-y-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>
                            <Icon name={item.iconName} className={`w-6 h-6 ${activeIndex === index ? 'text-primary' : 'text-grey-300'}`} />
                        </Link>
                    </motion.div>
                ))}

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                >
                    <Link to={"/app/profile/ishtails"} className="flex flex-col items-center justify-center text-xs">
                        <motion.div
                            className="relative rounded-full p-1"
                            animate={isProfilePage ? {
                                boxShadow: ["0 0 0px rgba(76, 165, 249, 0)", "0 0 12px rgba(76, 165, 249, 0.7)", "0 0 0px rgba(76, 165, 249, 0)"],
                                scale: [1, 1.05, 1]
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
                            <div className={`bg-grey-900 rounded-full ${isProfilePage ? 'border-2 border-primary' : ''}`}>
                                <Image src="/images/user.webp" alt="user" className="size-7 rounded-full" />
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            </nav>
        </div>
    );
}

export default BottomBar; 