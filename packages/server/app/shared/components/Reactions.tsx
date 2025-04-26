import Icon from "@/shared/components/Icon";
import { useAuth } from "@beaver/react";

type Props = {
    postId: string;
}

const samplePostAnalytics = {
    id: "1",
    likes: 10,
    comments: 5,
    reposts: 2,
    shares: 1,
}

export default function Reactions(props: Props) {
    const { zkLoginData } = useAuth();

    return (
        <div className="flex items-center gap-6 mt-4 w-[32rem] justify-between">
            <button
                className="flex items-center gap-2 text-hover group"
            >
                <Icon
                    name="Heart"
                    className="w-5 h-5 group-hover:text-rose-500"
                />
                <span className="text-sm">{samplePostAnalytics.likes}</span>
            </button>
            <button
                className="flex items-center gap-2 text-hover group"
            >
                <Icon
                    name="BotMessageSquare"
                    className="w-5 h-5 group-hover:text-emerald-500"
                />
                <span className="text-sm">{samplePostAnalytics.comments}</span>
            </button>
            <button
                className="flex items-center gap-2 text-hover group"
                onClick={(e) => e.stopPropagation()}
            >
                <Icon
                    name="Repeat"
                    className="w-5 h-5 group-hover:text-sky-500"
                />
                <span className="text-sm">{samplePostAnalytics.reposts}</span>
            </button>
            <button
                className="flex items-center gap-2 text-hover group"
                onClick={(e) => e.stopPropagation()}
            >
                <Icon
                    name="Share2"
                    className="w-5 h-5 group-hover:text-amber-500"
                />
                <span className="text-sm">{samplePostAnalytics.shares}</span>
            </button>
        </div>
    )
}