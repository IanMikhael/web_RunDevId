import { createClient } from "@/lib/supabase/server";
import { type UserProfile } from "@/types/database";

export class UserRepository {
  /**
   * Mengambil profil pengguna yang sedang login
   */
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    const supabase = await createClient();
    
    // Dapatkan sesi auth saat ini
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    // Ambil detail profil dari tabel public.users
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .is("deleted_at", null)
      .single();

    if (error || !data) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }

    return data as UserProfile;
  }
}