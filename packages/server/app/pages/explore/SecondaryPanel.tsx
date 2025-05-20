import { Image } from "@/shared/components/Image";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import SearchBar from "@/pages/explore/SearchBar";
import Icon from "@/shared/components/Icon";
import GradientButton from "@/shared/components/GradientButton";
import { motion } from "framer-motion";

// Sample data for profiles and trending topics
const sampleProfiles = [
    {
        id: "1",
        name: "Kartik",
        handle: "ishtails",
        profilePicture: "/images/user.webp",
        bio: "Music Producer, DJ, and Software Engineer",
        verified: true
    },
    {
        id: "2",
        name: "John Doe",
        handle: "johndoe",
        profilePicture: "/images/user.webp",
        bio: "Blockchain developer and crypto enthusiast",
        verified: false
    },
    {
        id: "3",
        name: "Jane Smith",
        handle: "janesmith",
        profilePicture: "/images/user.webp",
        bio: "NFT artist and design expert",
        verified: true
    },
];

const trendingTopics = [
    { id: "1", name: "Web3", count: "10.5K", category: "Technology", iconName: "Globe" },
    { id: "2", name: "Blockchain", count: "8.2K", category: "Development", iconName: "Blocks" },
    { id: "3", name: "NFT", count: "5.7K", category: "Art", iconName: "Image" },
];

export default function SecondaryPanel() {
    const navigate = useNavigate();
    const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
    const [followStates, setFollowStates] = useState<Record<string, boolean>>({});
    const [likedTopic, setLikedTopic] = useState<Record<string, boolean>>({});

    // Toggle following status for a profile
    const toggleFollow = (profileId: string) => {
        setFollowStates(prev => ({
            ...prev,
            [profileId]: !prev[profileId]
        }));
    };

    // Toggle like status for a topic
    const toggleLikeTopic = (topicId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setLikedTopic(prev => ({
            ...prev,
            [topicId]: !prev[topicId]
        }));
    };

    return (
        <div className="p-4 text-sm space-y-6">
            {/* Search Bar */}
            <SearchBar
                profiles={sampleProfiles}
                topics={trendingTopics}
                placeholder="Search"
            />

            {/* Trending Topics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-secondary border border-border/80 rounded-xl p-4 backdrop-blur-sm shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
                <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Icon name="TrendingUp" className="size-5 text-primary" />
                    Trending
                </h2>
                <div className="space-y-2 mt-4">
                    {trendingTopics.map((topic) => (
                        <motion.div
                            key={topic.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="space-y-1 cursor-pointer hover:bg-background/20 p-3 rounded-lg transition-colors border border-transparent hover:border-primary/20 group"
                            onClick={() => navigate(`/app/explore/search?q=${encodeURIComponent(topic.name)}`)}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Icon name={topic.iconName as any} className="size-3.5" />
                                    Trending in {topic.category}
                                </p>
                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={(e) => toggleLikeTopic(topic.id, e)}
                                    className="p-1.5 rounded-full hover:bg-background/30 transition-colors"
                                >
                                    {likedTopic[topic.id] ? (
                                        <Icon name="Heart" className="size-3.5 text-primary" fill="#ff3e8e" />
                                    ) : (
                                        <Icon name="Heart" className="size-3.5 text-muted-foreground group-hover:text-primary/80" />
                                    )}
                                </motion.button>
                            </div>
                            <p className="font-semibold group-hover:text-primary transition-colors">#{topic.name}</p>
                            <p className="text-sm text-muted-foreground">{topic.count} posts</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-3">
                    <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/10 transition-colors">
                        Show more
                    </Button>
                </div>
            </motion.div>

            {/* Suggested Profiles */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-secondary border border-border/80 rounded-xl p-6 backdrop-blur-sm shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Users" className="size-4 text-primary" />
                    Suggested for you
                </h2>
                <div className="space-y-5">
                    {sampleProfiles.map((profile) => (
                        <motion.div
                            key={profile.id}
                            className={`rounded-lg border border-transparent transition-all duration-300 ${expandedProfile === profile.id ? 'bg-background/30 border-primary/20 p-3' : 'p-2'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => setExpandedProfile(expandedProfile === profile.id ? null : profile.id)}
                                >
                                    <Link to={`/profile/${profile.handle}`}>
                                        <motion.div whileHover={{ scale: 1.05 }} className="relative">
                                            <Image
                                                src={profile.profilePicture}
                                                alt={profile.name}
                                                className="w-10 h-10 rounded-full bg-background border border-primary/30"
                                            />
                                            {profile.verified && (
                                                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                                                    <Icon name="BadgeCheck" className="text-primary size-3" />
                                                </div>
                                            )}
                                        </motion.div>
                                    </Link>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <p className="font-semibold">{profile.name}</p>
                                            {profile.verified && <Icon name="SquareCheckBig" className="text-primary size-3.5" />}
                                        </div>
                                        <p className="text-xs text-muted-foreground">@{profile.handle}</p>
                                    </div>
                                </div>
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <Button
                                        variant={followStates[profile.id] ? "default" : "outline"}
                                        size="sm"
                                        className={`rounded-full transition-all ${followStates[profile.id] ? 'bg-primary text-white' : ''}`}
                                        onClick={() => toggleFollow(profile.id)}
                                    >
                                        {followStates[profile.id] ? 'Following' : 'Follow'}
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Expanded view with bio and social buttons */}
                            {expandedProfile === profile.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-3"
                                >
                                    <p className="text-sm text-muted-foreground mb-3">{profile.bio}</p>

                                    {/* Social Icons */}
                                    <div className="flex gap-2 mt-2 justify-start">
                                        <Link to={`/message/${profile.handle}`}>
                                            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                                                <GradientButton iconName="Mail" />
                                            </motion.div>
                                        </Link>
                                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                                            <GradientButton iconName="Twitter" />
                                        </motion.div>
                                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                                            <GradientButton iconName="Youtube" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
                <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/10 transition-colors">
                        View all suggestions
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}