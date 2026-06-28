"use client";

import { useState, useRef, useEffect } from "react";

// Tipe data untuk props klien
type Client = { id: string; name: string };

export default function SearchableClientSelect({ clients }: { clients: Client[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown jika user klik di luar area komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter klien berdasarkan ketikan user
  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input tersembunyi (hidden). 
        Ini yang akan dikirim ke Server Action (addProject) lewat FormData 
      */}
      <input type="hidden" name="client_id" value={selected?.id || ""} required />

      <div
        className="w-full p-3 rounded-xl bg-background border border-border text-sm cursor-text flex justify-between items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
        onClick={() => setIsOpen(true)}
      >
        <input
          type="text"
          placeholder="-- Ketik Cari Klien --"
          className="w-full outline-none bg-transparent"
          value={isOpen ? search : selected ? selected.name : ""}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            if (selected) setSelected(null); // Reset pilihan jika user mengetik ulang
          }}
          onFocus={() => setIsOpen(true)}
        />
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-20 w-full mt-2 max-h-60 overflow-auto bg-card border border-border rounded-xl shadow-xl">
          {filteredClients.length > 0 ? (
            filteredClients.map((c) => (
              <li
                key={c.id}
                className="p-3 text-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={() => {
                  setSelected(c);
                  setSearch(""); // Bersihkan kolom pencarian internal
                  setIsOpen(false); // Tutup dropdown
                }}
              >
                {c.name}
              </li>
            ))
          ) : (
            <li className="p-3 text-sm text-muted-foreground text-center">Klien tidak ditemukan</li>
          )}
        </ul>
      )}
    </div>
  );
}