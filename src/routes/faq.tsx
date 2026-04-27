import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Working with iViz" },
      { name: "description", content: "Answers to common questions about iViz services, who we serve, websites, AI adoption, Microsoft 365, custom software, and our project process." },
      { property: "og:title", content: "FAQ | iViz" },
      { property: "og:description", content: "Common questions about engaging iViz for websites, AI, Microsoft 365, and custom software." },
    ],
  }),
  component: FaqPage,
});

const SECTIONS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Who we serve",
    items: [
      { q: "What kinds of organizations do you work with?", a: "We partner with small businesses, nonprofits, and public sector teams. Most of our clients have lean technology teams — or none at all — and need a senior partner who can handle strategy, delivery, and adoption." },
      { q: "Do you take on small engagements?", a: "Yes. We're built to deliver focused, high-impact projects at a sensible scope. Many engagements start as a short discovery, a single workflow, or a focused launch — and grow from there." },
    ],
  },
  {
    heading: "Websites",
    items: [
      { q: "What does a typical website project look like?", a: "We start with a short discovery to align on goals, audience, and content. From there we design, build, and launch on a modern stack — with SEO, accessibility, analytics, and easy editing built in from day one." },
      { q: "Can you redesign or modernize an existing site?", a: "Absolutely. We frequently rebuild older sites on modern foundations, preserving SEO equity while dramatically improving design, performance, and conversion." },
    ],
  },
  {
    heading: "AI adoption",
    items: [
      { q: "We're new to AI — where should we start?", a: "Start small and specific. We help identify one or two workflows where AI can save real time within weeks — then design adoption, governance, and measurement around them." },
      { q: "How do you approach data privacy and responsible AI?", a: "Every AI engagement begins with data classification, access boundaries, and a clear policy on what models can and cannot do. We design for auditability and human review from the outset." },
    ],
  },
  {
    heading: "Microsoft 365 solutions",
    items: [
      { q: "Do you work in our existing Microsoft tenant?", a: "Yes. We design within your tenant, follow your governance and security baselines, and document everything so your team can own and extend the solution after launch." },
      { q: "Which Microsoft tools do you specialize in?", a: "SharePoint Online, Teams, Power Automate, Power Apps, Power BI, and the broader Microsoft 365 stack — including governance, licensing, and identity considerations." },
    ],
  },
  {
    heading: "Custom software",
    items: [
      { q: "When does custom software make sense over an off-the-shelf product?", a: "When your workflows are central to your value, when no product fits well enough, or when integration and control matter more than out-of-the-box features. We'll be honest if a SaaS product is the better fit." },
      { q: "How do you keep custom builds maintainable?", a: "We favor modern, well-supported frameworks, clear architecture, automated checks, and thorough documentation — so future changes are safe and inexpensive." },
    ],
  },
  {
    heading: "Project kickoff process",
    items: [
      { q: "How quickly can we get started?", a: "Most engagements begin within one to three weeks of our first conversation. Discovery and scoping typically take one to two weeks, depending on complexity and stakeholder availability." },
      { q: "What does the first 30 days look like?", a: "Discovery, alignment on outcomes, a clear delivery plan, and the first visible progress — whether that's a prototype, a working integration, or a launched workstream." },
    ],
  },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center md:px-8 md:pb-16 md:pt-24">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">FAQ</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Answers to <span className="text-gradient">common questions</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            If you don't see what you're looking for, reach out — we're happy to talk.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-4xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight">{s.heading}</h2>
              <Accordion type="single" collapsible className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
                {s.items.map((item, i) => (
                  <AccordionItem key={item.q} value={`${s.heading}-${i}`} className="border-border/60 px-6">
                    <AccordionTrigger className="py-5 text-left font-medium hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Still have questions?"
        title="Let's talk it through."
        description="A short consultation is the fastest way to get clear answers tailored to your situation."
      />
    </SiteLayout>
  );
}
