import Icon from "@/shared/components/Icon";

// Post list item type
type PostListItemProps = {
    id: string;
    username: string;
    handle: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
    reposts: number;
    shares: number;
    avatarUrl: string;
}

export function PostListItem({
    id,
    username,
    handle,
    timestamp,
    content,
    likes,
    comments,
    reposts,
    shares,
    avatarUrl,
}: PostListItemProps) {
    return (
        
    )
}