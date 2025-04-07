import { useTheme } from "../context/theme-provider"
import { cn } from "../lib/utils";
import { Image } from "./Image"

type Props = {
    title: string
}

export default function PageTitle({ title }: Props) {
    const { theme } = useTheme();

    return (
        <div className="w-full rounded-t-2xl border border-b-0 p-4 flex flex-col items-center justify-center gap-4">
            <Image src={'/images/page2.png'} alt="logo" className="w-full pt-2 h-[120px] sm:h-[150px] object-contain object-center" />
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    )
}