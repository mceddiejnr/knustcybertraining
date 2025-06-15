
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import SecurityIcon from "@/components/SecurityIcon";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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
          setIsSignUp(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 relative overflow-hidden">
      <CyberBackground />
      
      <div className="relative z-20 min-h-screen flex items-center justify-center p-2">
        {/* KNUST Logo */}
        <div className="absolute top-4 left-4">
          <img 
            alt="KNUST Logo" 
            className="h-8 sm:h-10 w-auto drop-shadow-lg" 
            src="/lovable-uploads/1a08e6d9-8dd4-4b15-b847-a9ad35ab8a14.png" 
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
                {isSignUp ? "JOIN TRAINING" : "SECURE ACCESS"}
              </CardTitle>
              <div className="text-green-400 font-mono text-xs tracking-wider">
                CYBERSECURITY TRAINING PORTAL
              </div>
              <CardDescription className="text-gray-300 font-medium text-xs leading-relaxed">
                {isSignUp ? "Create your training account" : "Enter your credentials"}
                <br />
                <span className="text-green-400 text-xs">
                  {isSignUp ? "Join the cybersecurity community" : "Access your training dashboard"}
                </span>
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
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
                    className="bg-gray-700/80 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 text-sm text-white placeholder:text-gray-400 font-mono h-8"
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
                  className="bg-gray-700/80 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 text-sm text-white placeholder:text-gray-400 font-mono h-8"
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
                    className="bg-gray-700/80 border-gray-600 focus:border-green-400 focus:ring-green-400/20 rounded-lg py-2 pr-10 text-sm text-white placeholder:text-gray-400 font-mono h-8"
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
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-sm relative overflow-hidden"
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
            
            <div className="mt-6 text-center space-y-3">
              <Button 
                variant="ghost" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-400 hover:text-white text-xs font-mono hover:bg-gray-700/50"
              >
                {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
              </Button>
              
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

export default Auth;
