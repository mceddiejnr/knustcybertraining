
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/user";

export const getDefaultPermissions = (role: string): string[] => {
  switch (role) {
    case "admin":
      return ["read", "write", "delete", "manage_users", "manage_settings"];
    case "facilitator":
      return ["read", "write", "manage_content"];
    case "participant":
      return ["read", "write"];
    case "guest":
      return ["read"];
    default:
      return ["read"];
  }
};

export const addUser = async (
  newUser: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>,
  setUsers: React.Dispatch<React.SetStateAction<UserRole[]>>
) => {
  try {
    // First, create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: newUser.email,
      password: newUser.password,
      email_confirm: true,
      user_metadata: {
        full_name: newUser.name,
        role: newUser.role
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      toast.error('Failed to create user account');
      return;
    }

    // Then store in user_roles table
    const { data, error } = await supabase
      .from('user_roles')
      .insert([{
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        permissions: newUser.permissions,
        last_active: newUser.last_active
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding user to roles table:', error);
      toast.error('Failed to add user to roles table');
      return;
    }

    if (data) {
      const typedUser = {
        ...data,
        role: data.role as "admin" | "facilitator" | "participant" | "guest"
      };
      setUsers(prev => [typedUser, ...prev]);
      toast.success(`User ${data.name} created successfully`);
    }
  } catch (error) {
    console.error('Error adding user:', error);
    toast.error('Failed to add user');
  }
};

export const deleteUser = async (
  id: string,
  users: UserRole[],
  setUsers: React.Dispatch<React.SetStateAction<UserRole[]>>
) => {
  const userToDelete = users.find((user) => user.id === id);
  if (!userToDelete) {
    toast.error("User not found");
    return;
  }

  if (userToDelete.role === "admin" && users.filter(u => u.role === "admin").length === 1) {
    toast.error("Cannot delete the last admin user");
    return;
  }

  try {
    // Find user by email to get auth user ID
    const { data: authUsers, error: authListError } = await supabase.auth.admin.listUsers();
    
    if (!authListError && authUsers) {
      const authUser = authUsers.users.find(authU => authU.email === userToDelete.email);
      
      if (authUser) {
        // Delete from auth
        const { error: authDeleteError } = await supabase.auth.admin.deleteUser(authUser.id);
        if (authDeleteError) {
          console.error('Error deleting auth user:', authDeleteError);
        }
      }
    }

    // Delete from user_roles table
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
      return;
    }

    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  } catch (error) {
    console.error('Error deleting user:', error);
    toast.error('Failed to delete user');
  }
};

export const updateUserRole = async (
  id: string,
  newRole: "admin" | "facilitator" | "participant" | "guest",
  users: UserRole[],
  setUsers: React.Dispatch<React.SetStateAction<UserRole[]>>
) => {
  const user = users.find(u => u.id === id);
  if (user?.role === "admin" && newRole !== "admin" && users.filter(u => u.role === "admin").length === 1) {
    toast.error("Cannot change role of the last admin user");
    return;
  }

  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ 
        role: newRole,
        permissions: getDefaultPermissions(newRole)
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
      return;
    }

    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, role: newRole, permissions: getDefaultPermissions(newRole) }
        : user
    ));
    toast.success("User role updated successfully");
  } catch (error) {
    console.error('Error updating user role:', error);
    toast.error('Failed to update user role');
  }
};

export const updateUserPassword = async (
  id: string,
  newPassword: string,
  users: UserRole[],
  setUsers: React.Dispatch<React.SetStateAction<UserRole[]>>
) => {
  try {
    const user = users.find((u) => u.id === id);
    if (!user) {
      toast.error("User not found");
      return;
    }

    // Update in auth system
    const { data: authUsers, error: authListError } = await supabase.auth.admin.listUsers();
    
    if (!authListError && authUsers) {
      const authUser = authUsers.users.find(authU => authU.email === user.email);
      
      if (authUser) {
        const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
          authUser.id,
          { password: newPassword }
        );
        
        if (authUpdateError) {
          console.error('Error updating auth password:', authUpdateError);
          toast.error('Failed to update password in auth system');
          return;
        }
      }
    }

    // Update in user_roles table
    const { error } = await supabase
      .from('user_roles')
      .update({ password: newPassword })
      .eq('id', id);

    if (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
      return;
    }

    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, password: newPassword }
        : user
    ));
    toast.success("Password updated successfully");
  } catch (error) {
    console.error('Error updating password:', error);
    toast.error('Failed to update password');
  }
};
