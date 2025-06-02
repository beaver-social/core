import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import { toast } from "sonner";
import { useEffect } from "react";

export function FeedPostMenu({
  post,
  author,
}: {
  post: ReturnType<ReturnType<typeof useBeaver>["post"]["getPostById"]>["data"];
  author?: ReturnType<typeof useBeaver>["user"];
}) {
  const beaver = useBeaver();
  const { mutate: deletePost, error: deleteError, isSuccess: deleteSuccess } = beaver.post.deletePost;
  const { mutate: upgradePost, error: upgradeError, isSuccess: upgradeSuccess } = beaver.post.upgradePost;
  const { mutate: followUser, error: followError, isSuccess: followSuccess } = beaver.social.followUser;

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message);
    }

    if (deleteSuccess) {
      toast.success("Post deleted successfully");
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (followError) {
      toast.error(followError.message);
    }

    if (followSuccess) {
      toast.success("Followed user successfully");
    }
  }, [followError, followSuccess]);

  useEffect(() => {
    if (upgradeError) {
      toast.error(upgradeError.message);
    }

    if (upgradeSuccess) {
      toast.success("Post upgraded successfully");
    }
  }, [upgradeError, upgradeSuccess]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 transition-colors rounded-full">
          <Icon
            name="Ellipsis"
            className="transition-colors size-5 text-muted-foreground hover:text-grey-100"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background text-muted-foreground">
        {post?.authorId !== beaver.user?.id && (
          <DropdownMenuGroup>
            <DropdownMenuItem>Not interested</DropdownMenuItem>
            <DropdownMenuItem onClick={() => followUser({ id: author?.id })}>Follow @{author?.username}</DropdownMenuItem>
            <DropdownMenuItem>Mute @{author?.username}</DropdownMenuItem>
            <DropdownMenuItem>Block @{author?.username}</DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {(post?.authorId === beaver.user?.id) && (
          <DropdownMenuGroup>
            {!post?.suiAddress && (<DropdownMenuItem onClick={() => upgradePost({ id: post?.id })}>
              <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Upgrade Post</span><Icon name="ArrowBigUpDash" className="text-purple-400" />
            </DropdownMenuItem>)}
            <DropdownMenuItem>View Analytics</DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>X</DropdownMenuItem>
                <DropdownMenuItem>Telegram</DropdownMenuItem>
                <DropdownMenuItem>Instagram</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {(post?.authorId === beaver.user?.id) && (
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-red-500" onClick={() => deletePost({ id: post?.id })}>
              <span>Delete Post</span>
              <Icon name="Trash" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {post?.authorId !== beaver.user?.id && (
          <DropdownMenuGroup className="text-red-500">
            <DropdownMenuItem>Report Post</DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
