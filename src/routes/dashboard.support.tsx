import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Send, LifeBuoy } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/support")({
  head: () => ({
    meta: [{ title: "Support — iViz" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => <DashboardLayout title="Support"><Support /></DashboardLayout>,
});

const schema = z.object({
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(2000),
});

function Support() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    // TODO: wire to backend support ticket / email function
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent — our team will respond within 1 business day.");
    }, 600);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card-glow rounded-3xl p-8 shadow-elegant">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
            <LifeBuoy className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Contact support</h2>
            <p className="text-sm text-muted-foreground">We typically respond within 1 business day.</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" required maxLength={120} placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={6} maxLength={2000} placeholder="Tell us more…" />
          </div>
          <Button type="submit" variant="hero" size="lg" disabled={submitting}>
            <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
      <aside className="space-y-4">
        <div className="card-glow rounded-2xl p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
          <a href="mailto:infoviz.org@gmail.com" className="mt-2 flex items-center gap-2 font-medium hover:text-cyan">
            <Mail className="h-4 w-4 text-cyan" /> infoviz.org@gmail.com
          </a>
        </div>
        <div className="card-glow rounded-2xl p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
          <a href="tel:+12144257120" className="mt-2 flex items-center gap-2 font-medium hover:text-cyan">
            <Phone className="h-4 w-4 text-cyan" /> (214) 425-7120
          </a>
        </div>
      </aside>
    </div>
  );
}