import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";

// Sample media posts (subset of posts that contain images/videos)
const mediaItems = [
    {
        id: "1",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "1w",
        content: "Beautiful sunset from my balcony today. Web3 work can wait sometimes. 🌆",
        likes: 89,
        comments: 7,
        reposts: 4,
        imageUrl: "/images/sunset.jpg",
        type: "image"
    },
    {
        id: "2",
        username: "Kartik",
        handle: "ishtails",
        timestamp: "2w",
        content: "Just finished the UI redesign for our dApp. What do you think?",
        likes: 124,
        comments: 23,
        reposts: 18,
        imageUrl: "/images/ui-design.png",
        type: "image"
    }
];

export default function Media() {
    return (
        <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {mediaItems.map(item => (
                    <div key={item.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-md border">
                        <Image
                            src={item.imageUrl}
                            alt={item.content}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                            <p className="text-white text-sm line-clamp-2">{item.content}</p>
                            <div className="flex justify-between mt-2 text-white">
                                <div className="flex items-center gap-1">
                                    <Icon name="MessageCircle" weight="light" className="size-4" />
                                    <span className="text-xs">{item.comments}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon name="Repeat" weight="light" className="size-4" />
                                    <span className="text-xs">{item.reposts}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon name="Heart" weight="light" className="size-4" />
                                    <span className="text-xs">{item.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
