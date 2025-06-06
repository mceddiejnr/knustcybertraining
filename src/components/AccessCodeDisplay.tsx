
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Copy, CheckCircle, Eye, EyeOff } from "lucide-react";

interface AccessCodeDisplayProps {
  attendeeName: string;
  accessCode: string;
  onContinue: () => void;
}

const AccessCodeDisplay = ({ attendeeName, accessCode, onContinue }: AccessCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy access code');
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

      <div className="max-w-sm w-full bg-gray-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-green-500/30 p-4 sm:p-6 relative overflow-hidden">
        {/* Cyber border effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-sm"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-wide">
              REGISTRATION SUCCESSFUL! ✅
            </h2>
            
            <p className="text-green-400 font-medium text-sm sm:text-base">
              Welcome, {attendeeName}!
            </p>
          </div>

          <Card className="bg-gray-700/50 border-green-500/40 mb-4 sm:mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-white text-sm sm:text-base flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Your Access Code
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-gray-800/80 rounded-lg p-3 sm:p-4 border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs font-mono">Save this code:</span>
                  <Button
                    onClick={() => setShowCode(!showCode)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    {showCode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 font-mono tracking-widest mb-2">
                    {showCode ? accessCode : "••••••"}
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-700/30 rounded-lg p-3 mb-4 border border-yellow-500/30">
            <p className="text-yellow-400 text-xs sm:text-sm font-medium text-center">
              ⚠️ Keep this code safe! You'll need it to access the workshop content again.
            </p>
          </div>

          <Button 
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-sm sm:text-base rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg font-mono"
          >
            CONTINUE TO WORKSHOP 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeDisplay;
