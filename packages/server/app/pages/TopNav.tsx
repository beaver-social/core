import { useTheme } from "@/shared/context/theme-provider";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";

export default function TopNav() {
    const { theme } = useTheme();

    return (
        <div className="flex justify-between items-center px-3 py-4">
            <div className="flex items-center gap-[7px]">
                <Image src={theme === "dark" ? "/icons/logo_dark.png" : "/icons/logo_light.png"} alt="logo" className="size-12" />
                <div className="pr-1">
                    <p className="text-xl font-bold">Beaver</p>
                    <p className="-mt-1 text-sm text-grey-300">Social</p>
                </div>
            </div>
            <Icon name="Ellipsis" className="size-6 mr-2" />
        </div>
    )
}