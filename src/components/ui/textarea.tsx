import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-input-placeholder bg-input flex w-full min-w-0 rounded border px-3 py-1.5 text-sm transition-[color,box-shadow] outline-none field-sizing-content min-h-16",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-ring focus-visible:ring-[3px]",
        "aria-invalid:ring-danger/70 aria-invalid:focus-visible:ring-2 aria-invalid:border-danger/70",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
