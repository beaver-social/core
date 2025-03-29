import FeedPost from "./FeedPost";
import Icon from "@/shared/components/Icon";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";

// Sample data - replace with actual data from your backend
const samplePosts = [
    {
        id: "1",
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
        id: "2",
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
        id: "3",
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

function CreatePost() {
    return (
        <div className="p-4 border-b">
            <div className="flex gap-4">
                <img src="/images/user.png" alt="User avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <textarea
                        placeholder="What's happening?"
                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4 text-primary">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="hover:bg-primary/10 p-2 rounded-full">
                                            <Icon name="Image" className="size-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add image
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="hover:bg-primary/10 p-2 rounded-full">
                                            <Icon name="Smile" className="size-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add emoji
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary/90">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Feed() {
    return (
        <div className="flex-1 border-x mx-auto">
            {/* Feed Header */}
            <div className="sticky glass top-0 z-10 bg-background/50 border-b">
                <div className="flex">
                    <button className="flex-1 py-4 text-center font-semibold text-primary border-b border-primary">
                        For you
                    </button>
                    <button className="flex-1 py-4 text-center text-grey-500 hover:text-grey-700">
                        Following
                    </button>
                </div>
            </div>

            {/* Create Post Section */}
            <CreatePost />

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