import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight, Sparkles, Bot, Code2, Cloud, Compass, Globe, ShieldCheck, Github, ExternalLink,
  Zap, Users, Layers, CheckCircle2, Mail, Phone, MapPin, Send, Briefcase,
  Award, Rocket, Building2, GraduationCap, Atom, Palette, Database, Cog,
  GitBranch, Server, Brain, Workflow, MessageSquareCode, CloudUpload,
} from "lucide-react";
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
      { property: "og:title", content: "iViz — AI, Apps & Automation" },
      {
        property: "og:description",
        content:
          "Modern websites, custom applications, AI workflows, and Microsoft 365 solutions — built for small businesses, nonprofits, and the public sector.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
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
      <Contact />
    </SiteLayout>
  );
}

/* ---------------- Sections ---------------- */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-25 blur-3xl animate-blob" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 md:grid-cols-2 md:px-8 md:pb-32 md:pt-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-cyan" />
            InfoViz LLC · iViz
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Modern technology, <span className="text-gradient">delivered with clarity</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            iViz is the digital practice of InfoViz LLC — building websites,
            custom applications, AI solutions, automation, and Microsoft 365
            experiences for organizations that want results, not buzzwords.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#projects">View My Work <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild variant="soft" size="xl">
              <a href="#contact">Hire Me</a>
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
                <h3 className="mt-5 font-display text-lg font-semibold">{cat.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {cat.items.map((it) => (
                    <li key={it.name} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm text-foreground/90 transition hover:border-brand/40 hover:bg-secondary/60">
                      <span className="grid h-7 w-7 place-items-center rounded-md bg-secondary text-cyan">
                        <it.icon className="h-3.5 w-3.5" />
                      </span>
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="reveal card-glow group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-elegant md:p-9"
            >
              <div className={`absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${p.gradient} blur-3xl transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-elegant">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Capability</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-[26px]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-foreground/90 transition group-hover:border-brand/40"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </article>
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
