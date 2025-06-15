
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      console.log("AuthGuard check:", { user: !!user, profile, requireAdmin });
      
      if (!user) {
        console.log("No user, redirecting to auth");
        navigate("/auth");
        return;
      }
      
      // Only check admin role if profile is loaded and we require admin access
      if (requireAdmin && profile && profile.role !== 'admin') {
        console.log("User role:", profile?.role, "- Access denied to admin area");
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this area.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
    }
  }, [user, profile, loading, navigate, requireAdmin, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
        <div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div>
      </div>
    );
  }

  // If we require admin access, wait for profile to load before allowing access
  if (!user || (requireAdmin && (!profile || profile.role !== 'admin'))) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
