import { useState } from "react";
import Tabs, { Tab } from "@/shared/components/Tabs";
import NotificationBody from "./NotificationBody";

// Sample data - replace with actual data from your backend
const sampleAllNotifications = [
    {
        id: "1",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "reply"
    },
    {
        id: "2",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "like"
    },
    {
        id: "4",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "repost"
    },
    {
        id: "5",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "message"
    },
    {
        id: "5",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "other"
    },
];

// Sample following posts
const sampleMentionedNotifications = [
    {
        id: "3",
        username: "John Doe",
        timestamp: "2h",
        content: "Thanks to @ishtails for supporting me.",
        avatarUrl: "/images/user.png",
        type: "mention"
    },
];

export default function NotificationFeed() {
    const [activeTab, setActiveTab] = useState("All");
    const tabs: Tab[] = [
        {
            id: "All",
            label: "All",
            content: (
                <>
                    <div className="divide-y">
                        {sampleAllNotifications.map((post, index) => (
                            <NotificationBody key={index} {...post} />
                        ))}
                    </div>
                </>
            )
        },
        {
            id: "Mentioned",
            label: "Mentioned",
            content: (
                <>
                    <div className="divide-y">
                        {sampleMentionedNotifications.map((post, index) => (
                            <NotificationBody key={index} {...post} />
                        ))}
                    </div>
                </>
            )
        }
    ];

    return (
        <div className="flex-1 border mx-auto">
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
}