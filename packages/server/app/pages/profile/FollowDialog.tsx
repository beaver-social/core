import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useBeaver } from "@beaver/react";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";
import { Link } from "react-router";
import { useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";

type FollowUser = {
  id: number;
  username: string;
  fullName: string;
  imageUrl?: string;
  about?: string;
  isVerified?: boolean;
};

type FollowDialogProps = {
  userId: number;
  count: number;
  title: "Following" | "Followers";
};

export default function FollowDialog({ userId, count, title }: FollowDialogProps) {
  const beaver = useBeaver();
  const [isOpen, setIsOpen] = useState(false);

  const query = title === "Following"
    ? beaver.social.getFollowing({ userId })
    : beaver.social.getFollowers({ userId });

  const allUserIds = useMemo(() => {
    return query.data?.pages?.flatMap(page =>
      title === "Following" ? page.following : page.followers
    ) || [];
  }, [query.data, title]);

  const usersQuery = beaver.profile.getProfilesByIds({ ids: allUserIds });

  const followStatusQuery = beaver.social.bulkCheckFollowStatus({
    userIds: allUserIds
  });

  const handleLoadMore = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  const isFollowing = (userId: number) => followStatusQuery.data?.followStatus?.[userId] === true;
  const isCurrentUser = (userId: number) => beaver.user?.id === userId;

  const users = usersQuery.data?.users || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} onClose={() => { }}>
      <DialogTrigger asChild>
        <button className="hover:underline underline-offset-2 text-sm transition-colors">
          <span className="font-semibold text-grey-300">
            {count} <span className="text-grey-500">{title}</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b border-grey-800">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {query.isLoading || usersQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : query.error || usersQuery.error ? (
            <div className="flex items-center justify-center py-8 text-red-400">
              <p>Error loading {title.toLowerCase()}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-grey-500">
              <Icon
                name={title === "Following" ? "UserPlus" : "Users"}
                className="size-12 mb-4 opacity-50"
              />
              <p className="text-center">
                {title === "Following"
                  ? "Not following anyone yet"
                  : "No followers yet"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="px-6 py-2">
                {users.map((user: FollowUser) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-3 border-b border-grey-800/50 last:border-b-0"
                  >
                    <Link
                      to={`/profile/${user.username}`}
                      className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src={user.imageUrl}
                        alt={user.fullName}
                        className="size-12 rounded-full border-2 border-grey-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h4 className="font-semibold text-white truncate">
                            {user.fullName}
                          </h4>
                          {user.isVerified && (
                            <Icon
                              name="SquareCheckBig"
                              className="text-primary size-4 flex-shrink-0"
                            />
                          )}
                        </div>
                        <p className="text-sm text-grey-500 truncate">
                          @{user.username}
                        </p>
                        {user.about && (
                          <p className="text-xs text-grey-400 mt-1 line-clamp-1">
                            {user.about}
                          </p>
                        )}
                      </div>
                    </Link>

                    {/* Follow/Unfollow Button */}
                    {!isCurrentUser(user.id) && (
                      <div className="flex-shrink-0 ml-3">
                        <Button
                          variant="outline"
                          onClick={async () => {
                            try {
                              await (isFollowing(user.id)
                                ? beaver.social.unfollowUser.mutateAsync({ userId: user.id })
                                : beaver.social.followUser.mutateAsync({ userId: user.id }));
                            } catch (error) {
                              console.error('Error:', error);
                            }
                          }}
                          disabled={beaver.social.followUser.isPending || beaver.social.unfollowUser.isPending}
                        >
                          {isFollowing(user.id) ? "Following" : "Follow"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {query.hasNextPage && (
                <div className="px-6 py-4 border-t border-grey-800">
                  <button
                    onClick={handleLoadMore}
                    disabled={query.isFetchingNextPage}
                    className="w-full py-2 text-primary hover:text-primary/80 transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    {query.isFetchingNextPage ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        Loading...
                      </div>
                    ) : (
                      `Load more ${title.toLowerCase()}`
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
