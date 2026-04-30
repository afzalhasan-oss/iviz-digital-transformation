import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/courses")({
  head: () => ({
    meta: [
      { title: "My Courses — iViz" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => <DashboardLayout title="My Courses"><MyCourses /></DashboardLayout>,
});

type Row = {
  id: string;
  payment_status: string;
  courses: {
    id: string;
    title: string;
    slug: string;
    duration: string;
    level: string;
    short_description: string;
    course_modules: { id: string; course_lessons: { id: string }[] }[];
  } | null;
};

function MyCourses() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const { data: enrolls } = await supabase
        .from("enrollments")
        .select("id, payment_status, courses(id, title, slug, duration, level, short_description, course_modules(id, course_lessons(id)))")
        .eq("payment_status", "paid");
      const { data: prog } = await supabase.from("lesson_progress").select("lesson_id");
      setCompletedIds(new Set((prog ?? []).map((p) => p.lesson_id)));
      setRows((enrolls as unknown as Row[]) ?? []);
    })();
  }, []);

  if (rows === null) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-44 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
          <div className="h-44 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-3xl card-glow rounded-3xl p-12 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-cyan" />
        <h2 className="mt-4 font-display text-2xl font-bold">No enrolled courses yet</h2>
        <p className="mt-2 text-muted-foreground">Browse the catalog to enroll in your first course.</p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/courses">Explore courses <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {rows.map((r) => {
        if (!r.courses) return null;
        const total = r.courses.course_modules.reduce((s, m) => s + m.course_lessons.length, 0);
        const done = r.courses.course_modules.reduce(
          (s, m) => s + m.course_lessons.filter((l) => completedIds.has(l.id)).length,
          0,
        );
        const pct = total ? Math.round((done / total) * 100) : 0;
        return (
          <div key={r.id} className="card-glow rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {r.courses.level} • {r.courses.duration}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{r.courses.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{r.courses.short_description}</p>
              </div>
              <Button asChild variant="hero" size="sm">
                <Link to="/dashboard/learn/$courseSlug" params={{ courseSlug: r.courses.slug }}>
                  Continue course
                </Link>
              </Button>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{done} of {total} lessons complete</span>
                <span>{pct}%</span>
              </div>
              <Progress value={pct} />
            </div>
          </div>
        );
      })}
    </div>
  );
}