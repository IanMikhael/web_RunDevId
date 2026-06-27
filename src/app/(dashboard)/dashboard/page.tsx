export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang, Admin</h1>
        <p className="text-muted-foreground">Monitor operasional agensi Anda hari ini.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Aktif Proyek</p>
          <h3 className="text-3xl font-bold mt-2">6</h3>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Klien UMKM</p>
          <h3 className="text-3xl font-bold mt-2">12</h3>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Pendapatan Bulan Ini</p>
          <h3 className="text-3xl font-bold mt-2">Rp 15.000.000</h3>
        </div>
      </div>
    </div>
  );
}