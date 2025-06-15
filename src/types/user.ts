
export interface UserRole {
  id: string;
  name: string;
  role: "admin" | "facilitator" | "participant" | "guest";
  email: string;
  password?: string;
  permissions: string[];
  last_active?: string;
  created_at: string;
  updated_at?: string;
}
