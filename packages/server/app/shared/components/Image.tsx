import { cn } from "@/shared/lib/utils";

type Props = {
  src?: string | null;
  alt?: string | null;
  className?: string;
  [key: string]: any;
};

export function Image({ src, alt, className, ...props }: Props) {
  return (
    <img
      src={src ?? "/images/default/user.webp"}
      alt={alt || "default image"}
      className={cn(className)}
      {...props}
      onError={(e) => {
        e.currentTarget.src = "/images/user.webp";
      }}
    />
  );
}
