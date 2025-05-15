import { useParams } from "react-router"
import { useEffect } from "react"
import Layout from "../layout"
import SecondaryPanel from "../explore/SecondaryPanel"
import ProfileHeader from "./ProfileHeader"
import Tabs from "@/shared/components/Tabs"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import BasicInfo from "./BasicInfo"
import { useBeaver } from "@beaver/react";
import Icon from "@/shared/components/Icon"

export type UserDetails = {
    id: string;
    username: string;
    address: string;
    name: string;
    verified: boolean;
    bio: string;
    location: string;
    birthday: string;
    joined: string;
    followers: number;
    following: number;
    profilePicture: string;
    coverPhoto: string;
    socials?: {
        email?: string;
        twitter?: string;
        youtube?: string;
        instagram?: string;
    };
    website?: {
        heading: string;
        subHeading: string;
    };
    pinnedPost?: string;
}

const userDetails: UserDetails = {
    id: "1",
    username: "@ishtails",
    address: "0x1234567890123456789012345678901234567890",
    name: "Kartikay Tiwari",
    verified: true,
    bio: "Music Producer, DJ, and Software Engineer from Mumbai, India",
    location: "Mumbai, India",
    birthday: "March 12, 2001",
    joined: "May 2025",
    followers: 12400,
    following: 320,
    profilePicture: "/images/user.webp",
    coverPhoto: "/images/wallpapers/7.jpeg",
    socials: {
        twitter: "ishtails",
        youtube: "ishtails",
        instagram: "ishtails"
    },
    website: {
        heading: "Beaver Social",
        subHeading: "A social media platform for the next generation"
    },
    pinnedPost: "/videos/workout.mp4"
}

export default function Profile() {
    const { id } = useParams<{ id: string }>()
    const beaver = useBeaver();
    const { data: user, isLoading, isError, isSuccess } = beaver.profile.getProfileById({ id: parseInt(id || "1") });
    const isCurrentUser = id === beaver.user?.id.toString();

    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("profile");
    }, []);

    return (
        <Layout main={
            <div className="border mb-10 rounded-t-2xl h-screen">
                {isSuccess ? <div>
                    <ProfileHeader data={userDetails} isCurrentUser={isCurrentUser} />
                    <BasicInfo data={user} />
                    <Tabs />
                </div> :
                    <div className="flex justify-center items-center h-full">
                        <Icon name="LoaderCircle" className="size-10 animate-spin" />
                    </div>
                }
            </div>
        } secondary={<SecondaryPanel />} />
    )
}