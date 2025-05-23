import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useBeaver } from "@beaver/react";

export default function FollowDialog({
  data,
  count,
  title,
}: {
  data: any;
  count: number;
  title: string;
}) {
  const beaver = useBeaver();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:underline underline-offset-2 text-sm">
          <span className="font-semibold text-grey-300">
            {count} <span className="text-grey-500">{title}</span>
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
  );
}
