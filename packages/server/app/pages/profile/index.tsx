import { useParams } from "react-router"
import Layout from "../layout"
import PageTitle from "@/shared/components/PageTitle"
import SecondaryPanel from "../SecondaryPanel"
import ProfileDetailsSection from "./ProfileDetailsSection"

type Props = {}

const userDetails = {
    id: "1",
    username: "@ishtails",
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

    return (
        <Layout main={
            <div>
                <div className="w-full">
                    <ProfileDetailsSection data={userDetails} />
                </div>
            </div>
        } secondary={<SecondaryPanel />} />
    )
}