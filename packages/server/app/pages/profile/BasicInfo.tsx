import Icon from "@/shared/components/Icon"
import { UserDetails } from "."

export default function BasicInfo({ data: userDetails }: { data: UserDetails }) {
    return (
        <div className="pt-20 px-6 pb-4 space-y-4 border-b">
            {/* Name and Verification */}
            <div>
                <div className="flex items-center gap-1">
                    <h1 className="text-xl font-bold">{userDetails.name}</h1>
                    {userDetails.verified && (
                        <Icon name="BadgeCheck" className="text-primary" />
                    )}
                </div>
                <p className="text-grey-500">{userDetails.username}</p>
            </div>

            {/* Bio */}
            {userDetails.bio && (
                <p className="text-sm">{userDetails.bio}</p>
            )}

            {/* Profile Metadata (Location, Website, Join Date) */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-grey-500">
                {userDetails.location && (
                    <div className="flex items-center gap-1">
                        <Icon name="MapPin" className="size-4" />
                        <span>{userDetails.location}</span>
                    </div>
                )}

                {userDetails.website && (
                    <div className="flex items-center gap-1">
                        <Icon name="Globe" className="size-4" />
                        <a href={`https://${userDetails.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {userDetails.website}
                        </a>
                    </div>
                )}

                {userDetails.joined && (
                    <div className="flex items-center gap-1">
                        <Icon name="Calendar" className="size-4" />
                        <span>Joined {userDetails.joined}</span>
                    </div>
                )}
            </div>

            {/* Followers/Following Stats */}
            <div className="flex gap-4 text-sm">
                <a href="#" className="hover:underline">
                    <span className="font-semibold">{userDetails.following}</span> <span className="text-grey-500">Following</span>
                </a>
                <a href="#" className="hover:underline">
                    <span className="font-semibold">{userDetails.followers}</span> <span className="text-grey-500">Followers</span>
                </a>
            </div>
        </div>
    )
}