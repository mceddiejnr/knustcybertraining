
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CyberBackground from "@/components/CyberBackground";
import AuthCard from "@/components/auth/AuthCard";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20 min-h-screen flex items-center justify-center p-2">
        {/* KNUST Logo - Now clickable */}
        <div className="absolute top-4 left-4 z-30">
          <img 
            alt="KNUST Logo" 
            className="h-8 sm:h-10 w-auto drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity" 
            src="/lovable-uploads/1a08e6d9-8dd4-4b15-b847-a9ad35ab8a14.png"
            onClick={() => navigate("/")}
          />
        </div>

        <AuthCard isSignUp={isSignUp} onToggleMode={handleToggleMode} />
      </div>
    </div>
  );
};

export default Auth;
