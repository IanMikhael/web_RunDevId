import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Fungsi fetch data Klien beserta jumlah proyeknya
async function fetchClients() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { getAll() { return cookieStore.getAll(); } }
    }
  );

  // Ambil klien dan hitung ada berapa proyek yang terhubung ke klien tersebut
  const { data: clients } = await supabase
    .from("clients")
    .select(`
      *,
      projects (id)
    `)
    .order("created_at", { ascending: false });

  return clients || [];
}

export default async function ClientsPage() {
  const clients = await fetchClients();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daftar Klien</h1>
          <p className="text-muted-foreground mt-1">Database kontak klien RunDev.id.</p>
        </div>
        {/* Tombol ini nantinya bisa kita buatkan modal/pop-up khusus jika mau */}
        <button className="bg-primary px-4 py-2 rounded-xl text-primary-foreground font-semibold text-sm hover:opacity-90 transition">
          + Klien Baru
        </button>
      </div>

      {/* ================= DATA TABLE SECTION ================= */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Nama / Perusahaan</th>
                <th className="px-6 py-4">Tipe Klien</th>
                <th className="px-6 py-4">Info Kontak</th>
                <th className="px-6 py-4">Total Proyek</th>
                <th className="px-6 py-4">Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Belum ada data klien. Silakan tambahkan klien pertama Anda.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="border-t border-border hover:bg-muted/30 transition">
                    <td className="px-6 py-4 font-bold">{client.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        client.type === 'Business' ? 'bg-blue-100 text-blue-700' :
                        client.type === 'Academic' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {client.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{client.contact_info || "-"}</td>
                    <td className="px-6 py-4 font-medium">
                      {/* Menampilkan jumlah array dari relasi tabel projects */}
                      {client.projects?.length || 0} Proyek
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(client.created_at).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}