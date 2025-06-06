
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Shield, UserCheck, Crown, Search, Plus, Trash2, Edit2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserRole {
  id: string;
  name: string;
  role: "admin" | "facilitator" | "participant" | "guest";
  email?: string;
  permissions: string[];
  lastActive?: string;
}

const UserRoleManager = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "facilitator" | "participant" | "guest">("participant");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("userRoles") || "[]");
    if (savedUsers.length === 0) {
      // Initialize with some default users
      const defaultUsers: UserRole[] = [
        {
          id: "1",
          name: "Admin User",
          role: "admin",
          email: "admin@knust.edu.gh",
          permissions: ["all"],
          lastActive: new Date().toISOString()
        },
        {
          id: "2",
          name: "Deputy Director, ISTAD",
          role: "facilitator",
          email: "istad@knust.edu.gh",
          permissions: ["manage_program", "view_analytics"],
          lastActive: new Date().toISOString()
        },
        {
          id: "3",
          name: "University Librarian",
          role: "facilitator",
          email: "librarian@knust.edu.gh",
          permissions: ["manage_program"],
          lastActive: new Date().toISOString()
        }
      ];
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

  const addUser = () => {
    if (newUserName.trim()) {
      const newUser: UserRole = {
        id: Date.now().toString(),
        name: newUserName.trim(),
        role: newUserRole,
        permissions: getDefaultPermissions(newUserRole),
        lastActive: new Date().toISOString()
      };
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      setNewUserName("");
    }
  };

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    saveUsers(updatedUsers);
  };

  const updateUserRole = (id: string, newRole: "admin" | "facilitator" | "participant" | "guest") => {
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, role: newRole, permissions: getDefaultPermissions(newRole) }
        : user
    );
    saveUsers(updatedUsers);
  };

  const getDefaultPermissions = (role: string): string[] => {
    switch (role) {
      case "admin":
        return ["all"];
      case "facilitator":
        return ["manage_program", "view_analytics", "manage_attendance"];
      case "participant":
        return ["view_program"];
      case "guest":
        return ["view_program"];
      default:
        return [];
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "facilitator":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "participant":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "guest":
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />;
      case "facilitator":
        return <Shield className="w-4 h-4" />;
      case "participant":
        return <UserCheck className="w-4 h-4" />;
      case "guest":
        return <Users className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Users className="w-5 h-5 text-green-400" />
            <span>User Role Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New User */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
            />
            <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="facilitator">Facilitator</SelectItem>
                <SelectItem value="participant">Participant</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={addUser}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
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
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Permissions</TableHead>
                  <TableHead className="text-gray-300">Last Active</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-600 bg-gray-800/50">
                    <TableCell className="text-white font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge className={`${getRoleColor(user.role)} flex items-center space-x-1 w-fit`}>
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Select 
                          value={user.role} 
                          onValueChange={(value: any) => updateUserRole(user.id, value)}
                        >
                          <SelectTrigger className="w-[120px] h-8 bg-gray-700/50 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="facilitator">Facilitator</SelectItem>
                            <SelectItem value="participant">Participant</SelectItem>
                            <SelectItem value="guest">Guest</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteUser(user.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
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
