import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import Disconnect from "@/shared/components/Disconnect";

type Props = {
  data: ReturnType<typeof useBeaver>["user"];
};

export default function ProfileHeader({ data }: Props) {
  const navigate = useNavigate();
  const beaver = useBeaver();
  const currentUser = beaver.user;
  const isCurrentUser = data?.username === currentUser?.username;

  return (
    <div>
      {/* Cover Photo */}
      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 rounded-sm p-2 transition hover:bg-grey-500/10"
        >
          <ArrowLeft size={20} />
        </button>

        {/* QR Code Button */}
        <div className="absolute top-4 right-4 p-2">
          {beaver.wallet.isConnected ? (
            <Disconnect />
          ) : (
            <div className="rounded-sm cursor-pointer">
              <Icon name="QrCode" className="size-5" />
            </div>
          )}
        </div>

        <Image
          src={data?.bannerUrl || "/images/default/banner.webp"}
          alt="Cover"
          className="w-full h-48 object-cover sm:rounded-t-xl"
        />

        <div className="absolute top-24 left-0 w-full h-full flex items-center justify-center">
          <div className="relative">
            <Image
              src={data?.imageUrl || "/images/default/profile.webp"}
              alt="Profile"
              className="size-32 rounded-full border-4 border-background bg-grey-900"
            />
          </div>
        </div>

        {/* Follow/Edit Button */}
        <div className="absolute right-4 bottom-4">
          {isCurrentUser ? (
            <Button
              variant="outline"
              className="rounded-full font-semibold"
              onClick={() => navigate(`/app/profile/edit`)}
            >
              Edit profile
            </Button>
          ) : (
            <Button variant="outline" className="rounded-full font-semibold">
              Follow
            </Button>
          )}
        </div>
      </div>


    </div>
  );
}
