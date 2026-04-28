import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — iViz | InfoViz LLC" },
      { name: "description", content: "Create your iViz account to access your private dashboard." },
    ],
  }),
  component: SignupPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

function SignupPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { data, error } = await supabase.auth.signUp({
      ...parsed.data,
      options: { emailRedirectTo: redirectUrl },
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.session) {
      toast.success("Account created — welcome!");
      navigate({ to: "/dashboard" });
    } else {
      toast.success("Check your inbox to confirm your email.");
      navigate({ to: "/login" });
    }
  }

  return (
    <SiteLayout>
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-20 md:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-80" />
        <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-25 blur-3xl animate-float-blob" />

        <div className="w-full max-w-md">
          <div className="reveal is-visible card-glow rounded-3xl p-8 shadow-elegant md:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Get started</span>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
              Create your <span className="text-gradient">iViz</span> account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Spin up an account in seconds — no credit card required.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@company.com" className="h-11 pl-10 bg-background/40" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" name="password" type="password" required minLength={6} maxLength={72} placeholder="At least 6 characters" className="h-11 pl-10 bg-background/40" />
                </div>
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
                {submitting ? "Creating account…" : <>Create account <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}