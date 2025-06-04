import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/lib/utils";

export default function Spinner({ className }: { className?: string }) {
    return (
        <Icon name="LoaderCircle" className={cn("size-10 animate-spin text-grey-500", className)} />
    );
}