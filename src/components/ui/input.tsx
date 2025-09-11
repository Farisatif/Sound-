import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-2 text-sm text-white",
          "placeholder:text-white/40 shadow-md transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-[#ee0faf]/70 focus:border-[#ee0faf]",
          "hover:border-[#ee0faf]/60 hover:shadow-pink-900/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
