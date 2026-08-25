import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "default" | "sm" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-[#EA580C] active:bg-[#C2410C] disabled:bg-primary-100 disabled:text-primary-300 border border-transparent",
  secondary:
    "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-300 disabled:border-neutral-200",
  tertiary:
    "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 disabled:text-neutral-300 disabled:border-neutral-100",
  text: "bg-transparent text-primary-500 hover:text-[#EA580C] border border-transparent disabled:text-primary-200",
};

const sizeClasses: Record<Size, string> = {
  default: "h-11 px-6 text-[14px] leading-5",
  sm: "h-9 px-4 text-[14px]",
  lg: "h-12 px-8 text-[16px]",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-100",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Helper icon for external link / play next to button text
export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M6 3H3V13H13V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 3H13V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 3L7 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M6.8 5.6L11 8L6.8 10.4V5.6Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
