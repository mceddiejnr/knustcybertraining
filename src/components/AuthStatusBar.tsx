
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Shield } from "lucide-react";
import RoleUpdater from "@/components/RoleUpdater";
import { useAuth } from "@/hooks/useAuth";

const AuthStatusBar = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
  };

  if (user) {
    return (
      <>
        {/* Auth Status Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center space-x-2">
          <span className="text-white text-sm font-mono">
            Welcome, {profile?.full_name || user.email}
          </span>
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="bg-gray-800/80 border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
          >
            <Settings className="w-4 h-4 mr-1" />
            Admin
          </Button>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="bg-gray-800/80 border-red-500/30 text-red-400 hover:bg-red-900/20 hover:border-red-400"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </Button>
        </div>

        {/* Role Updater for logged in users who aren't admin */}
        {profile?.role !== 'admin' && (
          <div className="absolute top-20 right-4 z-30 bg-gray-800/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
            <div className="text-white text-sm mb-2">Need admin access?</div>
            <RoleUpdater />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-30">
      <Button
        onClick={() => navigate("/auth")}
        variant="outline"
        size="sm"
        className="bg-gray-800/90 backdrop-blur-sm border-green-500/30 hover:bg-gray-700 text-green-400 text-xs sm:text-sm hover:border-green-400"
      >
        <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Admin
      </Button>
    </div>
  );
};

export default AuthStatusBar;
