import { type ReactNode, useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, PlayCircle, CreditCard, User as UserIcon,
  LifeBuoy, LogOut, Menu,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/site/Logo";

const NAV = [
  { to: "/dashboard", label: "Dashboard Home", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/courses", label: "My Courses", icon: BookOpen, exact: false },
  { to: "/dashboard/learn", label: "Course Content", icon: PlayCircle, exact: false },
  { to: "/dashboard/payments", label: "Payments", icon: CreditCard, exact: true },
  { to: "/dashboard/profile", label: "Profile", icon: UserIcon, exact: true },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy, exact: true },
] as const;

function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const isActive = (to: string, exact: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)}>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <Button
          variant="soft"
          size="sm"
          className="w-full justify-start"
          onClick={async () => { await signOut(); navigate({ to: "/" }); }}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

function Inner({ title, children }: { title: string; children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-6">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-4 w-4" />
            </SidebarTrigger>
            <SidebarTrigger className="hidden lg:inline-flex" />
            <h1 className="font-display text-lg font-semibold tracking-tight">{title}</h1>
            <div className="ml-auto hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span className="truncate max-w-[180px]">{user.email}</span>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function DashboardLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <AuthProvider>
      <Inner title={title}>{children}</Inner>
      <Toaster position="top-center" theme="dark" richColors />
    </AuthProvider>
  );
}