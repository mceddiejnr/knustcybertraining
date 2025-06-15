
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "@/types/user";

interface UserFormDialogProps {
  users: UserRole[];
  onAddUser: (user: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>) => void;
}

const UserFormDialog = ({ users, onAddUser }: UserFormDialogProps) => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "facilitator" | "participant" | "guest">("participant");
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const addUser = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const newUser = {
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      password: newUserPassword,
      role: newUserRole,
      permissions: getDefaultPermissions(newUserRole),
      last_active: new Date().toISOString()
    };
    
    await onAddUser(newUser);
    
    // Reset form
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("participant");
    setIsDialogOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-sm sm:text-base">
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Add User</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-600 text-white w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-lg sm:text-xl">Create New User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="userName" className="text-sm">Full Name</Label>
            <Input
              id="userName"
              placeholder="Enter full name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 text-sm"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userEmail" className="text-sm">Email Address</Label>
            <Input
              id="userEmail"
              type="email"
              placeholder="Enter email address"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 text-sm"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userPassword" className="text-sm">Password</Label>
            <div className="relative">
              <Input
                id="userPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password (min 6 characters)"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 pr-10 text-sm"
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
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
            <Label htmlFor="userRole" className="text-sm">Role</Label>
            <Select 
              value={newUserRole} 
              onValueChange={(value: any) => setNewUserRole(value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white text-sm">
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
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button 
              onClick={addUser}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex-1 text-sm"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create User"
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
