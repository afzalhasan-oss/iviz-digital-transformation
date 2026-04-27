import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo showTagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A modern technology partner helping organizations build, automate,
              and modernize with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Capabilities</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Website Development</li>
              <li>Custom Applications</li>
              <li>AI &amp; Automation</li>
              <li>Microsoft 365 &amp; Cloud</li>
              <li>Digital Strategy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-brand" />
                <a href="mailto:infoviz.org@gmail.com" className="hover:text-foreground">infoviz.org@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-brand" />
                <a href="tel:+12144257120" className="hover:text-foreground">(214) 425-7120</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                <span>4001 20th Ave NE<br />Olympia, WA 98506</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} InfoViz LLC. All rights reserved.</p>
          <p>Designed and engineered by iViz.</p>
        </div>
      </div>
    </footer>
  );
}