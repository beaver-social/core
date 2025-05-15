import Icon from "@/shared/components/Icon"
import { Image } from "@/shared/components/Image"
import { Link } from "react-router"
import GradientButton from "@/shared/components/GradientButton"
import { useBeaver } from "@beaver/react";
import { truncateText } from "@/shared/lib/utils"
import moment from "moment";
import FollowDialog from "./FollowDialog"
import ImageCarousel from "@/shared/components/MediaCarousel";

type Props = {
    data: ReturnType<typeof useBeaver>["user"]
}

const userrrr = {
    "id": 3,
    "address": "0x7df7afaa27690092e8828d6b638031195e0eda2362a122596cd3f5026e398c79",
    "identity": "0x273a76cd69313280c69788bcf872f0ab1fcd2bc3a13fffc07d2967c4b08b4092",
    "collectionNft": "0x9b359d59cd1d66eb46e5d214bf9704435880e62766a8898f1b84c68fdc1d91f0",
    "username": "ishtails1234",
    "about": null,
    "fullName": "asagag",
    "suinsDomainName": null,
    "location": null,
    "birthday": null,
    "twitter": null,
    "youtube": null,
    "instagram": null,
    "website": null,
    "pinnedPost": null,
    "imageUrl": null,
    "bannerUrl": null,
    "imageBlurhash": null,
    "timezone": null,
    "createdAt": 1747144778436,
    "deletedAt": null
}

export default function BasicInfo({ data: user }: Props) {
    const beaver = useBeaver();
    console.log({ user });

    const { data: pinnedPostDetails, isSuccess: pinnedPostSuccess } = beaver.post.getPostById({ id: Number(user?.pinnedPost) });

    const { data: followerData } = beaver.follows.getFollowers({ userId: Number(user?.id), page: 1, perPage: 10 });
    const { data: followingData } = beaver.follows.getFollowing({ userId: Number(user?.id), page: 1, perPage: 10 });
    const { data: count } = beaver.follows.getFollowCount({ userId: Number(user?.id) });

    return (
        <div className="pt-18 px-6 border-b">
            {/* Name and Verification */}
            <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center gap-2">
                    <h1 className="text-xl font-bold">{user?.fullName}</h1>
                    <Icon name="SquareCheckBig" className="text-secondary-foreground size-5" />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <p className="w-full text-center text-sm text-grey-500">@{user?.username}</p>
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
                    <p className="text-sm max-w-lg text-center">{truncateText(user?.about, 100)}</p>
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
                    data={followingData?.following}
                    count={count?.following || 0}
                    title="Following"
                />
                <FollowDialog
                    data={followerData?.followers}
                    count={count?.followers || 0}
                    title="Followers"
                />
            </div>

            {/* Website Section */}
            {
                user?.website && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium flex items-center gap-2 text-grey-400">
                                <Icon name="Globe" className="size-3.5 text-primary" />
                                Website
                            </h3>
                        </div>
                        <Link to={user?.website?.url} target="_blank" className="block">
                            <div className="bg-grey-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-grey-800 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/10">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <GradientButton iconName="Globe" />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{user?.website?.heading}</p>
                                            <p className="text-xs text-grey-500">{user?.website?.subHeading}</p>
                                        </div>
                                        <div className="p-1.5 rounded-full bg-grey-950/70 text-primary">
                                            <Icon name="ArrowRight" className="size-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }

            {/* Pinned Post Section */}
            {
                user?.pinnedPost && pinnedPostDetails?.id && (
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
                                            <Icon name="SquareCheckBig" className="text-primary size-4" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-grey-500">
                                            <span>{user?.username}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-4 text-sm">
                                    <p className="leading-relaxed mb-4">{pinnedPostDetails?.content}</p>

                                    {/* Optional Media */}
                                    {pinnedPostDetails?.media && pinnedPostDetails?.media.length > 0 && (
                                        <div
                                            className="w-full rounded-sm overflow-hidden"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            <ImageCarousel images={pinnedPostDetails?.media} aspectRatio={pinnedPostDetails?.media[0]?.aspectRatio} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}