import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/shared/components/ui/tooltip";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { Image } from "@/shared/components/Image";

export default function ReplyForm() {
    return (
        <div className="p-4 border-b">
            <div className="flex gap-4">
                <Image src="/images/user.webp" alt="User avatar" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <textarea
                        placeholder="Post your reply"
                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-4 text-primary">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                            <Icon name="Image" className="size-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add image
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                            <Icon name="Smile" className="size-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Add emoji
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Button className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary/90">
                            Reply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}