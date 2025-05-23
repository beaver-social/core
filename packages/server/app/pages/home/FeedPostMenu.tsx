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

export function FeedPostMenu({
  post,
  author,
}: {
  post: ReturnType<ReturnType<typeof useBeaver>["post"]["getPostById"]>["data"];
  author?: ReturnType<typeof useBeaver>["user"];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full transition-colors">
          <Icon
            name="Ellipsis"
            className="size-5 text-muted-foreground hover:text-grey-100 transition-colors"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background text-muted-foreground">
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
