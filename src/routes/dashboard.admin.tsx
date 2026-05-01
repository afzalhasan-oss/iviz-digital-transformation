import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle, Send, Mail, ShieldCheck, ExternalLink } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({
    meta: [{ title: "Admin — iViz" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => <DashboardLayout title="Admin — Registrations"><Admin /></DashboardLayout>,
});

type Enrollment = {
  id: string;
  user_id: string;
  payment_status: string;
  amount_paid_cents: number;
  schedule_choice: string | null;
  payment_link: string | null;
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
  courses: { id: string; title: string; slug: string; price_cents: number } | null;
};

type Profile = { user_id: string; full_name: string | null; email: string | null; phone: string | null };

const linkSchema = z.string().trim().url("Enter a valid URL").max(2000);

function Admin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Enrollment[] | null>(null);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [filter, setFilter] = useState<"all" | "pending_approval" | "approved" | "paid" | "rejected">("pending_approval");

  useEffect(() => {
    if (loading || !user) return;
    (async () => {
      const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!role);
    })();
  }, [user, loading]);

  async function loadRows() {
    const { data } = await supabase
      .from("enrollments")
      .select("id, user_id, payment_status, amount_paid_cents, schedule_choice, payment_link, admin_notes, created_at, reviewed_at, courses(id, title, slug, price_cents)")
      .order("created_at", { ascending: false });
    const list = (data as unknown as Enrollment[]) ?? [];
    setRows(list);
    const userIds = Array.from(new Set(list.map((r) => r.user_id)));
    if (userIds.length) {
      const { data: ps } = await supabase.from("profiles").select("user_id, full_name, email, phone").in("user_id", userIds);
      const map: Record<string, Profile> = {};
      (ps ?? []).forEach((p) => { map[p.user_id] = p as Profile; });
      setProfiles(map);
    }
  }

  useEffect(() => {
    if (isAdmin) loadRows();
  }, [isAdmin]);

  if (loading || isAdmin === null) {
    return <div className="text-sm text-muted-foreground">Loading…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl card-glow rounded-3xl p-12 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-cyan" />
        <h2 className="mt-4 font-display text-2xl font-bold">Admin access required</h2>
        <p className="mt-2 text-muted-foreground">This page is only available to InfoViz administrators.</p>
        <Button asChild variant="hero" className="mt-6"><Link to="/dashboard">Back to dashboard</Link></Button>
      </div>
    );
  }

  const filtered = (rows ?? []).filter((r) => filter === "all" ? true : r.payment_status === filter);
  const counts = {
    pending_approval: (rows ?? []).filter((r) => r.payment_status === "pending_approval").length,
    approved: (rows ?? []).filter((r) => r.payment_status === "approved").length,
    paid: (rows ?? []).filter((r) => r.payment_status === "paid").length,
    rejected: (rows ?? []).filter((r) => r.payment_status === "rejected").length,
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="card-glow rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Course registrations</h2>
            <p className="text-sm text-muted-foreground">Review registrations, send payment links, and mark enrollments as paid.</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {(["pending_approval", "approved", "paid", "rejected", "all"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "hero" : "soft"} size="sm" onClick={() => setFilter(f)}>
              {labelFor(f)}{f !== "all" && ` (${counts[f]})`}
            </Button>
          ))}
        </div>
      </div>

      {rows === null ? (
        <div className="h-40 animate-pulse rounded-2xl border border-border/60 bg-card/40" />
      ) : filtered.length === 0 ? (
        <div className="card-glow rounded-2xl p-10 text-center text-muted-foreground">
          No registrations in this view.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <RegistrationCard
              key={r.id}
              row={r}
              profile={profiles[r.user_id]}
              onChanged={loadRows}
              adminId={user!.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function labelFor(f: string) {
  return ({
    pending_approval: "Pending",
    approved: "Approved",
    paid: "Paid",
    rejected: "Rejected",
    all: "All",
  } as Record<string, string>)[f] ?? f;
}

function RegistrationCard({
  row, profile, onChanged, adminId,
}: { row: Enrollment; profile?: Profile; onChanged: () => void; adminId: string }) {
  const [link, setLink] = useState(row.payment_link ?? "");
  const [notes, setNotes] = useState(row.admin_notes ?? "");
  const [busy, setBusy] = useState(false);

  type EnrollmentUpdate = {
    payment_status?: string;
    payment_link?: string | null;
    admin_notes?: string | null;
    amount_paid_cents?: number;
    payment_provider?: string | null;
    payment_reference?: string | null;
  };
  async function update(patch: EnrollmentUpdate) {
    setBusy(true);
    const { error } = await supabase
      .from("enrollments")
      .update({ ...patch, reviewed_at: new Date().toISOString(), reviewed_by: adminId })
      .eq("id", row.id);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    onChanged();
  }

  async function approveAndSend() {
    const parsed = linkSchema.safeParse(link);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    await update({ payment_status: "approved", payment_link: parsed.data, admin_notes: notes || null });
    toast.success("Approved and payment link saved. The student will see it in their dashboard.");
  }

  async function markPaid() {
    await update({
      payment_status: "paid",
      amount_paid_cents: row.courses?.price_cents ?? row.amount_paid_cents,
      payment_provider: "manual",
      payment_reference: `manual_${Date.now()}`,
      admin_notes: notes || row.admin_notes,
    });
    toast.success("Marked as paid — course unlocked for the student.");
  }

  async function reject() {
    if (!notes.trim()) { toast.error("Add a note explaining the rejection."); return; }
    await update({ payment_status: "rejected", admin_notes: notes });
    toast.success("Registration rejected.");
  }

  const status = row.payment_status;
  const studentEmail = profile?.email ?? "—";
  const studentName = profile?.full_name ?? "—";
  const studentPhone = profile?.phone ?? "—";
  const tuition = ((row.courses?.price_cents ?? 0) / 100).toFixed(0);

  return (
    <div className="card-glow rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">{row.courses?.title ?? "Unknown course"}</h3>
          <div className="mt-1 text-xs text-muted-foreground">
            Submitted {new Date(row.created_at).toLocaleString()} • Tuition ${tuition} • {row.schedule_choice ?? "—"}
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4 grid gap-4 rounded-xl border border-border/50 bg-background/40 p-4 sm:grid-cols-3">
        <Field label="Name" value={studentName} />
        <Field label="Email" value={studentEmail} copy />
        <Field label="Phone" value={studentPhone} copy />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`link-${row.id}`}>Payment link (Stripe, PayPal, Zelle, etc.)</Label>
          <Input
            id={`link-${row.id}`}
            placeholder="https://buy.stripe.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Shown to the student in their dashboard. Email it to them separately.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`notes-${row.id}`}>Admin notes (visible to student if rejected)</Label>
          <Textarea
            id={`notes-${row.id}`}
            rows={3}
            placeholder="Optional notes…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {status !== "approved" && status !== "paid" && (
          <Button variant="hero" size="sm" disabled={busy} onClick={approveAndSend}>
            <Send className="h-3.5 w-3.5" /> Approve & save payment link
          </Button>
        )}
        {status !== "paid" && (
          <Button variant="soft" size="sm" disabled={busy} onClick={markPaid}>
            <CheckCircle2 className="h-3.5 w-3.5" /> Mark as paid (unlock course)
          </Button>
        )}
        {status !== "rejected" && (
          <Button variant="soft" size="sm" disabled={busy} onClick={reject}>
            <XCircle className="h-3.5 w-3.5" /> Reject
          </Button>
        )}
        {studentEmail !== "—" && (
          <Button asChild variant="soft" size="sm">
            <a href={`mailto:${studentEmail}?subject=${encodeURIComponent(`Your iViz registration: ${row.courses?.title ?? ""}`)}`}>
              <Mail className="h-3.5 w-3.5" /> Email student
            </a>
          </Button>
        )}
        {row.payment_link && (
          <Button asChild variant="soft" size="sm">
            <a href={row.payment_link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" /> Open link
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 truncate text-sm">
        {copy && value !== "—" ? (
          <button
            className="hover:text-cyan"
            onClick={() => { navigator.clipboard.writeText(value); toast.success("Copied"); }}
            title="Click to copy"
          >
            {value}
          </button>
        ) : value}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; Icon: React.ComponentType<{ className?: string }> }> = {
    pending_approval: { label: "Pending", cls: "bg-amber-500/15 text-amber-400 border-amber-500/30", Icon: Clock },
    approved:         { label: "Approved", cls: "bg-cyan/15 text-cyan border-cyan/30", Icon: CheckCircle2 },
    paid:             { label: "Paid", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", Icon: CheckCircle2 },
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