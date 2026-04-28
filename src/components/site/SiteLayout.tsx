import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" theme="dark" richColors />
      </div>
    </AuthProvider>
  );
}
