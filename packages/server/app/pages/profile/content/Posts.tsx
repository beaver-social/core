import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";
import Reactions from "@/shared/components/Reactions";
import { samplePosts } from "@/shared/data/posts";

export default function PostData() {
    const userPosts = samplePosts.filter((post) => post.handle === "ishtails");

    return (
        <div className="space-y-1">
            {userPosts.map((post) => (
                <div key={post.id} className="p-4 border-b hover:bg-accent/10 transition cursor-pointer">
                    <div className="flex gap-3">
                        <Image src={post.avatarUrl} alt={post.username} className="size-10 rounded-full" />
                        <div className="flex-1">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">{post.username}</span>
                                <span className="text-grey-500">@{post.handle}</span>
                                <span className="text-grey-500">·</span>
                                <span className="text-grey-500">{post.timestamp}</span>
                            </div>
                            <p className="mt-1 text-sm">{post.content}</p>

                            {post.avatarUrl && (
                                <div className="mt-3 rounded-lg overflow-hidden border">
                                    <Image
                                        src={post.avatarUrl}
                                        alt="Post image"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            <Reactions analytics={post.analytics} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}