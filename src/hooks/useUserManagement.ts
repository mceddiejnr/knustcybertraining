
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/user";

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading users:', error);
        toast.error('Failed to load users');
        return;
      }

      if (data) {
        const typedUsers = data.map(user => ({
          ...user,
          role: user.role as "admin" | "facilitator" | "participant" | "guest"
        }));
        setUsers(typedUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    setUsers,
    loading,
    loadUsers
  };
};
