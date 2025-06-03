
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo credentials - in real app this would be handled by backend
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem("adminAuthenticated", "true");
        toast({
          title: "Access Granted",
          description: "Welcome to the secure admin dashboard",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="username" className="text-gray-200 font-medium text-xs flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span>Administrator ID</span>
        </Label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Input
            id="username"
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            className="relative bg-gray-700/80 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 text-sm text-white placeholder:text-gray-400 font-mono h-8"
            placeholder="admin"
            required
          />
        </div>
        <p className="text-xs text-green-400 font-mono">Demo: admin</p>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="password" className="text-gray-200 font-medium text-xs flex items-center space-x-1">
          <Lock className="w-3 h-3" />
          <span>Security Key</span>
        </Label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            className="relative bg-gray-700/80 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 pr-10 text-sm text-white placeholder:text-gray-400 font-mono h-8"
            placeholder="••••••••"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent text-gray-400 hover:text-green-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
          </Button>
        </div>
        <p className="text-xs text-green-400 font-mono">Demo: admin123</p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-sm relative overflow-hidden"
        disabled={isLoading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 animate-pulse"></div>
        {isLoading ? (
          <div className="flex items-center space-x-2 relative z-10">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-xs">AUTHENTICATING...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 relative z-10">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-mono text-xs">AUTHENTICATE</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
