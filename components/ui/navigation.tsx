import * as React from "react";
import { cn } from "@/lib/utils";

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between border-b border-neutral-100 bg-white px-6",
        className
      )}
    >
      <div className="flex items-center gap-8">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary-500 text-white">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 3L8 13L14 3H10L8 7L6 3H2Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-sm font-bold tracking-tight text-neutral-900">
            Vertex
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#" className="text-primary-500">
            Courses
          </a>
          <a href="#" className="text-neutral-500 hover:text-neutral-900">
            My Learning
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2 text-neutral-400">
        <span className="text-sm">◯</span>
      </div>
    </header>
  );
}

export function Breadcrumbs({
  items = ["All Courses", "Next.js for Production", "Data Fetching & Caching"],
}: {
  items?: string[];
}) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <span className="text-neutral-300">›</span>}
          <a
            href="#"
            className={cn(
              i === items.length - 1 ? "text-neutral-900 font-medium" : "hover:text-neutral-700"
            )}
          >
            {item}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}

export function Pagination({
  current = 1,
  total = 8,
}: {
  current?: number;
  total?: number;
}) {
  const pages: (number | string)[] = [];
  for (let i = 1; i <= Math.min(total, 3); i++) pages.push(i);
  if (total > 4) pages.push("…");
  if (total > 3) pages.push(total);

  return (
    <nav className="flex items-center gap-1 text-xs">
      <a href="#" className="p-1.5 text-neutral-400 hover:text-neutral-700">
        ‹
      </a>
      {pages.map((p, idx) =>
        typeof p === "string" ? (
          <span key={`e-${idx}`} className="px-1 text-neutral-400">
            {p}
          </span>
        ) : (
          <a
            key={p}
            href="#"
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded border text-xs font-medium",
              p === current
                ? "border-primary-500 bg-primary-50 text-primary-600"
                : "border-transparent text-neutral-500 hover:bg-neutral-100"
            )}
          >
            {p}
          </a>
        )
      )}
      <a href="#" className="p-1.5 text-neutral-400 hover:text-neutral-700">
        ›
      </a>
    </nav>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-7 w-7 items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 4L12 20L21 4H15.5L12 11L8.5 4H3Z" fill="#F97316" />
          <path d="M7 4L12 13L17 4H7Z" fill="#FB923C" opacity="0.9" />
        </svg>
      </span>
      <span className="text-[15px] font-bold tracking-tight text-neutral-900">Vertex</span>
    </span>
  );
}
