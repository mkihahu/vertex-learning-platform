import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "video" | "lesson" | "popular" | "neutral";

const variantMap: Record<BadgeVariant, string> = {
  video: "bg-primary-100 text-[#EA580C] border-primary-200",
  lesson: "bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]",
  popular: "bg-primary-100 text-primary-500 border-primary-200",
  neutral: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold tracking-widest uppercase border",
        variantMap[variant],
        className
      )}
      {...props}
    />
  );
}
