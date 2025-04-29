import CreatePost from "../CreatePost"
import FeedPost from "../FeedPost"
import { samplePosts } from "@/shared/data/posts"

type Props = {}

// Sample following posts
const followingPosts = samplePosts.slice(3, 5)

export default function Following({ }: Props) {
    return (
        <>
            <div className="divide-y">
                {followingPosts.map((post, index) => (
                    <FeedPost key={index} {...post} />
                ))}
            </div>
        </>
    )
}