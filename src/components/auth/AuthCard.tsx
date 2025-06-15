
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";

interface AuthCardProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

const AuthCard = ({ isSignUp, onToggleMode }: AuthCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-sm bg-gray-800/95 backdrop-blur-xl shadow-2xl border border-green-500/30 rounded-2xl overflow-hidden relative z-10">
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-sm -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 z-10"></div>
      
      <AuthHeader isSignUp={isSignUp} />
      
      <CardContent className="px-6 pb-6 relative z-10">
        <AuthForm isSignUp={isSignUp} onToggleMode={onToggleMode} />
        
        <div className="mt-6 text-center space-y-3">
          <Button 
            variant="ghost" 
            onClick={onToggleMode}
            className="text-gray-400 hover:text-white text-xs font-mono hover:bg-gray-700/50 z-20 relative"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="text-gray-400 hover:text-white text-xs font-mono hover:bg-gray-700/50 z-20 relative"
          >
            ← Return to Main System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthCard;
