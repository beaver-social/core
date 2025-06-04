import FeedPost from "../FeedPost";
import { useBeaver } from "@beaver/react";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import Spinner from "@/shared/components/Spinner";

export default function ForYou() {
  const beaver = useBeaver();
  const {
    data: postArray,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,

  } = beaver.post.getPosts({ perPage: 10 });
  const { infiniteScrollRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isPostsLoading) {
    return (
      <div className="flex items-center justify-center m-10">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="divide-y">
        {postArray?.pages && postArray?.pages[0].posts.length > 0 ? (
          postArray?.pages.map((page) =>
            page.posts.map((postId, index) => (
              <FeedPost key={index} postId={postId.id} />
            )),
          )
        ) : (
          <div
            className="flex flex-col gap-2 border items-center text-grey-500 justify-center p-10 rounded-sm mt-6"
          >
            <p className="text-sm">No posts found..</p>
          </div>
        )}

        {hasNextPage && <div ref={infiniteScrollRef} className="h-1" />}
      </div>
    </>
  );
}
