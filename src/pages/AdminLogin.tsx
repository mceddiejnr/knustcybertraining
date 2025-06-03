
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, EyeOff, User, Terminal, ShieldCheck, Fingerprint } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Shield className="absolute top-20 left-10 w-6 h-6 text-green-500/20 animate-pulse" />
        <Terminal className="absolute top-40 right-20 w-4 h-4 text-green-400/20 animate-bounce" />
        <ShieldCheck className="absolute bottom-40 left-20 w-5 h-5 text-green-300/20 animate-pulse" />
        <Fingerprint className="absolute bottom-20 right-10 w-6 h-6 text-green-500/20 animate-pulse" />
      </div>
      
      <div className="relative z-20 min-h-screen flex items-center justify-center p-2">
        {/* KNUST Logo */}
        <div className="absolute top-4 left-4">
          <img 
            src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
            alt="KNUST Logo" 
            className="h-8 sm:h-10 w-auto drop-shadow-lg"
          />
        </div>

        <Card className="w-full max-w-sm bg-gray-800/95 backdrop-blur-xl shadow-2xl border border-green-500/30 rounded-2xl overflow-hidden relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-sm"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
          
          <CardHeader className="text-center space-y-4 pt-6 pb-4 relative">
            {/* Main Security Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-full animate-pulse"></div>
                  <Shield className="w-6 h-6 text-white relative z-10" />
                  
                  {/* Orbiting Security Elements */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center animate-spin">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <Terminal className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-white tracking-wide">
                SECURE ACCESS
              </CardTitle>
              <div className="text-green-400 font-mono text-xs tracking-wider">
                CYBERSECURITY ADMIN PORTAL
              </div>
              <CardDescription className="text-gray-300 font-medium text-xs leading-relaxed">
                Authorized Personnel Only<br/>
                <span className="text-green-400 text-xs">Enter your security credentials</span>
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
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
            
            <div className="mt-6 text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-mono">SECURE CONNECTION</span>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-white text-xs font-mono hover:bg-gray-700/50"
              >
                ← Return to Main System
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
