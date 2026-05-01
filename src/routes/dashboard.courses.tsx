import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, ArrowRight, Clock, CheckCircle2, ExternalLink, XCircle } from "lucide-react";
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
  payment_link: string | null;
  admin_notes: string | null;
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
        .select("id, payment_status, payment_link, admin_notes, courses(id, title, slug, duration, level, short_description, course_modules(id, course_lessons(id)))")
        .order("created_at", { ascending: false });
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
        <h2 className="mt-4 font-display text-2xl font-bold">No registrations yet</h2>
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
        const status = r.payment_status;
        const isPaid = status === "paid";
        const isPending = status === "pending_approval";
        const isApproved = status === "approved";
        const isRejected = status === "rejected";
        return (
          <div key={r.id} className="card-glow rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {r.courses.level} • {r.courses.duration}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{r.courses.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{r.courses.short_description}</p>
                <div className="mt-3">
                  <StatusBadge status={status} />
                </div>
              </div>
              {isPaid ? (
                <Button asChild variant="hero" size="sm">
                  <Link to="/dashboard/learn/$courseSlug" params={{ courseSlug: r.courses.slug }}>
                    Continue course
                  </Link>
                </Button>
              ) : isApproved && r.payment_link ? (
                <Button asChild variant="hero" size="sm">
                  <a href={r.payment_link} target="_blank" rel="noopener noreferrer">
                    Pay now <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              ) : null}
            </div>
            {isPaid && (
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{done} of {total} lessons complete</span>
                  <span>{pct}%</span>
                </div>
                <Progress value={pct} />
              </div>
            )}
            {isPending && (
              <p className="mt-4 rounded-lg border border-border/60 bg-card/40 p-3 text-sm text-muted-foreground">
                Your registration is awaiting owner approval. You'll receive an email with a payment link soon.
              </p>
            )}
            {isApproved && !r.payment_link && (
              <p className="mt-4 rounded-lg border border-border/60 bg-card/40 p-3 text-sm text-muted-foreground">
                Approved! A payment link will be emailed to you shortly.
              </p>
            )}
            {isRejected && (
              <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
                {r.admin_notes || "Registration was not approved. Please contact support for details."}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; Icon: React.ComponentType<{ className?: string }> }> = {
    pending_approval: { label: "Pending approval", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30", Icon: Clock },
    approved:         { label: "Approved — awaiting payment", cls: "bg-cyan/15 text-cyan border-cyan/30", Icon: CheckCircle2 },
    paid:             { label: "Active", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", Icon: CheckCircle2 },
    rejected:         { label: "Rejected", cls: "bg-destructive/15 text-destructive border-destructive/30", Icon: XCircle },
  };
  const m = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground border-border", Icon: Clock };
  const I = m.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${m.cls}`}>
      <I className="h-3.5 w-3.5" /> {m.label}
    </span>
  );
}