import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";
import { Link } from "react-router";
import GradientButton from "@/shared/components/GradientButton";
import { useBeaver } from "@beaver/react";
import { truncateText } from "@/shared/lib/utils";
import moment from "moment";
import FollowDialog from "./FollowDialog";
import MediaCarousel from "@/shared/components/MediaCarousel";

type Props = {
  data: ReturnType<typeof useBeaver>["user"];
};

export default function BasicInfo({ data: user }: Props) {
  const beaver = useBeaver();

  const { data: pinnedPostDetails, isSuccess: pinnedPostSuccess } =
    beaver.post.getPostById({ id: Number(user?.pinnedPost) });

  const followerData = beaver.social.getFollowers({
    userId: Number(user?.id),
    page: 1,
    perPage: 10,
  });
  const followingData = beaver.social.getFollowing({
    userId: Number(user?.id),
    page: 1,
    perPage: 10,
  });
  const count = beaver.social.getFollowCounts({
    userId: Number(user?.id),
  });

  return (
    <div className="pt-18 px-6 border-b">
      {/* Name and Verification */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl font-bold">{user?.fullName}</h1>
          <Icon
            name="SquareCheckBig"
            className="text-secondary-foreground size-5"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="w-full text-center text-sm text-grey-500">
            @{user?.username}
          </p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-4 my-4 justify-center">
        <Link to={`/message/${user?.username}`}>
          <GradientButton iconName="Mail" />
        </Link>
        <Link to={`https://twitter.com/${user?.twitter}`} target="_blank">
          <GradientButton iconName="Twitter" />
        </Link>
        <Link to={`https://youtube.com/@${user?.youtube}`} target="_blank">
          <GradientButton iconName="Youtube" />
        </Link>
        <Link to={`https://instagram.com/${user?.instagram}`} target="_blank">
          <GradientButton iconName="Instagram" />
        </Link>
      </div>

      {/* Bio */}
      <div className="flex justify-center my-2 text-grey-400">
        {user?.about && (
          <p className="text-sm max-w-lg text-center">
            {truncateText(user?.about, 100)}
          </p>
        )}
      </div>

      {/* Profile Metadata (Location, Website, Join Date) */}
      <div className="flex flex-wrap justify-center my-2 gap-x-5 gap-y-2 text-sm text-grey-500">
        {user?.location && (
          <div className="flex items-center text-xs gap-1">
            <Icon name="MapPin" className="size-4" />
            <span>{user?.location}</span>
          </div>
        )}

        {user?.createdAt && (
          <div className="flex items-center text-xs gap-1">
            <Icon name="Calendar" className="size-4" />
            <span>Joined {moment(user?.createdAt).format("MMM D, YYYY")}</span>
          </div>
        )}
      </div>

      {/* Followers/Following Stats */}
      <div className="flex gap-5 my-3 justify-center">
        <FollowDialog
          data={followingData.data?.following}
          count={count.data?.following || 0}
          title="Following"
        />
        <FollowDialog
          data={followerData.data?.followers}
          count={count.data?.followers || 0}
          title="Followers"
        />
      </div>

      {/* Website Section */}
      {user?.website && (
        <div className="my-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium flex items-center gap-2 text-grey-400">
              <Icon name="Globe" className="size-3.5 text-primary" />
              Website
            </h3>
          </div>
          <Link to={user?.website} target="_blank" className="block">
            <div className="bg-grey-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-grey-800 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/10">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <GradientButton iconName="Globe" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {user?.website}
                    </p>
                    <p className="text-xs text-grey-500">
                      {user?.website}
                    </p>
                  </div>
                  <div className="p-1.5 rounded-full bg-grey-950/70 text-primary">
                    <Icon name="ArrowRight" className="size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Pinned Post Section */}
      {user?.pinnedPost && pinnedPostDetails?.id && (
        <div className="my-4 mb-8 text-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium flex items-center gap-2 text-grey-400">
              <Icon name="Pin" className="size-3.5 text-primary" />
              Featured
            </h3>
          </div>
          <div className="bg-grey-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-grey-800 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/10 cursor-pointer">
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={user?.imageUrl}
                  alt={user?.fullName}
                  className="size-10 rounded-full border-2 border-primary/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">{user?.fullName}</span>
                    <Icon
                      name="SquareCheckBig"
                      className="text-primary size-4"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-grey-500">
                    <span>{user?.username}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4 text-sm">
                <p className="leading-relaxed mb-4">
                  {pinnedPostDetails?.content}
                </p>

                {/* Optional Media */}
                {pinnedPostDetails?.media &&
                  pinnedPostDetails?.media.length > 0 && (
                    <div
                      className="w-full rounded-sm overflow-hidden"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MediaCarousel
                        media={pinnedPostDetails?.media}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
