
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminProtectionProps {
  children: React.ReactNode;
}

const AdminProtection = ({ children }: AdminProtectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("adminAuthenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AdminProtection;
