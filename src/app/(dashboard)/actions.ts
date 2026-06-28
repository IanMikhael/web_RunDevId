"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Helper untuk inisialisasi Supabase di Server (Sekarang pakai async/await)
const createClient = async () => {
  const cookieStore = await cookies(); // <--- INI KUNCI FIX-NYA
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Abaikan error saat set cookies di server component
          }
        },
      },
    }
  );
};

// ==========================================
// ACTION: TAMBAH KLIEN BARU
// ==========================================
export async function addClient(formData: FormData) {
  const supabase = await createClient(); // <--- Wajib await di sini sekarang
  
  // 1. Dapatkan user yang sedang login
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 2. Dapatkan tenant_id milik user
  const { data: userData } = await supabase
    .from("users")
    .select("tenant_id")
    .eq("id", user.id)
    .single();

  if (!userData?.tenant_id) throw new Error("Tenant not found");

  // 3. Insert klien baru
  const { error } = await supabase.from("clients").insert({
    tenant_id: userData.tenant_id,
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    contact_info: formData.get("contact_info") as string,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}

// ==========================================
// ACTION: TAMBAH PROYEK BARU
// ==========================================
export async function addProject(formData: FormData) {
  const supabase = await createClient(); // <--- Wajib await di sini sekarang
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: userData } = await supabase
    .from("users")
    .select("tenant_id")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("projects").insert({
    tenant_id: userData?.tenant_id,
    client_id: formData.get("client_id") as string,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    deadline: formData.get("deadline") as string,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}

// ==========================================
// ACTION: UPDATE PROYEK
// ==========================================
export async function updateProject(formData: FormData) {
  const supabase = await createClient();
  const projectId = formData.get("id") as string;

  const { error } = await supabase
    .from("projects")
    .update({
      title: formData.get("title") as string,
      client_id: formData.get("client_id") as string,
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      deadline: formData.get("deadline") as string,
    })
    .eq("id", projectId);

  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}

// ==========================================
// ACTION: HAPUS PROYEK
// ==========================================
// export async function deleteProject(formData: FormData) {
//   const id = formData.get("id") as string;
//   console.log("DELETE dipanggil, id:", id);
//   const supabase = await createClient();
//   const { error } = await supabase
//     .from("projects")
//     .delete()
//     .eq("id", id);
//   if (error) throw new Error(error.message);
//   revalidatePath("/projects");
// }

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  const supabase = await createClient();

  // Harus authenticate dulu seperti action lainnya
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: userData } = await supabase
    .from("users")
    .select("tenant_id")
    .eq("id", user.id)
    .single();

  if (!userData?.tenant_id) throw new Error("Tenant not found");

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("tenant_id", userData.tenant_id) // <-- ini kuncinya
    .select();

  console.log("data:", data, "error:", error);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}