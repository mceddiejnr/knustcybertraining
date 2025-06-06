
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search } from "lucide-react";
import { toast } from "sonner";
import UserFormDialog from "./UserFormDialog";
import UserTableRow from "./UserTableRow";
import { UserRole } from "@/types/user";
import { getDefaultPermissions, getDefaultUsers } from "@/utils/userUtils";

const UserRoleManager = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("userRoles") || "[]");
    if (savedUsers.length === 0) {
      const defaultUsers = getDefaultUsers();
      setUsers(defaultUsers);
      localStorage.setItem("userRoles", JSON.stringify(defaultUsers));
    } else {
      setUsers(savedUsers);
    }
  }, []);

  const saveUsers = (updatedUsers: UserRole[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("userRoles", JSON.stringify(updatedUsers));
  };

  const addUser = (newUser: UserRole) => {
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
  };

  const deleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    if (userToDelete?.role === "admin" && users.filter(u => u.role === "admin").length === 1) {
      toast.error("Cannot delete the last admin user");
      return;
    }
    
    const updatedUsers = users.filter(user => user.id !== id);
    saveUsers(updatedUsers);
    toast.success("User deleted successfully");
  };

  const updateUserRole = (id: string, newRole: "admin" | "facilitator" | "participant" | "guest") => {
    const user = users.find(u => u.id === id);
    if (user?.role === "admin" && newRole !== "admin" && users.filter(u => u.role === "admin").length === 1) {
      toast.error("Cannot change role of the last admin user");
      return;
    }
    
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, role: newRole, permissions: getDefaultPermissions(newRole) }
        : user
    );
    saveUsers(updatedUsers);
    toast.success("User role updated successfully");
  };

  const updateUserPassword = (id: string, newPassword: string) => {
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, password: newPassword }
        : user
    );
    saveUsers(updatedUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>User Role Management</span>
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

          {/* Users Table */}
          <div className="rounded-lg border border-gray-600 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-600 bg-gray-700/50">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Permissions</TableHead>
                  <TableHead className="text-gray-300">Created</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
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
