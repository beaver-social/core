import { Image } from "@/shared/components/Image";
import Icon from "../shared/components/Icon";
import { Link } from "react-router";
import { sidebarItems } from "./SideNav";

const bottomBarItems = sidebarItems.slice(0, 4);

function BottomBar() {
    return (
        <div className="fixed z-50 bottom-0 left-0 right-0 bg-background/50 glass border-t sm:hidden">
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

                <Link to={"/profile/1"} className="flex flex-col items-center justify-center text-xs text-grey-300 hover:text-primary bg-grey-900 rounded-full p-1 hover:bg-grey-800 transition-all">
                    <Image src="/images/user.png" alt="logo" className="w-6 h-6" />
                </Link>
            </nav>
        </div>
    );
}

export default BottomBar; 