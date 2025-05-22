import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { Image } from "@/shared/components/Image";

interface User {
    id: string;
    username: string;
    bio?: string;
    isFollowing: boolean;
    imageUrl?: string;
}

export default function FollowDemo() {
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
    const [isLoading, setIsLoading] = useState(false);

    const [followers, setFollowers] = useState<User[]>([
        { id: 'user-1', username: 'crypto_lover', bio: 'Blockchain enthusiast', isFollowing: true, imageUrl: '/images/user.webp' },
        { id: 'user-2', username: 'dev_enthusiast', bio: 'Web3 developer', isFollowing: false, imageUrl: '/images/user.webp' },
        { id: 'user-3', username: 'sui_fan', bio: 'Loving the Sui ecosystem', isFollowing: false, imageUrl: '/images/user.webp' },
        { id: 'user-4', username: 'nft_collector', bio: 'Collecting unique digital assets', isFollowing: true, imageUrl: '/images/user.webp' },
    ]);

    const [following, setFollowing] = useState<User[]>([
        { id: 'user-5', username: 'move_coder', bio: 'Building with Move language', isFollowing: false, imageUrl: '/images/user.webp' },
        { id: 'user-6', username: 'blockchain_news', bio: 'Latest web3 updates', isFollowing: false, imageUrl: '/images/user.webp' },
        { id: 'user-1', username: 'crypto_lover', bio: 'Blockchain enthusiast', isFollowing: true, imageUrl: '/images/user.webp' },
        { id: 'user-4', username: 'nft_collector', bio: 'Collecting unique digital assets', isFollowing: true, imageUrl: '/images/user.webp' },
    ]);

    // These would be replaced with actual SDK hooks
    const handleToggleFollow = (userId: string, currentList: 'followers' | 'following') => {
        // In real implementation:
        // const { followUser, unfollowUser } = useFollow();
        // user.isFollowing ? unfollowUser.mutate({ userId }) : followUser.mutate({ userId });

        const updateList = (list: User[]) => {
            return list.map(user => {
                if (user.id === userId) {
                    return { ...user, isFollowing: !user.isFollowing };
                }
                return user;
            });
        };

        if (currentList === 'followers') {
            setFollowers(updateList(followers));
            // Also update in the following list if the user exists there
            setFollowing(following.map(user => {
                if (user.id === userId) {
                    return { ...user, isFollowing: followers.find(f => f.id === userId)?.isFollowing ? false : true };
                }
                return user;
            }));
        } else {
            setFollowing(updateList(following));
            // Also update in the followers list if the user exists there
            setFollowers(followers.map(user => {
                if (user.id === userId) {
                    return { ...user, isFollowing: following.find(f => f.id === userId)?.isFollowing ? false : true };
                }
                return user;
            }));
        }
    };

    const handleLoadMore = () => {
        setIsLoading(true);

        // In real implementation:
        // const { getFollowers, getFollowing } = useFollow();
        // const { data, fetchNextPage } = getFollowers({ userId: currentUserId });
        // or
        // const { data, fetchNextPage } = getFollowing({ userId: currentUserId });

        setTimeout(() => {
            // Simulate loading more users
            setIsLoading(false);
        }, 1000);
    };

    const renderUserList = (users: User[], listType: 'followers' | 'following') => {
        return (
            <div className="space-y-3 mt-4">
                {users.map((user) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                    >
                        <div className="flex items-center">
                            <Image
                                src={user.imageUrl || "/images/user.webp"}
                                alt={user.username}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 md:mr-3"
                            />
                            <div>
                                <h4 className="font-bold text-xs md:text-sm">@{user.username}</h4>
                                {user.bio && <p className="text-xs md:text-sm text-muted-foreground">{user.bio}</p>}
                            </div>
                        </div>
                        <Button
                            variant={user.isFollowing ? "outline" : "interactive"}
                            size="sm"
                            onClick={() => handleToggleFollow(user.id, listType)}
                            className="rounded-full text-xs md:text-sm"
                        >
                            {user.isFollowing ? (
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
                    </motion.div>
                ))}

                <div className="text-center pt-4">
                    <Button
                        variant="outline"
                        className="rounded-full text-xs md:text-sm"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Icon name="Loader" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                                Loading...
                            </>
                        ) : 'Load More'}
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-medium">Follow Management</h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Manage your followers and following</p>
            </div>

            <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as 'followers' | 'following')}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="followers" className="flex items-center justify-center text-xs md:text-sm">
                        <Icon name="Users" className="mr-1 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                        Followers ({followers.length})
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex items-center justify-center text-xs md:text-sm">
                        <Icon name="UserPlus" className="mr-1 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                        Following ({following.length})
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {activeTab === 'followers' ? (
                <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4 flex items-center">
                        <Icon name="Info" className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                        People who follow you
                    </p>
                    {renderUserList(followers, 'followers')}
                </div>
            ) : (
                <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4 flex items-center">
                        <Icon name="Info" className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                        People you follow
                    </p>
                    {renderUserList(following, 'following')}
                </div>
            )}
        </div>
    );
} 