import { Link } from "react-router";
import Icon from "@/shared/components/Icon";
import { CalendarDays } from "lucide-react";

type ActivityItem = {
    id: string;
    type: 'like' | 'repost' | 'follow' | 'comment';
    timestamp: string;
    content?: string;
    sourceUser?: {
        name: string;
        handle: string;
        avatar: string;
    };
    targetPost?: {
        id: string;
        content: string;
        author: {
            name: string;
            handle: string;
        };
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
                        <Link to={`/profile/${activity.targetPost?.author.handle}`} className="hover:underline">{activity.targetPost?.author.name}</Link>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 
