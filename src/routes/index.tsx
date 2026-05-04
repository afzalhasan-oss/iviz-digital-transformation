import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight, Sparkles, Bot, Code2, Cloud, Compass, Globe, ShieldCheck,
  Zap, Users, Layers, CheckCircle2, Mail, Phone, MapPin, Send, Briefcase,
  Award, Rocket, Building2, GraduationCap, Atom, Palette, Database, Cog,
  GitBranch, Server, Brain, Workflow, MessageSquareCode, CloudUpload,
  BookOpen, Calendar, Clock, Users2, CircuitBoard,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/hero-iviz.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iViz — AI, Apps & Automation | InfoViz LLC" },
      {
        name: "description",
        content:
          "InfoViz LLC (iViz) builds modern websites, applications, AI workflows, and Microsoft 365 solutions for small businesses, nonprofits, and public sector teams.",
      },
      { name: "keywords", content: "AI consulting, web development, Microsoft 365, automation, custom applications, IT training, online courses, nonprofit IT, small business" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "iViz — AI, Apps & Automation" },
      { property: "og:url", content: "https://infoviz.lovable.app/" },
      {
        property: "og:description",
        content:
          "Modern websites, custom applications, AI workflows, and Microsoft 365 solutions — built for small businesses, nonprofits, and the public sector.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "iViz — AI, Apps & Automation" },
      { name: "twitter:description", content: "AI, custom apps, Microsoft 365, automation — for small business, nonprofit, and public sector." },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://infoviz.lovable.app/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "InfoViz LLC",
        alternateName: "iViz",
        url: "https://infoviz.lovable.app",
        email: "infoviz.org@gmail.com",
        telephone: "+1-214-425-7120",
      }),
    }],
  }),
  component: HomePage,
});

/* ---------------- Data ---------------- */

const SKILLS = [
  {
    title: "Frontend",
    accent: "from-cyan to-brand",
    headerColor: "text-cyan",
    barFill: "linear-gradient(90deg, oklch(0.78 0.16 200), oklch(0.7 0.18 220))",
    level: 92,
    levelLabel: "Expert",
    icon: Palette,
    items: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Code2 },
      { name: "TypeScript", icon: Code2 },
      { name: "Tailwind CSS", icon: Palette },
    ],
  },
  {
    title: "Backend",
    accent: "from-emerald-400 to-emerald-600",
    headerColor: "text-emerald-400",
    barFill: "linear-gradient(90deg, oklch(0.78 0.17 150), oklch(0.62 0.18 155))",
    level: 88,
    levelLabel: "Advanced",
    icon: Server,
    items: [
      { name: "Node.js", icon: Server },
      { name: ".NET", icon: Cog },
      { name: "REST & GraphQL APIs", icon: Workflow },
      { name: "SQL", icon: Database },
    ],
  },
  {
    title: "AI & ML",
    accent: "from-violet to-fuchsia-500",
    headerColor: "text-violet-300",
    barFill: "linear-gradient(90deg, oklch(0.7 0.2 300), oklch(0.65 0.22 320))",
    level: 85,
    levelLabel: "Advanced",
    icon: Brain,
    items: [
      { name: "OpenAI", icon: Brain },
      { name: "AI Automation", icon: Bot },
      { name: "Prompt Engineering", icon: MessageSquareCode },
      { name: "Intelligent Workflows", icon: Workflow },
    ],
  },
  {
    title: "DevOps",
    accent: "from-amber-400 to-orange-500",
    headerColor: "text-amber-300",
    barFill: "linear-gradient(90deg, oklch(0.85 0.16 85), oklch(0.72 0.18 55))",
    level: 80,
    levelLabel: "Advanced",
    icon: CloudUpload,
    items: [
      { name: "Vercel", icon: CloudUpload },
      { name: "GitHub", icon: GitBranch },
      { name: "CI/CD", icon: Cog },
      { name: "Cloud Deployment", icon: Cloud },
    ],
  },
];

const PROJECTS = [
  {
    title: "Website & Digital Presence Buildouts",
    desc: "Modern, fast, accessible websites that turn first impressions into qualified conversations — branded, content-rich, and built to grow.",
    badges: ["Next.js", "TypeScript", "Tailwind", "SEO"],
    gradient: "from-cyan/30 via-brand/20 to-transparent",
    accentBorder: "linear-gradient(135deg, oklch(0.78 0.16 200), oklch(0.7 0.18 220))",
    accentGlow: "oklch(0.7 0.18 210 / 0.55)",
    accentText: "text-cyan",
    demo: "#",
    repo: "#",
    icon: Globe,
  },
  {
    title: "AI-Enabled Productivity Use Cases",
    desc: "Practical AI assistants and copilots that turn institutional knowledge into instant answers and remove hours of repetitive work each week.",
    badges: ["OpenAI", "RAG", "Automation", "Copilots"],
    gradient: "from-violet/30 via-brand/20 to-transparent",
    accentBorder: "linear-gradient(135deg, oklch(0.7 0.2 300), oklch(0.65 0.22 320))",
    accentGlow: "oklch(0.65 0.22 310 / 0.55)",
    accentText: "text-violet-300",
    demo: "#",
    repo: "#",
    icon: Bot,
  },
  {
    title: "Application Development & Integration",
    desc: "Custom business apps and integrations across SharePoint, Teams, Power Platform, and APIs — designed around your workflows, not the other way around.",
    badges: [".NET", "Power Platform", "M365", "APIs"],
    gradient: "from-emerald-400/30 via-cyan/20 to-transparent",
    accentBorder: "linear-gradient(135deg, oklch(0.78 0.17 150), oklch(0.62 0.18 155))",
    accentGlow: "oklch(0.7 0.18 150 / 0.55)",
    accentText: "text-emerald-400",
    demo: "#",
    repo: "#",
    icon: Code2,
  },
  {
    title: "Technology Strategy & Modernization",
    desc: "Vendor-neutral guidance to modernize legacy systems, prioritize the right initiatives, and align technology investment with measurable outcomes.",
    badges: ["Strategy", "Architecture", "Cloud", "Roadmaps"],
    gradient: "from-amber-400/30 via-orange-500/20 to-transparent",
    accentBorder: "linear-gradient(135deg, oklch(0.85 0.16 85), oklch(0.72 0.18 55))",
    accentGlow: "oklch(0.78 0.17 70 / 0.55)",
    accentText: "text-amber-300",
    demo: "#",
    repo: "#",
    icon: Compass,
  },
];

const EXPERIENCE = [
  {
    year: "2024 — Present",
    title: "Founder & Principal Consultant",
    org: "InfoViz LLC (iViz)",
    desc: "Launched iViz to deliver senior-led websites, applications, AI, and Microsoft 365 solutions to small businesses, nonprofits, and public sector teams.",
    icon: Rocket,
  },
  {
    year: "2022 — 2024",
    title: "Lead Solutions Architect",
    org: "Public Sector Engagements",
    desc: "Architected enterprise approval workflows and modernization initiatives — including a fiscal Spending Freeze Request solution serving thousands of users.",
    icon: Building2,
  },
  {
    year: "2018 — 2022",
    title: "Senior Microsoft 365 Consultant",
    org: "Enterprise & Mid-Market",
    desc: "Designed and shipped SharePoint, Teams, and Power Platform solutions — driving real adoption through clean UX and durable governance.",
    icon: Award,
  },
  {
    year: "2014 — 2018",
    title: "Full-Stack Developer",
    org: "Application Development",
    desc: "Built custom web applications, APIs, and data integrations across .NET, Node.js, and SQL — establishing the engineering foundation iViz is built on.",
    icon: Briefcase,
  },
  {
    year: "Education",
    title: "Computer Science & Continuous Learning",
    org: "M365 · AI · Cloud Certifications",
    desc: "Ongoing investment in modern engineering, AI tooling, and cloud architecture to keep client work at the leading edge.",
    icon: GraduationCap,
  },
];

/* ---------------- Page ---------------- */

function HomePage() {
  useReveal();
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </SiteLayout>
  );
}

/* ---------------- Sections ---------------- */

const TYPING_PHRASES = [
  "Modern Websites",
  "Intelligent Applications",
  "AI & Automation",
];

function useTypingCycle(phrases: string[], typeSpeed = 70, deleteSpeed = 38, hold = 1400) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, hold]);

  return text;
}

function Hero() {
  const typed = useTypingCycle(TYPING_PHRASES);
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />

      {/* Soft floating gradient shape behind hero text — blue + cyan */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[520px] w-[920px] -translate-x-1/2 rounded-full opacity-60 blur-3xl animate-float-blob"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.7 0.18 230 / 0.55), transparent 70%), radial-gradient(closest-side, oklch(0.78 0.16 200 / 0.45) 10%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-40 -z-10 h-[360px] w-[520px] rounded-full opacity-40 blur-3xl animate-float-blob"
        style={{
          background: "radial-gradient(closest-side, oklch(0.68 0.18 215 / 0.6), transparent 70%)",
          animationDelay: "-6s",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 md:grid-cols-2 md:px-8 md:pb-32 md:pt-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-cyan" />
            InfoViz LLC · iViz
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Modern technology, <span className="text-gradient">delivered with clarity</span>.
          </h1>
          <div className="mt-5 flex min-h-[2.4em] items-center text-2xl font-display font-semibold tracking-tight md:text-3xl">
            <span className="text-muted-foreground mr-3">We build</span>
            <span className="text-gradient typing-caret" aria-live="polite">
              {typed || "\u00A0"}
            </span>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            iViz is the digital practice of InfoViz LLC — building websites,
            custom applications, AI solutions, automation, and Microsoft 365
            experiences for organizations that want results, not buzzwords.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl" className="rounded-full animate-soft-pulse">
              <a href="#projects">Explore Our Work <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild variant="soft" size="xl" className="rounded-full animate-soft-pulse" style={{ animationDelay: "-1.3s" }}>
              <a href="#contact">Work With Us</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Senior-led delivery</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Outcomes-first</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Vendor-neutral</div>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-brand opacity-30 blur-3xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-elegant">
            <img
              src={heroImg}
              alt="Abstract visualization of AI, applications, and automation flows"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-card/95 p-4 shadow-card backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground"><Bot className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-semibold">AI workflow live</div>
                <div className="text-xs text-muted-foreground">Saved 14 hrs / week</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -top-6 hidden rounded-2xl border border-white/10 bg-card/95 p-4 shadow-card backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-violet text-brand-foreground"><Cloud className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-semibold">M365 modernized</div>
                <div className="text-xs text-muted-foreground">Across 6 departments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <div className="reveal max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}

function About() {
  const VALUES = [
    { icon: ShieldCheck, title: "Trusted partnership", desc: "We measure success by outcomes — adoption, savings, and growth — not deliverables." },
    { icon: Zap, title: "Fast, focused delivery", desc: "Lean process, senior practitioners, and a shipping rhythm that respects your timeline." },
    { icon: Users, title: "Built for your sector", desc: "Deep experience with small business, nonprofit, and public sector requirements." },
    { icon: Layers, title: "Future-ready architecture", desc: "Solutions that scale gracefully as your team, data, and ambitions grow." },
  ];

  return (
    <section id="about" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <SectionHeading
            eyebrow="About iViz"
            title={<>A trusted technology partner for <span className="text-gradient-violet">modern teams</span>.</>}
            description="InfoViz LLC — operating as iViz — helps small businesses, nonprofits, and public sector organizations modernize with practical digital solutions. We bring senior expertise without the agency overhead, working directly with the people building your solution."
          />
          <div className="reveal space-y-5 text-muted-foreground">
            <p>
              We focus on real outcomes: websites that convert, applications
              that fit how your team actually works, AI that quietly removes
              hours of repetitive effort, and Microsoft 365 solutions designed
              for adoption — not just deployment.
            </p>
            <p>
              Whether you're modernizing a legacy system, launching a new
              digital presence, or exploring AI for the first time, iViz brings
              clarity, craft, and a long-term partner mindset to every engagement.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="reveal card-glow group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground transition-transform group-hover:scale-110">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Capabilities"
          title={<>Tools and technologies we <span className="text-gradient">build with</span>.</>}
          description="A modern, opinionated stack tuned for speed, reliability, and long-term maintainability — covering frontend craft, backend systems, AI, and cloud delivery."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SKILLS.map((cat) => (
            <div
              key={cat.title}
              className="reveal card-glow group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-elegant"
            >
              <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${cat.accent} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />
              <div className="relative">
                <div className={`inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.accent} text-brand-foreground shadow-elegant`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className={`mt-5 font-display text-lg font-semibold ${cat.headerColor}`}>{cat.title}</h3>

                {/* Skill level bar */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>{cat.levelLabel}</span>
                    <span className={cat.headerColor}>{cat.level}%</span>
                  </div>
                  <div className="level-bar" style={{ ["--bar-fill" as never]: cat.barFill }}>
                    <span style={{ width: `${cat.level}%` }} />
                  </div>
                </div>

                {/* Tech icons with hover-name reveal */}
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {cat.items.map((it) => (
                    <div
                      key={it.name}
                      className="skill-icon group/icon flex flex-col items-center"
                    >
                      <span
                        className="grid h-12 w-12 place-items-center rounded-xl border border-border/60 bg-background/50 text-foreground transition hover:scale-110 hover:border-brand/50 hover:text-cyan"
                        aria-label={it.name}
                      >
                        <it.icon className="h-5 w-5" />
                      </span>
                      <span className="skill-name">{it.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECT_CATEGORIES = [
  {
    key: "Frontend",
    label: "Frontend",
    color: "text-cyan",
    bg: "bg-cyan/10 border-cyan/30",
    indices: [0],
  },
  {
    key: "Backend",
    label: "Backend",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
    indices: [2],
  },
  {
    key: "AI",
    label: "AI & ML",
    color: "text-violet-300",
    bg: "bg-violet-500/10 border-violet-400/30",
    indices: [1],
  },
  {
    key: "DevOps",
    label: "DevOps & Strategy",
    color: "text-amber-300",
    bg: "bg-amber-400/10 border-amber-400/30",
    indices: [3],
  },
] as const;

function Projects() {
  return (
    <section id="projects" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title={<>Projects that deliver <span className="text-gradient-violet">measurable outcomes</span>.</>}
            description="A snapshot of the work iViz delivers — from public-facing digital presence to internal AI workflows and modernization roadmaps."
          />
        </div>

        <div className="mt-14 space-y-16">
          {PROJECT_CATEGORIES.map((cat) => (
            <div key={cat.key} className="reveal">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${cat.color} ${cat.bg}`}>
                  {cat.label}
                </span>
                <span className={`h-px flex-1 bg-gradient-to-r ${cat.color === "text-cyan" ? "from-cyan/40" : cat.color === "text-emerald-400" ? "from-emerald-400/40" : cat.color === "text-violet-300" ? "from-violet-400/40" : "from-amber-400/40"} to-transparent`} />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {cat.indices.map((i) => {
                  const p = PROJECTS[i];
                  return (
                    <article
                      key={p.title}
                      className="project-card card-glow group relative overflow-hidden rounded-3xl p-7 md:p-9"
                      style={{
                        ["--card-accent" as never]: p.accentBorder,
                        ["--card-glow" as never]: p.accentGlow,
                      }}
                    >
                      <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${p.gradient} blur-3xl transition-opacity duration-500 group-hover:opacity-100`} />
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <div
                            className="grid h-12 w-12 place-items-center rounded-2xl text-brand-foreground shadow-elegant"
                            style={{ background: p.accentBorder }}
                          >
                            <p.icon className="h-6 w-6" />
                          </div>
                          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${p.accentText}`}>{cat.label}</span>
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-[26px]">{p.title}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {p.badges.map((b) => (
                            <span
                              key={b}
                              className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-foreground/90"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <Button asChild size="sm" variant="hero" className="rounded-full">
                            <a href="#contact">
                              <ArrowRight className="h-4 w-4" /> Start a project
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="soft" className="rounded-full">
                            <a href="#about">
                              Learn more
                            </a>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-soft" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Experience"
          title={<>A track record of <span className="text-gradient">shipping real solutions</span>.</>}
          description="Selected milestones across consulting, engineering, and modernization work that shaped how iViz delivers today."
        />

        <div className="relative mt-16">
          {/* Timeline rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand/60 via-cyan/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <ol className="space-y-12">
            {EXPERIENCE.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="reveal relative grid items-start gap-4 md:grid-cols-2 md:gap-12">
                  {/* Dot */}
                  <span className="absolute left-4 top-3 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-brand-foreground shadow-elegant ring-4 ring-background md:left-1/2">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>

                  <div className={`pl-12 md:pl-0 ${left ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}>
                    <span className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan">
                      {item.year}
                    </span>
                  </div>
                  <div className={`pl-12 md:pl-0 ${left ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
                    <div className="card-glow rounded-2xl p-6 transition hover:border-brand/40 hover:shadow-elegant">
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm font-medium text-cyan">{item.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

type CourseCardData = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  level: string;
  duration: string;
  format: string;
  price_cents: number;
  display_order: number;
};

const LEVEL_STYLES: Record<string, { border: string; glow: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
  Beginner: {
    border: "linear-gradient(135deg, oklch(0.7 0.2 300), oklch(0.65 0.22 320))",
    glow: "oklch(0.65 0.22 310 / 0.55)",
    text: "text-violet-300",
    icon: Brain,
  },
  Intermediate: {
    border: "linear-gradient(135deg, oklch(0.78 0.16 200), oklch(0.7 0.18 220))",
    glow: "oklch(0.7 0.18 210 / 0.55)",
    text: "text-cyan",
    icon: MessageSquareCode,
  },
  Advanced: {
    border: "linear-gradient(135deg, oklch(0.78 0.17 150), oklch(0.62 0.18 155))",
    glow: "oklch(0.7 0.18 150 / 0.55)",
    text: "text-emerald-400",
    icon: CircuitBoard,
  },
  "All levels": {
    border: "linear-gradient(135deg, oklch(0.85 0.16 85), oklch(0.72 0.18 55))",
    glow: "oklch(0.78 0.17 70 / 0.55)",
    text: "text-amber-300",
    icon: Cloud,
  },
};

function Education() {
  const [courses, setCourses] = useState<CourseCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, slug, title, short_description, level, duration, format, price_cents, display_order")
        .order("display_order", { ascending: true });
      if (!cancelled) {
        setCourses((data ?? []) as CourseCardData[]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="education" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-70" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Classes & Education"
          title={<>Learn with <span className="text-gradient">iViz</span> — live, hands-on, vendor-neutral.</>}
          description="Small-cohort classes taught by senior practitioners. Register online; our team reviews every registration and emails you a secure payment link before your seat is confirmed."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {loading && (
            <div className="col-span-full rounded-3xl border border-border/60 bg-card/40 p-10 text-center text-muted-foreground">
              Loading courses…
            </div>
          )}
          {!loading && courses.length === 0 && (
            <div className="col-span-full rounded-3xl border border-border/60 bg-card/40 p-10 text-center text-muted-foreground">
              New cohorts will be announced soon.
            </div>
          )}
          {courses.map((c) => {
            const style = LEVEL_STYLES[c.level] ?? LEVEL_STYLES["All levels"];
            const Icon = style.icon;
            return (
              <article
                key={c.id}
                className="project-card card-glow group relative overflow-hidden rounded-3xl p-7 md:p-8"
                style={{
                  ["--card-accent" as never]: style.border,
                  ["--card-glow" as never]: style.glow,
                }}
              >
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl text-brand-foreground shadow-elegant"
                        style={{ background: style.border }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${style.text}`}>{c.level}</span>
                    </div>
                    <span className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-semibold text-foreground/90">
                      ${(c.price_cents / 100).toFixed(0)}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight md:text-2xl">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.short_description}</p>

                  <div className="mt-5 grid gap-2 text-sm text-foreground/90 sm:grid-cols-3">
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan" /> {c.duration}</span>
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-cyan" /> {c.format}</span>
                    <span className="flex items-center gap-2"><Users2 className="h-4 w-4 text-cyan" /> Small cohort</span>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild size="sm" variant="hero" className="rounded-full">
                      <Link to="/enroll/$courseSlug" params={{ courseSlug: c.slug }}>
                        Register <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="soft" className="rounded-full">
                      <Link to="/courses/$courseSlug" params={{ courseSlug: c.slug }}>
                        View details
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <UpcomingSchedule courses={courses} />

        {/* How registration works */}
        <div className="reveal mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
              <BookOpen className="h-3.5 w-3.5 text-cyan" /> How registration works
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Simple, reviewed, <span className="text-gradient">no surprises</span>.
            </h3>
            <p className="mt-3 text-muted-foreground">
              We keep cohorts small and personal, so every registration is reviewed
              by the iViz team before payment. You'll get a secure payment link by
              email and access to course content as soon as payment is confirmed.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/90">
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan" /> Live cohorts taught by senior practitioners</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan" /> Hands-on labs with real-world projects</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan" /> Certificate of completion</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan" /> Discounts for nonprofits &amp; public sector</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg" className="rounded-full">
                <Link to="/courses">Browse all courses <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="soft" size="lg" className="rounded-full">
                <a href="#contact">Talk to us</a>
              </Button>
            </div>
          </div>

          <ol className="card-glow relative space-y-6 rounded-3xl p-8 shadow-elegant md:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-violet opacity-25 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-brand opacity-25 blur-3xl" />
            {[
              { n: "1", t: "Pick a course", d: "Browse the catalog and choose what fits your goals and experience level." },
              { n: "2", t: "Register online", d: "Create your account and submit a short registration form — no payment yet." },
              { n: "3", t: "Get your payment link", d: "Our team reviews and emails you a secure payment link with cohort details." },
              { n: "4", t: "Start learning", d: "Once payment is confirmed, course content unlocks in your dashboard." },
            ].map((s) => (
              <li key={s.n} className="relative flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand font-display text-base font-bold text-brand-foreground shadow-elegant">
                  {s.n}
                </span>
                <div>
                  <h4 className="font-display text-base font-semibold">{s.t}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please share a bit more detail").max(2000),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    // Simulate send — wire to your backend or email service when ready.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Thanks! We'll be in touch within one business day.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-80" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="reveal">
            <SectionHeading
              eyebrow="Let's talk"
              title={<>Tell us about your <span className="text-gradient">next initiative</span>.</>}
              description="Share a few details and we'll respond within one business day with a clear next step — no pressure, no jargon."
            />

            <div className="mt-10 space-y-4">
              <ContactRow icon={Mail} label="Email" value="infoviz.org@gmail.com" href="mailto:infoviz.org@gmail.com" />
              <ContactRow icon={Phone} label="Phone" value="(214) 425-7120" href="tel:+12144257120" />
              <ContactRow icon={MapPin} label="Office" value="4001 20th Ave NE, Olympia, WA 98506" />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="reveal card-glow relative rounded-3xl p-7 shadow-elegant md:p-10"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-violet opacity-30 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-brand opacity-25 blur-3xl" />

            <div className="relative space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" id="name">
                  <Input id="name" name="name" required maxLength={100} placeholder="Your full name" className="h-11 bg-background/40" />
                </Field>
                <Field label="Email" id="email">
                  <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@company.com" className="h-11 bg-background/40" />
                </Field>
              </div>
              <Field label="Company" id="company" optional>
                <Input id="company" name="company" maxLength={150} placeholder="Your organization" className="h-11 bg-background/40" />
              </Field>
              <Field label="Message" id="message">
                <Textarea id="message" name="message" required maxLength={2000} placeholder="Tell us about your goals, timeline, and any constraints…" className="min-h-[140px] bg-background/40" />
              </Field>

              <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
                {submitting ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree to be contacted by InfoViz LLC about your inquiry.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, optional, children }: { label: string; id: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground/90">
        {label}
        {optional && <span className="ml-2 text-xs font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const content = (
    <div className="card-glow flex items-center gap-4 rounded-2xl p-4 transition hover:border-brand/40 hover:shadow-elegant">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
