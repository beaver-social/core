import { Image } from "@/shared/components/Image";
import { useBeaver } from "@beaver/react";
import moment from "moment";
import { Navigate, useNavigate, useParams } from "react-router";

export default function UserDetails() {
  const beaver = useBeaver();
  const { username } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = beaver.profile.getProfile({
    type: "username",
    value: username as string,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src={user?.imageUrl}
            alt={user?.username}
            className="size-20 rounded-full"
          />
          <h2 className="text-xl font-bold">{user?.fullName}</h2>
          <p className="text-sm text-muted-foreground">@{user?.username}</p>
        </div>

        {user?.about && (
          <p className="text-sm text-grey-600 text-center mt-1">
            {user?.about}
          </p>
        )}

        <p className="text-sm text-grey-600 text-center mt-2">
          <span className="">
            Joined {moment(user?.createdAt).format("MMMM YYYY")}
          </span>
        </p>
      </div>
    </div>
  );
}
