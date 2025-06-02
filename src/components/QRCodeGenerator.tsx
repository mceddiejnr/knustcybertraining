import { useEffect, useState } from "react";
import { Shield, Sparkles, Smartphone, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
interface QRCodeGeneratorProps {
  onScan: () => void;
}
const QRCodeGenerator = ({
  onScan
}: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    // Get current URL and create the form URL
    const baseUrl = window.location.origin;
    const formUrl = `${baseUrl}/?start=true`;
    setCurrentUrl(formUrl);

    // Generate QR code using a free QR code API
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formUrl)}`;
    setQrCodeUrl(qrApiUrl);
  }, []);

  // Listen for URL parameter to auto-start
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('start') === 'true') {
      onScan();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onScan]);
  const handleDirectLink = () => {
    onScan();
  };
  return <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
        <img src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" alt="KNUST Logo" className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-lg" />
      </div>

      {/* Admin Login Button */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
        <Button onClick={() => window.location.href = "/admin/login"} variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-slate-300 hover:bg-white/90 text-slate-700">
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </div>

      <div className="max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Professional gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-200/30 via-blue-200/30 to-indigo-200/30 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-center items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 sm:mb-3 bg-gradient-to-r from-slate-600 via-slate-700 to-blue-600 bg-clip-text text-transparent"> Cybersecurity Training</h1>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Scan to begin your training journey
            </p>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-300/60 mb-4 sm:mb-6 shadow-lg overflow-hidden">
              {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code for Training Registration" className="w-full h-full object-contain p-4" /> : <div className="flex items-center justify-center w-full h-full">
                  <div className="animate-spin w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full"></div>
                </div>}
            </div>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Smartphone className="w-4 h-4 text-slate-500" />
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Scan with your phone camera
              </p>
            </div>
          </div>
          
          {/* Alternative direct link */}
          <div className="border-t border-slate-200 pt-4 mb-6">
            <p className="text-xs text-slate-500 mb-3">
              Can't scan the QR code?
            </p>
            <Button onClick={handleDirectLink} variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 mb-3">
              <Link2 className="w-4 h-4 mr-2" />
              Use Direct Link Instead
            </Button>
          </div>
          
          <Button onClick={onScan} className="w-full bg-gradient-to-r from-slate-600 via-slate-600 to-blue-600 hover:from-slate-700 hover:via-slate-700 hover:to-blue-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base sm:text-lg shadow-lg">
            Start Training Session
          </Button>
          
          <p className="text-xs text-slate-400 mt-3 sm:mt-4 italic">
            Professional cybersecurity training by KNUST
          </p>
        </div>
      </div>
    </div>;
};
export default QRCodeGenerator;