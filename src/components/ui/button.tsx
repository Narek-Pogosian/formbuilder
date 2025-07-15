import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80",
        secondary:
          "bg-secondary hover:bg-secondary-hover text-secondary-foreground border",
        ghost: "hover:bg-secondary-hover",
        fieldAction:
          "bg-primary/10 dark:bg-primary/30 text-primary-text backdrop-blur-sm hover:bg-primary/20 dark:hover:bg-primary/40",
        danger:
          "bg-danger text-danger-foreground hover:bg-danger/80 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "px-3 py-1.25 gap-1.5  has-[>svg]:px-2.5",
        lg: "px-6 py-2.5 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
