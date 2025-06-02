
import { Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  onScan: () => void;
}

const QRCodeDisplay = ({ onScan }: QRCodeDisplayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-lg"
        />
      </div>

      <div className="max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Professional gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-200/30 via-blue-200/30 to-indigo-200/30 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 sm:mb-3 bg-gradient-to-r from-red-600 via-slate-700 to-blue-600 bg-clip-text text-transparent">
              KNUST Cybersecurity Training
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Scan the QR code to begin ✨
            </p>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl border-2 border-slate-300/60 mb-3 sm:mb-4 relative shadow-inner">
              {/* Professional QR Code simulation */}
              <div className="grid grid-cols-8 gap-1 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full ${
                      Math.random() > 0.5 ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-transparent'
                    } rounded-sm`}
                  ></div>
                ))}
              </div>
              {/* Scanning animation */}
              <div className="absolute inset-0 border-2 border-blue-500/60 rounded-2xl sm:rounded-3xl animate-pulse shadow-lg"></div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Point your camera at this QR code 📱
            </p>
          </div>
          
          <Button 
            onClick={onScan}
            className="w-full bg-gradient-to-r from-red-600 via-slate-600 to-blue-600 hover:from-red-700 hover:via-slate-700 hover:to-blue-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base sm:text-lg shadow-lg"
          >
            Start Training ✨
          </Button>
          
          <p className="text-xs text-slate-400 mt-3 sm:mt-4 italic">
            (Tap the button above to simulate QR scanning)
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
