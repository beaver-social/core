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
            {/* Cover Photo */}
            <div className="relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 rounded-full p-2 hover:bg-grey-200/10"
                >
                    <ArrowLeft size={20} />
                </button>

                {/* QR Code Button */}
                <button className="absolute top-4 right-4 rounded-full p-2 hover:bg-grey-200/10">
                    <Icon name="QrCode" className="size-5" />
                </button>

                <Image
                    src={data.coverPhoto}
                    alt="Cover"
                    className="w-full h-48 object-cover sm:rounded-t-xl"
                />

                <div className="absolute top-24 left-0 w-full h-full flex items-center justify-center">
                    <div className="relative">
                        <Image
                            src={data.profilePicture}
                            alt="Profile"
                            className="size-32 rounded-full border-4 border-background bg-grey-900"
                        />
                    </div>
                </div>

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