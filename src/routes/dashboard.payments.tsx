import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CreditCard, Receipt, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/payments")({
  head: () => ({
    meta: [{ title: "Payments — iViz" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => <DashboardLayout title="Payments"><Payments /></DashboardLayout>,
});

type Row = {
  id: string;
  payment_status: string;
  amount_paid_cents: number;
  enrolled_at: string;
  payment_reference: string | null;
  courses: { title: string } | null;
};

function Payments() {
  const [rows, setRows] = useState<Row[] | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("id, payment_status, amount_paid_cents, enrolled_at, payment_reference, courses(title)")
        .order("enrolled_at", { ascending: false });
      setRows((data as unknown as Row[]) ?? []);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="card-glow rounded-3xl p-8 shadow-elegant">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Payment history</h2>
            <p className="text-sm text-muted-foreground">All payments and receipts in one place.</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-card/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {rows === null ? (
                <tr><td className="px-4 py-6 text-muted-foreground" colSpan={5}>Loading…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td className="px-4 py-8 text-center text-muted-foreground" colSpan={5}>
                  <Receipt className="mx-auto mb-2 h-6 w-6 opacity-60" />
                  No payments yet.
                </td></tr>
              ) : rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40">
                  <td className="px-4 py-3 font-medium">{r.courses?.title ?? "—"}</td>
                  <td className="px-4 py-3">${(r.amount_paid_cents / 100).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                      r.payment_status === "paid" ? "bg-cyan/15 text-cyan" : "bg-muted text-muted-foreground"
                    }`}>
                      {r.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(r.enrolled_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="soft" size="sm" onClick={() => toast.info("Receipt downloads will be available once Stripe is enabled.")}>
                      <FileText className="h-3.5 w-3.5" /> Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TODO: Stripe integration — receipts will be served from Stripe-hosted invoice URLs after enable_stripe_payments is configured. */}
      </div>
    </div>
  );
}