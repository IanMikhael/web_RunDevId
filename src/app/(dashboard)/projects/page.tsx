"use client";

import { useState } from "react";

export default function ProjectsPage() {
  // Contoh data (nanti kita fetch dari Supabase)
  const projects = [
    { id: 1, title: "Sistem Kasir UMKM", client: "Toko Sembako Jaya", category: "Enterprise", status: "InProgress" },
    { id: 2, title: "Analisis Data Skripsi", client: "Budi Santoso", category: "AcademicRD", status: "Testing" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <button className="bg-primary px-4 py-2 rounded-xl text-white font-semibold text-sm hover:bg-primary/90">
          + New Project
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Proyek</th>
              <th className="px-6 py-4">Klien</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{p.title}</td>
                <td className="px-6 py-4">{p.client}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.status === 'InProgress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}