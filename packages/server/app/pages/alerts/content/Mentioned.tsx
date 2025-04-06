import NotificationBody from "../NotificationBody";

const sampleMentionedNotifications = [
    {
        id: "1",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "mention"
    },
    {
        id: "2",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "mention"
    },
    {
        id: "3",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "mention"
    },
    {
        id: "4",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.png",
        type: "mention"
    },
];

export default function Mentioned() {
    return (
        <div className="divide-y">
            {sampleMentionedNotifications.map((post, index) => (
                <NotificationBody key={index} {...post} />
            ))}
        </div>
    )
}