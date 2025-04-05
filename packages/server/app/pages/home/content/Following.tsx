import CreatePost from "../CreatePost"
import FeedPost from "../FeedPost"

type Props = {}

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