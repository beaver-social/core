import CreatePost from "../CreatePost"
import FeedPost from "../FeedPost"

type Props = {}

// Sample following posts
const followingPosts = [
    {
        id: "4",
        username: "Bob Wilson",
        handle: "bobwilson",
        timestamp: "3h",
        content: "Excited to announce my new NFT collection! 🚀",
        aspectRatio: "square" as const,
        likes: 34,
        comments: 9,
        reposts: 4,
        shares: 1,
        avatarUrl: "/images/user.webp"
    },
    {
        id: "5",
        username: "Alice Cooper",
        handle: "alicecooper",
        timestamp: "1h",
        content: "Just finished my latest artwork! 🎨",
        images: ["/images/wallpapers/1.jpeg", "/images/wallpapers/2.jpeg", "/images/wallpapers/3.jpeg", "/images/wallpapers/4.jpeg"],
        aspectRatio: "portrait" as const,
        likes: 56,
        comments: 15,
        reposts: 7,
        shares: 2,
        avatarUrl: "/images/user.webp"
    },
];

export default function Following({ }: Props) {
    return (
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