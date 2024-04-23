import * as React from "react";

import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "pt-2 pr-1.5 rounded-lg border border-sky-400 border-opacity-35 hover:shadow-2xl shadow-sky-400 hover:border-opacity-85 transition-all duration-200",
      className
    )}
    {...props}
  >
    <div className="flex">
      <h1 className="text-slate-300 font-bold flex justify-center pr-1 ml-2 h-8">
        {children}
      </h1>
    </div>
  </button>
));
Button.displayName = "Button";

export { Button };
