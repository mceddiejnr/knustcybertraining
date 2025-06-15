
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import UserFormDialog from "./UserFormDialog";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import { UserRole } from "@/types/user";
import { useUserManagement } from "@/hooks/useUserManagement";
import { addUser, deleteUser, updateUserRole, updateUserPassword } from "@/utils/userManagement";

const UserRoleManager = () => {
  const { users, setUsers, loading } = useUserManagement();
  const [filteredUsers, setFilteredUsers] = useState<UserRole[]>([]);

  // Update filtered users when users change
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleAddUser = async (newUser: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>) => {
    await addUser(newUser, setUsers);
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id, users, setUsers);
  };

  const handleUpdateUserRole = async (id: string, newRole: "admin" | "facilitator" | "participant" | "guest") => {
    await updateUserRole(id, newRole, users, setUsers);
  };

  const handleUpdateUserPassword = async (id: string, newPassword: string) => {
    await updateUserPassword(id, newPassword, users, setUsers);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div>
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
            <UserFormDialog users={users} onAddUser={handleAddUser} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserSearch users={users} onFilteredUsersChange={setFilteredUsers} />
          <UserTable
            filteredUsers={filteredUsers}
            onRoleUpdate={handleUpdateUserRole}
            onPasswordUpdate={handleUpdateUserPassword}
            onDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoleManager;
