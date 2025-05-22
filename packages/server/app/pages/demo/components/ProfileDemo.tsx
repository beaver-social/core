import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { Image } from "@/shared/components/Image";

interface Profile {
    id: string;
    username: string;
    bio?: string;
    followerCount: number;
    followingCount: number;
    postCount: number;
    isFollowing: boolean;
    imageUrl?: string;
}

export default function ProfileDemo() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    const mockProfiles: Profile[] = [
        {
            id: 'user-1',
            username: 'crypto_lover',
            bio: 'Blockchain enthusiast and early adopter. Love exploring new ecosystems.',
            followerCount: 1245,
            followingCount: 530,
            postCount: 87,
            isFollowing: true,
            imageUrl: '/images/user.webp'
        },
        {
            id: 'user-2',
            username: 'dev_enthusiast',
            bio: 'Building the future of web3 social. Experimenting with Sui Move.',
            followerCount: 892,
            followingCount: 315,
            postCount: 124,
            isFollowing: false,
            imageUrl: '/images/user.webp'
        },
        {
            id: 'user-3',
            username: 'beaver_builder',
            bio: 'Creating amazing projects with the Beaver SDK.',
            followerCount: 458,
            followingCount: 213,
            postCount: 45,
            isFollowing: false,
            imageUrl: '/images/user.webp'
        }
    ];

    // These would be replaced with actual SDK hooks
    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);

        // In real implementation:
        // const { searchSuggestions } = useProfile();
        // const { data, isLoading } = searchSuggestions({ query: searchQuery });

        setTimeout(() => {
            const results = mockProfiles.filter(profile =>
                profile.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
            setIsSearching(false);
        }, 500);
    };

    const handleViewProfile = (profileId: string) => {
        setIsLoadingProfile(true);

        // In real implementation:
        // const { getProfile } = useProfile();
        // const { data: profile } = getProfile({ userId: profileId });

        setTimeout(() => {
            const profile = mockProfiles.find(p => p.id === profileId) || null;
            setSelectedProfile(profile);
            setIsLoadingProfile(false);
        }, 800);
    };

    const handleToggleFollow = (profileId: string) => {
        // In real implementation:
        // const { followUser, unfollowUser } = useFollow();
        // profile.isFollowing ? unfollowUser.mutate({ userId: profileId }) : followUser.mutate({ userId: profileId });

        setSearchResults(searchResults.map(profile => {
            if (profile.id === profileId) {
                return {
                    ...profile,
                    isFollowing: !profile.isFollowing,
                    followerCount: profile.isFollowing ? profile.followerCount - 1 : profile.followerCount + 1
                };
            }
            return profile;
        }));

        if (selectedProfile && selectedProfile.id === profileId) {
            setSelectedProfile({
                ...selectedProfile,
                isFollowing: !selectedProfile.isFollowing,
                followerCount: selectedProfile.isFollowing ?
                    selectedProfile.followerCount - 1 :
                    selectedProfile.followerCount + 1
            });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-medium">User Profiles</h2>
                <p className="text-muted-foreground mt-1">Search and view user profiles</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        className="pl-9 pr-4"
                        placeholder="Search users by username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        <Icon name="Search" className="h-4 w-4" />
                    </div>
                </div>
                <Button
                    variant="outline"
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                    className="rounded-md w-full md:w-auto"
                >
                    {isSearching ? (
                        <>
                            <Icon name="Loader" className="mr-2 h-4 w-4 animate-spin" />
                            Searching
                        </>
                    ) : 'Search'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Icon name="Users" className="mr-2 h-5 w-5" />
                        Search Results
                    </h3>

                    {searchResults.length > 0 ? (
                        <div className="space-y-3">
                            {searchResults.map((profile) => (
                                <motion.div
                                    key={profile.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <Image
                                                src={profile.imageUrl || "/images/user.webp"}
                                                alt={profile.username}
                                                className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 md:mr-3"
                                            />
                                            <h4 className="font-bold text-sm md:text-base">@{profile.username}</h4>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToggleFollow(profile.id)}
                                            className="rounded-full text-xs md:text-sm"
                                        >
                                            {profile.isFollowing ? (
                                                <>
                                                    <Icon name="User" className="mr-1 md:mr-2 h-3 w-3" />
                                                    Following
                                                </>
                                            ) : (
                                                <>
                                                    <Icon name="UserPlus" className="mr-1 md:mr-2 h-3 w-3" />
                                                    Follow
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    {profile.bio && (
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2">{profile.bio}</p>
                                    )}
                                    <div className="flex text-xs text-muted-foreground mt-2 space-x-3">
                                        <span>{profile.followerCount} followers</span>
                                        <span>•</span>
                                        <span>{profile.postCount} posts</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mt-2 text-primary hover:text-primary p-0 h-auto text-xs md:text-sm"
                                        onClick={() => handleViewProfile(profile.id)}
                                    >
                                        View full profile
                                        <Icon name="ArrowRight" className="ml-1 h-3 w-3" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    ) : searchQuery && !isSearching ? (
                        <div className="p-4 bg-gray-50/50 text-muted-foreground rounded-md flex flex-col items-center justify-center">
                            <Icon name="SearchX" className="mb-2 h-8 md:h-10 w-8 md:w-10 text-muted-foreground/50" />
                            <p>No users found matching "{searchQuery}"</p>
                        </div>
                    ) : (
                        <div className="p-4 bg-grey-800/50 text-muted-foreground rounded-md flex flex-col items-center justify-center">
                            <Icon name="Search" className="mb-2 h-8 md:h-10 w-8 md:w-10 text-muted-foreground/50" />
                            <p>Search for users by username</p>
                        </div>
                    )}
                </div>

                <div className="border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Icon name="User" className="mr-2 h-5 w-5" />
                        Profile Details
                    </h3>

                    {isLoadingProfile ? (
                        <div className="h-60 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <Icon name="Loader" className="h-8 w-8 animate-spin text-primary mb-2" />
                                <p className="text-muted-foreground">Loading profile</p>
                            </div>
                        </div>
                    ) : selectedProfile ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Image
                                        src={selectedProfile.imageUrl || "/images/user.webp"}
                                        alt={selectedProfile.username}
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-3 md:mr-4"
                                    />
                                    <div>
                                        <h3 className="text-base md:text-xl font-bold">@{selectedProfile.username}</h3>
                                        <div className="flex items-center mt-1 text-muted-foreground text-xs md:text-sm">
                                            <Icon name="Calendar" className="h-3 w-3 mr-1" />
                                            <span>Joined July 2023</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant={selectedProfile.isFollowing ? "outline" : "outline"}
                                    onClick={() => handleToggleFollow(selectedProfile.id)}
                                    className="rounded-full text-xs md:text-sm min-w-20"
                                >
                                    {selectedProfile.isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            </div>

                            {selectedProfile.bio && (
                                <p className="text-xs md:text-sm text-muted-foreground">{selectedProfile.bio}</p>
                            )}

                            <div className="flex pt-2 border-t border-gray-200 space-x-6 text-xs md:text-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold">{selectedProfile.postCount}</span>
                                    <span className="text-muted-foreground">Posts</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold">{selectedProfile.followerCount}</span>
                                    <span className="text-muted-foreground">Followers</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold">{selectedProfile.followingCount}</span>
                                    <span className="text-muted-foreground">Following</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <h4 className="font-medium mb-2 text-sm md:text-base">Recent Posts</h4>
                                <div className="bg-gray-50/50 p-3 rounded-md text-center text-muted-foreground text-xs md:text-sm">
                                    <p>No posts to show</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-60 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <Icon name="UserSearch" className="h-12 md:h-16 w-12 md:w-16 text-muted-foreground/30 mb-3" />
                                <p className="text-muted-foreground text-center text-sm md:text-base">Select a user to view their profile</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 