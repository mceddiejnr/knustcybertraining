
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import UserFormDialog from "./UserFormDialog";
import UserTableRow from "./UserTableRow";
import { UserRole } from "@/types/user";

const UserRoleManager = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

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
        setUsers(data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .insert([newUser])
        .select()
        .single();

      if (error) {
        console.error('Error adding user:', error);
        toast.error('Failed to add user');
        return;
      }

      if (data) {
        setUsers(prev => [data, ...prev]);
        toast.success(`User ${data.name} created successfully`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user');
    }
  };

  const deleteUser = async (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    if (userToDelete?.role === "admin" && users.filter(u => u.role === "admin").length === 1) {
      toast.error("Cannot delete the last admin user");
      return;
    }

    try {
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

  const updateUserRole = async (id: string, newRole: "admin" | "facilitator" | "participant" | "guest") => {
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

  const updateUserPassword = async (id: string, newPassword: string) => {
    try {
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

  const getDefaultPermissions = (role: string): string[] => {
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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white text-lg sm:text-xl">User Role Management</span>
            </div>
            <UserFormDialog users={users} onAddUser={addUser} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Users Table - Mobile responsive */}
          <div className="rounded-lg border border-gray-600 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600 bg-gray-700/50">
                    <TableHead className="text-gray-300 min-w-[120px]">Name</TableHead>
                    <TableHead className="text-gray-300 min-w-[150px] hidden sm:table-cell">Email</TableHead>
                    <TableHead className="text-gray-300 min-w-[100px]">Role</TableHead>
                    <TableHead className="text-gray-300 min-w-[120px] hidden md:table-cell">Permissions</TableHead>
                    <TableHead className="text-gray-300 min-w-[100px] hidden lg:table-cell">Created</TableHead>
                    <TableHead className="text-gray-300 min-w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      onRoleUpdate={updateUserRole}
                      onPasswordUpdate={updateUserPassword}
                      onDelete={deleteUser}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No users found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoleManager;
