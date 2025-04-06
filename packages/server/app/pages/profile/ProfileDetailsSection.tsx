type Props = {
    data: {
        id: string;
        username: string;
        name: string;
        bio: string;
        location: string;
        website: string;
        joined: string;
        followers: number;
        following: number;
        verified: boolean;
        profilePicture: string;
        coverPhoto: string;
    }
}

import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { Calendar, Globe, MapPin } from "lucide-react";
import { Image } from "@/shared/components/Image";

export default function ProfileDetailsSection({ data }: Props) {
    return (
        <div className="border rounded-t-md">
            {/* Cover Photo */}
            <div className="relative">
                <Image src={data.coverPhoto} alt="Cover" className="w-full h-48 object-cover rounded-t-md" />

                {/* Profile Picture */}
                <Image
                    src={data.profilePicture}
                    alt="Profile"
                    className="absolute -bottom-16 left-6 size-32 rounded-full border-4 border-background bg-grey-900"
                />

                {/* Follow/Edit Button */}
                <div className="absolute right-4 bottom-4">
                    <Button variant="outline" className="rounded-full font-semibold">
                        Follow
                    </Button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-6 pb-4 space-y-4">
                {/* Name and Verification */}
                <div>
                    <div className="flex items-center gap-1">
                        <h1 className="text-xl font-bold">{data.name}</h1>
                        {data.verified && (
                            <Icon name="BadgeCheck" className="text-primary" />
                        )}
                    </div>
                    <p className="text-grey-500">{data.username}</p>
                </div>

                {/* Bio */}
                {data.bio && (
                    <p className="text-sm">{data.bio}</p>
                )}

                {/* Location, Website, Join Date */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-grey-500">
                    {data.location && (
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{data.location}</span>
                        </div>
                    )}

                    {data.website && (
                        <div className="flex items-center gap-1">
                            <Globe size={16} />
                            <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {data.website}
                            </a>
                        </div>
                    )}

                    {data.joined && (
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>Joined {data.joined}</span>
                        </div>
                    )}
                </div>

                {/* Followers/Following Stats */}
                <div className="flex gap-4 text-sm">
                    <Link to={`/profile/${data.username}/following`} className="hover:underline">
                        <span className="font-semibold">{data.following}</span> <span className="text-grey-500">Following</span>
                    </Link>
                    <Link to={`/profile/${data.username}/followers`} className="hover:underline">
                        <span className="font-semibold">{data.followers}</span> <span className="text-grey-500">Followers</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}