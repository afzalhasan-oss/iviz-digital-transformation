import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact iViz — Book a Free Consultation" },
      { name: "description", content: "Reach iViz to discuss websites, custom apps, AI, automation, or Microsoft 365 solutions. Email infoviz.org@gmail.com or call (214) 425-7120." },
      { property: "og:title", content: "Contact iViz" },
      { property: "og:description", content: "Book a free consultation to discuss your next technology initiative." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      topic: String(fd.get("topic") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Thanks — we'll be in touch within one business day.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <Toaster />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                Free 30-min consultation
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Let's talk about what you're <span className="text-gradient">trying to build</span>.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Send us a note about your goals or current challenges. A senior team
                member will respond within one business day — no sales script, just a
                real conversation.
              </p>
              <div className="mt-10 space-y-5">
                <a href="mailto:infoviz.org@gmail.com" className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground"><Mail className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                    <div className="mt-0.5 font-medium">infoviz.org@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+12144257120" className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground"><Phone className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
                    <div className="mt-0.5 font-medium">(214) 425-7120</div>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Office</div>
                    <div className="mt-0.5 font-medium">4001 20th Ave NE<br />Olympia, WA 98506-3540</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative">
                <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-brand opacity-15 blur-2xl" />
                <form onSubmit={onSubmit} className="rounded-3xl border border-border/60 bg-card p-7 shadow-elegant md:p-10">
                  <h2 className="font-display text-2xl font-bold tracking-tight">Request a consultation</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Tell us a little about your project. We respond within one business day.</p>
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" name="name" required maxLength={100} className="mt-1.5 h-11 rounded-xl" />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5 h-11 rounded-xl" />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" name="organization" maxLength={120} className="mt-1.5 h-11 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="topic">Interested in</Label>
                      <Input id="topic" name="topic" placeholder="AI, website, M365, custom app…" maxLength={120} className="mt-1.5 h-11 rounded-xl" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="message">How can we help?</Label>
                      <Textarea id="message" name="message" rows={6} required maxLength={2000} className="mt-1.5 rounded-xl" placeholder="Briefly describe your goals, current systems, or the problem you'd like to solve." />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>
                  </div>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">By submitting you agree to be contacted about your inquiry.</p>
                    <Button type="submit" variant="hero" size="lg" disabled={submitting}>
                      {submitting ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
