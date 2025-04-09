import { cn } from "@/shared/lib/utils";

type Props = {
    src: string;
    alt: string;
    className?: string;
    [key: string]: any;
}

export function Image({ src, alt, className, ...props }: Props) {
    return (
        <img src={src} alt={alt} className={cn(className)} {...props} onError={(e) => {
            e.currentTarget.src = "/images/placeholder.jpg";
        }} />
    )
}