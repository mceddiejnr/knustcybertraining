
import { Lock, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  onScan: () => void;
}

const QRCodeDisplay = ({ onScan }: QRCodeDisplayProps) => {
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

      <div className="max-w-md w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-500/30 p-8 text-center relative overflow-hidden">
        {/* KNUST-themed glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600/20 via-amber-500/20 to-green-600/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-amber-400" />
              <CircuitBoard className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-amber-400 via-red-400 to-green-400 bg-clip-text text-transparent">
              KNUST Cybersecurity Training
            </h1>
            <p className="text-lg text-slate-300">
              Scan the QR code to begin your journey.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-48 h-48 bg-slate-800/70 rounded-2xl border-2 border-amber-500/60 mb-4 relative">
              {/* QR Code simulation with KNUST colors */}
              <div className="grid grid-cols-8 gap-1 w-32 h-32">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full ${
                      Math.random() > 0.5 ? 'bg-amber-500' : 'bg-transparent'
                    } rounded-sm`}
                  ></div>
                ))}
              </div>
              {/* KNUST-themed scanning line animation */}
              <div className="absolute inset-0 border-2 border-red-500/40 rounded-2xl animate-pulse"></div>
            </div>
            <p className="text-sm text-slate-400">
              Point your camera at this QR code
            </p>
          </div>
          
          <Button 
            onClick={onScan}
            className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:via-red-500 hover:to-amber-500 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-amber-500/40 shadow-lg shadow-red-600/25"
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
