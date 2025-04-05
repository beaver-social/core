import Icon from "@/shared/components/Icon";
import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/ImageCarousel";
import { useZkAuthStore } from "@/shared/stores/zustand";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { genAddressSeed, getZkLoginSignature } from "@mysten/sui/zklogin";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Network } from "@/shared/context/web3context";
import zkLoginService from "@/shared/lib/zkLoginService";
import { useSignPersonalMessage } from "@mysten/dapp-kit";

type FeedPostProps = {
    id: string;
    username: string;
    handle: string;
    timestamp: string;
    content: string;
    images?: string[];
    aspectRatio: 'square' | 'portrait';
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
    avatarUrl: string;
};

function FeedPost({
    id,
    username,
    handle,
    timestamp,
    content,
    images,
    aspectRatio,
    likes,
    comments,
    reposts,
    shares,
    avatarUrl,
}: FeedPostProps) {
    const navigate = useNavigate();
    const zkAuthStore = useZkAuthStore();

    async function handleLike(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Liking post queued');

        try {
            if (!zkAuthStore.zkLoginData) {
                throw new Error("No zkLogin data found");
            }

            const tx = new Transaction();

            const result = await zkLoginService.executeTransactionWithZkLogin(
                zkAuthStore.zkLoginData,
                tx,
            );

            if (result.success) {
                console.log({ result });
                toast.success("Transaction executed successfully");
            } else {
                console.log({ result });
                throw new Error(result.error);
            }
        } catch (error: any) {
            console.log({ error });
            toast.error(`Error liking post: ${error.message}`);
        }
    }

    async function handleComment(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Commenting on post queued');

        try {
            if (!zkAuthStore.zkLoginData) {
                throw new Error("No zkLogin data found");
            }

            const message = 'Commenting on post';

            const result = await zkLoginService.zkSignPersonalMessage(
                zkAuthStore.zkLoginData,
                message,
            );

            console.log({ result });
        } catch (error: any) {
            console.log({ error });
            toast.error(`Error commenting on post: ${error.message}`);
        }
    }

    return (
        <div onClick={
            (e) => {
                e.preventDefault();
                navigate(`/post/${id}`, { state: { postId: id } });
            }
        } className="block cursor-pointer">
            <article className="flex gap-4 p-4 border-b hover:bg-secondary/50 transition-colors">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Link to={`/profile/${handle}`} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={avatarUrl}
                            alt={username}
                            className="w-12 h-12 rounded-full"
                        />
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                        <Link to={`/profile/${handle}`} className="font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                            {username}
                        </Link>
                        <span className="text-grey-500">@{handle}</span>
                        <span className="text-grey-500">·</span>
                        <time className="text-grey-500 hover:underline">{timestamp}</time>
                    </div>

                    {/* Post Content */}
                    <div className="mt-2 text-sm">
                        {content}
                    </div>

                    {/* Images if present */}
                    {images && images.length > 0 && (
                        <div className="mt-3 cursor-default" onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}>
                            <ImageCarousel images={images} aspectRatio={aspectRatio} />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-6 mt-4">
                        <button className="flex items-center gap-2 text-hover group" onClick={handleLike}>
                            <Icon name="Heart" className="w-5 h-5 group-hover:text-red-500" />
                            <span className="text-sm">{likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={handleComment}>
                            <Icon name="MessageCircle" className="w-5 h-5 group-hover:text-primary" />
                            <span className="text-sm">{comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
                            <Icon name="Repeat" className="w-5 h-5 group-hover:text-green-500" />
                            <span className="text-sm">{reposts}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
                            <Icon name="Share2" className="w-5 h-5 group-hover:text-primary" />
                            <span className="text-sm">{shares}</span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default FeedPost; 