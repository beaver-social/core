import { Image } from "@/shared/components/Image";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import SearchBar from "@/pages/explore/SearchBar";

// Sample data for profiles and trending topics
const sampleProfiles = [
    { id: "1", name: "Kartik", handle: "ishtails", profilePicture: "/images/user.webp" },
    { id: "2", name: "John Doe", handle: "johndoe", profilePicture: "/images/user.webp" },
    { id: "3", name: "Jane Smith", handle: "janesmith", profilePicture: "/images/user.webp" },
];

const trendingTopics = [
    { id: "1", name: "Web3", count: "10.5K" },
    { id: "2", name: "Blockchain", count: "8.2K" },
    { id: "3", name: "NFT", count: "5.7K" },
];

export default function SecondaryPanel() {
    const navigate = useNavigate();

    return (
        <div className="w-[350px] h-full p-4 space-y-6">
            {/* Search Bar */}
            <SearchBar
                profiles={sampleProfiles}
                topics={trendingTopics}
                placeholder="Search"
            />

            {/* Trending Topics */}
            <div className="bg-secondary border rounded-xl p-4">
                <h2 className="text-xl font-bold mb-4">What's happening</h2>
                <div className="space-y-4">
                    {trendingTopics.map((topic) => (
                        <div
                            key={topic.id}
                            className="space-y-1 cursor-pointer hover:bg-background/10 p-2 rounded-lg transition-colors"
                            onClick={() => navigate(`/explore/search?q=${encodeURIComponent(topic.name)}`)}
                        >
                            <p className="text-sm text-muted-foreground">Trending in Technology</p>
                            <p className="font-semibold">#{topic.name}</p>
                            <p className="text-sm text-muted-foreground">{topic.count} posts</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Profiles */}
            <div className="bg-secondary border rounded-xl p-6">
                <h2 className="font-bold mb-4">Suggested for you</h2>
                <div className="space-y-4">
                    {sampleProfiles.map((profile) => (
                        <div key={profile.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Link to={`/profile/${profile.handle}`}>
                                    <Image
                                        src={profile.profilePicture}
                                        alt={profile.name}
                                        className="w-10 h-10 rounded-full bg-background"
                                    />
                                </Link>
                                <div>
                                    <p className="font-semibold">{profile.name}</p>
                                    <p className="text-sm text-muted-foreground">@{profile.handle}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Follow</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 