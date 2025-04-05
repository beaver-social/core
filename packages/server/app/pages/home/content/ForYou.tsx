import CreatePost from "../CreatePost"
import FeedPost from "../FeedPost"

type Props = {}

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

export default function ForYou({ }: Props) {
    return (
        <>
            <CreatePost />
            <div className="divide-y">
                {samplePosts.map((post, index) => (
                    <FeedPost key={index} {...post} />
                ))}
            </div>
        </>
    )
}