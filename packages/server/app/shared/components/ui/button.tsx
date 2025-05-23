import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-semibold",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "relative group border text-foreground text-center rounded-full bg-background/90 hover:bg-background/80 border-blue-500/20",
        interactive:
          "relative w-32 overflow-hidden rounded-full border bg-background p-2 text-center font-semibold hover:bg-grey-900 text-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  neon?: boolean; // New prop for neon effect
  text?: string; // Text to display in interactive button
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      neon = true,
      text = "Button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "interactive") {
        setIsClicked(true);
        // Reset after animation completes
        setTimeout(() => setIsClicked(false), 1500);
      }

      // Call the original onClick if it exists
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "transition-all",
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {variant === "neon" && (
          <>
            <span
              className={cn(
                "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",
                neon && "block",
              )}
            />
            {props.children}
            <span
              className={cn(
                "absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",
                neon && "block",
              )}
            />
          </>
        )}{" "}
        {variant === "interactive" && (
          <>
            <span
              className={cn(
                "inline-block translate-x-1 transition-all duration-300",
                isClicked && "translate-x-12 opacity-0",
              )}
            >
              {props.children}
            </span>
            <div
              className={cn(
                "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300",
                isClicked && "-translate-x-1 opacity-100",
              )}
            >
              <span>{props.children}</span>
              <ArrowRight />
            </div>
            <div
              className={cn(
                "absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300",
                isClicked &&
                  "left-[0%] top-[0%] h-full w-full scale-[1.8] bg-primary",
              )}
            ></div>
          </>
        )}
        {variant !== "neon" && variant !== "interactive" && props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
