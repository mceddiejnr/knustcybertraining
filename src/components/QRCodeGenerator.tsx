
import { useEffect, useState } from "react";
import { Shield, Sparkles, Smartphone, Link2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeGeneratorProps {
  onScan: () => void;
}

const QRCodeGenerator = ({ onScan }: QRCodeGeneratorProps) => {
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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
    } catch (err) {
      console.log('Failed to copy link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-10 sm:h-14 md:h-16 w-auto drop-shadow-lg"
        />
      </div>

      {/* Admin Login Button */}
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6">
        <Button 
          onClick={() => window.location.href = "/admin/login"} 
          variant="outline" 
          size="sm" 
          className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white text-gray-700 text-xs sm:text-sm"
        >
          <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Admin
        </Button>
      </div>

      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full bg-white/98 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/60 p-4 sm:p-6 md:p-8 text-center relative overflow-hidden">
        {/* Professional gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-100/40 via-gray-50/40 to-green-100/40 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-700 via-gray-700 to-green-600 bg-clip-text text-transparent">
              Cybersecurity Training
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Scan to begin your training journey
            </p>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 bg-white rounded-xl sm:rounded-2xl border-2 border-gray-300/60 mb-3 sm:mb-4 shadow-lg overflow-hidden">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code for Training Registration" 
                  className="w-full h-full object-contain p-3 sm:p-4" 
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-gray-300 border-t-green-600 rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
              <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Scan with your phone camera
              </p>
            </div>
          </div>

          {/* Direct Link Section */}
          <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
            <p className="text-xs text-gray-500 mb-2 sm:mb-3">
              Or access directly in your browser:
            </p>
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700 font-mono truncate">
                    {currentUrl}
                  </p>
                </div>
                <Button
                  onClick={copyLink}
                  variant="ghost"
                  size="sm"
                  className="ml-2 p-1 h-auto text-green-600 hover:text-green-700 hover:bg-green-50 flex-shrink-0"
                >
                  <span className="text-xs">Copy</span>
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleDirectLink} 
              variant="outline" 
              className="w-full border-green-300 text-green-700 hover:bg-green-50 text-sm py-2"
            >
              <Link2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Use Direct Link Instead
            </Button>
          </div>
          
          <Button 
            onClick={onScan} 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base shadow-lg"
          >
            Start Training Session
          </Button>
          
          <p className="text-xs text-gray-400 mt-2 sm:mt-3 italic">
            Professional cybersecurity training by KNUST
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
