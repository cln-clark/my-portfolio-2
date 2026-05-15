"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { DM_Serif_Display, DM_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { TbApi } from "react-icons/tb";
import { IconType } from "react-icons";
import { SiGithub, SiFacebook, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import {
  SiCoffeescript ,
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiFirebase,
  SiGit,
  SiVsco,
} from "react-icons/si";

interface TechStackIcons {
  category: TechCategory;
  name: string;
  icon: IconType;
}

const techStacksIcons: TechStackIcons[] = [
  { category: "Language",  name: "Java",         icon: SiCoffeescript  },
  { category: "Language",  name: "Python",        icon: SiPython },
  { category: "Language",  name: "TypeScript",    icon: SiTypescript },
  { category: "Frontend",  name: "React",         icon: SiReact },
  { category: "Frontend",  name: "Next.js",       icon: SiNextdotjs },
  { category: "Frontend",  name: "Tailwind CSS",  icon: SiTailwindcss },
  { category: "Backend",   name: "Node.js",       icon: SiNodedotjs },
  { category: "Backend",   name: "Express.js",    icon: SiExpress },
  { category: "Backend",   name: "REST API",      icon: TbApi },
  { category: "Database",  name: "MySQL",         icon: SiMysql },
  { category: "Database",  name: "Firebase",      icon: SiFirebase },
  { category: "Tools",     name: "Git / GitHub",  icon: SiGit },
  { category: "Tools",     name: "VS Code",       icon: SiVsco },
];


const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
});

type TechCategory = "Language" | "Frontend" | "Backend" | "Database" | "Tools";

const techCategories: TechCategory[] = [
  "Language",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
];

interface TechStack {
  category: TechCategory;
  name: string;
}

const techStacks: TechStack[] = [
  { category: "Language", name: "Java" },
  { category: "Language", name: "Python" },
  { category: "Language", name: "TypeScript" },
  { category: "Frontend", name: "React" },
  { category: "Frontend", name: "Next.js" },
  { category: "Frontend", name: "Tailwind CSS" },
  { category: "Backend", name: "Node.js" },
  { category: "Backend", name: "Express.js" },
  { category: "Backend", name: "REST API" },
  { category: "Database", name: "MySQL" },
  { category: "Database", name: "Firebase" },
  { category: "Tools", name: "Git / GitHub" },
  { category: "Tools", name: "VS Code" },
];

const meta = [
  { id: 1, label: "Location", value: "City of Imus, Cavite · PH" },
  { id: 2, label: "Status", value: "Open to Work" },
  { id: 3, label: "Education", value: "BS Information Technology" },
  { id: 4, label: "University", value: "Cavite State University" },
];

const navItems = [
  { navName: "About", idRef: "aboutId" },
  { navName: "Skills", idRef: "skillsId" },
  { navName: "Experience", idRef: "experienceId" },
  { navName: "Projects", idRef: "projectsId" },
  { navName: "Contact", idRef: "contactId" },
];

const project = [
  { 
    id: 1, 
    name: "Negeshoca: Next Generation Shopping Cart Powered by Arduino Technology", 
    description: "A smart checkout system for small retailers using Arduino, Kotlin, Firebase and QR-base checkout. It streamlines the shopping experience by allowing customers to scan items as they shop, view their cart in real-time, and pay seamlessly at the end — all while providing retailers with inventory management.",
    href: "/case-studies/negeshoca" 
  },
  { 
    id: 2, 
    name: "Negeshoca POS & Inventory System", 
    description: "A supplementary desktop system built for our capstone defense, handling product management and sales records for the NeGeShoCa smart shopping cart.",
    href: "/case-studies/negeshoca-posinventory" 
  },
  
];

// ─── Noise Overlay ────────────────────────────────────────────────────────────
// Fixed full-screen div with an SVG feTurbulence noise filter as background-image.
// opacity 0.04 keeps it barely perceptible — adds texture without muddying colors.
// pointer-events-none ensures it never intercepts clicks.
function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.04,
      }}
    />
  );
}

// ─── RevealItem ───────────────────────────────────────────────────────────────
// Wraps children in an IntersectionObserver. When the element scrolls into view
// it transitions from (opacity: 0, translateY: 20px) to fully visible.
// The `delay` prop staggers siblings — pass index * 80 or index * 100
// to each item in a list for a cascading reveal effect.
interface RevealItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function RevealItem({ children, delay = 0, className = "" }: RevealItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
// emerald text ties all section headers into the accent system.
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-widest text-emerald-500 whitespace-nowrap">
        {text}
      </span>
      <span className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className={`w-full min-h-screen ${dmMono.className}`}>
      <NoiseOverlay />

      {/* Nav */}
      <nav className="w-full h-14 flex items-center bg-[var(--background)]/60 backdrop-blur-md justify-between border-b border-[var(--border)] px-6 sticky top-0 z-50">
        <h1 className="text-xs md:text-sm font-bold tracking-wide">
          ClarkLouise.dev
        </h1>
        <ul className="hidden md:flex gap-6 text-xs tracking-wide">
          {navItems.map((item) => (
            <li
              key={item.idRef}
              onClick={() =>
                document
                  .getElementById(item.idRef)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              // emerald underline on hover — ties nav into the accent system
              className="text-[var(--foreground)]/50 hover:text-[var(--foreground)] border-b border-transparent hover:border-emerald-400 pb-0.5 transition-all duration-200 cursor-pointer"
            >
              {item.navName}
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-5xl mx-auto px-6">

        {/* ─── Hero ──────────────────────────────────────────────────────────── */}
        {/* Hero */}
        <section className="py-24">
          <div className="flex items-center justify-between gap-8">
            
            {/* Left — text content */}
            <div className="flex-1">
              <RevealItem delay={0}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs text-[var(--foreground)]/50 uppercase tracking-widest">
                    Trainee
                  </span>
                </div>
              </RevealItem>

              <RevealItem delay={100}>
                <h1 className={`text-5xl leading-snug tracking-wide mb-4 ${dmSerif.className}`}>
                  Hi, I&apos;m Clark. <br />
                  I build things{" "}
                  <em className="text-[var(--foreground)]/40">that matter.</em>
                </h1>
              </RevealItem>

              <RevealItem delay={200}>
                <p className="text-sm text-[var(--foreground)]/60 max-w-md leading-relaxed mb-8">
                  Junior developer who enjoys transforming ideas into reliable,
                  well-structured software solutions — with a focus on backend
                  systems and clean architecture.
                </p>
              </RevealItem>

              <RevealItem delay={300}>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      document.getElementById("projectsId")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="h-9 px-5 text-xs rounded-md shadow-lg text-[var(--background)] bg-[var(--foreground)] hover:-translate-y-0.5 hover:bg-[var(--foreground)] transition-transform"
                  >
                    View my work →
                  </Button>
                  <Button
                    variant="outline"
                    className="h-9 px-5 text-xs shadow-lg rounded-md hover:-translate-y-0.5 transition-transform"
                  >
                    Get in touch
                  </Button>
                </div>
              </RevealItem>
            </div>

            {/* Right — floating cutout photo */}
            <RevealItem delay={200} className="hidden md:block">
              <div className="relative group">
                  <img
                    src="/clark-hero.png"
                    alt="Clark Louise Navales"
                    className="h-110 w-auto object-contain 
                              drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                              group-hover:drop-shadow-[0_25px_50px_rgba(52,211,153,0.3)]
                              group-hover:-translate-y-2
                              transition-all duration-500 ease-out"
                  />
              </div>
            </RevealItem>

          </div>
        </section>

        {/* ─── About ─────────────────────────────────────────────────────────── */}
        <section id="aboutId" className="py-16">
          <RevealItem>
            <SectionLabel text="About Me" />
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
            {/* Bio paragraphs — each one staggers in independently */}
            <div className="space-y-4 text-sm text-[var(--foreground)]/70 leading-relaxed">
              {[
                `I'm an aspiring software developer with a particular interest in backend development — creating APIs, handling data, and designing clean, maintainable systems.`,
                `Most of my experience comes from academic projects where I built web applications, Android applications, and IoT-based systems. I was team leader and sole programmer on my capstone project, NeGeShoCa — a smart shopping cart powered by Arduino and Firebase.`,
                `In my free time, I experiment with side projects and learn new tools at my own pace.`,
              ].map((text, i) => (
                <RevealItem key={i} delay={i * 100}>
                  <p>{text}</p>
                </RevealItem>
              ))}
            </div>

            {/* Meta items — cascade with 80ms between each */}
            <div className="space-y-5">
              {meta.map(({ id, label, value }, i) => (
                <RevealItem key={id} delay={i * 80}>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40">
                      {label}
                    </span>
                    <p className="text-sm mt-0.5">{value}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experienceId" className="py-16">
          <RevealItem>
            <SectionLabel text="Experience" />
          </RevealItem>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Work Experience */}
            <div>
              <RevealItem delay={80}>
                <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40">
                  Work
                </span>
              </RevealItem>

              <div className="relative mt-4 ml-1">
                {/* Vertical line */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)]" />

                <div className="flex flex-col gap-8">
                  {[
                    {
                      title: "Software Engineer Trainee",
                      company: "Divergent Technologies Philippines Inc.",
                      range: "May 2026 — Present",
                    },
                    {
                      title: "Data Processing Associate",
                      company: "Appen",
                      range: "Dec 2025 — May 2026",
                    },
                    {
                      title: "Intern / OJT",
                      company: "Sun Life of Canada Philippines Inc.",
                      range: "Mar 2025 — Jun 2025",
                    },
                  ].map((item, i) => (
                    <RevealItem key={i} delay={i * 100}>
                      <div className="relative pl-6">
                        {/* Dot */}
                        <span className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--background)]" />
                        <p className="text-sm font-medium leading-snug">{item.title}</p>
                        <p className="text-xs text-[var(--foreground)]/60 mt-0.5">{item.company}</p>
                        <p className="text-[10px] text-[var(--foreground)]/40 mt-1 uppercase tracking-widest">{item.range}</p>
                      </div>
                    </RevealItem>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <RevealItem delay={80}>
                <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40">
                  Education
                </span>
              </RevealItem>

              <div className="relative mt-4 ml-1">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)]" />

                <RevealItem delay={160}>
                  <div className="relative pl-6">
                    <span className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--background)]" />
                    <p className="text-sm font-medium leading-snug">BS Information Technology</p>
                    <p className="text-xs text-[var(--foreground)]/60 mt-0.5">Cavite State University</p>
                    <p className="text-[10px] text-[var(--foreground)]/40 mt-1 uppercase tracking-widest">Graduated Sept 2025</p>
                    {/* Cum Laude badge */}
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded border border-emerald-400/40 text-emerald-500 tracking-widest uppercase">
                      Cum Laude
                    </span>
                  </div>
                </RevealItem>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Tech Stack ────────────────────────────────────────────────────── */}
        <section id="skillsId" className="py-16 border-t border-[var(--border)]">
          <RevealItem>
            <SectionLabel text="Tech Stack" />
          </RevealItem>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-6">
            {techCategories.map((category, i) => {
              const stacks = techStacksIcons.filter((s) => s.category === category);
              return (
                <RevealItem key={category} delay={i * 80}>
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-500 pb-1 border-b border-[var(--border)]">
                      {category}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {stacks.map((stack, j) => (
                        <RevealItem key={stack.name} delay={i * 80 + j * 50}>
                          {/* relative + overflow-hidden to contain the oversized icon */}
                          <div className="group relative overflow-hidden flex items-center px-2.5 py-1 rounded border border-[var(--border)] hover:border-emerald-400 bg-[var(--accent)]/5 transition-colors duration-200 cursor-default w-full">
                            {/* Tech name sits on the left, z-10 so it's above the icon */}
                            <span className="text-xs text-[var(--foreground)]/80 z-10 relative">
                              {stack.name}
                            </span>
                            {/* Icon is absolute, oversized, low opacity — bleeds off the right edge */}
                            <stack.icon
                              className="absolute -right-2 top-1/2 -translate-y-1/2 text-[var(--foreground)]/10 group-hover:text-[var(--foreground)]/40 pointer-events-none transition-colors duration-300"
                              size={36}
                            />
                          </div>
                        </RevealItem>
                      ))}
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </section>

        {/* ─── Projects ──────────────────────────────────────────────────────── */}
        <section id="projectsId" className="py-16">
          <RevealItem>
            <SectionLabel text="Projects" />
          </RevealItem>

          <div className="flex flex-col rounded-sm bg-[var(--card)] border border-[var(--border)] mt-6">
            {project.map((p, i) => (
              <RevealItem key={p.id} delay={i * 100}>
                <div className="border-b last:border-0 border-[var(--border)] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium">{p.name}</h2>
                    {/* emerald replaces blue — consistent accent throughout */}
                    <Link href={p.href}>
                          <Button
                            variant="outline"
                            className="h-8 px-3 text-white bg-emerald-500 text-xs shadow-md hover:bg-emerald-400 hover:text-white hover:-translate-y-0.5 transition-all border-0"
                          >
                            View Demo ↗
                          </Button>
                   
                    </Link>                   
                  </div>
                  <p className="w-4/5 text-xs text-[var(--foreground)]/60">
                    {p.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contactId" className="py-16">
          <RevealItem>
            <SectionLabel text="Contact" />
          </RevealItem>

          <RevealItem delay={100}>
            <div className="mt-6 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-300 via-emerald-500 to-teal-700   p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left — CTA text */}
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <h2 className={`text-3xl text-white leading-snug mb-3 ${dmSerif.className}`}>
                      Let&apos;s work <br />
                      <em>together.</em>
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                      I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to connect, feel free to reach out.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <a
                        href="https://mail.google.com/mail/?view=cm&to=clarknvls@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-emerald-600 text-xs font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                      >
                        Send an Email →
                      </a>
                      <a
                        href="https://linkedin.com/in/clark-louise-navales/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all duration-200"
                      >
                        LinkedIn ↗
                      </a>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-4"> 
                    {[
                      { icon: FaLinkedin, href: "https://linkedin.com/in/clark-louise-navales/", label: "LinkedIn" },
                      { icon: SiGithub,   href: "https://github.com/cln-clark",                  label: "GitHub"   },
                      { icon: SiFacebook, href: "https://www.facebook.com/clrkyy09",             label: "Facebook" },
                      { icon: SiInstagram, href: "https://www.instagram.com/clarklouise09/",     label: "Instagram" },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right — tagline or availability note */}
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-5xl text-white/20 ${dmSerif.className}`}>
                     Available for <br /> freelance.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </RevealItem>
        </section>

      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const mailto = `mailto:your@email.com?subject=Hello from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    window.open(mailto);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full bg-white/20 placeholder:text-white/50 text-white text-xs px-3 py-2.5 rounded-md border border-white/20 focus:outline-none focus:border-white/60 transition-colors"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your email"
        className="w-full bg-white/20 placeholder:text-white/50 text-white text-xs px-3 py-2.5 rounded-md border border-white/20 focus:outline-none focus:border-white/60 transition-colors"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your message"
        rows={4}
        className="w-full bg-white/20 placeholder:text-white/50 text-white text-xs px-3 py-2.5 rounded-md border border-white/20 focus:outline-none focus:border-white/60 transition-colors resize-none"
      />
      <Button
        onClick={handleSubmit}
        className="w-full bg-white text-emerald-600 hover:bg-white/90 text-xs h-9 rounded-md font-medium transition-colors"
      >
        Send Message →
      </Button>
    </div>
  );
}

