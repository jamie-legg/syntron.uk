import * as React from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  as?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, as: Component = 'button', ...props }, ref) => {
    const Comp = Component as React.ElementType;
    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(
          "pt-2 pr-1.5 rounded-lg border border-sky-400 border-opacity-35 hover:shadow-2xl shadow-sky-400 hover:border-opacity-85 transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-opacity-35 disabled:hover:shadow-none",
          className
        )}
        {...props}
      >
        <div className="flex">
          <h1 className="text-slate-300 font-bold flex justify-center place-content-center pr-1 ml-2 h-8">
            {children}
          </h1>
        </div>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
