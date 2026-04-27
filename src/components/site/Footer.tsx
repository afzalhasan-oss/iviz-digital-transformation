import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo showTagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A modern technology partner helping organizations build, automate,
              and modernize with confidence.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="#" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition hover:border-brand/50 hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition hover:border-brand/50 hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#about" className="inline-flex items-center gap-1 hover:text-foreground">About <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><a href="#skills" className="inline-flex items-center gap-1 hover:text-foreground">Skills <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><a href="#projects" className="inline-flex items-center gap-1 hover:text-foreground">Projects <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><a href="#experience" className="inline-flex items-center gap-1 hover:text-foreground">Experience <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><a href="#contact" className="inline-flex items-center gap-1 hover:text-foreground">Contact <ArrowUpRight className="h-3 w-3" /></a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-cyan" />
                <a href="mailto:infoviz.org@gmail.com" className="hover:text-foreground">infoviz.org@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-cyan" />
                <a href="tel:+12144257120" className="hover:text-foreground">(214) 425-7120</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan" />
                <span>4001 20th Ave NE<br />Olympia, WA 98506</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} InfoViz LLC. All rights reserved.</p>
          <p>Designed and engineered by <span className="text-foreground">iViz</span>.</p>
        </div>
      </div>
    </footer>
  );
}
