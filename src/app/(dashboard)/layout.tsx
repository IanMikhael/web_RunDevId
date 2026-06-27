import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react"; // Pastikan sudah install: npm install lucide-react

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 border-r border-border bg-card p-6 lg:flex flex-col">
        <div className="mb-10 text-xl font-bold text-primary">RunDev.id</div>
        <nav className="flex flex-col gap-2 flex-1">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20}/>} label="Overview" />
          <NavItem href="/projects" icon={<Briefcase size={20}/>} label="Projects" />
          <NavItem href="/clients" icon={<Users size={20}/>} label="Clients" />
        </nav>
        <div className="border-t pt-6">
          <NavItem href="/settings" icon={<Settings size={20}/>} label="Settings" />
          <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-2">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <h2 className="font-semibold text-lg">Dashboard</h2>
          <div className="h-8 w-8 rounded-full bg-primary/20" />
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl transition-all">
      {icon}
      {label}
    </Link>
  );
}