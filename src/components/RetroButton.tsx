import React from "react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const baseStyles =
      "relative font-bold uppercase tracking-wider transition-all duration-150 ease-out transform active:scale-95 active:translate-y-1 select-none";
    
    const buttonStyles =
      "bg-gray-100/20 text-gray-800 shadow-[0_6px_0_#d4d4d8,0_8px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_0_#d4d4d8,0_12px_12px_rgba(0,0,0,0.4)] hover:bg-white/50 border-2 border-gray-300/20";
    
    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-2xl",
    };
    
    return (
      <button
        className={`${baseStyles} ${buttonStyles} ${sizes[size]} hover:-translate-y-1 active:shadow-[0_2px_0_#d4d4d8,0_4px_4px_rgba(0,0,0,0.2)] ${className || ""}`}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 drop-shadow-sm">{children}</span>
      </button>
    );
  }
);

RetroButton.displayName = "RetroButton";

export default RetroButton;
