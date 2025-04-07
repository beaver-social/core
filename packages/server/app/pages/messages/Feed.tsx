import FeedItem from "./FeedItem";
import Icon from "@/shared/components/Icon";

// Sample data - replace with actual data from your backend
const sampleMessages = [
    {
        id: "1",
        username: "Adam Silverman",
        handle: "AtomSilverman",
        timestamp: "1d",
        content: "Hey there! How's it going?",
        avatarUrl: "/images/user.webp",
        type: "reply"
    },
    {
        id: "2",
        username: "John Doe",
        handle: "johndoe",
        timestamp: "1d",
        content: "Hey there! How's it going?",
        avatarUrl: "/images/user.webp",
        type: "reply"
    },
    {
        id: "3",
        username: "John Doe",
        handle: "johndoe",
        timestamp: "1d",
        content: "Hey there! How's it going?",
        avatarUrl: "/images/user.webp",
        type: "reply"
    },
    {
        id: "4",
        username: "John Doe",
        handle: "johndoe",
        timestamp: "1d",
        content: "Hey there! How's it going?",
        avatarUrl: "/images/user.webp",
        type: "reply"
    },
];

export default function MessagesFeed() {
    return (
        <div className="flex-1 border mx-auto">
            {/* search bar */}
            <div className="relative p-4 border-b">
                <Icon name="Search" className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search Messages"
                    className="w-full pl-12 pr-4 py-2 rounded-full bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="divide-y">
                {sampleMessages.map((post, index) => (
                    <FeedItem key={index} {...post} />
                ))}
            </div>
        </div>
    );
}