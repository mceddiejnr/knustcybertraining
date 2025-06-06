
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";
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

interface PasswordChangeDialogProps {
  user: UserRole;
  onPasswordUpdate: (userId: string, newPassword: string) => void;
}

const PasswordChangeDialog = ({ user, onPasswordUpdate }: PasswordChangeDialogProps) => {
  const [editPassword, setEditPassword] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const updateUserPassword = () => {
    if (!editPassword.trim()) {
      toast.error("Password cannot be empty");
      return;
    }
    if (editPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    onPasswordUpdate(user.id, editPassword);
    setIsEditDialogOpen(false);
    setEditPassword("");
    toast.success("Password updated successfully");
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
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
  );
};

export default PasswordChangeDialog;
