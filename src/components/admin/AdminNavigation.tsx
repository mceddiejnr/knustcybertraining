
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Settings, Users, MessageSquare, TrendingUp, KeyRound, UserCog, Star, Clock } from "lucide-react";

type AdminSection = "overview" | "attendance" | "messages" | "program" | "analytics" | "access-codes" | "user-roles" | "feedback" | "user-approvals";

interface AdminNavigationProps {
  currentSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const AdminNavigation = ({ currentSection, onSectionChange }: AdminNavigationProps) => {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: Settings },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "feedback", label: "Feedback", icon: Star },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "program", label: "Program", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  const userManagementItems = [
    { id: "user-roles", label: "Manage Roles", icon: UserCog },
    { id: "user-approvals", label: "User Approval", icon: Clock },
    { id: "access-codes", label: "Access Codes", icon: KeyRound },
  ];

  const isUserManagementSection = userManagementItems.some(item => item.id === currentSection);

  return (
    <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
      {navigationItems.map(({ id, label, icon: Icon }) => (
        <Button 
          key={id}
          onClick={() => onSectionChange(id as AdminSection)} 
          variant={currentSection === id ? "default" : "outline"} 
          className={currentSection === id 
            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg" 
            : "bg-gray-800/80 border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
          }
          size="sm"
        >
          <Icon className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{label.split(' ')[0]}</span>
        </Button>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isUserManagementSection ? "default" : "outline"}
            className={isUserManagementSection
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
              : "bg-gray-800/80 border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
            }
            size="sm"
          >
            <UserCog className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">User Management</span>
            <span className="sm:hidden">Users</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900 border-green-500/50 text-green-300">
          {userManagementItems.map(({ id, label, icon: Icon }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => onSectionChange(id as AdminSection)}
              className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
            >
              <Icon className="w-4 h-4 mr-2" />
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminNavigation;
