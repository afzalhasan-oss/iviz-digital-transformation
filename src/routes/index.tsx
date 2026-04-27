import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Bot, Code2, Cloud, Compass, GraduationCap, Globe, ShieldCheck, Zap, Users, Layers, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-iviz.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iViz — AI, Apps & Automation for Modern Organizations" },
      { name: "description", content: "iViz partners with small businesses, nonprofits, and public sector teams to design websites, custom apps, AI workflows, and Microsoft 365 solutions that drive real results." },
      { property: "og:title", content: "iViz — AI, Apps & Automation" },
      { property: "og:description", content: "Modern websites, custom applications, AI workflows, and Microsoft 365 solutions — built for small businesses, nonprofits, and the public sector." },
      { property: "og:image", content: "/og-home.jpg" },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  { icon: Globe, title: "Website Development", desc: "Modern, fast, accessible websites that convert visitors into customers." },
  { icon: Code2, title: "Custom Applications", desc: "Tailored business apps built around your workflows — not the other way around." },
  { icon: Bot, title: "AI & Automation", desc: "Practical AI use cases and automation that quietly remove hours of work each week." },
  { icon: Cloud, title: "Microsoft 365 & Cloud", desc: "Power Platform, SharePoint, Teams, and cloud solutions designed for real adoption." },
  { icon: Compass, title: "IT Consulting & Strategy", desc: "Clear, vendor-neutral guidance to modernize your technology with confidence." },
  { icon: GraduationCap, title: "Training & Enablement", desc: "Hands-on training so your team owns the solutions we build together." },
];

const REASONS = [
  { icon: ShieldCheck, title: "Trusted partnership", desc: "We measure success by outcomes — adoption, savings, and growth — not deliverables." },
  { icon: Zap, title: "Fast, focused delivery", desc: "Senior practitioners, lean process, and shipping rhythms that respect your timeline." },
  { icon: Users, title: "Built for your sector", desc: "Deep experience with small business, nonprofit, and public sector requirements." },
  { icon: Layers, title: "Future-ready architecture", desc: "Solutions that scale gracefully as your team, data, and ambitions grow." },
];

const PROJECTS = [
  { tag: "Public Sector", title: "Spending Freeze Request Solution", desc: "Enhanced an enterprise approval workflow handling thousands of fiscal requests with auditability and clarity." },
  { tag: "Microsoft 365", title: "Workflow & Collaboration Suite", desc: "Modernized intake, approvals, and document collaboration across SharePoint, Teams, and Power Automate." },
  { tag: "AI", title: "AI-Enabled Productivity", desc: "Embedded copilots and assistants that turn institutional knowledge into instant answers." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-2 md:px-8 md:pb-28 md:pt-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              AI · Apps · Automation
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Modern technology, <span className="text-gradient">delivered with clarity</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              iViz designs and ships websites, custom applications, AI workflows,
              and Microsoft 365 solutions for small businesses, nonprofits, and
              public sector teams who want results — not buzzwords.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link to="/services">See what we do</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Senior-led teams</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Outcomes-first delivery</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand" /> Vendor-neutral advice</div>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant">
              <img src={heroImg} alt="Abstract visualization of AI and automation flows" width={1600} height={1200} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/60 bg-card/95 p-4 shadow-card backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground"><Bot className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold">AI workflow live</div>
                  <div className="text-xs text-muted-foreground">Saved 14 hrs / week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border/60 bg-surface/60">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by teams in small business, nonprofit, and public sector
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { k: "100+", v: "Projects delivered" },
              { k: "10+ yrs", v: "Combined experience" },
              { k: "M365", v: "Certified expertise" },
              { k: "0→1", v: "AI adoption strategy" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-bold md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">What we do</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              A complete partner for your digital ambitions.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From the first strategy conversation to launch and beyond, iViz brings
              everything needed to design, build, and run modern technology.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-brand transition-colors group-hover:bg-gradient-brand group-hover:text-brand-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="link">
              <Link to="/services">Explore all services <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-gradient-soft px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Why iViz</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Senior expertise, without the agency overhead.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We're a small team of experienced engineers, architects, and
                strategists. You work directly with the people building your
                solution — no handoffs, no surprises.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {REASONS.map((r) => (
                <div key={r.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand text-brand-foreground">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Selected work</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Real projects, real outcomes.
              </h2>
            </div>
            <Button asChild variant="soft">
              <Link to="/portfolio">View portfolio <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative h-44 overflow-hidden bg-gradient-mesh">
                  <div className="absolute inset-0 bg-gradient-brand opacity-20 transition-opacity group-hover:opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-gradient opacity-30">0{i + 1}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-brand">{p.tag}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  );
}
