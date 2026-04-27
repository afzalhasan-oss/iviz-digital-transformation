import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function CtaBanner({
  eyebrow = "Let's build something exceptional",
  title = "Ready to modernize the way your organization works?",
  description = "Book a complimentary consultation. We'll listen, ask the right questions, and map out a clear path forward — no pressure, no jargon.",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 shadow-elegant md:p-16">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
              {eyebrow}
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Book a consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="soft" size="lg">
                <Link to="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}