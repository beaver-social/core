import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components/ui/button";
import Spinner from "@/shared/components/Spinner";
import { useBeaver } from "@beaver/react";
import { icons } from "lucide-react";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";

export default function Actions() {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const beaver = useBeaver();
  const { data: profile } = beaver.profile.getProfile({
    type: "username",
    value: username || "",
  });

  const {
    data: actionData,
    isPending: isActionsLoading,
    error: actionsError,
    fetchNextPage,
    hasNextPage,
  } = beaver.actions.getUserActions({
    userId: (profile as any)?.id || 0,
    perPage: 10,
  });

  const { infiniteScrollRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  if (isActionsLoading) {
    return (
      <div className="flex items-center justify-center m-10">
        <Spinner />
      </div>
    );
  }

  const allActions = actionData?.pages.flatMap((page: any) => page.actions) || [];

  if (allActions.length === 0) {
    return (
      <div className="p-10 text-center">
        <div className="inline-flex items-center justify-center mb-4 rounded-full size-16 bg-secondary">
          <Icon name="Activity" className="size-8 text-grey-500" />
        </div>
        <h3 className="text-xl font-bold">No actions yet</h3>
        <p className="mt-2 text-grey-500">
          You can see all the actions this user has taken here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {allActions.map((action) => {
        const { icon, title } = getActionDetails(action.type, action.payload);
        return (
          <div key={action.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary/50">
            <div className="flex items-center justify-center rounded-full size-10 bg-secondary text-primary">
              <Icon name={icon} className="size-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between gap-2">
                <p className="">{title}</p>
                {action?.payload?.postId && (
                  <Button variant="outline" size="sm" onClick={() => {
                    navigate(`/app/post/${action?.payload?.postId}`);
                  }}>
                    View Post
                  </Button>
                )}
                {action?.payload?.user && (
                  <Button variant="outline" size="sm" onClick={() => {
                    navigate(`/app/profile/${action?.payload?.user?.username}`);
                  }}>
                    View Profile
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {moment(action.createdAt).fromNow()}
              </p>
            </div>
          </div>
        );
      })}

      {hasNextPage && <div ref={infiniteScrollRef} className="h-1" />}
    </div>
  );
}

function getActionDetails(actionType: string, payload: Record<string, unknown>): { icon: keyof typeof icons; title: string; target?: string } {
  const parts = actionType.split('.');
  if (parts.length < 3) return { icon: "Activity", title: actionType };

  const entity = parts[1];
  const operation = parts[2];
  const targetEntity = parts[3];

  switch (`${entity}.${operation}.${targetEntity}`) {
    case "user.follow.user":
      return { icon: "UserPlus", title: "Followed a user" };
    case "user.unfollow.user":
      return { icon: "UserMinus", title: "Unfollowed a user" };
    case "user.delete.post":
      return { icon: "Trash2", title: "Deleted a post" };
    case "user.create.post":
      return { icon: "Plus", title: "Created a post" };
    case "user.update.post":
      return { icon: "Pencil", title: "Updated a post" };
    case "user.like.post":
      return { icon: "Heart", title: "Liked a post" };
    case "user.unlike.post":
      return { icon: "Heart", title: "Unliked a post" };
    default:
      return { icon: "Activity", title: actionType.replace("v1.", "").replace(/\./g, " ") };
  }
}