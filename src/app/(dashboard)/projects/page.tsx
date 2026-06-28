import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { addClient, addProject, updateProject, deleteProject } from "../actions";
import SearchableClientSelect from "@/components/SearchableClientSelect";
import Link from "next/link";

async function fetchData() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );
  const { data: projects } = await supabase
    .from("projects")
    .select(`*, clients (name)`)
    .order("created_at", { ascending: false });
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("name", { ascending: true });
  return { projects: projects || [], clients: clients || [] };
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string; icon: string }> = {
    Done:       { label: "Selesai",           className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",  icon: "✓" },
    Testing:    { label: "Testing / QA",      className: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",    icon: "⚗" },
    InProgress: { label: "Dikerjakan",        className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",          icon: "▶" },
    Planned:    { label: "Direncanakan",      className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",       icon: "○" },
  };
  const c = config[status] || config.Planned;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${c.className}`}>
      <span className="text-[10px]">{c.icon}</span>
      {c.label}
    </span>
  );
}

// ─── Category Badge ────────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const config: Record<string, { label: string; className: string }> = {
    Enterprise: { label: "Enterprise ERP",   className: "bg-slate-100 text-slate-600" },
    WebMobile:  { label: "Web & Mobile",     className: "bg-cyan-50 text-cyan-700" },
    UIUX:       { label: "UI/UX Design",     className: "bg-pink-50 text-pink-700" },
    AcademicRD: { label: "Riset Akademik",   className: "bg-indigo-50 text-indigo-700" },
  };
  const c = config[category] || { label: category, className: "bg-gray-100 text-gray-600" };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold ${c.className}`}>
      {c.label}
    </span>
  );
}

// ─── Date Formatter ────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ─── Deadline Info ─────────────────────────────────────────────────────────────
function DeadlineInfo({ dateStr, status }: { dateStr: string; status: string }) {
  if (status === "Done") {
    return <span className="text-sm text-muted-foreground">{formatDate(dateStr)}</span>;
  }
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const deadline = new Date(dateStr); deadline.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  let pill: React.ReactNode = null;
  if (diffDays < 0) {
    pill = <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">Terlewat {Math.abs(diffDays)}h</span>;
  } else if (diffDays <= 3) {
    pill = <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600">{diffDays}h lagi ⚠</span>;
  } else if (diffDays <= 7) {
    pill = <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">{diffDays}h lagi</span>;
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm">{formatDate(dateStr)}</span>
      {pill}
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, accent, icon,
}: {
  label: string; value: number | string; sub?: string; accent?: string; icon: string;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${accent ?? "bg-muted"}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{label}</p>
        <p className="text-2xl font-black tracking-tight leading-none">{value}</p>
        {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Input / Select shared styles ─────────────────────────────────────────────
const inputCls =
  "w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary/25 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/40";

const labelCls = "block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5";

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function ProjectsPage(
  props: { searchParams: Promise<{ edit?: string; delete?: string }> }
) {
  const searchParams = await props.searchParams;
  const editId = searchParams?.edit;
  const deleteId = searchParams?.delete;

  const { projects, clients } = await fetchData();
  const editProject = editId ? projects.find((p) => p.id === editId) : null;
  const deleteProjectData = deleteId ? projects.find((p) => p.id === deleteId) : null;

  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => p.status === "InProgress").length;
  const done = projects.filter((p) => p.status === "Done").length;
  const upcomingDeadlines = projects.filter((p) => {
    if (p.status === "Done") return false;
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const d = new Date(p.deadline); d.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 7;
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-10">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="pt-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-1.5">render.id · Internal Tools</p>
          <h1 className="text-3xl font-black tracking-tight">Project Management</h1>
          <p className="text-muted-foreground mt-1.5 text-sm max-w-lg">
            Kelola klien dan pantau progres proyek secara terpusat — dari perencanaan sampai selesai.
          </p>
        </div>
      </div>

      {/* ── STAT CARDS ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Proyek"       value={totalProjects}      icon="📁" accent="bg-slate-100"   />
        <StatCard label="Sedang Dikerjakan"  value={inProgress}         icon="⚡" accent="bg-blue-100"   sub={inProgress > 0 ? "proyek aktif" : "tidak ada"} />
        <StatCard label="Selesai"            value={done}               icon="✅" accent="bg-emerald-100" sub={totalProjects > 0 ? `${Math.round((done / totalProjects) * 100)}% completion rate` : undefined} />
        <StatCard label="Deadline < 7 Hari" value={upcomingDeadlines}  icon="⏰" accent={upcomingDeadlines > 0 ? "bg-amber-100" : "bg-slate-100"} sub={upcomingDeadlines > 0 ? "butuh perhatian" : "aman semua"} />
      </div>

      {/* ── FORMS ──────────────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Form Klien */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-base">👤</div>
            <div>
              <h2 className="font-bold text-sm">Tambah Klien Baru</h2>
              <p className="text-[11px] text-muted-foreground">Perusahaan, individu, atau instansi</p>
            </div>
          </div>
          <form action={addClient} className="p-6 space-y-4 flex-1 flex flex-col">
            <div>
              <label className={labelCls}>Nama Klien / Perusahaan <span className="text-red-500 normal-case font-normal">*</span></label>
              <input required name="name" type="text" placeholder="cth: PT Maju Bersama" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Jenis Klien <span className="text-red-500 normal-case font-normal">*</span></label>
              <select required name="type" className={inputCls}>
                <option value="Business">🏢  Bisnis (UMKM / Korporat)</option>
                <option value="Academic">🎓  Akademik (Mahasiswa / Dosen)</option>
                <option value="Gov">🏛️  Pemerintahan</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Kontak</label>
              <input name="contact_info" type="text" placeholder="0812xxxx atau email@domain.com" className={inputCls} />
            </div>
            <div className="flex-1" />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 mt-auto"
            >
              <span>+</span> Simpan Klien
            </button>
          </form>
        </div>

        {/* Form Proyek */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-base">📋</div>
            <div>
              <h2 className="font-bold text-sm">Buat Proyek Baru</h2>
              <p className="text-[11px] text-muted-foreground">Daftarkan detail dan tenggat proyek</p>
            </div>
          </div>
          <form action={addProject} className="p-6 space-y-4 flex-1 flex flex-col">
            <div>
              <label className={labelCls}>Nama Proyek <span className="text-red-500 normal-case font-normal">*</span></label>
              <input required name="title" type="text" placeholder="cth: Sistem Inventory PT Maju" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Klien <span className="text-red-500 normal-case font-normal">*</span></label>
              <SearchableClientSelect clients={clients} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Kategori <span className="text-red-500 normal-case font-normal">*</span></label>
                <select required name="category" className={inputCls}>
                  <option value="Enterprise">Enterprise ERP</option>
                  <option value="WebMobile">Web & Mobile Dev</option>
                  <option value="UIUX">UI/UX Design</option>
                  <option value="AcademicRD">Riset Akademik</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Status Awal <span className="text-red-500 normal-case font-normal">*</span></label>
                <select required name="status" className={inputCls}>
                  <option value="Planned">Direncanakan</option>
                  <option value="InProgress">Dikerjakan</option>
                  <option value="Testing">Testing / QA</option>
                  <option value="Done">Selesai</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Deadline <span className="text-red-500 normal-case font-normal">*</span></label>
              <input required name="deadline" type="date" className={inputCls} />
            </div>
            <div className="flex-1" />
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 mt-auto"
            >
              <span>+</span> Buat Proyek
            </button>
          </form>
        </div>
      </div>

      {/* ── TABLE ──────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">

        {/* Table header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-base">📊</div>
            <div>
              <h2 className="font-bold text-sm">Semua Proyek</h2>
              <p className="text-[11px] text-muted-foreground">{totalProjects} proyek terdaftar</p>
            </div>
          </div>
          {/* Bisa tambah filter/search di sini nanti */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Aktif
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-2" /> Selesai
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-2" /> Deadline dekat
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 text-3xl">📋</div>
            <p className="font-bold text-sm">Belum ada proyek</p>
            <p className="text-xs text-muted-foreground mt-1.5 max-w-xs mx-auto">
              Gunakan form di atas untuk mendaftarkan klien dan membuat proyek pertama kamu.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Proyek</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Klien</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Kategori</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Deadline</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {projects.map((p) => {
                  // Highlight row if deadline is within 3 days and not done
                  const now = new Date(); now.setHours(0, 0, 0, 0);
                  const dl = new Date(p.deadline); dl.setHours(0, 0, 0, 0);
                  const diff = Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  const isUrgent = p.status !== "Done" && diff <= 3;
                  const isOverdue = p.status !== "Done" && diff < 0;

                  return (
                    <tr
                      key={p.id}
                      className={`transition-colors ${
                        isOverdue
                          ? "bg-red-50/40 hover:bg-red-50/60"
                          : isUrgent
                          ? "bg-amber-50/30 hover:bg-amber-50/50"
                          : "hover:bg-muted/20"
                      }`}
                    >
                      {/* Proyek */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          {isOverdue && <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" title="Tenggat terlewat" />}
                          {isUrgent && !isOverdue && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" title="Tenggat dekat" />}
                          {!isUrgent && !isOverdue && <span className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />}
                          <span className="font-semibold text-sm leading-snug">{p.title}</span>
                        </div>
                      </td>

                      {/* Klien */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{p.clients?.name || "—"}</span>
                      </td>

                      {/* Kategori */}
                      <td className="px-6 py-4">
                        <CategoryBadge category={p.category} />
                      </td>

                      {/* Deadline */}
                      <td className="px-6 py-4">
                        <DeadlineInfo dateStr={p.deadline} status={p.status} />
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={p.status} />
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/projects?edit=${p.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                          >
                            ✏️ Edit
                          </Link>
                          <Link
                            href={`/projects?delete=${p.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            🗑️ Hapus
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── MODAL EDIT ─────────────────────────────────────────────────────── */}
      {editProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <Link href="/projects" className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">✏️</div>
                <div>
                  <h3 className="font-black text-base">Edit Proyek</h3>
                  <p className="text-[11px] text-muted-foreground">Perbarui detail informasi di bawah ini</p>
                </div>
              </div>
              <Link href="/projects" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </div>

            {/* Modal Body */}
            <form action={updateProject}>
              <input type="hidden" name="id" value={editProject.id} />
              <div className="p-6 space-y-4">
                <div>
                  <label className={labelCls}>Nama Proyek <span className="text-red-500 normal-case font-normal">*</span></label>
                  <input required name="title" type="text" defaultValue={editProject.title}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className={labelCls}>Klien <span className="text-red-500 normal-case font-normal">*</span></label>
                  <select required name="client_id" defaultValue={editProject.client_id}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all">
                    {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Kategori <span className="text-red-500 normal-case font-normal">*</span></label>
                    <select required name="category" defaultValue={editProject.category}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all">
                      <option value="Enterprise">Enterprise ERP</option>
                      <option value="WebMobile">Web & Mobile Dev</option>
                      <option value="UIUX">UI/UX Design</option>
                      <option value="AcademicRD">Riset Akademik</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Status <span className="text-red-500 normal-case font-normal">*</span></label>
                    <select required name="status" defaultValue={editProject.status}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all">
                      <option value="Planned">Direncanakan</option>
                      <option value="InProgress">Dikerjakan</option>
                      <option value="Testing">Testing / QA</option>
                      <option value="Done">Selesai</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Deadline <span className="text-red-500 normal-case font-normal">*</span></label>
                  <input required name="deadline" type="date" defaultValue={editProject.deadline}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all" />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <Link href="/projects"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Batal
                </Link>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL HAPUS ────────────────────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <Link href="/projects" className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-8 text-center">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5 text-2xl ring-4 ring-red-50/50">
                🗑️
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Hapus Proyek?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Proyek{" "}
                <span className="font-bold text-slate-800">"{deleteProjectData?.title}"</span>{" "}
                akan dihapus permanen dan tidak bisa dikembalikan.
              </p>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <Link href="/projects"
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 text-sm font-semibold hover:bg-slate-100 transition-colors text-center">
                Batal
              </Link>
             <form action={deleteProject} className="flex-1 flex">
                <input type="hidden" name="id" value={deleteId} />
               <button type="submit" className="w-full py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors shadow-sm">
                  Ya, Hapus
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
