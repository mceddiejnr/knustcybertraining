
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <img alt="KNUST Logo" className="h-12 lg:h-16 w-auto" src="/lovable-uploads/203ba06e-92a1-4220-b166-c31ec24d5efa.png" />
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
              ADMIN DASHBOARD
            </h1>
            <p className="text-green-400 font-mono text-sm lg:text-base">Cybersecurity Training Management System</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => window.location.href = "/"} variant="outline" className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400 text-sm">
            Back to App
          </Button>
          <Button onClick={onLogout} variant="outline" className="bg-gray-800/80 backdrop-blur-sm text-red-400 border-red-500/30 hover:bg-red-900/20 hover:border-red-400 text-sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
