import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* المسار الأساسي */}
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/15">
      {/* المدى الفعال */}
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[#ee0faf] to-[#0d9eef] transition-all" />
    </SliderPrimitive.Track>

    {/* النقطة (Thumb) */}
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border-2 border-white shadow-md",
        "bg-gradient-to-r from-[#ee0faf] to-[#0d9eef]",
        "transition-transform duration-200 hover:scale-110 focus:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
