import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Mail, ShieldCheck, Sparkles, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — iViz" },
      { name: "description", content: "Your private iViz dashboard." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <SiteLayout>
      <DashboardInner />
    </SiteLayout>
  );
}

function DashboardInner() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading your dashboard…</div>
      </section>
    );
  }

  const created = user.created_at ? new Date(user.created_at).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  }) : "—";

  return (
    <section className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-70" />
      <div className="absolute left-1/2 top-32 -z-10 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-float-blob" />

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan" /> Private workspace
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Welcome back<span className="text-gradient">.</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Signed in as <span className="font-medium text-foreground">{user.email}</span></p>
          </div>
          <Button variant="hero" size="lg" onClick={async () => { await signOut(); navigate({ to: "/" }); }}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Card icon={Mail} label="Email" value={user.email ?? "—"} />
          <Card icon={Calendar} label="Member since" value={created} />
          <Card icon={Sparkles} label="Plan" value="iViz Free" />
        </div>

        <div className="mt-10 card-glow rounded-3xl p-8 shadow-elegant md:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">What's next</h2>
          <p className="mt-2 text-muted-foreground">
            This is your private space. As iViz adds project tracking, AI tools,
            and collaboration features, they'll appear here first.
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-foreground/90 md:grid-cols-2">
            <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-brand-foreground"><Sparkles className="h-4 w-4" /></span>
              Browse the latest project case studies
            </li>
            <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-violet text-brand-foreground"><ShieldCheck className="h-4 w-4" /></span>
              Account is secured & private
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="card-glow rounded-2xl p-6 transition hover:border-brand/40 hover:shadow-elegant">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 break-words font-display text-lg font-semibold">{value}</div>
    </div>
  );
}