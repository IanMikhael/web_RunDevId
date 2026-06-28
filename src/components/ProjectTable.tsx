"use client";

import { useState } from "react";
import { updateProject, deleteProject } from "../app/(dashboard)/actions";

type Project = {
  id: string;
  title: string;
  client_id: string;
  category: string;
  status: string;
  deadline: string;
  clients: { name: string } | null;
};

type Client = { id: string; name: string };

export default function ProjectTable({ projects, clients }: { projects: Project[]; clients: Client[] }) {
  // State untuk Modal Edit
  const [editProject, setEditProject] = useState<Project | null>(null);
  
  // State untuk Modal Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
    } catch (err) {
      alert("Gagal menghapus proyek");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border">
        <h2 className="font-semibold text-lg">Daftar Proyek Aktif</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Nama Proyek</th>
              <th className="px-6 py-4">Klien</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  Belum ada proyek. Silakan tambahkan di atas.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/30 transition">
                  <td className="px-6 py-4 font-bold">{p.title}</td>
                  <td className="px-6 py-4">{p.clients?.name || "-"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.category}</td>
                  <td className="px-6 py-4">{new Date(p.deadline).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      p.status === "Done" ? "bg-green-100 text-green-700" :
                      p.status === "Testing" ? "bg-purple-100 text-purple-700" :
                      p.status === "InProgress" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => setEditProject(p)}
                      className="text-primary font-medium hover:underline text-xs"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setDeleteId(p.id)}
                      className="text-destructive font-medium hover:underline text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL EDIT ================= */}
      {editProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
            <h3 className="font-bold text-lg mb-4">Edit Data Proyek</h3>
            <form action={async (formData) => {
              await updateProject(formData);
              setEditProject(null);
            }} className="space-y-4">
              <input type="hidden" name="id" value={editProject.id} />
              
              <div>
                <label className="text-xs text-muted-foreground font-semibold block mb-1">Nama Proyek</label>
                <input required name="title" type="text" defaultValue={editProject.title} className="w-full p-3 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary outline-none" />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold block mb-1">Klien</label>
                <select required name="client_id" defaultValue={editProject.client_id} className="w-full p-3 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary outline-none">
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-semibold block mb-1">Kategori</label>
                  <select required name="category" defaultValue={editProject.category} className="w-full p-3 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary outline-none">
                    <option value="Enterprise">Enterprise ERP</option>
                    <option value="WebMobile">Web & Mobile Dev</option>
                    <option value="UIUX">UI/UX Design</option>
                    <option value="AcademicRD">Academic R&D (Skripsi)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-semibold block mb-1">Status</label>
                  <select required name="status" defaultValue={editProject.status} className="w-full p-3 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary outline-none">
                    <option value="Planned">Planned</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Testing">Testing / QA</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold block mb-1">Deadline</label>
                <input required name="deadline" type="date" defaultValue={editProject.deadline} className="w-full p-3 rounded-xl bg-background border border-border text-sm focus:ring-2 focus:ring-primary outline-none" />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setEditProject(null)} className="px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DELETE CONFIRMATION ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-sm shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Hapus Proyek?</h3>
            <p className="text-sm text-muted-foreground mb-6">Tindakan ini tidak dapat dibatalkan. Data proyek akan dihapus permanen dari sistem RunDev.</p>
            <div className="flex justify-center space-x-3">
              <button disabled={isDeleting} onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition disabled:opacity-50">Batal</button>
              <button disabled={isDeleting} onClick={handleDelete} className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-bold hover:opacity-90 transition disabled:opacity-50">
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}