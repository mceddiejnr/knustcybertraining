
export interface UserRole {
  id: string;
  name: string;
  role: "admin" | "facilitator" | "participant" | "guest";
  email: string;
  password?: string;
  permissions: string[];
  lastActive?: string;
  createdAt: string;
}
