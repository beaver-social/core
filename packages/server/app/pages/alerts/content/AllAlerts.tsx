import React from 'react'
import NotificationBody from "../NotificationBody"

type Props = {}

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

export default function AllAlerts({ }: Props) {
    return (
        <div className="divide-y">
            {sampleMentionedNotifications.map((post, index) => (
                <NotificationBody key={index} {...post} />
            ))}
        </div>
    )
}