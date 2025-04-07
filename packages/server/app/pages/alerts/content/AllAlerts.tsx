import NotificationBody from "../NotificationBody"

type Props = {}

const sampleAllNotifications = [
    {
        id: "1",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.webp",
        type: "reply"
    },
    {
        id: "2",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.webp",
        type: "like"
    },
    {
        id: "4",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.webp",
        type: "repost"
    },
    {
        id: "5",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.webp",
        type: "message"
    },
    {
        id: "5",
        username: "John Doe",
        timestamp: "2h",
        content: "Just launched my new project! 🚀 Check it out and let me know what you think.",
        avatarUrl: "/images/user.webp",
        type: "other"
    },
];

export default function AllAlerts({ }: Props) {
    return (
        <div className="divide-y">
            {sampleAllNotifications.map((post, index) => (
                <NotificationBody key={index} {...post} />
            ))}
        </div>
    )
}