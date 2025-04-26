import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";
import Reactions from "@/shared/components/Reactions";

// Sample replies data
const repliesData = [
    {
        id: "1",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "6h",
        content: "Great thread! I think decentralized governance is one of the most important aspects we need to focus on.",
        likes: 32,
        comments: 3,
        reposts: 5,
        shares: 1,
        avatarUrl: "/images/user.webp",
        replyingTo: {
            username: "Web3Expert",
            handle: "web3expert",
            content: "Here's my thread on the future of Web3 and what we need to focus on in 2024..."
        }
    },
    {
        id: "2",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "1d",
        content: "Have you tried using Solidity 0.8.x? It has some great safety features built in.",
        likes: 18,
        comments: 2,
        reposts: 1,
        shares: 0,
        avatarUrl: "/images/user.webp",
        replyingTo: {
            username: "BlockchainDev",
            handle: "blockchaindev",
            content: "Looking for recommendations on best practices for smart contract development. Any tips?"
        }
    },
    {
        id: "3",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "3d",
        content: "We're actually working on something similar at Beaver Social. Would love to connect and see if there's potential for collaboration.",
        likes: 27,
        comments: 4,
        reposts: 2,
        shares: 1,
        avatarUrl: "/images/user.webp",
        replyingTo: {
            username: "DeFiBuilder",
            handle: "defibuilder",
            content: "Our team is building a new social token system integrated with user reputation. Looking for feedback!"
        }
    },
    {
        id: "4",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "1w",
        content: "The UI looks fantastic! One suggestion would be to add more contrast to the action buttons for better accessibility.",
        likes: 14,
        comments: 1,
        reposts: 0,
        shares: 0,
        avatarUrl: "/images/user.webp",
        replyingTo: {
            username: "DesignDAO",
            handle: "designdao",
            content: "Just launched our new dApp interface! What do you all think? [image]"
        }
    }
];

export default function Replies() {
    return (
        <div className="space-y-1">
            {repliesData.map((reply) => (
                <div key={reply.id} className="p-4 border-b hover:bg-accent/10 transition cursor-pointer">
                    <div className="flex gap-3">
                        <Image src={reply.avatarUrl} alt={reply.username} className="size-10 rounded-full" />
                        <div className="flex-1">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">{reply.username}</span>
                                <span className="text-grey-500">@{reply.handle}</span>
                                <span className="text-grey-500">·</span>
                                <span className="text-grey-500">{reply.timestamp}</span>
                            </div>

                            <div className="mt-1 text-sm text-grey-500">
                                Replying to <span className="text-primary">@{reply.replyingTo.handle}</span>
                            </div>

                            <div className="mt-2 p-3 border rounded-md bg-accent/5">
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="font-medium">{reply.replyingTo.username}</span>
                                    <span className="text-grey-500 text-sm">@{reply.replyingTo.handle}</span>
                                </div>
                                <p className="text-sm line-clamp-2">{reply.replyingTo.content}</p>
                            </div>

                            <p className="mt-2">{reply.content}</p>

                            <Reactions postId={reply.id} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}