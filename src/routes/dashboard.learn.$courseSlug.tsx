import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Lock, PlayCircle, ArrowLeft, FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/learn/$courseSlug")({
  head: () => ({
    meta: [{ title: "Course Content — iViz" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: () => <DashboardLayout title="Course Content"><Learn /></DashboardLayout>,
});

type Lesson = { id: string; title: string; description: string | null; duration_minutes: number | null; display_order: number };
type Module = { id: string; title: string; summary: string | null; display_order: number; course_lessons: Lesson[] };
type Course = {
  id: string; slug: string; title: string; short_description: string;
  level: string; duration: string; format: string;
  course_modules: Module[];
};

function Learn() {
  const { courseSlug } = Route.useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null | undefined>(undefined);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase
        .from("courses")
        .select("id, slug, title, short_description, level, duration, format, course_modules(id, title, summary, display_order, course_lessons(id, title, description, duration_minutes, display_order))")
        .eq("slug", courseSlug)
        .maybeSingle();
      const courseData = c as unknown as Course | null;
      if (courseData) {
        courseData.course_modules.sort((a, b) => a.display_order - b.display_order);
        courseData.course_modules.forEach((m) => m.course_lessons.sort((a, b) => a.display_order - b.display_order));
      }
      setCourse(courseData ?? null);

      if (user && courseData) {
        const { data: en } = await supabase.from("enrollments").select("id, payment_status").eq("user_id", user.id).eq("course_id", courseData.id).maybeSingle();
        setEnrolled(!!en && en.payment_status === "paid");
        const { data: prog } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id);
        setDone(new Set((prog ?? []).map((p) => p.lesson_id)));
      } else {
        setEnrolled(false);
      }
    })();
  }, [courseSlug, user]);

  async function toggleComplete(lessonId: string) {
    if (!user) return;
    if (done.has(lessonId)) {
      await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", lessonId);
      const next = new Set(done); next.delete(lessonId); setDone(next);
    } else {
      const { error } = await supabase.from("lesson_progress").insert({ user_id: user.id, lesson_id: lessonId });
      if (error) { toast.error(error.message); return; }
      setDone(new Set([...done, lessonId]));
      toast.success("Lesson marked complete");
    }
  }

  if (course === undefined) {
    return <div className="text-sm text-muted-foreground">Loading course…</div>;
  }
  if (course === null) {
    return (
      <div className="mx-auto max-w-2xl card-glow rounded-3xl p-12 text-center">
        <h2 className="font-display text-2xl font-bold">Course not found</h2>
        <Button asChild variant="hero" className="mt-6"><Link to="/courses">Browse courses</Link></Button>
      </div>
    );
  }

  if (enrolled === false) {
    return (
      <div className="mx-auto max-w-2xl card-glow rounded-3xl p-12 text-center">
        <Lock className="mx-auto h-12 w-12 text-cyan" />
        <h2 className="mt-4 font-display text-2xl font-bold">Enroll to access</h2>
        <p className="mt-2 text-muted-foreground">{course.title} is locked. Enroll to unlock all lessons and resources.</p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/enroll/$courseSlug" params={{ courseSlug: course.slug }}>Enroll now</Link>
        </Button>
      </div>
    );
  }

  const totalLessons = course.course_modules.reduce((s, m) => s + m.course_lessons.length, 0);
  const doneCount = course.course_modules.reduce((s, m) => s + m.course_lessons.filter((l) => done.has(l.id)).length, 0);
  const pct = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link to="/dashboard/courses" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to my courses
      </Link>

      <div className="card-glow rounded-3xl p-8 shadow-elegant md:p-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{course.level} • {course.duration} • {course.format}</div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">{course.short_description}</p>
        <div className="mt-5 max-w-md">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{doneCount} of {totalLessons} lessons complete</span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} />
        </div>
      </div>

      <div className="space-y-4">
        {course.course_modules.map((m) => (
          <div key={m.id} className="card-glow rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">{m.title}</h3>
            {m.summary && <p className="mt-1 text-sm text-muted-foreground">{m.summary}</p>}
            <div className="mt-4 space-y-2">
              {m.course_lessons.map((l) => {
                const isDone = done.has(l.id);
                return (
                  <div key={l.id} className="rounded-xl border border-border/50 bg-background/40 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(l.id)} className="mt-0.5 text-cyan transition hover:scale-110" aria-label={isDone ? "Mark incomplete" : "Mark complete"}>
                          {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                        </button>
                        <div>
                          <div className="font-medium">{l.title}</div>
                          {l.description && <div className="text-sm text-muted-foreground">{l.description}</div>}
                          <div className="mt-1 text-xs text-muted-foreground">~{l.duration_minutes ?? 30} min</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="soft" size="sm" onClick={() => toast.info("Video player coming soon")}>
                          <PlayCircle className="h-3.5 w-3.5" /> Video
                        </Button>
                        <Button variant="soft" size="sm" onClick={() => toast.info("Resources coming soon")}>
                          <Download className="h-3.5 w-3.5" /> Resources
                        </Button>
                        <Button variant={isDone ? "soft" : "hero"} size="sm" onClick={() => toggleComplete(l.id)}>
                          <FileText className="h-3.5 w-3.5" /> {isDone ? "Completed" : "Mark complete"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}