
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CyberBackground from "@/components/CyberBackground";
import SecurityIcon from "@/components/SecurityIcon";
import LoginForm from "@/components/LoginForm";

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
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
            <SecurityIcon />

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
            <LoginForm />
            
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
