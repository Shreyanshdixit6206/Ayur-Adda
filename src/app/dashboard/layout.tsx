import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Leaf, BookOpen, Video, Users, Bell, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DoubtSolver } from "@/components/DoubtSolver";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-xl font-heading text-primary font-bold">AyurAdda</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <NavLink href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
          <NavLink href="/courses" icon={<Video />} label="My Courses" />
          <NavLink href="/notes" icon={<BookOpen />} label="Notes Library" />
          <NavLink href="/live" icon={<Users />} label="Live Classes" />
        </nav>

        <div className="p-4 border-t border-border">
          <form action="/api/auth/signout" method="POST">
             <Button variant="ghost" className="w-full justify-start text-destructive hover:text-white hover:bg-destructive" type="submit">
               <LogOut className="w-5 h-5 mr-3" />
               Sign Out
             </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="md:hidden">
            {/* Mobile Menu Toggle Placeholder */}
             <Leaf className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1" />

          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="text-muted-foreground relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
             </Button>
             
             <div className="flex items-center gap-3 border-l border-border pl-4">
               <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-medium text-foreground">{session.user.name || "Student"}</span>
                  <span className="text-xs text-muted-foreground capitalize">{session.user.role.toLowerCase()}</span>
               </div>
               <Avatar>
                 <AvatarImage src={session.user.image || ""} />
                 <AvatarFallback className="bg-primary/20 text-primary">{session.user.name?.charAt(0) || "U"}</AvatarFallback>
               </Avatar>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-background/50 p-6 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
          <DoubtSolver />
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center px-4 py-3 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium">
        <span className="w-5 h-5 mr-3">{icon}</span>
        {label}
      </div>
    </Link>
  );
}
