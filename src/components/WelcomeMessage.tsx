
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Heart, Star } from "lucide-react";

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

  const inspirationalMessage = `Welcome to your KNUST cybersecurity journey! 🌟 Today, you're taking a powerful step toward becoming a digital guardian in our university community. This training will equip you with essential knowledge and skills to protect yourself, your colleagues, and our institution from cyber threats. Every safeguard you learn, every best practice you adopt, and every security measure you implement contributes to building a stronger, more resilient digital environment at KNUST. You have the power to make a difference - let's unlock your potential to stay safe and secure online! 🚀`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-20 w-auto drop-shadow-lg"
        />
      </div>

      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/50 p-8 relative overflow-hidden">
        {/* Elegant gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-200/20 via-yellow-200/20 to-green-200/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg transform rotate-12">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-lg transform -rotate-12">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
              Welcome to Your KNUST Cybersecurity Journey! 🌟
            </h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-8 border border-yellow-200/50 shadow-inner">
              <p className="text-gray-700 leading-relaxed text-left font-medium">
                {inspirationalMessage}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-lg font-semibold text-gray-700 mb-2 block">
                Full Name ✨
              </Label>
              <Input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="text-lg py-4 bg-white/80 border-2 border-yellow-200 text-gray-800 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/30 rounded-xl shadow-sm"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:from-red-600 hover:via-yellow-600 hover:to-green-600 text-white py-4 text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              disabled={!name.trim()}
            >
              Submit 🚀
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
