import { useEffect, useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-border/60 glass" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/courses"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Courses
          </Link>
        </nav>
        <div className="hidden lg:block">
          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="soft" size="sm">
                <Link to="/dashboard"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
              </Button>
              <Button
                variant="hero"
                size="sm"
                onClick={async () => { await signOut(); navigate({ to: "/" }); }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="soft" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/courses"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <GraduationCap className="h-4 w-4" /> Courses
            </Link>
            {user ? (
              <>
                <Button asChild variant="soft" className="mt-2 w-full" size="lg">
                  <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                </Button>
                <Button
                  variant="hero"
                  className="mt-2 w-full"
                  size="lg"
                  onClick={async () => { setOpen(false); await signOut(); navigate({ to: "/" }); }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="soft" className="mt-2 w-full" size="lg">
                  <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
                </Button>
                <Button asChild variant="hero" className="mt-2 w-full" size="lg">
                  <Link to="/signup" onClick={() => setOpen(false)}>Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
