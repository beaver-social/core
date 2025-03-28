import FeedPost from "./FeedPost";

// Sample data - replace with actual data from your backend
const samplePosts = [
    {
        username: "John Doe",
        handle: "johndoe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        imageUrl: "/icons/logo_light.png",
        likes: 42,
        comments: 12,
        reposts: 5,
        shares: 3,
        avatarUrl: "/images/user.png"
    },
    {
        username: "Jane Smith",
        handle: "janesmith",
        timestamp: "4h",
        content: "Working on some exciting new features for our platform. Stay tuned! 💻",
        likes: 28,
        comments: 8,
        reposts: 3,
        shares: 1,
        avatarUrl: "/images/user.png"
    },
    {
        username: "Mike Johnson",
        handle: "mikej",
        timestamp: "6h",
        content: "Great day at the tech conference! Learned so much about the future of web development.",
        imageUrl: "/icons/logo_light.png",
        likes: 89,
        comments: 24,
        reposts: 12,
        shares: 6,
        avatarUrl: "/images/user.png"
    }
];

function Feed() {
    return (
        <div className="flex-1 border-x max-w-2xl mx-auto">
            {/* Feed Header */}
            <div className="sticky top-0 z-10 bg-background border-b">
                <div className="flex border-b">
                    <button className="flex-1 py-4 text-center font-semibold text-primary border-b-2 border-primary">
                        For you
                    </button>
                    <button className="flex-1 py-4 text-center text-grey-500 hover:text-grey-700">
                        Following
                    </button>
                </div>
            </div>

            {/* Feed Posts */}
            <div className="divide-y">
                {samplePosts.map((post, index) => (
                    <FeedPost key={index} {...post} />
                ))}
            </div>
        </div>
    );
}

export default Feed; 