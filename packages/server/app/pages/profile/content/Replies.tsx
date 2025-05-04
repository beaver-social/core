import { Image } from "@/shared/components/Image";
import ImageCarousel from "@/shared/components/ImageCarousel";
import Reactions from "@/shared/components/Reactions";
import { samplePosts } from "@/shared/data/posts";

// Sample replies data

export default function Replies() {
    const repliesData = samplePosts.filter((post) => post.parent !== null && post.handle === "ishtails");

    return (
        <div className="space-y-1">
            {repliesData.map((reply) => (
                reply.parent && (
                    <div key={reply.id} className="p-4 border-b hover:bg-accent/10 transition cursor-pointer">
                        <div className="flex gap-3">
                            <Image src={reply.avatarUrl} alt={reply.username} className="size-10 rounded-full" />
                            <div className="flex-1">
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">{reply.username}</span>
                                    <span className="text-grey-500">@{reply.handle}</span>
                                    <span className="text-grey-500">·</span>
                                    <span className="text-grey-500">{reply.timestamp}</span>
                                </div>

                                <div className="mt-1 text-sm text-grey-500">
                                    Replying to <span className="text-primary">@{reply.parent?.handle}</span>
                                </div>

                                {/* Parent Post */}
                                <div className="my-4 p-3 border rounded-md bg-accent/5">
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="font-medium">{reply.parent?.username}</span>
                                        <span className="text-grey-500 text-sm">@{reply.parent?.handle}</span>
                                    </div>
                                    <p className="text-sm line-clamp-2">{reply.parent?.content}</p>
                                </div>

                                <p className="my-2">{reply.content}</p>

                                <Reactions analytics={reply.analytics} />
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}