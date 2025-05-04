import { samplePosts } from "@/shared/data/posts"
import FeedPost from "../FeedPost"

type Props = {}

export default function ForYou({ }: Props) {
    const forYouPosts = samplePosts.slice(0, 3);

    return (
        <>
            <div className="divide-y">
                {forYouPosts.map((post, index) => (
                    <FeedPost key={index} {...post} />
                ))}
            </div>
        </>
    )
}