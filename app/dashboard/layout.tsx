import { ReactNode } from "react";
import Image from "next/image";
import UserMenu from "@/components/navigation/user-menu";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Input } from "@/components/ui/input";
import { MobileFooterNav } from "@/components/navigation/mobile-footer-nav";

export const metadata = {
  title: "Riders Inn Dashboard",
  description: "Pferde-Community und Trainings-App",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:flex">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1 min-w-0">
          <Header />
          <main className="flex-1 min-w-0 p-4 md:p-6">
            {children}
          </main>
          <div className="md:hidden">
            <MobileFooterNav />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 text-foreground backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* ✅ Trigger in den Header, links, sauber ausgerichtet */}
          <div className="hidden md:flex items-center gap-2">
            <SidebarTrigger className="
                md:hidden 
                h-10 w-10
                rounded-md
                border border-border
                bg-background
                hover:bg-muted" />
            <SidebarTrigger className="
                hidden 
                md:inline-flex 
                h-10 w-10
                rounded-md
                border border-border
                bg-background
                hover:bg-muted"  />
          </div>


          <div className="flex items-center gap-2">
            <Image
              src="/logos/horsing-logo.png"
              alt="Logo"
              width={1536}
              height={1024}
              className="block dark:hidden h-10 w-auto"
              sizes="80px"
              priority
            />
            <Image
              src="/logos/horsing-logo-dark.png"
              alt="Logo"
              width={1536}
              height={1024}
              className="hidden dark:block h-10 w-auto"
              sizes="80px"
              priority
            />

            <h1 className="leading-tight">
              <span className="block text-md font-bold text-muted-foreground">Riders</span>
              <span className="block text-md font-bold text-muted-foreground">Inn</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Suche..."
            className="hidden sm:block h-9 w-40 md:w-64 rounded-md border border-input bg-background px-3 text-sm"
          />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}