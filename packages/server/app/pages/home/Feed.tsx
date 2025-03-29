import CreatePost from "./CreatePost";
import FeedPost from "./FeedPost";
import { useState } from "react";
import Tabs, { Tab } from "@/shared/components/Tabs";

// Sample data - replace with actual data from your backend
const samplePosts = [
    {
        id: "1",
        username: "John Doe",
        handle: "johndoe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        images: ["/images/banner.webp", "/images/user.png", "/icons/logo_light.png"],
        aspectRatio: "square" as const,
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
        images: ["/icons/logo_light.png", "/images/user.png"],
        aspectRatio: "portrait" as const,
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
        images: ["/icons/logo_light.png"],
        aspectRatio: "square" as const,
        likes: 89,
        comments: 24,
        reposts: 12,
        shares: 6,
        avatarUrl: "/images/user.png"
    }
];

// Sample following posts
const followingPosts = [
    {
        id: "4",
        username: "Alice Cooper",
        handle: "alicecooper",
        timestamp: "1h",
        content: "Just finished my latest artwork! 🎨",
        images: ["/icons/logo_light.png", "/images/user.png", "/icons/logo_light.png", "/images/user.png"],
        aspectRatio: "portrait" as const,
        likes: 56,
        comments: 15,
        reposts: 7,
        shares: 2,
        avatarUrl: "/images/user.png"
    },
    {
        id: "5",
        username: "Bob Wilson",
        handle: "bobwilson",
        timestamp: "3h",
        content: "Excited to announce my new NFT collection! 🚀",
        images: ["/icons/logo_light.png", "/images/user.png"],
        aspectRatio: "square" as const,
        likes: 34,
        comments: 9,
        reposts: 4,
        shares: 1,
        avatarUrl: "/images/user.png"
    }
];

function Feed() {
    const [activeTab, setActiveTab] = useState("for-you");
    const tabs: Tab[] = [
        {
            id: "for-you",
            label: "For you",
            content: (
                <>
                    <CreatePost />
                    <div className="divide-y">
                        {samplePosts.map((post, index) => (
                            <FeedPost key={index} {...post} />
                        ))}
                    </div>
                </>
            )
        },
        {
            id: "following",
            label: "Following",
            content: (
                <>
                    <CreatePost />
                    <div className="divide-y">
                        {followingPosts.map((post, index) => (
                            <FeedPost key={index} {...post} />
                        ))}
                    </div>
                </>
            )
        }
    ];

    return (
        <div className="flex-1 border-x mx-auto">
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
}

export default Feed; 