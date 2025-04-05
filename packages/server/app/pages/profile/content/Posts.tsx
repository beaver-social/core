import Icon from "@/shared/components/Icon";

// Sample post data for demonstration
const samplePosts = [
    {
        id: "1",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "10h",
        content: "Just deployed a new web3 project! Check it out at https://beaver-social.com",
        likes: 42,
        comments: 5,
        reposts: 8,
        shares: 3,
        avatarUrl: "/images/user.png",
        aspectRatio: "square" as const,
    },
    {
        id: "2",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "2d",
        content: "Working on some new features for Beaver Social. Stay tuned!",
        likes: 21,
        comments: 3,
        reposts: 2,
        shares: 1,
        avatarUrl: "/images/user.png",
        aspectRatio: "square" as const,
    }
];

export default function PostData() {
    return (
        <div className="space-y-1">
            {samplePosts.map((post) => (
                <div key={post.id} className="p-4 border-b hover:bg-accent/10 transition cursor-pointer">
                    <div className="flex gap-3">
                        <img src={post.avatarUrl} alt={post.username} className="size-10 rounded-full" />
                        <div className="flex-1">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">{post.username}</span>
                                <span className="text-grey-500">@{post.handle}</span>
                                <span className="text-grey-500">·</span>
                                <span className="text-grey-500">{post.timestamp}</span>
                            </div>
                            <p className="mt-1">{post.content}</p>

                            <div className="flex justify-between mt-3 text-grey-500 max-w-md">
                                <div className="flex items-center gap-1 hover:text-primary">
                                    <Icon name="MessageCircle" weight="light" />
                                    <span className="text-xs">{post.comments}</span>
                                </div>
                                <div className="flex items-center gap-1 hover:text-green-500">
                                    <Icon name="Repeat" weight="light" />
                                    <span className="text-xs">{post.reposts}</span>
                                </div>
                                <div className="flex items-center gap-1 hover:text-red-500">
                                    <Icon name="Heart" weight="light" />
                                    <span className="text-xs">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1 hover:text-primary">
                                    <Icon name="Share" weight="light" />
                                    <span className="text-xs">{post.shares}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}