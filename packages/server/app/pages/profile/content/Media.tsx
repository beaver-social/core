import { Image } from "@/shared/components/Image";
import { useBeaver } from "@beaver/react";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/shared/components/Spinner";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import { Button } from "@/shared/components/ui/button";

export default function Media() {
  const beaver = useBeaver();
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading: isProfileLoading } = beaver.profile.getProfile({
    type: "username",
    value: username || "",
  });
  const { data: mediaArray, isLoading: isMediaLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = beaver.media.getUserMedia({
    userId: (profile)?.id,
    postOnly: true,
    perPage: 4,
  });

  const { infiniteScrollRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isProfileLoading || isMediaLoading) {
    return (
      <div className="flex items-center justify-center m-10">
        <Spinner />
      </div>
    );
  }

  const media = mediaArray?.pages.flatMap((page) => page.media);

  console.log({ media, mediaArray });

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2">
        {media?.map((item) => (
          <div
            key={item.id}
            className="aspect-square relative group cursor-pointer overflow-hidden rounded-md border"
          >
            <Image
              src={item.url}
              alt={item.type}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <button onClick={() => {
              navigate(`/app/post/${item.postId}`);
            }} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center p-3">
              <p className="text-white text-sm line-clamp-2 font-semibold">View Post</p>
            </button>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center p-4">
          <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
