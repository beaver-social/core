import { Link } from "react-router";
import Icon from "@/shared/components/Icon";
import { CalendarDays } from "lucide-react";
import { Image } from "@/shared/components/Image";

type ActivityItem = {
    id: string;
    type: 'like' | 'repost' | 'follow' | 'comment' | 'mention' | 'nft';
    timestamp: string;
    content?: string;
    sourceUser?: {
        name: string;
        handle: string;
        avatar: string;
    };
    targetUser?: {
        name: string;
        handle: string;
        avatar: string;
    };
    targetPost?: {
        id: string;
        content: string;
        imageUrl?: string;
        author: {
            name: string;
            handle: string;
        };
    };
    nftData?: {
        collectionName: string;
        tokenId: string;
        imageUrl: string;
        price?: string;
    };
}

// Sample activity data for demonstration
const activities: ActivityItem[] = [
    {
        id: "1",
        type: "like" as const,
        timestamp: "2h ago",
        sourceUser: {
            name: "Kartik",
            handle: "ishtails",
            avatar: "/images/user.webp"
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
            avatar: "/images/user.webp"
        },
        targetPost: {
            id: "456",
            content: "Just launched my new NFT collection, check it out!",
            author: {
                name: "Sarah Miller",
                handle: "sarahm"
            }
        }
    },
    {
        id: "3",
        type: "comment" as const,
        timestamp: "2d ago",
        sourceUser: {
            name: "Kartik",
            handle: "ishtails",
            avatar: "/images/user.webp"
        },
        content: "Great analysis! I think DAOs are going to transform organizational structures in the next decade.",
        targetPost: {
            id: "789",
            content: "My thoughts on the future of DAOs and decentralized governance structures...",
            author: {
                name: "Crypto Researcher",
                handle: "cryptoresearcher"
            }
        }
    },
    {
        id: "4",
        type: "follow" as const,
        timestamp: "3d ago",
        sourceUser: {
            name: "Kartik",
            handle: "ishtails",
            avatar: "/images/user.webp"
        },
        targetUser: {
            name: "Web3 Foundation",
            handle: "web3foundation",
            avatar: "/images/web3foundation.png"
        }
    },
    {
        id: "5",
        type: "mention" as const,
        timestamp: "4d ago",
        sourceUser: {
            name: "DeFi Protocol",
            handle: "defiprotocol",
            avatar: "/images/defiprotocol.png"
        },
        targetPost: {
            id: "101112",
            content: "Thanks to @ishtails for the insightful feedback on our new protocol design!",
            author: {
                name: "DeFi Protocol",
                handle: "defiprotocol"
            }
        }
    },
    {
        id: "6",
        type: "nft" as const,
        timestamp: "5d ago",
        sourceUser: {
            name: "Kartik",
            handle: "ishtails",
            avatar: "/images/user.webp"
        },
        nftData: {
            collectionName: "Crypto Beavers",
            tokenId: "#1234",
            imageUrl: "/images/nft-beaver.png",
            price: "0.5 ETH"
        }
    },
];

export default function Activity() {
    const isLoading = false;

    if (isLoading) {
        return (
            <div className="p-6 text-center">
                <p className="text-grey-500">Loading activity...</p>
            </div>
        );
    }

    if (!activities || activities.length === 0) {
        return (
            <div className="p-10 text-center">
                <div className="inline-flex items-center justify-center mb-4 size-16 rounded-full bg-secondary">
                    <CalendarDays className="size-8 text-grey-500" />
                </div>
                <h3 className="text-xl font-bold">No activity yet</h3>
                <p className="text-grey-500 mt-2">When this user likes or comments on posts, you'll see their activity here.</p>
            </div>
        );
    }

    return (
        <div className="divide-y">
            {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
            ))}
        </div>
    );
}

function ActivityListItem({ activity }: { activity: ActivityItem }) {
    const getActivityIcon = (type: ActivityItem['type']) => {
        switch (type) {
            case 'like':
                return <Icon name="Heart" className="text-red-500" />;
            case 'repost':
                return <Icon name="Repeat" className="text-green-500" />;
            case 'follow':
                return <Icon name="UserPlus" className="text-primary" />;
            case 'comment':
                return <Icon name="MessageCircle" className="text-primary" />;
            case 'mention':
                return <Icon name="AtSign" className="text-blue-500" />;
            case 'nft':
                return <Icon name="Image" className="text-purple-500" />;
            default:
                return null;
        }
    };

    const getActivityDescription = (activity: ActivityItem) => {
        switch (activity.type) {
            case 'like':
                return (
                    <span>
                        <Link to={`/profile/${activity.sourceUser?.handle}`} className="font-bold hover:underline">{activity.sourceUser?.name}</Link>
                        {' liked '}
                        <Link to={`/profile/${activity.targetPost?.author.handle}`} className="hover:underline">{activity.targetPost?.author.name}'s</Link>
                        {' post'}
                    </span>
                );
            case 'repost':
                return (
                    <span>
                        <Link to={`/profile/${activity.sourceUser?.handle}`} className="font-bold hover:underline">{activity.sourceUser?.name}</Link>
                        {' reposted '}
                        <Link to={`/profile/${activity.targetPost?.author.handle}`} className="hover:underline">{activity.targetPost?.author.name}'s</Link>
                        {' post'}
                    </span>
                );
            case 'follow':
                return (
                    <span>
                        <Link to={`/profile/${activity.sourceUser?.handle}`} className="font-bold hover:underline">{activity.sourceUser?.name}</Link>
                        {' followed '}
                        <Link to={`/profile/${activity.targetUser?.handle}`} className="hover:underline">{activity.targetUser?.name}</Link>
                    </span>
                );
            case 'comment':
                return (
                    <span>
                        <Link to={`/profile/${activity.sourceUser?.handle}`} className="font-bold hover:underline">{activity.sourceUser?.name}</Link>
                        {' replied to '}
                        <Link to={`/profile/${activity.targetPost?.author.handle}`} className="hover:underline">{activity.targetPost?.author.name}'s</Link>
                        {' post'}
                    </span>
                );
            case 'mention':
                return (
                    <span>
                        <Link to={`/profile/${activity.sourceUser?.handle}`} className="font-bold hover:underline">{activity.sourceUser?.name}</Link>
                        {' mentioned you in a '}
                        <Link to={`/post/${activity.targetPost?.id}`} className="hover:underline">post</Link>
                    </span>
                );
            case 'nft':
                return (
                    <span>
                        <Link to={`/profile/${activity.sourceUser?.handle}`} className="font-bold hover:underline">{activity.sourceUser?.name}</Link>
                        {' minted NFT '}
                        <Link to={`/nft/${activity.nftData?.collectionName}/${activity.nftData?.tokenId}`} className="hover:underline">{activity.nftData?.collectionName} {activity.nftData?.tokenId}</Link>
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 hover:bg-accent/10 transition">
            <div className="flex gap-3">
                <div className="mt-1">
                    {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>{getActivityDescription(activity)}</div>
                        <div className="text-grey-500 text-sm">{activity.timestamp}</div>
                    </div>
                    {activity.content && (
                        <p className="mt-2 text-grey-700">{activity.content}</p>
                    )}
                    {activity.targetPost && (
                        <div className="mt-2 p-3 border rounded-md hover:bg-accent/5 cursor-pointer">
                            <p className="text-sm text-grey-600 line-clamp-2">{activity.targetPost.content}</p>
                            {activity.targetPost.imageUrl && (
                                <Image
                                    src={activity.targetPost.imageUrl}
                                    alt="Post image"
                                    className="mt-2 rounded-md w-full max-h-40 object-cover"
                                />
                            )}
                        </div>
                    )}
                    {activity.nftData && (
                        <div className="mt-2 p-3 border rounded-md hover:bg-accent/5 cursor-pointer flex flex-col sm:flex-row gap-3">
                            <Image
                                src={activity.nftData.imageUrl}
                                alt="NFT"
                                className="w-24 h-24 rounded-md object-cover"
                            />
                            <div>
                                <h3 className="font-medium">{activity.nftData.collectionName} {activity.nftData.tokenId}</h3>
                                {activity.nftData.price && (
                                    <p className="text-sm text-grey-600">Price: {activity.nftData.price}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 
