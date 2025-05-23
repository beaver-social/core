import Icon from "../shared/components/Icon";
import type { icons } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Image } from "@/shared/components/Image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ConnectIdentity from "@/shared/components/ConnectIdentity";
import { useBeaver } from "@beaver/react";
import { useTheme } from "@/shared/context/theme-provider";

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
    to: "/app",
  },
  {
    name: "Explore",
    iconName: "Search",
    to: "/app/explore/search",
  },
  {
    name: "Create",
    iconName: "SquarePlus",
    to: "/app/create",
  },
  {
    name: "Swipes",
    iconName: "Clapperboard",
    to: "/app/swipes",
  },
  {
    name: "Alerts",
    iconName: "Bell",
    to: "/app/alerts",
  },
  {
    name: "Messages",
    iconName: "Mail",
    to: "/app/messages",
  },
  {
    name: "Settings",
    iconName: "Settings",
    to: "/app/settings",
  },
];

export default function SideNav() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isProfilePage, setIsProfilePage] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const beaver = useBeaver();
  const user = beaver.user;

  // Set active index based on current URL
  useEffect(() => {
    const currentPath = location.pathname;

    // Check if on profile page
    const isOnProfilePage = currentPath.startsWith("/app/profile");
    setIsProfilePage(isOnProfilePage);

    // If on settings or profile page, no sidebar item should be active
    if (currentPath.startsWith("/app/settings") || isOnProfilePage) {
      setActiveIndex(null);
      return;
    }

    const index = sidebarItems.findIndex((item) => {
      return item.to === "/app"
        ? currentPath === "/app"
        : currentPath.startsWith(item.to || "/app");
    });

    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname]);

  return (
    <div className="fixed bg-background glass h-screen border-r flex-col justify-between hidden sm:flex w-[14rem]">
      <div className="flex items-center pl-4 pt-4 gap-[6px]">
        <Image
          src={
            theme === "dark" ? "/icons/logo_dark.png" : "/icons/logo_light.png"
          }
          alt="logo"
          className="size-12"
        />
        <div className="">
          <p className="text-2xl font-bold">Beaver</p>
          <p className="-mt-1 text-sm text-grey-300">Social</p>
        </div>
      </div>

      <div className="flex flex-col w-full h-full px-3 justify-center-safe">
        <ul className="flex flex-col w-full gap-3 text-grey-300 text-hover">
          {sidebarItems.map((item, index) => (
            <motion.li
              key={index}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
              animate={{
                y: hoveredItem === index ? -1 : 0,
              }}
              className="w-full"
            >
              {item.to ? (
                <Link
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeIndex === index ? "bg-primary/5" : "hover:bg-muted"
                  }`}
                  to={item.to}
                >
                  <Icon
                    name={item.iconName}
                    className={activeIndex === index ? "text-primary" : ""}
                  />
                  <span
                    className={
                      activeIndex === index ? "text-primary font-medium" : ""
                    }
                  >
                    {item.name}
                  </span>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        className="absolute top-0 bottom-0 left-0 w-1 h-full rounded-r-sm bg-primary"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100%", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        layoutId="activeIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ) : (
                <button
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeIndex === index ? "bg-primary/5" : "hover:bg-muted"
                  }`}
                  onClick={item.onClick}
                >
                  <Icon
                    name={item.iconName}
                    className={activeIndex === index ? "text-primary" : ""}
                  />
                  <span
                    className={
                      activeIndex === index ? "text-primary font-medium" : ""
                    }
                  >
                    {item.name}
                  </span>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        className="absolute top-0 bottom-0 left-0 w-1 h-full rounded-r-sm bg-primary"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "100%", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        layoutId="activeIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mx-3 my-4">
        {beaver.wallet.isConnected ? (
          <Link
            to={`/app/profile/${user?.username}`}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors mt-3 ${
              isProfilePage ? "bg-primary/5" : "hover:bg-muted"
            }`}
          >
            <motion.div
              className="relative rounded-full"
              animate={
                isProfilePage
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(76, 165, 249, 0)",
                        "0 0 12px rgba(76, 165, 249, 0.7)",
                        "0 0 0px rgba(76, 165, 249, 0)",
                      ],
                    }
                  : {}
              }
              transition={
                isProfilePage
                  ? {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }
                  : {}
              }
            >
              {isProfilePage && (
                <motion.div
                  className="absolute inset-0 border-2 rounded-full border-primary"
                  animate={{
                    borderColor: [
                      "rgba(76, 165, 249, 0.4)",
                      "rgba(76, 165, 249, 1)",
                      "rgba(76, 165, 249, 0.4)",
                    ],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
              <Image
                src={beaver.user?.imageUrl || "/images/user.webp"}
                alt="user"
                className={`w-[2rem] border rounded-full ${
                  isProfilePage ? "border-primary" : ""
                }`}
              />
            </motion.div>
            <span className={isProfilePage ? "text-primary font-medium" : ""}>
              {beaver.user?.username ? beaver.user?.username : "Profile"}
            </span>
            {isProfilePage && (
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-1 h-full rounded-r-sm bg-primary"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "100%", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                layoutId="profileIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </Link>
        ) : (
          <ConnectIdentity />
        )}
      </div>
    </div>
  );
}
