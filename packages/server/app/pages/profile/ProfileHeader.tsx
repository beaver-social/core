import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { UserDetails } from ".";
import { Image } from "@/shared/components/Image";
import Icon from "@/shared/components/Icon";

type Props = {
    data: UserDetails;
    isCurrentUser?: boolean;
}

export default function ProfileHeader({ data, isCurrentUser = false }: Props) {
    const navigate = useNavigate();

    return (
        <div>
            {/* Header with back button and user info */}
            <div className="flex items-center justify-between">
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm flex items-center gap-6 p-3 rounded-t-lg">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full p-2 hover:bg-grey-200/10"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-bold text-xl">{data.name}</h1>
                    </div>


                </div>

                <Link to="/settings" className="mr-5 sm:hidden">
                    <Icon name="Settings" className="text-hover" />
                </Link>
            </div>

            {/* Cover Photo */}
            <div className="relative">
                <Image
                    src={data.coverPhoto}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                />

                {/* Profile Picture */}
                <Image
                    src={data.profilePicture}
                    alt="Profile"
                    className="absolute -bottom-16 left-6 size-32 rounded-full border-4 border-background bg-grey-900"
                />

                {/* Follow/Edit Button */}
                <div className="absolute right-4 bottom-4">
                    {isCurrentUser ? (
                        <Button variant="outline" className="rounded-full font-semibold">
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