import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { Progress } from "@/shared/components/ui/progress";

interface Post {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
    };
    createdAt: string;
    likeCount: number;
    liked: boolean;
}

export default function PostsDemo() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 'post-1',
            content: 'Just made my first transaction on Sui! #blockchain #web3',
            author: { id: 'user-1', username: 'crypto_lover' },
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            likeCount: 5,
            liked: false
        },
        {
            id: 'post-2',
            content: 'The Beaver SDK makes building social apps on Sui so easy! 🦫',
            author: { id: 'user-2', username: 'dev_enthusiast' },
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            likeCount: 12,
            liked: true
        }
    ]);

    const [newPostContent, setNewPostContent] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // These would be replaced with actual SDK hooks
    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;

        setIsCreating(true);
        setUploadProgress(0);

        // In real implementation:
        // const { createPost } = usePost();
        // createPost.mutate({ content: newPostContent });

        // Simulate post creation with progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 10;
            });
        }, 200);

        setTimeout(() => {
            const newPost: Post = {
                id: `post-${Date.now()}`,
                content: newPostContent,
                author: { id: 'current-user', username: 'demo_user' },
                createdAt: new Date().toISOString(),
                likeCount: 0,
                liked: false
            };

            clearInterval(interval);
            setUploadProgress(100);

            setTimeout(() => {
                setPosts([newPost, ...posts]);
                setNewPostContent('');
                setIsCreating(false);
                setUploadProgress(0);
            }, 500);
        }, 2000);
    };

    const handleLikeToggle = (postId: string) => {
        // In real implementation:
        // const { likePost, unlikePost } = usePost();
        // post.liked ? unlikePost.mutate({ postId }) : likePost.mutate({ postId });

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    liked: !post.liked,
                    likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1
                };
            }
            return post;
        }));
    };

    const handleFetchPosts = () => {
        setIsLoading(true);

        // In real implementation:
        // const { getPosts } = usePost();
        // const { data, fetchNextPage, hasNextPage } = getPosts({ perPage: 10 });

        setTimeout(() => {
            // This would fetch more posts in a real app
            setIsLoading(false);
        }, 1000);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
            Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
            'day'
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-medium">Posts</h2>
                <p className="text-muted-foreground mt-1">Create and interact with posts</p>
            </div>

            <div className="space-y-4 border border-gray-200 rounded-lg p-3 md:p-4">
                <h3 className="text-lg font-medium">Create a New Post</h3>
                <div className="relative">
                    <Textarea
                        placeholder="What's happening?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="w-full resize-none min-h-[80px] md:min-h-[100px]"
                        disabled={isCreating}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {newPostContent.length} / 280
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="rounded-full hover:bg-secondary transition-colors"
                        >
                            <Icon name="Image" className="size-4 md:size-5" />
                        </Button>

                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="rounded-full hover:bg-secondary transition-colors"
                        >
                            <Icon name="Smile" className="size-4 md:size-5" />
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleCreatePost}
                        disabled={isCreating || !newPostContent.trim()}
                        className="rounded-full px-3 md:px-6 font-medium text-sm md:text-base"
                    >
                        {isCreating ? 'Posting...' : 'Post'}
                    </Button>
                </div>

                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <Progress value={uploadProgress} className="h-1" />
                        <p className="text-center text-sm text-muted-foreground mt-2">
                            {uploadProgress < 100 ? "Uploading..." : "Processing..."}
                        </p>
                    </motion.div>
                )}
            </div>

            <div className="space-y-4">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2 md:mr-3">
                                    <Icon name="User" className="size-4 md:size-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm md:text-base">@{post.author.username}</h3>
                                    <span className="text-muted-foreground text-xs">{formatDate(post.createdAt)}</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                            >
                                <Icon name="Ellipsis" className="size-4" />
                            </Button>
                        </div>

                        <p className="mb-3 text-sm md:text-base">{post.content}</p>

                        <div className="flex items-center justify-end gap-4 md:gap-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-muted-foreground flex items-center gap-1 md:gap-2"
                            >
                                <Icon name="MessageSquare" className="size-3.5 md:size-4" />
                                <span className="text-xs">0</span>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className={`flex items-center gap-1 md:gap-2 ${post.liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-muted-foreground'}`}
                                onClick={() => handleLikeToggle(post.id)}
                            >
                                <Icon name={post.liked ? "Heart" : "HeartHandshake"} className="size-3.5 md:size-4" />
                                <span className="text-xs">{post.likeCount}</span>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-muted-foreground flex items-center gap-1 md:gap-2"
                            >
                                <Icon name="Share" className="size-3.5 md:size-4" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <Button
                    variant="outline"
                    className="rounded-full text-sm md:text-base"
                    onClick={handleFetchPosts}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Icon name="Loader" className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                            Loading...
                        </>
                    ) : 'Load More Posts'}
                </Button>
            </div>
        </div>
    );
} 