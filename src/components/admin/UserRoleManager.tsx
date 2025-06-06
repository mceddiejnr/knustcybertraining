
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Shield, UserCheck, Crown, Search, Plus, Trash2, Edit2, Key, Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface UserRole {
  id: string;
  name: string;
  role: "admin" | "facilitator" | "participant" | "guest";
  email: string;
  password?: string;
  permissions: string[];
  lastActive?: string;
  createdAt: string;
}

const UserRoleManager = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "facilitator" | "participant" | "guest">("participant");
  const [showPassword, setShowPassword] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRole | null>(null);
  const [editPassword, setEditPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
          password: "admin123",
          permissions: ["all"],
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          name: "Deputy Director, ISTAD",
          role: "facilitator",
          email: "istad@knust.edu.gh",
          password: "istad123",
          permissions: ["manage_program", "view_analytics"],
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          name: "University Librarian",
          role: "facilitator",
          email: "librarian@knust.edu.gh",
          password: "lib123",
          permissions: ["manage_program"],
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString()
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

  const validateForm = () => {
    if (!newUserName.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!newUserEmail.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!newUserPassword.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newUserEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (users.some(user => user.email.toLowerCase() === newUserEmail.toLowerCase())) {
      toast.error("User with this email already exists");
      return false;
    }
    if (newUserPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const addUser = () => {
    if (!validateForm()) return;

    const newUser: UserRole = {
      id: Date.now().toString(),
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      password: newUserPassword,
      role: newUserRole,
      permissions: getDefaultPermissions(newUserRole),
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    // Reset form
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("participant");
    setIsDialogOpen(false);
    
    toast.success(`User ${newUser.name} created successfully`);
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

  const updateUserPassword = () => {
    if (!editPassword.trim()) {
      toast.error("Password cannot be empty");
      return;
    }
    if (editPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    const updatedUsers = users.map(user => 
      user.id === editingUser?.id 
        ? { ...user, password: editPassword }
        : user
    );
    saveUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setEditingUser(null);
    setEditPassword("");
    toast.success("Password updated successfully");
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-600 text-white">
                <DialogHeader>
                  <DialogTitle className="text-green-400">Create New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input
                      id="userName"
                      placeholder="Enter full name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email Address</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="Enter email address"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="userPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password (min 6 characters)"
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userRole">Role</Label>
                    <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="facilitator">Facilitator</SelectItem>
                        <SelectItem value="participant">Participant</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button 
                      onClick={addUser}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex-1"
                    >
                      Create User
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  <TableRow key={user.id} className="border-gray-600 bg-gray-800/50">
                    <TableCell className="text-white font-medium">{user.name}</TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
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
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Select 
                          value={user.role} 
                          onValueChange={(value: any) => updateUserRole(user.id, value)}
                        >
                          <SelectTrigger className="w-[110px] h-8 bg-gray-700/50 border-gray-600 text-white text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="facilitator">Facilitator</SelectItem>
                            <SelectItem value="participant">Participant</SelectItem>
                            <SelectItem value="guest">Guest</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Dialog open={isEditDialogOpen && editingUser?.id === user.id} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingUser(user);
                                setEditPassword(user.password || "");
                              }}
                              className="border-blue-500/30 text-blue-400 hover:bg-blue-900/20 hover:border-blue-400"
                            >
                              <Key className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-600 text-white">
                            <DialogHeader>
                              <DialogTitle className="text-green-400">Change Password - {user.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label htmlFor="editPassword">New Password</Label>
                                <Input
                                  id="editPassword"
                                  type="password"
                                  placeholder="Enter new password (min 6 characters)"
                                  value={editPassword}
                                  onChange={(e) => setEditPassword(e.target.value)}
                                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                />
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button 
                                  onClick={updateUserPassword}
                                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex-1"
                                >
                                  Update Password
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    setIsEditDialogOpen(false);
                                    setEditingUser(null);
                                    setEditPassword("");
                                  }}
                                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

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
