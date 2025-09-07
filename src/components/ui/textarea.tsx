import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex w-full rounded-md border border-white/10 bg-[#111] px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee0faf] focus:ring-offset-2 focus:ring-offset-black ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
