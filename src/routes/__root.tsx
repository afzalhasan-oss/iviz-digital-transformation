import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "iViz — AI, Apps, Automation | InfoViz LLC" },
      { name: "description", content: "iViz helps small businesses, nonprofits, and public sector teams modernize with AI, custom applications, Microsoft 365, and automation." },
      { name: "author", content: "InfoViz LLC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "iViz — AI, Apps, Automation | InfoViz LLC" },
      { name: "twitter:title", content: "iViz — AI, Apps, Automation | InfoViz LLC" },
      { property: "og:description", content: "iViz helps small businesses, nonprofits, and public sector teams modernize with AI, custom applications, Microsoft 365, and automation." },
      { name: "twitter:description", content: "iViz helps small businesses, nonprofits, and public sector teams modernize with AI, custom applications, Microsoft 365, and automation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68195d61-60fa-4fff-a1cc-32aad59bfebf/id-preview-aad63e3a--a03987a7-b34e-471a-9e07-5d39b64560b0.lovable.app-1777435510538.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68195d61-60fa-4fff-a1cc-32aad59bfebf/id-preview-aad63e3a--a03987a7-b34e-471a-9e07-5d39b64560b0.lovable.app-1777435510538.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
