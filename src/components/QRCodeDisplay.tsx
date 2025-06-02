
import { Lock, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  onScan: () => void;
}

const QRCodeDisplay = ({ onScan }: QRCodeDisplayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 p-8 text-center relative overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-cyan-400" />
              <CircuitBoard className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Cybersecurity Training Session
            </h1>
            <p className="text-lg text-slate-300">
              Scan the QR code to begin your journey.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-48 h-48 bg-slate-700/50 rounded-2xl border-2 border-cyan-400/50 mb-4 relative">
              {/* QR Code simulation with tech pattern */}
              <div className="grid grid-cols-8 gap-1 w-32 h-32">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full ${
                      Math.random() > 0.5 ? 'bg-cyan-400' : 'bg-transparent'
                    } rounded-sm`}
                  ></div>
                ))}
              </div>
              {/* Scanning line animation */}
              <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl animate-pulse"></div>
            </div>
            <p className="text-sm text-slate-400">
              Point your camera at this QR code
            </p>
          </div>
          
          {/* Updated button with "Start" label */}
          <Button 
            onClick={onScan}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-cyan-400/30 shadow-lg shadow-cyan-500/25"
          >
            Start
          </Button>
          
          <p className="text-xs text-slate-500 mt-4">
            (In a real implementation, this would automatically detect QR code scanning)
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
