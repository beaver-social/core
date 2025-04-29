import CreatePost from "../CreatePost"
import FeedPost from "../FeedPost"

type Props = {}

// Sample data - replace with actual data from your backend
const samplePosts = [
    {
        id: "1",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "2h",
        content: "wtf is wrong with people..",
        images: ["/images/user.webp"],
        aspectRatio: "square" as const,
        analytics: {
            likes: 42,
            comments: 12,
            reposts: 5,
            shares: 3,
        },
        avatarUrl: "/images/user.webp",
        topReply: {
            id: "1",
            timestamp: "2h",
            username: "Kartik",
            handle: "kartik",
            avatarUrl: "/images/user.webp",
            content: "your mom."
        }
    },
    {
        id: "2",
        username: "Jane Smith",
        handle: "janesmith",
        timestamp: "4h",
        content: "Working on some exciting new features for our platform. Stay tuned! 💻",
        images: ["/images/wallpapers/1.jpeg", "/images/wallpapers/8.jpeg"],
        aspectRatio: "portrait" as const,
        analytics: {
            likes: 28,
            comments: 8,
            reposts: 3,
            shares: 1,
        },
        avatarUrl: "/images/user.webp",
        topReply: {
            id: "1",
            timestamp: "2h",
            username: "Kartik",
            handle: "kartik",
            avatarUrl: "/images/user.webp",
            content: "yeah and none of them work bro.."
        },
        location: "New York, NY"
    },
    {
        id: "3",
        username: "Mike Johnson",
        handle: "mikej",
        timestamp: "6h",
        content: "Great day at the tech conference! Learned so much about the future of web development.",
        images: ["/images/wallpapers/3.jpeg", "/images/wallpapers/11.jpeg", "/images/wallpapers/6.jpeg"],
        aspectRatio: "square" as const,
        analytics: {
            likes: 89,
            comments: 24,
            reposts: 12,
            shares: 6,
        },
        avatarUrl: "/images/user.webp",
        topReply: {
            id: "1",
            timestamp: "2h",
            username: "Kartik",
            handle: "kartik",
            avatarUrl: "/images/user.webp",
            content: "shut the fuck up bro, there's no future in web development."
        },
        location: "New York, NY"
    }
];

export default function ForYou({ }: Props) {
    return (
        <>
            <div className="divide-y">
                {samplePosts.map((post, index) => (
                    <FeedPost key={index} {...post} />
                ))}
            </div>
        </>
    )
}