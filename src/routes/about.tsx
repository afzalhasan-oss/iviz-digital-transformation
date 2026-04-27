import { createFileRoute } from "@tanstack/react-router";
import { Target, Heart, Lightbulb, Handshake } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About iViz — Practical Digital Transformation" },
      { name: "description", content: "InfoViz LLC, branded as iViz, partners with mission-driven organizations to deliver practical, modern, and trusted technology solutions." },
      { property: "og:title", content: "About iViz" },
      { property: "og:description", content: "We help organizations modernize with clarity. Discover the team, mission, and values behind iViz." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Target, title: "Outcomes over outputs", desc: "We measure success by the difference our work makes — adoption, efficiency, growth — not by hours or deliverables." },
  { icon: Heart, title: "Mission-aligned", desc: "We're at our best with organizations doing meaningful work for their customers, members, and communities." },
  { icon: Lightbulb, title: "Pragmatic innovation", desc: "We combine modern tools and AI with grounded engineering judgment. Bold where it matters, boring where it should be." },
  { icon: Handshake, title: "Trusted partnership", desc: "Honest scoping, transparent pricing, and direct access to the people doing the work." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-16 md:px-8 md:pt-24">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">About iViz</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Practical digital transformation, <span className="text-gradient">done with care</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            iViz is the brand of InfoViz LLC — a modern technology consultancy
            helping small businesses, nonprofits, and public sector teams move
            confidently into what's next. We design, build, and modernize the
            websites, applications, and AI workflows that quietly power great
            organizations.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Our mission</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Make modern technology accessible, useful, and trusted.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Too many organizations are stuck between off-the-shelf software that
                doesn't quite fit and enterprise solutions that are out of reach. We
                exist to close that gap — bringing senior-grade engineering, design,
                and AI expertise to teams who need it most.
              </p>
              <p>
                We believe great technology is invisible. It removes friction, frees
                time, and lets your team focus on the work only they can do. Our role
                is to make that quietly true for every organization we partner with.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-brand opacity-10 blur-2xl" />
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-elegant">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { k: "Small Business", v: "Lean, modern teams" },
                  { k: "Nonprofit", v: "Mission-driven orgs" },
                  { k: "Public Sector", v: "State & local agencies" },
                  { k: "Education", v: "Programs & districts" },
                ].map((t) => (
                  <div key={t.k} className="rounded-2xl bg-secondary/60 p-5">
                    <div className="font-display text-sm font-semibold text-brand">{t.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t.v}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                We bring deep familiarity with the procurement, compliance, and
                stakeholder realities of each of these sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-soft px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">What we value</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">The principles that guide our work.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/60 bg-card p-7 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Let's work together"
        title="Bring iViz alongside your next initiative."
        description="Whether you're scoping a new platform, launching an AI pilot, or modernizing the way your team works in Microsoft 365 — we'd love to hear about it."
      />
    </SiteLayout>
  );
}
