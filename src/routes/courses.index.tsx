import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Sparkles, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — iViz | InfoViz LLC" },
      { name: "description", content: "Live online IT and AI courses from InfoViz: AI, web development, Microsoft 365, automation, and full-stack." },
      { property: "og:title", content: "Courses — iViz" },
      { property: "og:description", content: "Practical, instructor-led courses in AI, web development, Microsoft 365, and full-stack." },
    ],
  }),
  component: CoursesPage,
});

type Course = {
  id: string; slug: string; title: string; short_description: string;
  level: string; duration: string; format: string; price_cents: number;
};

function CoursesPage() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, slug, title, short_description, level, duration, format, price_cents")
        .order("display_order");
      setCourses((data as Course[]) ?? []);
    })();
  }, []);

  return (
    <SiteLayout>
      <section className="relative px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-70" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-cyan">
              <Sparkles className="h-3.5 w-3.5" /> InfoViz Education
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Practical IT & AI <span className="text-gradient">courses</span>.
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Live online classes taught by working practitioners. Hands-on projects. Career-ready skills.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses === null ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
              ))
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">No courses available yet.</div>
            ) : courses.map((c) => (
              <article key={c.id} className="card-glow group flex flex-col rounded-2xl p-6 transition hover:-translate-y-0.5 hover:border-brand/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug">{c.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.short_description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-foreground/80">{c.level}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-medium text-foreground/80">
                    <Clock className="h-3 w-3" /> {c.duration}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-foreground/80">{c.format}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="font-display text-2xl font-bold text-gradient">${(c.price_cents / 100).toFixed(0)}</div>
                  <span className="text-xs text-muted-foreground">placeholder</span>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Button asChild variant="soft" size="sm" className="flex-1">
                    <Link to="/courses/$courseSlug" params={{ courseSlug: c.slug }}>View details</Link>
                  </Button>
                  <Button asChild variant="hero" size="sm" className="flex-1">
                    <Link to="/enroll/$courseSlug" params={{ courseSlug: c.slug }}>
                      Enroll <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}