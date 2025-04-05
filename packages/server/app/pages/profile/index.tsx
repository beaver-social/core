import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Layout from "../layout"
import SecondaryPanel from "../SecondaryPanel"
import ProfileHeader from "./ProfileHeader"
import Tabs from "@/shared/components/Tabs"
import Icon from "@/shared/components/Icon"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"

type Props = {}

const userDetails = {
    id: "1128748915691",
    username: "@ishtails",
    address: "0x1234567890123456789012345678901234567890",
    name: "Kartik",
    verified: true,
    bio: "Full Stack Web3 Developer. Designer. Musician. etc.",
    location: "New York, USA",
    website: "styles-portfolio.vercel.app",
    birthday: "March 12, 2001",
    joined: "January 2022",
    followers: 100,
    following: 50,
    profilePicture: "/images/user.png",
    coverPhoto: "/images/banner.webp",
}

export default function Profile({ }: Props) {
    const { id } = useParams<{ id: string }>()
    const [activeTab, setActiveTab] = useState("posts");
    const { getTabs, setScreen } = useGlobalUI();
    const tabs = getTabs();

    // Set the screen to profile
    useEffect(() => {
        setScreen("profile");
    }, [setScreen]);

    // Check if this is the current user's profile
    const isCurrentUser = id === "ishtails" || !id;

    // Create header data from userDetails
    const headerData = {
        ...userDetails,
    };

    return (
        <Layout main={
            <div className="border-x min-h-screen">
                {/* Profile Header with back button, cover photo and profile picture */}
                <ProfileHeader data={headerData} isCurrentUser={isCurrentUser} />

                {/* Profile Info (Bio, Location, Website, Join Date, Stats) */}
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

                {/* Content Tabs */}
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>
        } secondary={<SecondaryPanel />} />
    )
}