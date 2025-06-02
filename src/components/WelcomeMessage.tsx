
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Eye } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to Your Cybersecurity Journey!
          </h2>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-gray-700 leading-relaxed text-left">
              {inspirationalMessage}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="text-lg font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-2 text-lg py-3"
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-xl transition-all duration-200 transform hover:scale-105"
            disabled={!name.trim()}
          >
            Join the Training Session
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeMessage;
