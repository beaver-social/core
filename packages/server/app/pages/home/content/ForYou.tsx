import FeedPost from "../FeedPost"
import { useBeaver } from "@beaver/react";
// import { samplePosts } from "@/shared/data/posts"

type Props = {}

export default function ForYou({ }: Props) {
    // const forYouPosts = samplePosts.slice(0, 3);
    const beaver = useBeaver();
    const { data: postArray } = beaver.post.getPosts({ page: 1, perPage: 10 });

    return (
        <>
            <div className="divide-y">
                {postArray?.posts.map((postId, index) => (
                    <FeedPost key={index} postId={postId.id} />
                ))}
            </div>
        </>
    )
}