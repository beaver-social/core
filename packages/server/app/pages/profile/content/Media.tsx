import { Image } from "@/shared/components/Image";
import { useBeaver } from "@beaver/react";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/shared/components/Spinner";

export default function Media() {
  const beaver = useBeaver();
  const navigate = useNavigate();
  const { username } = useParams();
  const { data: profile, isLoading: isProfileLoading } = beaver.profile.getProfile({
    type: "username",
    value: username || "",
  })
  const { data: mediaArray, isLoading: isMediaLoading, isSuccess: isMediaSuccess, isRefetching: isMediaRefetching } = beaver.media.getUserMedia({
    userId: profile?.id,
    perPage: 20,
  });

  if (isProfileLoading || isMediaLoading || isMediaRefetching) {
    return (
      <div className="flex items-center justify-center m-10">
        <Spinner />
      </div>
    );
  }

  const media = mediaArray?.pages.flatMap((page) => {
    return page.media.filter((item) => item.postId !== null);
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
    </div>
  );
}
