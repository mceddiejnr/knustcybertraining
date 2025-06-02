
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, ArrowRight } from "lucide-react";

interface SuccessMessageProps {
  attendeeName: string;
  onViewProgram: () => void;
}

const SuccessMessage = ({ attendeeName, onViewProgram }: SuccessMessageProps) => {
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
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-200/20 via-slate-200/20 to-blue-200/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full shadow-lg relative animate-pulse">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                {/* Professional accent */}
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 bg-gradient-to-r from-green-600 via-slate-700 to-blue-600 bg-clip-text text-transparent">
              Welcome, {attendeeName}! 🎯
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-green-200/50 shadow-inner">
              <p className="text-green-700 font-semibold text-sm sm:text-base">
                Registration successful! Your attendance has been recorded for today's cybersecurity training session. ✅
              </p>
            </div>
            
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              You're now registered for the KNUST cybersecurity training program. 
              Ready to enhance your digital security knowledge? 🛡️
            </p>
          </div>

          <Button 
            onClick={onViewProgram}
            className="w-full bg-gradient-to-r from-blue-600 via-slate-600 to-green-600 hover:from-blue-700 hover:via-slate-700 hover:to-green-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold text-base sm:text-lg shadow-lg"
          >
            <span>View Program</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
