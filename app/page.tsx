import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/navigation";

// Home page — matches design/vertex-home.png

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBF7] text-neutral-900">
      {/* outer striped side borders */}
      <div className="relative mx-auto min-h-screen max-w-[1440px] bg-[#FFFBF7]">
        {/* left stripe */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[28px] xl:block"
          style={{
            background:
              "repeating-linear-gradient(135deg, #FFEDE3 0 1px, transparent 1px 10px)",
          }}
        />
        {/* right stripe */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[28px] xl:block"
          style={{
            background:
              "repeating-linear-gradient(135deg, #FFEDE3 0 1px, transparent 1px 10px)",
          }}
        />

        <div className="relative mx-auto max-w-[1120px] bg-[#FFFBF7] shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
          {/* Header */}
          <header className="flex h-[56px] items-center justify-between border-b border-[#F2E8E0] bg-white/90 px-6 backdrop-blur-sm md:px-8">
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2">
                <Logo />
              </a>
              <nav className="hidden items-center gap-6 text-[14px] font-medium md:flex">
                <a href="#" className="text-neutral-900">
                  Courses
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  My Learning
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-50"
              >
                <BellIcon />
              </button>
              <img
                src="https://i.pravatar.cc/100?img=5"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
              />
            </div>
          </header>

          {/* Hero */}
          <section className="bg-[#FFFBF7] px-6 pb-10 pt-10 md:px-8 md:pb-12 md:pt-14">
            <div className="mx-auto max-w-[640px] text-center">
              <div className="mb-6 flex justify-center">
                <span className="rounded-md border border-[#FFE4D6] bg-[#FFF1E8] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#E8682A]">
                  INTELLIGENT LEARNING
                </span>
              </div>
              <h1
                className="text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-neutral-900 md:text-[52px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Search your learning
                <br />
                in plain English.
              </h1>
              <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-6 text-[#64748B]">
                Vertex understands what you want to learn and finds the exact
                lessons across all your courses.
              </p>
              <div className="mt-7 flex justify-center">
                <Button className="h-11 rounded-lg bg-[#E86A2C] px-6 text-[14px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(232,106,44,0.2)] hover:bg-[#D65F24]">
                  Explore Courses
                  <span className="ml-1.5" aria-hidden>
                    <ArrowRightIcon />
                  </span>
                </Button>
              </div>
            </div>

            {/* Search bar */}
            <div className="mx-auto mt-10 max-w-[640px]">
              <div className="flex h-[56px] items-center gap-3 rounded-xl border border-[#F2E8E0] bg-white px-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                <span className="text-neutral-400">
                  <SearchIcon />
                </span>
                <input
                  placeholder="Ask anything about your learning..."
                  className="h-full flex-1 bg-transparent text-[15px] placeholder:text-[#94A3B8] focus:outline-none"
                />
                <span className="hidden items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-500 shadow-sm md:inline-flex">
                  <span className="text-[11px]">⌘</span> K
                </span>
              </div>
            </div>
          </section>

          {/* Courses section */}
          <section className="border-t border-[#F2E8E0] bg-[#FFFBF7] px-6 pb-8 pt-8 md:px-8 md:pt-10">
            <div className="mb-6 flex items-center justify-between">
              <h2
                className="text-[20px] font-bold tracking-tight text-neutral-900"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                All Courses
              </h2>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#E86A2C] hover:text-[#D65F24]"
              >
                View all courses
                <span aria-hidden>
                  <ArrowRightIcon small />
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <CourseCardHome
                icon={<NextIcon />}
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modules="12 modules"
              />
              <CourseCardHome
                icon={<DockerIcon />}
                title="Docker Essentials"
                description="Containerize applications and streamline your development workflow."
                level="Beginner"
                duration="10h 12m"
                modules="8 modules"
              />
              <CourseCardHome
                icon={<TSIcon />}
                title="TypeScript Deep Dive"
                description="Go beyond the basics and write safer, more expressive code."
                level="Intermediate"
                duration="14h 36m"
                modules="10 modules"
              />
            </div>

            {/* divider */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#F2E8E0]" />
              <span className="text-[#E86A2C]">
                <StarIcon />
              </span>
              <p className="whitespace-nowrap text-[13px] text-[#64748B]">
                New courses and lessons added every week.
              </p>
              <div className="h-px flex-1 bg-[#F2E8E0]" />
            </div>
          </section>

          {/* Bottom blurred bars decor */}
          <div className="relative h-[110px] overflow-hidden bg-[#FFFBF7]">
            {/* left cluster */}
            <div className="absolute bottom-0 left-0 flex items-end gap-[5px] px-6 opacity-90 md:px-8">
              <div className="h-[54px] w-[44px] rounded-t-[6px] bg-gradient-to-t from-[#FFD8C2] to-[#FFB091]/0 blur-[0.5px]" />
              <div className="h-[78px] w-[44px] rounded-t-[6px] bg-gradient-to-t from-[#FFC9B0] to-[#FFB091]/0 blur-[0.3px]" />
              <div className="h-[96px] w-[44px] rounded-t-[6px] bg-gradient-to-t from-[#FFD8C2]/80 to-[#FFE9DC]/0" style={{ background: "linear-gradient(180deg, #FFE9DC 0%, #FFB08A 100%)", opacity: 0.85 }} />
              <div className="h-[86px] w-[44px] rounded-t-[6px] bg-gradient-to-t from-[#FFB08A]/70 to-transparent" style={{ background: "linear-gradient(180deg, #FFC9B0 0%, #FFA07A 100%)", opacity: 0.7 }} />
              <div className="hidden h-[66px] w-[44px] rounded-t-[6px] bg-gradient-to-t from-[#FFD1BA] to-transparent sm:block" />
            </div>
            {/* right cluster */}
            <div className="absolute bottom-0 right-0 flex items-end gap-[5px] px-6 opacity-90 md:px-8">
              <div className="h-[64px] w-[28px] rounded-t-[6px] bg-gradient-to-t from-[#FFD1BA] to-transparent sm:w-[36px]" />
              <div className="h-[82px] w-[32px] rounded-t-[6px] sm:w-[44px]" style={{ background: "linear-gradient(180deg, #FFCDB3 0%, #FFA07A 60%, #FFD8C2 100%)", opacity: 0.8 }} />
              <div className="h-[98px] w-[36px] rounded-t-[6px] sm:w-[44px]" style={{ background: "linear-gradient(180deg, #FFF0E6 0%, #FFB08A 100%)", opacity: 0.9 }} />
              <div className="h-[84px] w-[32px] rounded-t-[6px] sm:w-[44px]" style={{ background: "linear-gradient(180deg, #FFC9B0 0%, #FF8A5A 100%)", opacity: 0.65 }} />
              <div className="h-[52px] w-[28px] rounded-t-[6px] bg-gradient-to-t from-[#FFD8C2] to-[#FFB091]/0 sm:w-[36px]" />
              <div className="hidden h-[70px] w-[36px] rounded-t-[6px] bg-gradient-to-t from-[#FFC9B0] to-transparent sm:block" />
            </div>
            {/* soft bottom overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50px] bg-gradient-to-t from-[#FFFBF7] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCardHome({
  icon,
  title,
  description,
  level,
  duration,
  modules,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-[#F2E8E0] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3
        className="text-[16px] font-bold leading-5 text-neutral-900"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-5 text-[#64748B]">{description}</p>
      <div className="mt-auto pt-6">
        <div className="h-px bg-[#F8F2EE]" />
        <div className="flex items-center gap-3 pt-3 text-[11px] text-[#64748B]">
          <span className="inline-flex items-center gap-1">
            <LevelIcon /> {level}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon /> {duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <DocIcon /> {modules}
          </span>
        </div>
      </div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 3.2C10 3.2 6.2 3.2 6.2 8V11.2L4.2 13.2V14.2H15.8V13.2L13.8 11.2V8C13.8 3.2 10 3.2 10 3.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.2 16C8.7 16.9 9.3 17.3 10 17.3C10.7 17.3 11.3 16.9 11.8 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="15" cy="5" r="1.1" fill="#E86A2C" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ArrowRightIcon({ small }: { small?: boolean }) {
  return (
    <svg width={small ? 14 : 16} height={small ? 14 : 16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function NextIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#111111] text-white">
      <span className="text-[22px] font-bold tracking-tighter leading-none">N</span>
    </div>
  );
}
function DockerIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white">
      {/* stylized whale/ship like in reference */}
      <svg width="38" height="28" viewBox="0 0 40 26" fill="none" aria-hidden>
        <path d="M5 14.5C5 14.5 8.5 21 18 21C27.5 21 32 14.5 32 14.5L30 10H7L5 14.5Z" fill="#1D63ED" />
        <path d="M7 14.2C10 18.5 14.5 19.5 18 19.5C21.5 19.5 26 18.5 30 14.5" stroke="white" strokeWidth="0.7" opacity="0.4" />
        <rect x="9" y="6" width="5" height="6" rx="0.6" fill="#3B82F6" stroke="white" strokeWidth="0.6" />
        <rect x="15" y="7" width="5" height="5" rx="0.6" fill="#3B82F6" stroke="white" strokeWidth="0.6" />
        <rect x="21" y="6.5" width="5" height="5.5" rx="0.6" fill="#3B82F6" stroke="white" strokeWidth="0.6" />
        <rect x="15" y="2" width="4" height="4" rx="0.5" fill="#60A5FA" stroke="white" strokeWidth="0.6" />
        <rect x="21" y="3" width="4" height="3" rx="0.5" fill="#60A5FA" stroke="white" strokeWidth="0.6" />
        {/* whale tail */}
        <path d="M32 12L37 9.5L35.5 12L37 14.5L32 12Z" fill="#1D63ED" />
        <rect x="10" y="8" width="1.4" height="1.4" fill="white" />
        <rect x="16" y="8.5" width="1.4" height="1.4" fill="white" />
        <rect x="22" y="8" width="1.4" height="1.4" fill="white" />
        <rect x="16" y="3" width="1" height="1" fill="white" />
      </svg>
    </div>
  );
}
function TSIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#3178C6] text-white">
      <span className="text-[20px] font-bold tracking-tight">TS</span>
    </div>
  );
}
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1.3L9.4 5.1H13.5L10.1 7.5L11 11.4L8 9.1L5 11.4L5.9 7.5L2.5 5.1H6.6L8 1.3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function LevelIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="10" width="2.6" height="4" rx="0.4" fill="currentColor" />
      <rect x="6.7" y="7" width="2.6" height="7" rx="0.4" fill="currentColor" />
      <rect x="11.2" y="4" width="2.6" height="10" rx="0.4" fill="currentColor" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5.5V8L10 9.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5 2.5H10L12.5 5V13.5H5V2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 2.5V5H12.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
