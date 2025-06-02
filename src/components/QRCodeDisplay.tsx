
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  onScan: () => void;
}

const QRCodeDisplay = ({ onScan }: QRCodeDisplayProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Cybersecurity Training Session
          </h1>
          <p className="text-lg text-gray-600">
            Scan the QR code to begin your journey.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-48 h-48 bg-gray-100 rounded-2xl border-4 border-blue-200 mb-4">
            <QrCode size={120} className="text-blue-600" />
          </div>
          <p className="text-sm text-gray-500">
            Point your camera at this QR code
          </p>
        </div>
        
        {/* Simulate QR code scan for demo purposes */}
        <Button 
          onClick={onScan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          Simulate QR Code Scan
        </Button>
        
        <p className="text-xs text-gray-400 mt-4">
          (In a real implementation, this would automatically detect QR code scanning)
        </p>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
