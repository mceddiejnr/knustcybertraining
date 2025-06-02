
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

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-10 sm:h-14 md:h-16 w-auto drop-shadow-lg"
        />
      </div>

      <div className="max-w-sm sm:max-w-md md:max-w-lg w-full bg-white/98 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/60 p-4 sm:p-6 md:p-8 relative overflow-hidden">
        {/* Professional gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-100/30 via-gray-50/30 to-green-100/30 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg transform rotate-12">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full shadow-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg transform -rotate-12">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 bg-gradient-to-r from-green-700 via-gray-700 to-green-600 bg-clip-text text-transparent">
              Welcome to KNUST Cybersecurity Training 🛡️
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-green-200/50 shadow-inner">
              <p className="text-gray-700 leading-relaxed text-left font-medium text-sm sm:text-base">
                Join our comprehensive cybersecurity training program designed to enhance your digital security knowledge and protect our university community's digital infrastructure.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm sm:text-base font-semibold text-gray-700 mb-2 block">
                Full Name ✨
              </Label>
              <Input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="text-sm sm:text-base py-2 sm:py-3 bg-white/90 border-2 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 rounded-lg shadow-sm"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 text-sm sm:text-base rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
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
