
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";

interface SuccessMessageProps {
  attendeeName: string;
  onViewProgram: () => void;
}

const SuccessMessage = ({ attendeeName, onViewProgram }: SuccessMessageProps) => {
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

      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/50 p-8 text-center relative overflow-hidden">
        {/* Elegant gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-200/20 via-yellow-200/20 to-blue-200/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg relative animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
                {/* Cute sparkles around success icon */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-green-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
              Welcome, {attendeeName}! 🎉
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-200/50 shadow-inner">
              <p className="text-green-700 font-semibold">
                Thank you for joining KNUST's cybersecurity training! Your attendance has been recorded. ✅
              </p>
            </div>
            
            <p className="text-gray-600 font-medium">
              You're all set for today's cybersecurity training session at KNUST Library. 
              Ready to explore what we have planned for you? 🌟
            </p>
          </div>

          <Button 
            onClick={onViewProgram}
            className="w-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 hover:from-blue-600 hover:via-green-600 hover:to-yellow-600 text-white py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
            <Sparkles className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
