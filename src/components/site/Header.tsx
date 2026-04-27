import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild variant="hero" size="sm">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-lg px-4 py-3 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="hero" className="mt-2 w-full" size="lg">
              <Link to="/contact" onClick={() => setOpen(false)}>Book a Consultation</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}