
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Shield, UserCheck, Crown, Trash2, Mail, Calendar } from "lucide-react";
import PasswordChangeDialog from "./PasswordChangeDialog";
import { UserRole } from "@/types/user";

interface UserTableRowProps {
  user: UserRole;
  onRoleUpdate: (userId: string, newRole: "admin" | "facilitator" | "participant" | "guest") => void;
  onPasswordUpdate: (userId: string, newPassword: string) => void;
  onDelete: (userId: string) => void;
}

const UserTableRow = ({ user, onRoleUpdate, onPasswordUpdate, onDelete }: UserTableRowProps) => {
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

  return (
    <TableRow className="border-gray-600 bg-gray-800/50">
      <TableCell className="text-white font-medium">
        <div className="flex flex-col space-y-1">
          <span className="text-sm sm:text-base">{user.name}</span>
          {/* Show email on mobile under name */}
          <div className="sm:hidden flex items-center space-x-1 text-xs text-gray-400">
            <Mail className="w-3 h-3" />
            <span>{user.email}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-300 hidden sm:table-cell text-sm">
        {user.email}
      </TableCell>
      <TableCell>
        <Badge className={`${getRoleColor(user.role)} flex items-center space-x-1 w-fit text-xs`}>
          {getRoleIcon(user.role)}
          <span className="capitalize">{user.role}</span>
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {user.permissions?.slice(0, 2).map((permission, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
              {permission}
            </Badge>
          ))}
          {user.permissions && user.permissions.length > 2 && (
            <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
              +{user.permissions.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-gray-400 text-xs hidden lg:table-cell">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>
            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
          <Select 
            value={user.role} 
            onValueChange={(value: any) => onRoleUpdate(user.id, value)}
          >
            <SelectTrigger className="w-full sm:w-[110px] h-8 bg-gray-700/50 border-gray-600 text-white text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="facilitator">Facilitator</SelectItem>
              <SelectItem value="participant">Participant</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex space-x-1">
            <PasswordChangeDialog 
              user={user}
              onPasswordUpdate={onPasswordUpdate}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400 h-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
