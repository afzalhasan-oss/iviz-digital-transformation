import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, CreditCard, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/enroll/$courseSlug")({
  head: () => ({
    meta: [{ title: "Enroll — iViz" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => <SiteLayout><AuthProvider><Enroll /></AuthProvider></SiteLayout>,
});

type Course = {
  id: string; slug: string; title: string; level: string; duration: string;
  format: string; price_cents: number; schedule: string | null;
};

const schema = z.object({
  full_name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(40),
  schedule_choice: z.string().trim().max(120),
  agree: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
});

function Enroll() {
  const { courseSlug } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", schedule_choice: "Next available cohort", agree: false });

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, slug, title, level, duration, format, price_cents, schedule")
        .eq("slug", courseSlug)
        .maybeSingle();
      setCourse((data as Course | null) ?? null);
    })();
  }, [courseSlug]);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, email: user.email ?? f.email }));
  }, [user]);

  if (course === undefined || loading) {
    return <div className="px-5 py-20 text-center text-muted-foreground">Loading…</div>;
  }
  if (course === null) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Course not found</h1>
        <Button asChild variant="hero" className="mt-6"><Link to="/courses">Browse courses</Link></Button>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center">
        <Lock className="mx-auto h-12 w-12 text-cyan" />
        <h1 className="mt-4 font-display text-3xl font-bold">Sign in to enroll</h1>
        <p className="mt-2 text-muted-foreground">Create an account or sign in to enroll in {course.title}.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild variant="hero" size="lg"><Link to="/signup">Create account</Link></Button>
          <Button asChild variant="soft" size="lg"><Link to="/login">Sign in</Link></Button>
        </div>
      </section>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user || !course) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);

    // Save profile info
    await supabase.from("profiles").upsert({
      user_id: user.id,
      email: parsed.data.email,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
    }, { onConflict: "user_id" });

    // TODO: Stripe integration — when enable_stripe_payments is configured,
    // replace this simulated payment with a Stripe Checkout session redirect.
    // Example flow:
    //   1. Call createServerFn createCheckoutSession({ courseId, priceId }).
    //   2. Redirect user to Stripe-hosted checkout URL.
    //   3. On success webhook, mark enrollment paid and send receipt.

    const { error } = await supabase.from("enrollments").upsert({
      user_id: user.id,
      course_id: course.id,
      schedule_choice: parsed.data.schedule_choice,
      payment_status: "paid", // simulated
      amount_paid_cents: course.price_cents,
      payment_provider: "simulated",
      payment_reference: `sim_${Date.now()}`,
    }, { onConflict: "user_id,course_id" });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Payment successful — course unlocked!");
    navigate({ to: "/dashboard/learn/$courseSlug", params: { courseSlug: course.slug } });
  }

  return (
    <section className="relative px-5 py-16 md:px-8 md:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-70" />
      <div className="mx-auto max-w-5xl">
        <Link to="/courses/$courseSlug" params={{ courseSlug: course.slug }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to course
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="card-glow rounded-3xl p-8 shadow-elegant md:p-10">
            <h1 className="font-display text-3xl font-bold tracking-tight">Complete your enrollment</h1>
            <p className="mt-2 text-muted-foreground">Confirm details and proceed to payment.</p>
            <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input id="full_name" required maxLength={120} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" required maxLength={40} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="schedule_choice">Class schedule</Label>
                <select
                  id="schedule_choice"
                  value={form.schedule_choice}
                  onChange={(e) => setForm({ ...form, schedule_choice: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option>Next available cohort</option>
                  <option>Weekday evenings</option>
                  <option>Weekend mornings</option>
                  <option>Self-paced</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} className="mt-0.5 h-4 w-4 rounded border-input bg-transparent" />
                  <span>I agree to the terms of service and refund policy.</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
                  <CreditCard className="h-4 w-4" /> {submitting ? "Processing…" : `Proceed to Payment — $${(course.price_cents / 100).toFixed(0)}`}
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  This is a simulated checkout. Stripe will be enabled to take real payments.
                </p>
              </div>
            </form>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-glow rounded-3xl p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order summary</div>
              <h2 className="mt-2 font-display text-lg font-semibold">{course.title}</h2>
              <div className="mt-1 text-xs text-muted-foreground">{course.level} • {course.duration} • {course.format}</div>
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-gradient">${(course.price_cents / 100).toFixed(0)}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Instant course access after payment</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Instructor-led sessions</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> Certificate of completion</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}