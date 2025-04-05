import { useParams } from "react-router"
import { useState } from "react"
import Layout from "../layout"
import PageTitle from "@/shared/components/PageTitle"
import SecondaryPanel from "../SecondaryPanel"
import ProfileDetailsSection from "./ProfileDetailsSection"
import ProfileActivity from "./ProfileActivity"
import ProfileHeader from "./ProfileHeader"
import Tabs, { Tab } from "@/shared/components/Tabs"
import Icon from "@/shared/components/Icon"

type Props = {}

const userDetails = {
    id: "1128748915691",
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

// Sample post data for demonstration
const samplePosts = [
    {
        id: "1",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "10h",
        content: "Just deployed a new web3 project! Check it out at https://beaver-social.com",
        likes: 42,
        comments: 5,
        reposts: 8,
        shares: 3,
        avatarUrl: "/images/user.png",
        aspectRatio: "square" as const,
    },
    {
        id: "2",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "2d",
        content: "Working on some new features for Beaver Social. Stay tuned!",
        likes: 21,
        comments: 3,
        reposts: 2,
        shares: 1,
        avatarUrl: "/images/user.png",
        aspectRatio: "square" as const,
    }
];

// Post list item type
type PostListItemProps = {
    id: string;
    username: string;
    handle: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
    avatarUrl: string;
}

// Sample activity data for demonstration
const sampleActivities = [
    {
        id: "1",
        type: "like" as const,
        timestamp: "2h ago",
        sourceUser: {
            name: "Kartik",
            handle: "ishtails",
            avatar: "/images/user.png"
        },
        targetPost: {
            id: "123",
            content: "Web3 is revolutionizing the way we interact with the internet! #blockchain #decentralization",
            author: {
                name: "Alex Thompson",
                handle: "alexthompson"
            }
        }
    },
    {
        id: "2",
        type: "repost" as const,
        timestamp: "1d ago",
        sourceUser: {
            name: "Kartik",
            handle: "ishtails",
            avatar: "/images/user.png"
        },
        targetPost: {
            id: "456",
            content: "Just launched my new NFT collection, check it out!",
            author: {
                name: "Sarah Miller",
                handle: "sarahm"
            }
        }
    }
];

export default function Profile({ }: Props) {
    const { id } = useParams<{ id: string }>()

    // Check if this is the current user's profile
    const isCurrentUser = id === "ishtails" || !id;

    // Set post count for header
    const postCount = samplePosts.length;

    // Create header data from userDetails
    const headerData = {
        ...userDetails,
        postCount
    };

    // Define tabs for the profile content
    const tabs: Tab[] = [
        {
            id: "posts",
            label: "Posts",
            content: (
                <div className="space-y-1">
                    {samplePosts.map(post => (
                        <PostListItem key={post.id} {...post} />
                    ))}
                </div>
            )
        },
        {
            id: "replies",
            label: "Replies",
            content: (
                <div className="p-6 text-center text-grey-500">
                    <p>No replies yet</p>
                </div>
            )
        },
        {
            id: "media",
            label: "Media",
            content: (
                <div className="p-6 text-center text-grey-500">
                    <p>No media yet</p>
                </div>
            )
        },
        {
            id: "likes",
            label: "Likes",
            content: (
                <div className="p-6 text-center text-grey-500">
                    <p>No likes yet</p>
                </div>
            )
        },
        {
            id: "activity",
            label: "Activity",
            content: (
                <ProfileActivity activities={sampleActivities} />
            )
        }
    ]

    return (
        <Layout main={
            <div className="border-x min-h-screen">
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
                    tabData={tabs}
                />
            </div>
        } secondary={<SecondaryPanel />} />
    )
}

// Post list item component for the posts tab
function PostListItem({
    id,
    username,
    handle,
    timestamp,
    content,
    likes,
    comments,
    reposts,
    shares,
    avatarUrl,
}: PostListItemProps) {
    return (
        <div className="p-4 border-b hover:bg-accent/10 transition cursor-pointer">
            <div className="flex gap-3">
                <img src={avatarUrl} alt={username} className="size-10 rounded-full" />
                <div className="flex-1">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{username}</span>
                        <span className="text-grey-500">@{handle}</span>
                        <span className="text-grey-500">·</span>
                        <span className="text-grey-500">{timestamp}</span>
                    </div>
                    <p className="mt-1">{content}</p>

                    <div className="flex justify-between mt-3 text-grey-500 max-w-md">
                        <div className="flex items-center gap-1 hover:text-primary">
                            <Icon name="MessageCircle" weight="light" />
                            <span className="text-xs">{comments}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-green-500">
                            <Icon name="Repeat" weight="light" />
                            <span className="text-xs">{reposts}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-red-500">
                            <Icon name="Heart" weight="light" />
                            <span className="text-xs">{likes}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-primary">
                            <Icon name="Share" weight="light" />
                            <span className="text-xs">{shares}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}