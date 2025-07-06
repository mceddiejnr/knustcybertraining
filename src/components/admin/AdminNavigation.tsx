
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText, 
  Key, 
  Shield,
  MessageCircle,
  UserCheck,
  Folder,
  HelpCircle
} from "lucide-react";

type AdminSection = "overview" | "attendance" | "messages" | "program" | "analytics" | "access-codes" | "user-roles" | "feedback" | "user-approvals" | "resources" | "questions";

interface AdminNavigationProps {
  currentSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const AdminNavigation = ({ currentSection, onSectionChange }: AdminNavigationProps) => {
  const navItems = [
    { id: "overview" as AdminSection, label: "Overview", icon: BarChart3 },
    { id: "attendance" as AdminSection, label: "Attendance", icon: Users },
    { id: "questions" as AdminSection, label: "Questions", icon: HelpCircle },
    { id: "feedback" as AdminSection, label: "Feedback", icon: MessageCircle },
    { id: "messages" as AdminSection, label: "Messages", icon: MessageSquare },
    { id: "program" as AdminSection, label: "Program", icon: FileText },
    { id: "resources" as AdminSection, label: "Resources", icon: Folder },
    { id: "analytics" as AdminSection, label: "Analytics", icon: BarChart3 },
    { id: "access-codes" as AdminSection, label: "Access Codes", icon: Key },
    { id: "user-roles" as AdminSection, label: "User Roles", icon: Shield },
    { id: "user-approvals" as AdminSection, label: "User Approvals", icon: UserCheck },
  ];

  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex flex-wrap gap-2 lg:gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              variant={currentSection === item.id ? "default" : "outline"}
              className={`${
                currentSection === item.id
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
              } text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto`}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNavigation;
