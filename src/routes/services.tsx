import { createFileRoute } from "@tanstack/react-router";
import { Globe, Code2, Bot, Cloud, Compass, GraduationCap, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Websites, Apps, AI & Microsoft 365 | iViz" },
      { name: "description", content: "Full-service technology partner: websites, custom applications, AI & automation, Microsoft 365, IT consulting, and team enablement." },
      { property: "og:title", content: "Services | iViz" },
      { property: "og:description", content: "Websites, apps, AI, Microsoft 365, consulting, and training — designed for measurable outcomes." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    intro: "Beautiful, fast, and accessible websites that work as hard as your team does.",
    points: [
      "Brand-aligned design systems and content strategy",
      "Modern, responsive, SEO-optimized builds",
      "CMS, e-commerce, and marketing integrations",
      "Performance, accessibility, and analytics built in",
    ],
  },
  {
    icon: Code2,
    title: "Custom Application Development",
    intro: "Tailored software that fits your operations — replacing spreadsheets, manual handoffs, and disconnected tools.",
    points: [
      "Internal tools, dashboards, and operational systems",
      "Customer- and constituent-facing portals",
      "API integrations and data pipelines",
      "Secure authentication, roles, and audit trails",
    ],
  },
  {
    icon: Bot,
    title: "AI & Automation Solutions",
    intro: "Practical AI and automation built around real workflows, with the guardrails your organization needs.",
    points: [
      "Document understanding and intelligent search",
      "Conversational assistants and copilots",
      "Process automation across systems and teams",
      "Responsible AI rollout, governance, and adoption",
    ],
  },
  {
    icon: Cloud,
    title: "Microsoft 365 & Cloud Solutions",
    intro: "Make your existing Microsoft investment finally deliver — with thoughtful design and real adoption.",
    points: [
      "SharePoint Online intranets and knowledge hubs",
      "Power Apps, Power Automate, and Power BI",
      "Teams collaboration, governance, and policy",
      "Migrations, tenant tuning, and security baselines",
    ],
  },
  {
    icon: Compass,
    title: "IT Consulting & Digital Strategy",
    intro: "A trusted, vendor-neutral advisor at the table when it matters most.",
    points: [
      "Technology roadmaps and modernization plans",
      "Vendor selection and architecture reviews",
      "Cost optimization and licensing strategy",
      "Change management and stakeholder alignment",
    ],
  },
  {
    icon: GraduationCap,
    title: "Training & Technical Enablement",
    intro: "Hands-on training so your people own the tools and outcomes long after we're done.",
    points: [
      "Role-based Microsoft 365 and Power Platform training",
      "AI literacy and prompt engineering workshops",
      "Developer enablement and code reviews",
      "Documentation, runbooks, and handover packages",
    ],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-24">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Services</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Everything you need to <span className="text-gradient">build, automate, and modernize</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            One partner across strategy, design, engineering, and adoption — so the
            technology you invest in actually delivers.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-20" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-brand-foreground shadow-elegant">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="font-display text-sm font-semibold text-muted-foreground">0{i + 1}</span>
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.intro}</p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Not sure where to start?"
        title="Let's map the right next step together."
        description="In a 30-minute consultation we'll explore your goals, current systems, and what would create the most value — fast."
      />
    </SiteLayout>
  );
}
