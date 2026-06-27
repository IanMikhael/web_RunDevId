export type UserRole = "owner" | "admin" | "finance" | "developer" | "editor";

export interface Tenant {
  id: string;
  name: string;
  domain: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserProfile {
  id: string;
  tenant_id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}