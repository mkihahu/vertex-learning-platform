import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm",
        "placeholder:text-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function SearchInput({
  className,
  ...props
}: InputProps & { kbd?: string }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <svg
        className="absolute left-3 h-4 w-4 text-neutral-400"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M11 11L13.5 13.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <input
        className="flex h-11 w-full rounded-md border border-neutral-200 bg-white pl-9 pr-12 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
        {...props}
      />
      <span className="pointer-events-none absolute right-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-medium text-neutral-500">
        ⌘ K
      </span>
    </div>
  );
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-9 py-2 text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
