import * as React from "react";
import { cn } from "@/lib/utils";

type StatusVariant = "inProgress" | "completed" | "nowPlaying" | "locked";

export function Status({
  variant,
  className,
}: {
  variant: StatusVariant;
  className?: string;
}) {
  const map: Record<
    StatusVariant,
    { label: string; icon: React.ReactNode; color: string }
  > = {
    inProgress: {
      label: "In Progress",
      color: "text-primary-500",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M7 3.5V7L9.5 8.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    completed: {
      label: "Completed",
      color: "text-emerald-600",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M4.5 7L6.2 8.7L9.5 5.2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    nowPlaying: {
      label: "Now Playing",
      color: "text-primary-500",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5.5" fill="currentColor" />
          <path d="M5.6 4.6L9.2 7L5.6 9.4V4.6Z" fill="white" />
        </svg>
      ),
    },
    locked: {
      label: "Locked",
      color: "text-neutral-400",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect
            x="3"
            y="6"
            width="8"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M5 6V4.5C5 3.1 6.1 2 7.5 2H6.5C5.1 2 4 3.1 4 4.5V6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="7" cy="9" r="1" fill="currentColor" />
        </svg>
      ),
    },
  };

  const entry = map[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        entry.color,
        className
      )}
    >
      {entry.icon}
      {entry.label}
    </span>
  );
}
