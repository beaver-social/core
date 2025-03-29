import PostActions from "./PostFunctions";


export default function PostContent({ post }: {
    post: {
        username: string;
        handle: string;
        timestamp: string;
        content: string;
        imageUrl?: string;
        likes: number;
        comments: number;
        reposts: number;
        shares: number;
        avatarUrl: string;
    }
}) {
    return (
        <div className="flex gap-4 p-4 border-b">
            <img src={post.avatarUrl} alt={`${post.username}'s avatar`} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.username}</span>
                    <span className="text-grey-500">@{post.handle}</span>
                    <span className="text-grey-500">·</span>
                    <span className="text-grey-500">{post.timestamp}</span>
                </div>
                <p className="mt-2">{post.content}</p>
                {post.imageUrl && (
                    <img src={post.imageUrl} alt="Post content" className="mt-2 rounded-lg max-h-[500px] w-full object-cover bg-primary-100 dark:bg-primary-950" />
                )}
                <PostActions />
            </div>
        </div>
    );
}