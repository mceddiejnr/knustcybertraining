
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

const AuthForm = ({ isSignUp, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive",
          });
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Please check your email to verify your account",
          });
          onToggleMode();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in",
          });
          navigate("/");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignUp && (
        <div className="space-y-1">
          <Label htmlFor="fullName" className="text-gray-200 font-medium text-xs flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>Full Name</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="relative z-20 bg-gray-700/90 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 text-sm text-white placeholder:text-gray-400 font-mono h-10 pointer-events-auto cursor-text"
            placeholder="Enter your full name"
            required={isSignUp}
          />
        </div>
      )}

      <div className="space-y-1">
        <Label htmlFor="email" className="text-gray-200 font-medium text-xs flex items-center space-x-1">
          <Mail className="w-3 h-3" />
          <span>Email Address</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="relative z-20 bg-gray-700/90 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 text-sm text-white placeholder:text-gray-400 font-mono h-10 pointer-events-auto cursor-text"
          placeholder="your.email@example.com"
          required
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="password" className="text-gray-200 font-medium text-xs flex items-center space-x-1">
          <Lock className="w-3 h-3" />
          <span>Password</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative z-20 bg-gray-700/90 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 pr-10 text-sm text-white placeholder:text-gray-400 font-mono h-10 pointer-events-auto cursor-text"
            placeholder="••••••••"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent text-gray-400 hover:text-green-400 z-30 pointer-events-auto"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-sm relative overflow-hidden z-20"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-xs">
              {isSignUp ? "CREATING ACCOUNT..." : "SIGNING IN..."}
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span className="font-mono text-xs">
              {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
            </span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
