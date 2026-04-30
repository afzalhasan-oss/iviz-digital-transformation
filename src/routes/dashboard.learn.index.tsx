import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlayCircle, BookOpen, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/learn/")({
  head: () => ({
    meta: [{ title: "Course Content — iViz" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => <DashboardLayout title="Course Content"><LearnIndex /></DashboardLayout>,
});

type Row = { id: string; courses: { slug: string; title: string; level: string; duration: string } | null };

function LearnIndex() {
  const [rows, setRows] = useState<Row[] | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("id, courses(slug, title, level, duration)")
        .eq("payment_status", "paid");
      setRows((data as unknown as Row[]) ?? []);
    })();
  }, []);

  if (rows === null) return <div className="text-sm text-muted-foreground">Loading…</div>;
  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-2xl card-glow rounded-3xl p-12 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-cyan" />
        <h2 className="mt-4 font-display text-2xl font-bold">No course content unlocked yet</h2>
        <p className="mt-2 text-muted-foreground">Enroll in a course to access modules, lessons, and resources.</p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/courses">Explore courses <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <h2 className="font-display text-xl font-semibold">Pick a course to continue</h2>
      {rows.map((r) => r.courses && (
        <Link
          key={r.id}
          to="/dashboard/learn/$courseSlug"
          params={{ courseSlug: r.courses.slug }}
          className="card-glow flex items-center justify-between rounded-2xl p-5 transition hover:border-brand/40"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{r.courses.level} • {r.courses.duration}</div>
            <div className="mt-1 font-display text-lg font-semibold">{r.courses.title}</div>
          </div>
          <PlayCircle className="h-6 w-6 text-cyan" />
        </Link>
      ))}
    </div>
  );
}