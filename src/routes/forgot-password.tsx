import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — iViz | InfoViz LLC" },
      { name: "description", content: "Request a password reset link for your iViz account." },
    ],
  }),
  component: ForgotPasswordPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({ email: String(fd.get("email") ?? "") });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("Reset link sent. Check your inbox.");
  }

  return (
    <SiteLayout>
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-20 md:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-80" />
        <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-25 blur-3xl animate-float-blob" />

        <div className="w-full max-w-md">
          <div className="reveal is-visible card-glow rounded-3xl p-8 shadow-elegant md:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Account recovery</span>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
              Forgot your <span className="text-gradient">password?</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email associated with your account and we'll send you a secure reset link.
            </p>

            {sent ? (
              <div className="mt-8 rounded-2xl border border-border/60 bg-background/40 p-5 text-sm text-muted-foreground">
                If an account exists for that email, a password reset link is on its way. The link expires shortly for your security.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@company.com" className="h-11 pl-10 bg-background/40" />
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
                  {submitting ? "Sending…" : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
                </Button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remembered it?{" "}
              <Link to="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}