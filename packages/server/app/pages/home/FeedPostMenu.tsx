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
  const { mutate: deletePost, error, isSuccess } = beaver.post.deletePost;

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (isSuccess) {
      toast.success("Post deleted successfully");
    }
  }, [error, isSuccess]);

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
        <DropdownMenuGroup>
          {post?.authorId === beaver.user?.id && (
            <DropdownMenuItem>
              <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Upgrade Post</span><Icon name="ArrowBigUpDash" className="text-purple-400" />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Not interested</DropdownMenuItem>
          <DropdownMenuItem>Follow @{author?.username}</DropdownMenuItem>
          <DropdownMenuItem>Mute @{author?.username}</DropdownMenuItem>
          <DropdownMenuItem>Block @{author?.username}</DropdownMenuItem>
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

        <DropdownMenuGroup>
          <DropdownMenuItem>View Post Analytics</DropdownMenuItem>
          <DropdownMenuItem>Report Post</DropdownMenuItem>
          {post?.authorId === beaver.user?.id && (
            <DropdownMenuItem className="text-red-500" onClick={() => deletePost({ id: post?.id })}>
              <span>Delete Post</span>
              <Icon name="Trash" />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
