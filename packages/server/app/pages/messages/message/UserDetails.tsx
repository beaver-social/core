import { Image } from "@/shared/components/Image";

type Props = {};

export default function UserDetails({}: Props) {
  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src="/images/user.webp"
            alt="User Avatar"
            className="size-20 rounded-full"
          />
          <h2 className="text-xl font-bold">Adam Silverman</h2>
          <p className="text-sm text-muted-foreground">@AtomSilverman</p>
        </div>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Agent Consulting: http://Agen.cy Agent Observability:
          http://AgentOps.ai + @AgentOpsAI
        </p>

        <p className="text-sm text-grey-600 mt-4 text-center">
          <span className="font-semibold">Joined May 2019</span> •{" "}
          <span className="font-semibold">1.2K Followers</span>
        </p>
      </div>
    </div>
  );
}
