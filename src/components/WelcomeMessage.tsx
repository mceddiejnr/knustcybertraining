
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

  const inspirationalMessage = `Welcome to your cybersecurity journey! Today, you're taking a powerful step toward becoming a digital guardian. This training will equip you with essential knowledge and skills to protect yourself, your colleagues, and your organization from cyber threats. Every safeguard you learn, every best practice you adopt, and every security measure you implement contributes to building a stronger, more resilient digital world. You have the power to make a difference - let's unlock your potential to stay safe and secure online!`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="max-w-2xl w-full bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 p-8 relative overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="p-3 bg-green-500/20 rounded-full border border-green-400/30">
                <CircuitBoard className="w-6 h-6 text-green-400" />
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full border border-blue-400/30">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Welcome to Your Cybersecurity Journey!
            </h2>
            
            <div className="bg-slate-700/50 rounded-xl p-6 mb-8 border border-cyan-500/20">
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
                className="mt-2 text-lg py-3 bg-slate-700/50 border-cyan-500/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/30"
                required
              />
            </div>
            
            {/* Updated button with "Submit" label */}
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 border border-cyan-400/30 shadow-lg shadow-cyan-500/25"
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
