import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, GraduationCap, Users2, Calendar, BookOpen, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/courses/$courseSlug")({
  head: () => ({
    meta: [
      { title: "Course Details — iViz" },
      { name: "description", content: "Course details, modules, schedule, and enrollment for iViz courses." },
    ],
  }),
  component: CourseDetail,
});

type Lesson = { id: string; title: string; description: string | null; duration_minutes: number | null; display_order: number };
type Module = { id: string; title: string; summary: string | null; display_order: number; course_lessons: Lesson[] };
type Course = {
  id: string; slug: string; title: string; short_description: string;
  overview: string | null; who_for: string | null; what_youll_learn: string[] | null;
  level: string; duration: string; format: string; price_cents: number;
  schedule: string | null; instructor_name: string | null; instructor_bio: string | null;
  course_modules: Module[];
};

function CourseDetail() {
  const { courseSlug } = Route.useParams();
  const [course, setCourse] = useState<Course | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, slug, title, short_description, overview, who_for, what_youll_learn, level, duration, format, price_cents, schedule, instructor_name, instructor_bio, course_modules(id, title, summary, display_order, course_lessons(id, title, description, duration_minutes, display_order))")
        .eq("slug", courseSlug)
        .maybeSingle();
      const c = data as unknown as Course | null;
      if (c) {
        c.course_modules.sort((a, b) => a.display_order - b.display_order);
        c.course_modules.forEach((m) => m.course_lessons.sort((a, b) => a.display_order - b.display_order));
      }
      setCourse(c ?? null);
    })();
  }, [courseSlug]);

  if (course === undefined) {
    return <SiteLayout><div className="px-5 py-20 text-center text-muted-foreground">Loading course…</div></SiteLayout>;
  }
  if (course === null) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Course not found</h1>
          <Button asChild variant="hero" className="mt-6"><Link to="/courses">Browse all courses</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="relative px-5 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-70" />
        <div className="mx-auto max-w-6xl">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-brand-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{course.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{course.short_description}</p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-secondary px-3 py-1 font-medium">{course.level}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 font-medium">
                  <Clock className="h-3 w-3" /> {course.duration}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 font-medium">{course.format}</span>
              </div>

              {course.overview && (
                <Section title="Course overview"><p className="text-muted-foreground">{course.overview}</p></Section>
              )}
              {course.who_for && (
                <Section title="Who this course is for"><p className="text-muted-foreground">{course.who_for}</p></Section>
              )}
              {course.what_youll_learn && course.what_youll_learn.length > 0 && (
                <Section title="What you'll learn">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {course.what_youll_learn.map((l, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              <Section title="Course modules">
                <div className="space-y-3">
                  {course.course_modules.map((m) => (
                    <div key={m.id} className="rounded-2xl border border-border/60 bg-card/40 p-5">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-cyan" />
                        <h3 className="font-display text-base font-semibold">{m.title}</h3>
                      </div>
                      {m.summary && <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>}
                      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                        {m.course_lessons.map((l) => (
                          <li key={l.id} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                            {l.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              {course.schedule && (
                <Section title="Class schedule">
                  <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/40 p-5">
                    <Calendar className="mt-0.5 h-5 w-5 text-cyan" />
                    <p className="text-sm text-muted-foreground">{course.schedule}</p>
                  </div>
                </Section>
              )}

              {course.instructor_name && (
                <Section title="Your instructor">
                  <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/40 p-5">
                    <Users2 className="mt-0.5 h-5 w-5 text-cyan" />
                    <div>
                      <div className="font-display font-semibold">{course.instructor_name}</div>
                      {course.instructor_bio && <p className="mt-1 text-sm text-muted-foreground">{course.instructor_bio}</p>}
                    </div>
                  </div>
                </Section>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="card-glow rounded-3xl p-7 shadow-elegant">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tuition (placeholder)</div>
                <div className="mt-1 font-display text-4xl font-bold text-gradient">${(course.price_cents / 100).toFixed(0)}</div>
                <Button asChild variant="hero" size="lg" className="mt-5 w-full">
                  <Link to="/enroll/$courseSlug" params={{ courseSlug: course.slug }}>
                    Enroll now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Live instructor-led sessions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Hands-on projects</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Certificate of completion</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Lifetime access to materials</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}