import { createClient } from "@/lib/supabase/server";
import { type Tenant } from "@/types/database";

export class TenantRepository {
  /**
   * Mengambil data tenant berdasarkan ID
   * Menggunakan server client untuk akses di Server Components
   */
  static async getTenantById(id: string): Promise<Tenant | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null) // Implementasi Soft Delete
      .single();

    if (error || !data) {
      console.error("Error fetching tenant:", error.message);
      return null;
    }

    return data as Tenant;
  }
}