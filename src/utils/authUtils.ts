
import { supabase } from "@/integrations/supabase/client";

export const createAuthUser = async (email: string, password: string, name: string, role: string) => {
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: {
      full_name: name,
      role: role
    }
  });

  return { authData, authError };
};

export const deleteAuthUser = async (email: string) => {
  // Find user by email to get auth user ID
  const { data: authUsers, error: authListError } = await supabase.auth.admin.listUsers();
  
  if (!authListError && authUsers?.users) {
    const authUser = authUsers.users.find((authU: any) => authU.email === email);
    
    if (authUser) {
      // Delete from auth
      const { error: authDeleteError } = await supabase.auth.admin.deleteUser(authUser.id);
      return { authDeleteError };
    }
  }
  
  return { authDeleteError: null };
};

export const updateAuthUserPassword = async (email: string, newPassword: string) => {
  const { data: authUsers, error: authListError } = await supabase.auth.admin.listUsers();
  
  if (!authListError && authUsers?.users) {
    const authUser = authUsers.users.find((authU: any) => authU.email === email);
    
    if (authUser) {
      const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
        authUser.id,
        { password: newPassword }
      );
      
      return { authUpdateError };
    }
  }
  
  return { authUpdateError: new Error('User not found') };
};
