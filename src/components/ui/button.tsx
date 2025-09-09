import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          // خلفية متدرجة + نص أبيض + ظل ناعم
          "bg-gradient-to-r from-[#ee0faf] to-[#0e9eef] text-white shadow-lg hover:opacity-90 hover:scale-[1.02]",
        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-700 hover:scale-105",
        outline:
          "border border-[#2c2c2c] bg-[#0f0f0f] text-white shadow-sm hover:border-[#ee0faf] hover:text-[#ee0faf]",
        secondary:
          "bg-[#1a1a1a] text-white shadow-sm hover:bg-[#2c2c2c] hover:scale-105",
        ghost:
          "text-white hover:bg-[#111111] hover:text-[#ee0faf] transition",
        link: "text-[#ee0faf] underline-offset-4 hover:underline hover:text-[#0e9eef]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
