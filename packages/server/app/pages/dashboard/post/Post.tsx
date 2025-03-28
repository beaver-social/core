import { useParams } from "react-router";
import Icon from "@/shared/components/Icon";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";
import { Button } from "@/shared/components/ui/button";
import Layout from "@/pages/dashboard/layout";

// Sample data - replace with actual data from your backend
const samplePost = {
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
};

const sampleReplies = [
    {
        username: "Jane Smith",
        handle: "janesmith",
        timestamp: "1h",
        content: "This looks amazing! Can't wait to try it out!",
        likes: 8,
        comments: 2,
        reposts: 1,
        shares: 0,
        avatarUrl: "/images/user.png"
    },
    {
        username: "Mike Johnson",
        handle: "mikej",
        timestamp: "30m",
        content: "Great work! The UI looks clean and modern.",
        likes: 5,
        comments: 1,
        reposts: 0,
        shares: 0,
        avatarUrl: "/images/user.png"
    }
];

function PostActions() {
    return (
        <div className="flex justify-between items-center mt-4 text-grey-500">
            <div className="flex gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                <Icon name="MessageCircle" className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Reply
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                <Icon name="Repeat" className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Repost
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                <Icon name="Heart" className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Like
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                <Icon name="Share" className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Share
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}

function PostContent({ post }: {
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
                    <img src={post.imageUrl} alt="Post content" className="mt-2 rounded-lg max-h-[500px] w-full object-cover" />
                )}
                <PostActions />
            </div>
        </div>
    );
}

function ReplyForm() {
    return (
        <div className="p-4 border-b">
            <div className="flex gap-4">
                <img src="/images/user.png" alt="User avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <textarea
                        placeholder="Post your reply"
                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4 text-primary">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                            <Icon name="Image" className="size-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add image
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                            <Icon name="Smile" className="size-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add emoji
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Button className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary/90">
                            Reply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Post() {
    const { postId } = useParams();

    return (
        <Layout>
            <div className="flex-1 mb-8 border-x max-w-2xl mx-auto">
                {/* Post Header */}
                <div className="sticky top-0 z-10 bg-background border-b border-t">
                    <div className="flex items-center gap-4 p-4">
                        <Icon name="ArrowLeft" className="size-5 cursor-pointer" />
                        <div>
                            <h2 className="font-semibold">Post</h2>
                            <p className="text-sm text-grey-500">@{samplePost.handle}</p>
                        </div>
                    </div>
                </div>

                {/* Main Post */}
                <PostContent post={samplePost} />

                {/* Reply Form */}
                <ReplyForm />

                {/* Replies */}
                <div className="divide-y">
                    {sampleReplies.map((reply, index) => (
                        <PostContent key={index} post={reply} />
                    ))}
                </div>
            </div>
        </Layout>
    );
} 