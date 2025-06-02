
import { Shield, Sparkles } from "lucide-react";
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
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-20 w-auto drop-shadow-lg"
        />
      </div>

      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/50 p-8 text-center relative overflow-hidden">
        {/* Elegant gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-200/30 via-yellow-200/30 to-green-200/30 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
              KNUST Cybersecurity Training
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Scan the QR code to begin your journey ✨
            </p>
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-yellow-300/60 mb-4 relative shadow-inner">
              {/* QR Code simulation with KNUST colors */}
              <div className="grid grid-cols-8 gap-1 w-32 h-32">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full ${
                      Math.random() > 0.5 ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-transparent'
                    } rounded-sm`}
                  ></div>
                ))}
              </div>
              {/* Cute scanning animation */}
              <div className="absolute inset-0 border-2 border-green-400/60 rounded-3xl animate-pulse shadow-lg"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Point your camera at this QR code 📱
            </p>
          </div>
          
          <Button 
            onClick={onScan}
            className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:from-red-600 hover:via-yellow-600 hover:to-green-600 text-white py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            Start ✨
          </Button>
          
          <p className="text-xs text-gray-400 mt-4 italic">
            (Tap the button above to simulate QR scanning)
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
