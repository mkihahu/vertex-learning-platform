import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white p-4 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

// Course Card – per spec 12
export function CourseCard({
  title = "Next.js for Production",
  description = "Build scalable, high-performance web applications with Next.js.",
  level = "Intermediate",
  duration = "18h 24m",
  modules = "12 modules",
  icon = "N",
}: {
  title?: string;
  description?: string;
  level?: string;
  duration?: string;
  modules?: string;
  icon?: string;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-sm font-bold text-white">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-neutral-900 leading-5">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-4 text-neutral-500">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2 text-xs text-neutral-500 border-t border-neutral-100 mt-1">
        <span className="inline-flex items-center gap-1">
          <BarChartIcon /> {level}
        </span>
        <span className="inline-flex items-center gap-1">
          <ClockIcon /> {duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <LayersIcon /> {modules}
        </span>
      </div>
    </Card>
  );
}

export function LessonVideoCard({
  title = "Data Fetching in Server Components",
  description = "Learn how to fetch data on the server using async/await and Next.js best practices.",
  lessonLabel = "Lesson 5.1",
  duration = "12:45",
  startSeconds = "12:45",
}: {
  title?: string;
  description?: string;
  lessonLabel?: string;
  duration?: string;
  startSeconds?: string;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <Badge variant="video">VIDEO</Badge>
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-xs leading-4 text-neutral-500">{description}</p>
      <div className="flex items-center justify-between pt-2 text-xs">
        <span className="text-neutral-500">
          {lessonLabel} &nbsp;·&nbsp; {duration}
        </span>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-medium text-primary-500 hover:text-[#EA580C]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M6.8 5.6L11 8L6.8 10.4V5.6Z" fill="currentColor" />
          </svg>
          Watch from {startSeconds}
        </a>
      </div>
    </Card>
  );
}

export function LessonCard({
  title = "Data Fetching & Caching",
  description = "Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance.",
  moduleLabel = "Module 5",
}: {
  title?: string;
  description?: string;
  moduleLabel?: string;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <Badge variant="lesson">LESSON</Badge>
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-xs leading-4 text-neutral-500">{description}</p>
      <div className="flex items-center justify-between pt-2 text-xs">
        <span className="text-neutral-500">{moduleLabel}</span>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-medium text-primary-500 hover:text-[#EA580C]"
        >
          View lesson
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 3H3V13H13V10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M9 3H13V7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M13 3L7 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </Card>
  );
}

export function ResourceCard({
  title = "Caching and Revalidation Guide",
  description = "Deep dive into Next.js caching strategies.",
  meta = "PDF · 1.2 MB",
}: {
  title?: string;
  description?: string;
  meta?: string;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-2">
          <FileIcon />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 text-xs">
        <span className="text-neutral-500">{meta}</span>
        <a href="#" className="text-primary-500 hover:text-[#EA580C]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 3H3V13H13V10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M9 3H13V7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M13 3L7 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </Card>
  );
}

function BarChartIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="9" width="3" height="5" rx="0.5" fill="currentColor" />
      <rect x="6.5" y="6" width="3" height="8" rx="0.5" fill="currentColor" />
      <rect x="11" y="3" width="3" height="11" rx="0.5" fill="currentColor" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 6L8 3L14 6L8 9L2 6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M2 10L8 13L14 10" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M9 2H4V14H12V6L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9 2V6H12" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 9H10M6 11H10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
