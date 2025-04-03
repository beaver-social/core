import Icon from "@/shared/components/Icon";
import { Link, useNavigate } from "react-router";
import ImageCarousel from "@/shared/components/ImageCarousel";
import { useZkAuthStore } from "@/shared/stores/zustand";
import { toast } from "sonner";
import { Transaction } from "@mysten/sui/transactions";
import { genAddressSeed, getZkLoginSignature } from "@mysten/sui/zklogin";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Network } from "@/shared/context/web3context";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { EphemeralKeyPair } from "@/shared/lib/zkLoginService";

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
    const client = new SuiClient({ url: getFullnodeUrl(import.meta.env.VITE_SUI_NETWORK as Network), network: import.meta.env.VITE_SUI_NETWORK as Network });

    async function handleTransaction(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        try {
            const zkLoginData = zkAuthStore.zkLoginData;
            if (!zkLoginData) {
                throw new Error("No zkLogin data found");
            }

            let storedData = JSON.parse(zkLoginData.ephemeralKeyPair);
            const keypair = Ed25519Keypair.fromSecretKey(storedData.privateKeyBytes);
            storedData = {
                ...storedData,
                keypair,
            }

            const userAddress = zkLoginData.userAddress;
            const signer = keypair;

            const coins = await client.getCoins({
                owner: userAddress,
            })

            console.log({ userAddress, coins });

            const txb = new Transaction();
            txb.setSender(userAddress);

            console.log({ txb: txb.getData() });

            console.log({ client, signer });


            const bytes = await txb.build({ client }); // NOT WORKING
            console.log({ bytes });

            const userSignature = (await signer.signTransaction(bytes)).signature;
            console.log({ userSignature });

            const verified = await signer.getPublicKey().verifyTransaction(bytes, userSignature);
            console.log({ verified });

            if (!verified) {
                throw new Error("Signature verification failed");
            }

            const addressSeed = genAddressSeed(
                BigInt(zkLoginData.userSalt),
                'sub',
                zkLoginData.decodedJwt.sub as string,
                zkLoginData.decodedJwt.aud as string,
            ).toString();

            console.log({ addressSeed });

            console.log({ partialZkLoginSignature: zkLoginData.partialZkLoginSignature });

            const zkLoginSignature = getZkLoginSignature({
                inputs: {
                    ...zkLoginData.partialZkLoginSignature,
                    addressSeed,
                },
                maxEpoch: storedData.maxEpoch,
                userSignature,
            });

            console.log({ zkLoginSignature });

            const result = await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature: zkLoginSignature,
            })

            console.log({ result });
        } catch (error: any) {
            console.log({ error });
            toast.error(`Error liking post: ${error.message}`);
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
                        <button className="flex items-center gap-2 text-hover group" onClick={handleTransaction}>
                            <Icon name="Heart" className="w-5 h-5 group-hover:text-red-500" />
                            <span className="text-sm">{likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-hover group" onClick={(e) => e.stopPropagation()}>
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