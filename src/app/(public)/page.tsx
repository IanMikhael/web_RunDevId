"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─────────── tiny reusable fade-up wrapper ─────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── IT-themed floating shapes ─────────── */
function FloatingElement({
  children,
  className = "",
  animate,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  animate: Record<string, unknown>;
  transition: Record<string, unknown>;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── IT Icon Components ─────────── */
const CodeBrackets = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Database = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const Cog = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Terminal = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ChartLine = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const Cloud = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
  </svg>
);

const Layers = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const PenTool = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const MobilePhone = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const Atom = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
  </svg>
);

const Wifi = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path d="M5 12.55a11 11 0 0114 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" />
  </svg>
);

const Shield = ({ className = "w-7 h-7" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CursorIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
  </svg>
);

/* ─────────── code snippet text component ─────────── */
const CodeSnippet = ({ code, className = "" }: { code: string; className?: string }) => (
  <span className={`font-mono text-[10px] leading-tight ${className}`}>
    {code}
  </span>
);

/* ─────────── tech stack logos marquee ─────────── */
const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
  "PostgreSQL", "Figma", "Docker", "AWS", "Python",
  "Laravel", "Flutter", "Redis", "GraphQL", "Supabase",
];

/* ─────────── service icons (inline SVG) ─────────── */
const serviceIcons = [
  <svg key="ent" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" /></svg>,
  <svg key="dev" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="ux" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg key="acd" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0l-3-1.5M12 20l3-1.5M5 11v5l7 4 7-4v-5" /></svg>,
];

/* ─────────── stats data ─────────── */
const stats = [
  { value: "150+", label: "Proyek Selesai" },
  { value: "98%", label: "Klien Puas" },
  { value: "5+", label: "Tahun Pengalaman" },
  { value: "24/7", label: "Support Aktif" },
];

/* ─────────── process steps ─────────── */
const steps = [
  { num: "01", title: "Discovery", desc: "Memahami kebutuhan, tantangan, dan tujuan bisnis Anda secara mendalam." },
  { num: "02", title: "Design", desc: "Merancang solusi digital yang intuitif, modern, dan sesuai brand Anda." },
  { num: "03", title: "Develop", desc: "Membangun produk dengan teknologi terkini dan standar kualitas tinggi." },
  { num: "04", title: "Launch & Scale", desc: "Deploy, monitoring, dan iterasi berkelanjutan untuk pertumbuhan bisnis." },
];

/* ─────────── testimonials ─────────── */
const testimonials = [
  {
    name: "Andi Pratama",
    role: "CEO, TechStartup.id",
    text: "Tim kami sangat puas dengan hasilnya. Sistem ERP yang dibangun benar-benar mengotomatisasi operasional kami.",
  },
  {
    name: "Sari Dewi",
    role: "Owner, Batik Nusantara",
    text: "Website e-commerce yang dibuat sangat profesional, penjualan online kami naik 300% dalam 3 bulan.",
  },
  {
    name: "Rizky Fauzan",
    role: "Mahasiswa S2 ITB",
    text: "Bantuan riset dan pengolahan data skripsi saya luar biasa. Responsif dan sangat menguasai bidangnya.",
  },
];

/* ═══════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ──────── GLOBAL BG EFFECTS ──────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-brand/20 blur-[160px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-secondary/20 blur-[140px]" />
        {/* extra mid glow */}
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-[200px]" />
      </div>

      {/* ════════════ HERO ════════════ */}
      <section className="relative flex min-h-[92vh] items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* ── IT-themed floating elements ── */}
        {/* Code brackets - top left */}
        <FloatingElement
          className="top-[14%] left-[5%] text-brand/15"
          animate={{ y: [0, -16, 0], rotate: [0, 6, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeBrackets className="w-12 h-12" />
        </FloatingElement>

        {/* Database - top right area */}
        <FloatingElement
          className="top-[20%] right-[7%] text-brand-secondary/15"
          animate={{ y: [0, 12, 0], rotate: [0, -5, 0], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Database className="w-10 h-10" />
        </FloatingElement>

        {/* Cog/Gear - bottom left */}
        <FloatingElement
          className="bottom-[25%] left-[10%] text-brand/12"
          animate={{ y: [0, 14, 0], rotate: [0, 90, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cog className="w-11 h-11" />
        </FloatingElement>

        {/* Terminal - right middle */}
        <FloatingElement
          className="top-[40%] right-[5%] text-brand-secondary/12"
          animate={{ y: [0, -10, 0], x: [0, 5, 0], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Terminal className="w-9 h-9" />
        </FloatingElement>

        {/* Chart line - bottom right */}
        <FloatingElement
          className="bottom-[18%] right-[12%] text-brand/15"
          animate={{ y: [0, -8, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChartLine className="w-10 h-10" />
        </FloatingElement>

        {/* Cloud - top center-right */}
        <FloatingElement
          className="top-[10%] left-[40%] text-brand-secondary/10"
          animate={{ y: [0, 10, 0], x: [0, -8, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-14 h-14" />
        </FloatingElement>

        {/* Layers - left middle */}
        <FloatingElement
          className="top-[55%] left-[3%] text-brand/10"
          animate={{ y: [0, -12, 0], rotate: [0, -8, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layers className="w-8 h-8" />
        </FloatingElement>

        {/* Pen tool (design) - bottom center-left */}
        <FloatingElement
          className="bottom-[15%] left-[30%] text-brand-secondary/12"
          animate={{ y: [0, 8, 0], rotate: [0, 15, 0], opacity: [0.12, 0.24, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <PenTool className="w-9 h-9" />
        </FloatingElement>

        {/* Atom - top far left */}
        <FloatingElement
          className="top-[35%] left-[2%] text-brand/8"
          animate={{ y: [0, -6, 0], rotate: [0, 180, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Atom className="w-12 h-12" />
        </FloatingElement>

        {/* Mobile phone - bottom right */}
        <FloatingElement
          className="bottom-[30%] right-[4%] text-brand-secondary/12"
          animate={{ y: [0, -10, 0], rotate: [0, -3, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MobilePhone className="w-8 h-8" />
        </FloatingElement>

        {/* WiFi - top left area */}
        <FloatingElement
          className="top-[8%] left-[18%] text-brand/10"
          animate={{ y: [0, 6, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wifi className="w-7 h-7" />
        </FloatingElement>

        {/* Shield - bottom left area */}
        <FloatingElement
          className="bottom-[40%] left-[6%] text-brand-secondary/10"
          animate={{ y: [0, -8, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-8 h-8" />
        </FloatingElement>

        {/* Cursor - right bottom */}
        <FloatingElement
          className="bottom-[10%] right-[25%] text-brand/12"
          animate={{ y: [0, -14, 0], x: [0, 6, 0], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <CursorIcon className="w-7 h-7" />
        </FloatingElement>

        {/* ── Code snippet floating texts ── */}
        <FloatingElement
          className="top-[22%] left-[14%] text-brand/[0.07]"
          animate={{ y: [0, -8, 0], opacity: [0.07, 0.14, 0.07] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeSnippet code={`const app = createApp()`} />
        </FloatingElement>

        <FloatingElement
          className="bottom-[28%] right-[8%] text-brand-secondary/[0.07]"
          animate={{ y: [0, 10, 0], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeSnippet code={`SELECT * FROM projects`} />
        </FloatingElement>

        <FloatingElement
          className="top-[60%] right-[16%] text-brand/[0.06]"
          animate={{ y: [0, -6, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeSnippet code={`npm run build`} />
        </FloatingElement>

        <FloatingElement
          className="top-[12%] right-[22%] text-brand-secondary/[0.06]"
          animate={{ y: [0, 8, 0], opacity: [0.06, 0.11, 0.06] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeSnippet code={`export default Home()`} />
        </FloatingElement>

        <FloatingElement
          className="bottom-[20%] left-[20%] text-brand/[0.05]"
          animate={{ y: [0, -10, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeSnippet code={`docker-compose up -d`} />
        </FloatingElement>

        {/* ── Small accent dots ── */}
        <FloatingElement
          className="top-[28%] right-[30%] h-2 w-2 rounded-full bg-brand/30"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingElement
          className="bottom-[38%] left-[25%] h-1.5 w-1.5 rounded-full bg-brand-secondary/40"
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingElement
          className="top-[48%] left-[12%] h-1 w-1 rounded-full bg-brand/50"
          animate={{ y: [0, -6, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Hero Content ── */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 text-sm font-semibold text-brand backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Terpercaya untuk Transformasi Digital
            </span>

            <h1 className="text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Elevating your{" "}
              <br className="hidden sm:block" />
              <span className="text-brand-gradient">Digital Vision.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Kami membantu bisnis dari skala UMKM hingga korporat untuk
              mengotomatisasi operasional dan tampil profesional di dunia
              digital.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-brand-gradient px-8 py-4 text-lg font-bold text-white shadow-lg shadow-brand/25 transition-all"
              >
                <span className="relative z-10">Konsultasi Gratis</span>
                <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.a>

              <motion.a
                href="/services"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-8 py-4 text-lg font-bold text-foreground backdrop-blur-sm transition-all hover:border-brand/30 hover:bg-card"
              >
                Lihat Layanan
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ════════════ TECH STACK MARQUEE ════════════ */}
      <section className="relative mt-4 mb-8 overflow-hidden border-y border-border/40 py-5">
        <FadeUp>
          <div className="flex animate-marquee whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="mx-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand/30" />
                {tech}
              </span>
            ))}
          </div>
        </FadeUp>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border/60 bg-card/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-md sm:p-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`text-center ${
                  i < stats.length - 1 ? "lg:border-r lg:border-border/60" : ""
                } ${i % 2 === 0 ? "sm:border-r sm:border-border/60" : ""}`}
              >
                <p className="text-3xl font-extrabold text-brand-gradient sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ════════════ SERVICES ════════════ */}
      <section className="relative mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* floating decorations around services */}
        <FloatingElement
          className="-top-8 right-[8%] text-brand/[0.06] hidden lg:block"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <CodeBrackets className="w-16 h-16" />
        </FloatingElement>
        <FloatingElement
          className="top-[40%] -left-4 text-brand-secondary/[0.06] hidden lg:block"
          animate={{ y: [0, 8, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Database className="w-14 h-14" />
        </FloatingElement>
        <FloatingElement
          className="bottom-[10%] right-[3%] text-brand/[0.05] hidden lg:block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChartLine className="w-12 h-12" />
        </FloatingElement>

        <FadeUp className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
            Layanan
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Solusi Digital <span className="text-brand-gradient">Kami</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Empat pilar layanan yang dirancang untuk mendorong pertumbuhan
            bisnis Anda secara menyeluruh.
          </p>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Enterprise Solutions", desc: "Otomatisasi bisnis & sistem manajemen profesional yang scalable." },
            { title: "Web & Mobile Dev", desc: "Pengembangan platform kustom berperforma tinggi untuk skala bisnis." },
            { title: "UI/UX Experience", desc: "Desain antarmuka modern yang berfokus pada konversi dan kepuasan user." },
            { title: "Academic R&D", desc: "Konsultasi sistem riset, pengolahan data & pengembangan skripsi." },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm transition-colors hover:border-brand/30"
              >
                <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-xl bg-brand/10 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand/20">
                    {serviceIcons[i]}
                  </div>
                  <h3 className="mb-3 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    Pelajari
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section className="relative mx-auto mt-32 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* floating decorations */}
        <FloatingElement
          className="-top-6 left-[12%] text-brand-secondary/[0.06] hidden lg:block"
          animate={{ y: [0, -8, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cog className="w-14 h-14" />
        </FloatingElement>
        <FloatingElement
          className="bottom-[5%] -right-2 text-brand/[0.06] hidden lg:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Terminal className="w-12 h-12" />
        </FloatingElement>

        <FadeUp className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
            Proses
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Bagaimana Kami <span className="text-brand-gradient">Bekerja</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Alur kerja yang terstruktur untuk memastikan setiap proyek berjalan
            efisien dan transparan.
          </p>
        </FadeUp>

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-14 left-[12.5%] right-[12.5%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          {steps.map((s, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="relative text-center lg:text-left">
                <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand/30 bg-background text-sm font-extrabold text-brand lg:mx-0">
                  {s.num}
                </div>
                <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="relative mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* floating decorations */}
        <FloatingElement
          className="top-[10%] -left-4 text-brand/[0.06] hidden lg:block"
          animate={{ y: [0, -12, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <PenTool className="w-14 h-14" />
        </FloatingElement>
        <FloatingElement
          className="bottom-[15%] right-[5%] text-brand-secondary/[0.06] hidden lg:block"
          animate={{ y: [0, 8, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layers className="w-12 h-12" />
        </FloatingElement>
        <FloatingElement
          className="top-[50%] right-[2%] text-brand/[0.05] hidden lg:block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-10 h-10" />
        </FloatingElement>

        <FadeUp className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
            Testimoni
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Apa Kata <span className="text-brand-gradient">Mereka</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Kepuasan klien adalah prioritas utama kami. Berikut beberapa
            pengalaman mereka.
          </p>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm transition-colors hover:border-brand/20"
              >
                {/* quote icon */}
                <div className="mb-5 text-brand/20">
                  <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="relative mx-auto mt-32 max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* floating decorations near CTA */}
        <FloatingElement
          className="-top-10 left-[6%] text-white/[0.06] hidden lg:block"
          animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Atom className="w-16 h-16" />
        </FloatingElement>
        <FloatingElement
          className="-bottom-4 right-[8%] text-white/[0.06] hidden lg:block"
          animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-14 h-14" />
        </FloatingElement>

        <FadeUp>
          <div className="relative overflow-hidden rounded-[2.5rem] p-12 sm:p-16 text-center">
            <div className="absolute inset-0 bg-brand-gradient" />
            {/* decorative circles */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
            {/* extra small circles */}
            <div className="pointer-events-none absolute top-[15%] left-[10%] h-3 w-3 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute bottom-[20%] right-[15%] h-2 w-2 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute top-[60%] left-[80%] h-4 w-4 rounded-full border border-white/10" />

            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Siap Memulai
                <br />
                Proyek Anda?
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg text-white/80">
                Ceritakan kebutuhan bisnis Anda, kami siap memberikan solusi
                terbaik.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-brand shadow-xl shadow-black/10 transition-all hover:bg-white/90"
              >
                Hubungi Kami Sekarang
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ════════════ MARQUEE KEYFRAMES (via style tag) ════════════ */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}