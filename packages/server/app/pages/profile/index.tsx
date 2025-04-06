import { useParams } from "react-router"
import { useEffect, useState } from "react"
import Layout from "../layout"
import SecondaryPanel from "../explore/SecondaryPanel"
import ProfileHeader from "./ProfileHeader"
import Tabs from "@/shared/components/Tabs"
import { useGlobalUI } from "@/shared/hooks/useGlobalUI"
import BasicInfo from "./BasicInfo"

export type UserDetails = {
    id: string;
    username: string;
    address: string;
    name: string;
    verified: boolean;
    bio: string;
    location: string;
    website: string;
    birthday: string;
    joined: string;
    followers: number;
    following: number;
    profilePicture: string;
    coverPhoto: string;
}

const userDetails: UserDetails = {
    id: "1",
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

export default function Profile() {
    const { id } = useParams<{ id: string }>()
    const { setScreen } = useGlobalUI();
    useEffect(() => {
        setScreen("profile");
    }, []);

    const isCurrentUser = id === userDetails.id;

    return (
        <Layout main={
            <div className="border mb-10">
                <ProfileHeader data={userDetails} isCurrentUser={isCurrentUser} />
                <BasicInfo data={userDetails} />
                <Tabs />
            </div>
        } secondary={<SecondaryPanel />} />
    )
}