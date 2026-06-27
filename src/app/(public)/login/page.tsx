"use client";

import { loginAction } from "@/features/auth/auth.action";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const res = await loginAction(formData);
    
    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-card rounded-[2.5rem] shadow-2xl flex overflow-hidden border border-border/50 relative"
      >
        {/* ================= LEFT SIDE: FORM ================= */}
        <div className="w-full lg:w-1/2 p-8 sm:p-14 xl:p-20 flex flex-col justify-center relative z-10">
          <div className="mb-10 lg:hidden">
            <Image src="/logo.png" alt="RunDev Logo" width={140} height={40} className="h-10 w-auto" />
          </div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Sign In to your Account
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Sistem Manajemen Bisnis & Operasional RunDev.id
            </p>
          </motion.div>

          <form action={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter Email"
                  className="block w-full rounded-xl border-transparent bg-muted/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter Password"
                  className="block w-full rounded-xl border-transparent bg-muted/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 flex w-full justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 animate-spin text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Validating...</span>
                </div>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Not registered yet?{" "}
            <a href="#" className="font-semibold text-primary hover:text-primary/80">
              Contact Administrator
            </a>
          </p>
        </div>

        {/* ================= RIGHT SIDE: BRANDING ================= */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900">
          {/* Aksen Lengkungan (Curve Background) */}
          <div className="absolute inset-y-0 right-0 w-[120%] bg-gradient-to-bl from-primary/20 via-primary/5 to-transparent rounded-l-[100%] translate-x-1/4 scale-y-110" />
          <div className="absolute inset-y-0 right-0 w-[100%] bg-gradient-to-br from-primary/10 to-transparent rounded-l-[100%] translate-x-1/3" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Glassmorphism Card Wrapper untuk Logo agar lebih menonjol */}
            <div className="rounded-3xl bg-background/40 p-10 backdrop-blur-md border border-white/20 shadow-xl dark:bg-black/20">
              <Image 
                src="/logo.png" 
                alt="RunDev Logo" 
                width={300} 
                height={100} 
                className="h-auto w-64 drop-shadow-md"
                priority
              />
            </div>
            
            <div className="mt-12 flex gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md border border-border/50 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md border border-border/50 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md border border-border/50 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}