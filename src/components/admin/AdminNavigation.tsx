
import { Button } from "@/components/ui/button";
import { Calendar, Home, Inbox, Search, Settings, Users, MessageSquare, TrendingUp, KeyRound, UserCog } from "lucide-react";

type AdminSection = "overview" | "attendance" | "messages" | "program" | "analytics" | "access-codes" | "user-roles";

interface AdminNavigationProps {
  currentSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const AdminNavigation = ({ currentSection, onSectionChange }: AdminNavigationProps) => {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: Settings },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "access-codes", label: "Access Codes", icon: KeyRound },
    { id: "user-roles", label: "User Roles", icon: UserCog },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "program", label: "Program", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

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
    </div>
  );
};

export default AdminNavigation;
