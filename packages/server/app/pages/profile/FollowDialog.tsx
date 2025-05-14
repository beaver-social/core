import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { useBeaver } from "@beaver/react";

export default function FollowDialog({ data, count, title }: { data: any, count: number, title: string }) {
    const beaver = useBeaver();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="hover:underline">
                    <span className="font-semibold text-grey-400">{count} {title}</span> <span className="text-grey-500">
                    </span>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {data?.map((follower: any) => (
                        <div key={follower.id} className="flex items-center gap-2">
                            <div>{follower.id}</div>
                            <div>{follower.username}</div>
                            <div>{follower.fullName}</div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}