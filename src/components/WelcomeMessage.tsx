
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CircuitBoard } from "lucide-react";

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

  const inspirationalMessage = `Welcome to your KNUST cybersecurity journey! Today, you're taking a powerful step toward becoming a digital guardian in our university community. This training will equip you with essential knowledge and skills to protect yourself, your colleagues, and our institution from cyber threats. Every safeguard you learn, every best practice you adopt, and every security measure you implement contributes to building a stronger, more resilient digital environment at KNUST. You have the power to make a difference - let's unlock your potential to stay safe and secure online!`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="/lovable-uploads/6ce08c53-d1c5-447f-a093-4655c351e1a8.png" 
          alt="KNUST Logo" 
          className="h-16 w-auto opacity-90"
        />
      </div>

      <div className="max-w-2xl w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-500/30 p-8 relative overflow-hidden">
        {/* KNUST-themed glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600/20 via-amber-500/20 to-green-600/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="p-3 bg-red-600/20 rounded-full border border-red-500/40">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <div className="p-3 bg-amber-600/20 rounded-full border border-amber-500/40">
                <CircuitBoard className="w-6 h-6 text-amber-400" />
              </div>
              <div className="p-3 bg-green-600/20 rounded-full border border-green-500/40">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 via-red-400 to-green-400 bg-clip-text text-transparent">
              Welcome to Your KNUST Cybersecurity Journey!
            </h2>
            
            <div className="bg-slate-800/70 rounded-xl p-6 mb-8 border border-amber-500/30">
              <p className="text-slate-300 leading-relaxed text-left">
                {inspirationalMessage}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-lg font-medium text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 text-lg py-3 bg-slate-800/70 border-amber-500/40 text-white placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-400/30"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:via-red-500 hover:to-amber-500 text-white py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 border border-amber-500/40 shadow-lg shadow-red-600/25"
              disabled={!name.trim()}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
