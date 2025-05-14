import { Image } from "@/shared/components/Image";
import PostActions from "./PostFunctions";
import { useBeaver } from "@beaver/react";


export default function PostContent({ post }: { post: any }) {
    const beaver = useBeaver()

    return (
        <div className="flex gap-4 p-4 border-b">
            <Image src={post.avatarUrl} alt={`${post.username}'s avatar`} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.username}</span>
                    <span className="text-grey-500">@{post.handle}</span>
                    <span className="text-grey-500">·</span>
                    <span className="text-grey-500">{post.timestamp}</span>
                </div>
                <p className="mt-2">{post.content}</p>
                {post.imageUrl && (
                    <Image src={post.imageUrl} alt="Post content" className="mt-2 rounded-lg max-h-[500px] w-full object-cover bg-primary-100 dark:bg-primary-950" />
                )}
                <PostActions />
            </div>
        </div>
    );
}