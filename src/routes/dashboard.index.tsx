import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen, GraduationCap, CreditCard, Calendar, ArrowRight, Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — iViz" },
      { name: "description", content: "Your iViz dashboard home." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => <DashboardLayout title="Dashboard"><Home /></DashboardLayout>,
});

type Row = {
  id: string;
  payment_status: string;
  enrolled_at: string;
  amount_paid_cents: number;
  courses: { id: string; title: string; slug: string; duration: string; level: string } | null;
};

function Home() {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("id, payment_status, enrolled_at, amount_paid_cents, courses(id, title, slug, duration, level)")
        .order("enrolled_at", { ascending: false });
      setRows((data as unknown as Row[]) ?? []);
    })();
  }, []);

  const paid = rows?.filter((r) => r.payment_status === "paid") ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="card-glow rounded-3xl p-8 shadow-elegant md:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-cyan">
          <Sparkles className="h-3.5 w-3.5" /> Welcome back
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Continue building your <span className="text-gradient">tech skills</span>.
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Pick up where you left off, browse new courses, and track your progress in one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/courses">Browse courses <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          {paid.length > 0 && paid[0].courses && (
            <Button asChild variant="soft" size="lg">
              <Link to="/dashboard/learn/$courseSlug" params={{ courseSlug: paid[0].courses.slug }}>
                Continue learning
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Stat icon={BookOpen} label="Enrolled courses" value={String(paid.length)} />
        <Stat icon={Calendar} label="Upcoming class" value={paid.length ? "Schedule pending" : "—"} />
        <Stat icon={CreditCard} label="Payments" value={`$${(paid.reduce((s, r) => s + r.amount_paid_cents, 0) / 100).toFixed(0)}`} />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold tracking-tight">My enrolled courses</h3>
          <Link to="/dashboard/courses" className="text-sm font-medium text-cyan hover:underline">
            View all
          </Link>
        </div>
        {rows === null ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="h-36 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
            <div className="h-36 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
          </div>
        ) : paid.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {paid.map((r) => r.courses && (
              <div key={r.id} className="card-glow rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5 text-cyan" /> {r.courses.level} • {r.courses.duration}
                </div>
                <h4 className="mt-2 font-display text-lg font-semibold">{r.courses.title}</h4>
                <Button asChild variant="hero" size="sm" className="mt-4">
                  <Link to="/dashboard/learn/$courseSlug" params={{ courseSlug: r.courses.slug }}>
                    Continue course
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="card-glow rounded-2xl p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold">{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-4 card-glow rounded-2xl p-10 text-center">
      <BookOpen className="mx-auto h-10 w-10 text-cyan" />
      <h4 className="mt-3 font-display text-lg font-semibold">No courses yet</h4>
      <p className="mt-1 text-sm text-muted-foreground">Browse the catalog and enroll in your first course.</p>
      <Button asChild variant="hero" size="lg" className="mt-5">
        <Link to="/courses">Explore courses</Link>
      </Button>
    </div>
  );
}