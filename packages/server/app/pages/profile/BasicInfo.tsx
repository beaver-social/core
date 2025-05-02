import Icon from "@/shared/components/Icon"
import { UserDetails } from "."
import { Image } from "@/shared/components/Image"
import { Link } from "react-router"
import GradientButton from "@/shared/components/GradientButton"

export default function BasicInfo({ data: userDetails }: { data: UserDetails }) {
    return (
        <div className="pt-18 px-6 border-b">
            {/* Name and Verification */}
            <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center gap-2">
                    <h1 className="text-xl font-bold">{userDetails.name}</h1>
                    {userDetails.verified && (
                        <Icon name="SquareCheckBig" className="text-secondary-foreground" />
                    )}
                </div>
                <div className="flex items-center justify-center gap-2">
                    <p className="w-full text-center text-sm text-grey-500">{userDetails.username}</p>
                </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 justify-center">
                <Link to={`/message/${userDetails.username}`}>
                    <GradientButton iconName="Mail" />
                </Link>
                {userDetails.socials?.twitter && (
                    <Link to={`https://twitter.com/${userDetails.socials.twitter}`} target="_blank">
                        <GradientButton iconName="Twitter" />
                    </Link>
                )}
                {userDetails.socials?.youtube && (
                    <Link to={`https://youtube.com/@${userDetails.socials.youtube}`} target="_blank">
                        <GradientButton iconName="Youtube" />
                    </Link>
                )}
                {userDetails.socials?.instagram && (
                    <Link to={`https://instagram.com/${userDetails.socials.instagram}`} target="_blank">
                        <GradientButton iconName="Instagram" />
                    </Link>
                )}
            </div>

            {/* Bio */}
            <div className="flex justify-center mt-3 text-grey-600">
                {userDetails.bio && (
                    <p className="text-sm max-w-lg text-center">{userDetails.bio}</p>
                )}
            </div>

            {/* Profile Metadata (Location, Website, Join Date) */}
            <div className="flex flex-wrap justify-center mt-4 gap-x-5 gap-y-2 text-sm text-grey-500">
                {userDetails.location && (
                    <div className="flex items-center text-xs gap-1">
                        <Icon name="MapPin" className="size-4" />
                        <span>{userDetails.location}</span>
                    </div>
                )}

                {userDetails.joined && (
                    <div className="flex items-center text-xs gap-1">
                        <Icon name="Calendar" className="size-4" />
                        <span>Joined {userDetails.joined}</span>
                    </div>
                )}
            </div>

            {/* Followers/Following Stats */}
            <div className="flex gap-5 mt-3 text-xs justify-center">
                <Link to={`/profile/${userDetails.username}/following`} className="hover:underline">
                    <span className="font-semibold text-grey-300">{userDetails.following}</span> <span className="text-grey-500">Following</span>
                </Link>
                <Link to={`/profile/${userDetails.username}/followers`} className="hover:underline">
                    <span className="font-semibold text-grey-300">{userDetails.followers}</span> <span className="text-grey-500">Followers</span>
                </Link>
            </div>

            {/* Buy Template Section */}
            {
                userDetails.website && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium flex items-center gap-2 text-grey-400">
                                <Icon name="Globe" className="size-3.5 text-primary" />
                                Website
                            </h3>
                        </div>
                        <Link to="#" className="block">
                            <div className="bg-grey-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-grey-800 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/10">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <GradientButton iconName="Globe" />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{userDetails.website.heading}</p>
                                            <p className="text-xs text-grey-500">{userDetails.website.subHeading}</p>
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
                userDetails.pinnedPost && (
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
                                        src={userDetails.profilePicture}
                                        alt={userDetails.name}
                                        className="size-10 rounded-full border-2 border-primary/20"
                                    />
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-semibold">{userDetails.name}</span>
                                            {userDetails.verified && (
                                                <Icon name="SquareCheckBig" className="text-primary size-4" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-grey-500">
                                            <span>{userDetails.username}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-4 text-sm">
                                    <p className="leading-relaxed mb-4">Check out my latest fitness routine that helped me gain 10lbs of muscle in just 8 weeks!</p>

                                    {/* Optional Media */}
                                    {userDetails.pinnedPost.includes('.mp4') ? (
                                        <div className="relative rounded-lg overflow-hidden aspect-video bg-grey-950/50 group cursor-pointer">
                                            <Image
                                                src="/images/wallpapers/8.jpeg"
                                                alt="Featured post"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-primary/90 rounded-full p-3 shadow-xl">
                                                    <Icon name="Play" className="size-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg overflow-hidden bg-grey-950/50">
                                            <Image
                                                src="/images/wallpapers/8.jpeg"
                                                alt="Featured post"
                                                className="w-full h-auto object-cover transition-all hover:scale-105 duration-500"
                                            />
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