
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, KeyRound } from "lucide-react";

interface AccessCodeFormProps {
  onCodeSubmit: (code: string) => void;
  onBackToRegistration: () => void;
}

const AccessCodeForm = ({ onCodeSubmit, onBackToRegistration }: AccessCodeFormProps) => {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length === 6) {
      setError("");
      onCodeSubmit(accessCode.trim());
    } else {
      setError("Please enter a valid 6-digit access code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative">
      {/* KNUST Logo */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-8 sm:h-12 w-auto drop-shadow-lg"
        />
      </div>

      <div className="max-w-xs sm:max-w-sm w-full bg-gray-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-green-500/30 p-3 sm:p-5 relative overflow-hidden">
        {/* Cyber border effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-sm"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-3 sm:mb-4">
            <div className="flex justify-center items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
              <div className="p-1 sm:p-2 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="p-1 sm:p-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full shadow-lg">
                <KeyRound className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            
            <h2 className="text-sm sm:text-lg font-bold text-white mb-2 tracking-wide">
              RETURNING USER ACCESS 🔐
            </h2>
            
            <div className="bg-gray-700/50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 border border-green-500/30 shadow-inner">
              <p className="text-gray-300 leading-relaxed text-left font-medium text-xs sm:text-sm">
                Enter your 6-digit access code to continue to the workshop content.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            <div>
              <Label htmlFor="accessCode" className="text-xs sm:text-sm font-semibold text-gray-200 mb-1 block font-mono">
                Access Code 🔑
              </Label>
              <Input
                id="accessCode"
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="text-xs sm:text-sm py-2 sm:py-3 bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 rounded-lg shadow-sm font-mono h-8 sm:h-10 text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
              {error && (
                <p className="text-red-400 text-xs mt-1 font-mono">{error}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 sm:py-3 text-xs sm:text-sm rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg font-mono h-8 sm:h-auto"
              disabled={accessCode.length !== 6}
            >
              ACCESS WORKSHOP 🚀
            </Button>

            <Button 
              type="button"
              onClick={onBackToRegistration}
              variant="outline"
              className="w-full border-gray-600 text-gray-400 hover:bg-gray-700/50 hover:border-gray-500 text-xs sm:text-sm py-2 sm:py-3 rounded-lg font-mono h-8 sm:h-auto"
            >
              New User? Register Here
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeForm;
