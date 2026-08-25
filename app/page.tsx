import { Badge } from "@/components/ui/badge";
import { Button, ExternalIcon, PlayCircleIcon } from "@/components/ui/button";
import {
  CourseCard,
  LessonCard,
  LessonVideoCard,
  ResourceCard,
} from "@/components/ui/card";
import { SearchInput, Select } from "@/components/ui/input";
import { Breadcrumbs, Logo, Pagination } from "@/components/ui/navigation";
import { Progress } from "@/components/ui/progress";
import { Status } from "@/components/ui/status";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#" className="text-primary-500">
              Courses
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-900">
              My Learning
            </a>
          </nav>
        </div>
        <div className="h-8 w-8 rounded-full bg-neutral-100" />
      </header>

      <main className="mx-auto max-w-[1200px] p-6 space-y-6">
        {/* Title */}
        <div className="rounded-xl bg-white border border-neutral-200 p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-7 w-7 items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 4L12 20L21 4H15.5L12 11L8.5 4H3Z" fill="#F97316" />
                  </svg>
                </span>
                <span className="text-sm font-bold">Vertex</span>
              </div>
              <h1 className="text-display-1">Design System</h1>
              <p className="mt-2 max-w-lg text-body text-neutral-500">
                A unified design language for Vertex learning platform. Clean,
                modern and focused on clarity, consistency and intuitive
                learning experiences.
              </p>
              <p className="mt-4 text-small font-semibold tracking-widest text-neutral-400 uppercase">
                Version 1.0 · May 2025
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colors */}
          <div className="lg:col-span-2 rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              <span className="text-primary-500 mr-2">01</span> Colors
            </p>
            <p className="text-xs font-semibold text-neutral-900 mb-2">Primary</p>
            <div className="flex gap-3 mb-4">
              {[
                ["Primary 500", "#F97316", "bg-primary-500"],
                ["Primary 400", "#FB923C", "bg-primary-400"],
                ["Primary 300", "#FDBA74", "bg-primary-300"],
                ["Primary 200", "#FED7AA", "bg-primary-200"],
                ["Primary 100", "#FFEEE5", "bg-primary-100"],
              ].map(([name, hex, cls]) => (
                <div key={name} className="flex-1">
                  <div className={`h-12 rounded-md ${cls} border border-black/5`} />
                  <p className="mt-1 text-[11px] font-medium text-neutral-700">{name}</p>
                  <p className="text-[11px] text-neutral-400">{hex}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-neutral-900 mb-2">Neutral</p>
            <div className="flex gap-2">
              {[
                ["Neutral 900", "#0F172A", "bg-neutral-900"],
                ["Neutral 700", "#334155", "bg-neutral-700"],
                ["Neutral 500", "#64748B", "bg-neutral-500"],
                ["Neutral 300", "#CBD5E1", "bg-neutral-300"],
                ["Neutral 200", "#E2E8F0", "bg-neutral-200"],
                ["Neutral 100", "#F1F5F9", "bg-neutral-100"],
                ["Neutral 50", "#FAFAFC", "bg-neutral-50 border border-neutral-200"],
                ["White", "#FFFFFF", "bg-white border border-neutral-200"],
              ].map(([name, hex, cls]) => (
                <div key={name} className="flex-1 min-w-0">
                  <div className={`h-10 rounded-md ${cls}`} />
                  <p className="mt-1 text-[10px] font-medium text-neutral-700 truncate">{name}</p>
                  <p className="text-[10px] text-neutral-400 truncate">{hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Principles quick */}
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              <span className="text-primary-500 mr-2">14</span> Principles
            </p>
            <ul className="space-y-3 text-xs text-neutral-600">
              <li><span className="font-semibold text-neutral-900">Clarity First</span> — Every element should communicate clearly.</li>
              <li><span className="font-semibold text-neutral-900">Consistency</span> — Use components and patterns consistently.</li>
              <li><span className="font-semibold text-neutral-900">Focus & Calm</span> — Remove noise and help learners focus.</li>
              <li><span className="font-semibold text-neutral-900">Accessible</span> — Design with accessibility in mind.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-6">
              <span className="text-primary-500 mr-2">02</span> Typography
            </p>
            <div className="space-y-6">
              <div className="flex gap-6">
                <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Ag</span>
                <div>
                  <p className="text-sm font-semibold">Playfair Display</p>
                  <p className="text-xs text-neutral-400">Elegant · Readable · Timeless</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-inter)" }}>Ag</span>
                <div>
                  <p className="text-sm font-semibold">Inter</p>
                  <p className="text-xs text-neutral-400">Clean · Modern · Highly legible</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              <span className="text-primary-500 mr-2">03</span> Type Scale
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-neutral-400 border-b border-neutral-100">
                  <tr><th className="text-left py-2 font-medium">Style</th><th className="text-left font-medium">Font</th><th className="text-left font-medium">Size / Line Height</th><th className="text-left font-medium">Weight</th><th className="text-left font-medium">Use</th></tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-50"><td className="py-2 font-medium">Display 1</td><td>Playfair Display</td><td>48 / 56</td><td>Bold</td><td>Page titles</td></tr>
                  <tr className="border-b border-neutral-50"><td className="py-2 font-medium">Display 2</td><td>Playfair Display</td><td>36 / 44</td><td>Bold</td><td>Section titles</td></tr>
                  <tr className="border-b border-neutral-50"><td className="py-2 font-medium">Heading 1</td><td>Inter</td><td>28 / 36</td><td>Semi Bold</td><td>Card titles</td></tr>
                  <tr className="border-b border-neutral-50"><td className="py-2 font-medium">Heading 2</td><td>Inter</td><td>22 / 30</td><td>Semi Bold</td><td>Sub section</td></tr>
                  <tr className="border-b border-neutral-50"><td className="py-2 font-medium">Heading 3</td><td>Inter</td><td>18 / 26</td><td>Medium</td><td>Small titles</td></tr>
                  <tr className="border-b border-neutral-50"><td className="py-2">Body Large</td><td>Inter</td><td>16 / 24</td><td>Regular</td><td>Body copy</td></tr>
                  <tr className="border-b border-neutral-50"><td className="py-2">Body</td><td>Inter</td><td>14 / 20</td><td>Regular</td><td>Supporting text</td></tr>
                  <tr><td className="py-2">Small</td><td>Inter</td><td>12 / 16</td><td>Regular</td><td>Captions, meta</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              <span className="text-primary-500 mr-2">04</span> Spacing System
            </p>
            <p className="text-xs text-neutral-500 mb-4">Base unit: 4px</p>
            <div className="flex items-end gap-3">
              {[4, 8, 12, 16, 24, 32, 40, 48, 64].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div className="bg-primary-100 rounded-sm" style={{ width: s, height: s }} />
                  <span className="text-[10px] font-medium text-neutral-700">{s}</span>
                  <span className="text-[10px] text-neutral-400">({s / 16}rem)</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              <span className="text-primary-500 mr-2">05</span> Radius & Shadows
            </p>
            <p className="text-xs font-semibold text-neutral-900 mb-2">Radius</p>
            <div className="flex gap-3 mb-4">
              {[
                ["4px", "xs", "rounded-xs"],
                ["8px", "sm", "rounded-sm"],
                ["12px", "md", "rounded-md"],
                ["16px", "lg", "rounded-lg"],
                ["24px", "xl", "rounded-xl"],
                ["Full", "circle", "rounded-full"],
              ].map(([val, label, cls]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`h-10 w-10 border border-neutral-200 bg-white ${cls}`} />
                  <span className="text-[10px] text-neutral-600">{val}</span>
                  <span className="text-[10px] text-neutral-400">({label})</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-neutral-900 mb-2">Shadows</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                ["Sm", "0 1px 2px 0", "rgba(15,23,42,0.05)", "shadow-sm"],
                ["Md", "0 4px 12px -2px", "rgba(15,23,42,0.08)", "shadow-md"],
                ["Lg", "0 12px 24px -4px", "rgba(15,23,42,0.10)", "shadow-lg"],
                ["Xl", "0 20px 40px -8px", "rgba(15,23,42,0.12)", "shadow-xl"],
              ].map(([label, a, b, cls]) => (
                <div key={label} className={`rounded-md border border-neutral-100 bg-white p-3 ${cls}`}>
                  <p className="text-xs font-semibold">{label}</p>
                  <p className="text-[10px] text-neutral-400 leading-tight">{a} {b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons + Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              <span className="text-primary-500 mr-2">07</span> Buttons
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-neutral-400">
                  <tr><th></th><th className="text-left font-medium">Primary</th><th className="text-left font-medium">Secondary</th><th className="text-left font-medium">Tertiary</th><th className="text-left font-medium">Text</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 text-neutral-400">Default</td>
                    <td className="py-2"><Button variant="primary" size="sm">Get Started</Button></td>
                    <td className="py-2"><Button variant="secondary" size="sm">Explore Courses</Button></td>
                    <td className="py-2"><Button variant="tertiary" size="sm">View Lesson <ExternalIcon /></Button></td>
                    <td className="py-2"><Button variant="text" size="sm">Watch Video <PlayCircleIcon /></Button></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-400">Hover</td>
                    <td className="py-2"><Button variant="primary" size="sm" className="bg-[#EA580C]">Get Started</Button></td>
                    <td className="py-2"><Button variant="secondary" size="sm" className="bg-neutral-50">Explore Courses</Button></td>
                    <td className="py-2"><Button variant="tertiary" size="sm">View Lesson <ExternalIcon /></Button></td>
                    <td className="py-2"><Button variant="text" size="sm">Watch Video <PlayCircleIcon /></Button></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-400">Disabled</td>
                    <td className="py-2"><Button variant="primary" size="sm" disabled>Get Started</Button></td>
                    <td className="py-2"><Button variant="secondary" size="sm" disabled>Explore Courses</Button></td>
                    <td className="py-2"><Button variant="tertiary" size="sm" disabled>View Lesson <ExternalIcon /></Button></td>
                    <td className="py-2"><Button variant="text" size="sm" disabled>Watch Video <PlayCircleIcon /></Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[11px] text-neutral-400">Height: 44px (default) · Padding: 16px (lg), 12px (md) · Radius: 12px · Font: Inter Medium (14–16px)</p>
          </div>
          <div className="rounded-xl bg-white border border-neutral-200 p-6 space-y-4">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400">
              <span className="text-primary-500 mr-2">08</span> Inputs
            </p>
            <div>
              <p className="text-xs font-semibold mb-2">Search / Text Input</p>
              <SearchInput placeholder="Search anything..." />
            </div>
            <div>
              <p className="text-xs font-semibold mb-2">Select</p>
              <Select defaultValue="relevant">
                <option value="relevant">Most Relevant</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </Select>
            </div>
            <p className="text-[11px] text-neutral-400">Height: 44px · Radius: 12px · Border: 1px solid #E2E8F0 · Focus: #FB923C</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              <span className="text-primary-500 mr-2">09</span> Badges / Tags
            </p>
            <div className="flex gap-6 text-xs">
              <div><p className="text-neutral-400 mb-1">Video</p><Badge variant="video">VIDEO</Badge></div>
              <div><p className="text-neutral-400 mb-1">Lesson</p><Badge variant="lesson">LESSON</Badge></div>
              <div><p className="text-neutral-400 mb-1">Popular</p><Badge variant="popular">POPULAR</Badge></div>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              <span className="text-primary-500 mr-2">10</span> Status / Indicators
            </p>
            <div className="flex flex-wrap gap-4">
              <Status variant="inProgress" />
              <Status variant="completed" />
              <Status variant="nowPlaying" />
              <Status variant="locked" />
            </div>
          </div>
          <div className="rounded-xl bg-white border border-neutral-200 p-6">
            <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-3">
              <span className="text-primary-500 mr-2">11</span> Progress Bar
            </p>
            <Progress value={35} />
          </div>
        </div>

        <div className="rounded-xl bg-white border border-neutral-200 p-6">
          <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
            <span className="text-primary-500 mr-2">12</span> Cards
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><p className="text-xs text-neutral-400 mb-2">Course Card</p><CourseCard /></div>
            <div><p className="text-xs text-neutral-400 mb-2">Lesson Card (Video)</p><LessonVideoCard /></div>
            <div><p className="text-xs text-neutral-400 mb-2">Lesson Card (Lesson)</p><LessonCard /></div>
            <div><p className="text-xs text-neutral-400 mb-2">Resource Card</p><ResourceCard /></div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-neutral-200 p-6">
          <p className="text-small font-semibold tracking-widest uppercase text-neutral-400 mb-4">
            <span className="text-primary-500 mr-2">13</span> Navigation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-6">
              <Logo />
              <span className="text-primary-500 font-medium">Courses</span>
              <span className="text-neutral-500">My Learning</span>
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">Breadcrumbs</p>
              <Breadcrumbs />
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">Pagination</p>
              <Pagination />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
