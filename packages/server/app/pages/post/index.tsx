import { useParams } from "react-router";
import Icon from "@/shared/components/Icon";
import PostContent from "./PostContent";
import ReplyForm from "./ReplyForm";
import Layout from "@/pages/layout";

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

export default function Post() {
    const { postId } = useParams();

    return (
        <Layout main={
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
        } />
    );
} 