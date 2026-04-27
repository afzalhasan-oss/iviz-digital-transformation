import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected iViz Projects" },
      { name: "description", content: "A look at iViz project work across public sector workflows, Microsoft 365 collaboration, AI productivity, websites, and custom applications." },
      { property: "og:title", content: "Portfolio | iViz" },
      { property: "og:description", content: "Selected projects across AI, Microsoft 365, custom apps, and modernization." },
    ],
  }),
  component: PortfolioPage,
});

const PROJECTS = [
  {
    tag: "Public Sector",
    title: "Spending Freeze Request Solution Enhancement",
    desc: "Modernized a statewide approval workflow that processes thousands of fiscal exception requests each cycle, adding clearer routing, audit visibility, and a streamlined reviewer experience.",
    impact: ["Faster approval cycles", "Cleaner audit trail", "Higher reviewer satisfaction"],
  },
  {
    tag: "Microsoft 365",
    title: "Microsoft 365 Workflow & Collaboration Solutions",
    desc: "Designed and shipped collaboration solutions across SharePoint, Teams, Power Automate, and Power Apps — replacing scattered email threads with structured, trackable workflows.",
    impact: ["Reduced manual handoffs", "Centralized knowledge", "Higher team adoption"],
  },
  {
    tag: "Web",
    title: "Website & Digital Presence Buildouts",
    desc: "Launched modern, accessible, SEO-optimized websites for service businesses and mission-driven organizations — pairing brand-grade design with conversion-focused content.",
    impact: ["Improved discoverability", "Higher inquiry conversion", "Easy long-term updates"],
  },
  {
    tag: "AI",
    title: "AI-Enabled Productivity Use Cases",
    desc: "Built copilots, intelligent search, and document understanding workflows that turn institutional knowledge into instant answers — with practical guardrails for data and policy.",
    impact: ["Hours saved weekly", "Faster onboarding", "Confident AI rollout"],
  },
  {
    tag: "Engineering",
    title: "Application Development & Integration Delivery",
    desc: "Delivered custom applications and integrations connecting line-of-business systems, databases, and SaaS platforms — replacing brittle scripts with reliable, observable services.",
    impact: ["Reliable data flow", "Lower operational risk", "Easier change management"],
  },
  {
    tag: "Strategy",
    title: "Technology Strategy & Modernization Guidance",
    desc: "Advised leadership teams on multi-year modernization, vendor consolidation, and AI adoption — translating technology choices into clear business and mission outcomes.",
    impact: ["Aligned roadmap", "Smarter spend", "Confident decisions"],
  },
];

function PortfolioPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Portfolio</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Work we're <span className="text-gradient">proud to share</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            A selection of recent engagements across the public sector, Microsoft
            365 modernization, custom applications, and applied AI.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div className="absolute inset-0 bg-gradient-brand opacity-25 transition-opacity group-hover:opacity-40" />
                <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  {p.tag}
                </div>
                <div className="absolute bottom-5 left-6 font-display text-6xl font-bold text-white/40">
                  0{i + 1}
                </div>
              </div>
              <div className="p-7">
                <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.impact.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Engagement summary <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Imagine your project here"
        title="Have something similar in mind?"
        description="Tell us about the outcome you're after. We'll respond within one business day with a clear next step."
      />
    </SiteLayout>
  );
}
