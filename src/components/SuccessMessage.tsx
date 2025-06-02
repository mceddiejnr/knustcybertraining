
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, ArrowRight } from "lucide-react";

interface SuccessMessageProps {
  attendeeName: string;
  onViewProgram: () => void;
}

const SuccessMessage = ({ attendeeName, onViewProgram }: SuccessMessageProps) => {
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

      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full bg-white/98 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/60 p-4 sm:p-6 md:p-8 text-center relative overflow-hidden">
        {/* Professional gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-100/30 via-gray-50/30 to-green-100/30 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg relative animate-pulse">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                {/* Professional accent */}
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-700 via-gray-700 to-green-600 bg-clip-text text-transparent">
              Welcome, {attendeeName}! 🎯
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-green-200/50 shadow-inner">
              <p className="text-green-700 font-semibold text-sm sm:text-base">
                Registration successful! Your attendance has been recorded for today's cybersecurity training session. ✅
              </p>
            </div>
            
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              You're now registered for the KNUST cybersecurity training program. 
              Ready to enhance your digital security knowledge? 🛡️
            </p>
          </div>

          <Button 
            onClick={onViewProgram}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold text-sm sm:text-base shadow-lg"
          >
            <span>View Program</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
