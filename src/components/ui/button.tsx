import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded text-sm font-semibold transition-color duration-200 disabled:pointer-events-none disabled:opacity-60  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/85",
        ghost: "hover:bg-secondary-hover",
        secondary:
          "bg-secondary hover:bg-secondary-hover text-secondary-foreground border dark:border-white/5 border-black/5",
        danger:
          "bg-danger text-danger-foreground hover:bg-danger/80 focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40",
      },
      size: {
        default: "px-4 py-1.5 has-[>svg]:px-3",
        sm: "px-3 py-1.25 gap-1.5  has-[>svg]:px-2.5",
        lg: "px-6 py-2.5 has-[>svg]:px-4 text-base",
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
  children,
  disabled,
  loading,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
