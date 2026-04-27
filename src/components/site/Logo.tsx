import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className = "", showTagline = false }: LogoProps) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-elegant transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-[15px] font-bold leading-none text-brand-foreground">i</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan ring-2 ring-background" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          i<span className="text-gradient">Viz</span>
        </span>
        {showTagline && (
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            AI · Apps · Automation
          </span>
        )}
      </span>
    </Link>
  );
}