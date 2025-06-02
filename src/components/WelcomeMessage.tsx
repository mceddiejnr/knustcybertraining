
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Award, Lock } from "lucide-react";

interface WelcomeMessageProps {
  onNameSubmit: (name: string) => void;
}

const WelcomeMessage = ({ onNameSubmit }: WelcomeMessageProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  const inspirationalMessage = `Welcome to KNUST's comprehensive cybersecurity training program. As we advance into an increasingly digital world, your participation in this training represents a crucial investment in our institutional security. Today, you'll gain essential knowledge and practical skills to identify, prevent, and respond to cyber threats. Your commitment to cybersecurity excellence helps protect not only your personal digital assets but also contributes to safeguarding our entire university community's digital infrastructure.`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-lg"
        />
      </div>

      <div className="max-w-md sm:max-w-xl lg:max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 p-6 sm:p-8 relative overflow-hidden">
        {/* Professional gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-200/20 via-blue-200/20 to-indigo-200/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg transform rotate-12">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-lg">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg transform -rotate-12">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4 bg-gradient-to-r from-red-600 via-slate-700 to-blue-600 bg-clip-text text-transparent">
              Welcome to KNUST Cybersecurity Training 🛡️
            </h2>
            
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-200/50 shadow-inner">
              <p className="text-slate-700 leading-relaxed text-left font-medium text-sm sm:text-base">
                {inspirationalMessage}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-base sm:text-lg font-semibold text-slate-700 mb-2 block">
                Full Name ✨
              </Label>
              <Input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="text-base sm:text-lg py-3 sm:py-4 bg-white/80 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/30 rounded-lg sm:rounded-xl shadow-sm"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 via-slate-600 to-blue-600 hover:from-red-700 hover:via-slate-700 hover:to-blue-700 text-white py-3 sm:py-4 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              disabled={!name.trim()}
            >
              Continue to Training 🚀
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
