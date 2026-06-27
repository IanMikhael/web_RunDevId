import React from "react";
import Image from "next/image";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* ================= FLOATING HEADER ================= */}
      <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-border bg-background/70 px-6 backdrop-blur-xl shadow-lg transition-all">
          
          <div className="flex items-center gap-2">
            <a href="/" className="focus:outline-none">
              <Image 
                src="/logo.png" 
                alt="RunDev Logo" 
                width={140} 
                height={45} 
                className="h-8 w-auto transition-transform duration-300 hover:scale-105"
                priority
              />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">Beranda</a>
            <a href="#" className="transition-colors hover:text-primary">Tentang</a>
            <a href="#" className="transition-colors hover:text-primary">Layanan</a>
            <a href="#" className="transition-colors hover:text-primary">Portofolio</a>
          </nav>

          <div>
            <a 
              href="/login" 
              className="inline-flex rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Workspace
            </a>
          </div>
          
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col pt-8 pb-12">
        {children}
      </main>

      {/* ================= MODERN FOOTER ================= */}
      <footer className="mt-auto border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="RunDev Logo" 
              width={100} 
              height={30} 
              className="h-6 w-auto opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100" 
            />
          </div>
          <p className="text-center text-sm font-medium text-muted-foreground">
            &copy; {new Date().getFullYear()} RunDev.id. Innovate. Accelerate. Develop.
          </p>
        </div>
      </footer>
    </div>
  );
}